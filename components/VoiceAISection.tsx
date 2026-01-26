
import React, { useState, useRef, useEffect } from 'react';
import { Mic, User, Power, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage, FunctionDeclaration, Type } from "@google/genai";
import { LeadData, ConversationLog } from '../types';

// --- Audio Utilities ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function floatTo16BitPCM(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    let s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return encode(new Uint8Array(int16.buffer));
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Tool Definition ---
const captureLeadTool: FunctionDeclaration = {
  name: "captureLeadDetails",
  description: "Capture lead details including name, contact info, and appointment preferences.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Customer's full name" },
      phone: { type: Type.STRING, description: "Customer's phone number" },
      email: { type: Type.STRING, description: "Customer's email address" },
      service: { type: Type.STRING, description: "The service they are interested in (e.g., Laser Hair Removal, Cosmelan)" },
      date: { type: Type.STRING, description: "Preferred date for appointment (YYYY-MM-DD)" },
      time: { type: Type.STRING, description: "Preferred time for appointment (HH:MM)" },
      notes: { type: Type.STRING, description: "Any specific notes or requests" }
    },
    required: ["name", "phone"]
  }
};

interface VoiceAISectionProps {
  onOpenBooking: () => void;
  onLeadDataCaptured: (data: LeadData) => void;
  onSessionComplete?: (log: ConversationLog) => void;
}

const VoiceAISection: React.FC<VoiceAISectionProps> = ({ onOpenBooking, onLeadDataCaptured, onSessionComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const isProcessingToolRef = useRef<boolean>(false);
  
  // Reconnection & Session Logic Refs
  const isIntentionalCloseRef = useRef(false);
  const retryCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<any>(null);
  const MAX_RETRIES = 3;
  
  // Data Capture Refs for Analytics
  const sessionStartTimeRef = useRef<number>(0);
  const capturedLeadDataRef = useRef<LeadData | null>(null);
  const transcriptRef = useRef<string>('');

  // Visualizer Animation Loop
  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;
    const animate = () => {
      if (analyserRef.current && visualizerRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const bars = visualizerRef.current.children as HTMLCollectionOf<HTMLElement>;
        const indices = [2, 6, 10, 14, 18];
        
        for (let i = 0; i < Math.min(bars.length, indices.length); i++) {
          const value = dataArray[indices[i]] || 0;
          const height = 4 + (value / 255) * 20;
          bars[i].style.height = `${height}px`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  const cleanupAudioContexts = () => {
    if (streamRef.current) { 
        streamRef.current.getTracks().forEach(track => track.stop()); 
        streamRef.current = null; 
    }
    if (scriptProcessorRef.current) { 
        scriptProcessorRef.current.disconnect(); 
        scriptProcessorRef.current = null; 
    }
    if (analyserRef.current) { 
        analyserRef.current.disconnect(); 
        analyserRef.current = null; 
    }
    if (inputAudioContextRef.current) { 
        inputAudioContextRef.current.close(); 
        inputAudioContextRef.current = null; 
    }
    if (outputAudioContextRef.current) { 
        outputAudioContextRef.current.close(); 
        outputAudioContextRef.current = null; 
    }
    nextStartTimeRef.current = 0;
  };

  const connectToGemini = async (isRetrying = false) => {
    try {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);

      if (!isRetrying) {
          retryCountRef.current = 0;
          setError(null);
          // Start tracking session only on fresh connect
          sessionStartTimeRef.current = Date.now();
          capturedLeadDataRef.current = null;
          transcriptRef.current = '';
      } else {
          setIsReconnecting(true);
      }
      
      setIsConnecting(true);
      isIntentionalCloseRef.current = false;
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      
      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          tools: [{ functionDeclarations: [captureLeadTool] }],
          systemInstruction: `You are Sarah, a warm and professional aesthetician at Rondebosch Laser Hair Removal.
          
          When the user speaks, greet them warmly: "Hi! I'm Sarah. Would you like to book an appointment, or do you have any questions about our services?"

          Your goal is to help users book a consultation by collecting:
          1. Name
          2. Phone Number
          3. Email
          4. Service
          5. Preferred Date/Time

          Call 'captureLeadDetails' when you have this info. Then say: "Perfect! I've pre-filled your details. Please click the 'Book Now' button below to confirm."
          
          LANGUAGE CAPABILITIES:
          - You are fluent in English and Hindi (and other languages).
          - If the user speaks English, reply in English.
          - If the user speaks Hindi, IMMEDIATELY switch to Hindi and continue the conversation in Hindi.
          - Adapt to the user's language preference automatically.`,
        },
      };

      const sessionPromise = ai.live.connect({
        model: config.model,
        callbacks: {
          onopen: () => {
            console.log("Gemini Live Session Opened");
            setIsActive(true);
            setIsConnecting(false);
            setIsReconnecting(false);
            setError(null);
            retryCountRef.current = 0; 
            isProcessingToolRef.current = false;

            const source = inputCtx.createMediaStreamSource(stream);
            const analyser = inputCtx.createAnalyser();
            analyser.fftSize = 64; 
            analyser.smoothingTimeConstant = 0.5;
            source.connect(analyser);
            analyserRef.current = analyser;

            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (isProcessingToolRef.current) return;

              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              setVolume(Math.min(rms * 5, 1));
              const base64Data = floatTo16BitPCM(inputData);
              
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then(session => {
                  session.sendRealtimeInput({
                    media: {
                      mimeType: 'audio/pcm;rate=16000',
                      data: base64Data
                    }
                  });
                }).catch(err => {});
              }
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Transcript Accumulation
            if (msg.serverContent?.outputTranscription?.text) {
                transcriptRef.current += `Sarah: ${msg.serverContent.outputTranscription.text}\n`;
            }
            if (msg.serverContent?.inputTranscription?.text) {
                transcriptRef.current += `User: ${msg.serverContent.inputTranscription.text}\n`;
            }

            // Handle Tool Calls
            if (msg.toolCall) {
               isProcessingToolRef.current = true;
               console.log("Tool call received:", msg.toolCall);
               
               for (const fc of msg.toolCall.functionCalls) {
                 if (fc.name === 'captureLeadDetails') {
                   const args = fc.args as any;
                   console.log("Captured Lead Data:", args);
                   
                   // Store for analytics
                   capturedLeadDataRef.current = {
                     name: args.name,
                     phone: args.phone,
                     email: args.email,
                     service: args.service,
                     date: args.date,
                     time: args.time,
                     notes: args.notes
                   };

                   onLeadDataCaptured(capturedLeadDataRef.current);

                   if (sessionPromiseRef.current) {
                      try {
                        const session = await sessionPromiseRef.current;
                        await session.sendToolResponse({
                          functionResponses: [{
                            id: fc.id,
                            name: fc.name,
                            response: { result: "ok" } 
                          }]
                        });
                      } catch (toolErr) {
                         console.error("Error sending tool response:", toolErr);
                      }
                   }
                 }
               }
               isProcessingToolRef.current = false;
            }

            const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const audioCtx = outputAudioContextRef.current;
              if (audioCtx) {
                const now = audioCtx.currentTime;
                const startTime = Math.max(nextStartTimeRef.current, now);
                nextStartTimeRef.current = startTime;
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                source.onended = () => { if (sourcesRef.current) sourcesRef.current.delete(source); };
                source.start(startTime);
                nextStartTimeRef.current += audioBuffer.duration;
                if (sourcesRef.current) sourcesRef.current.add(source);
              }
            }
          },
          onclose: (e: CloseEvent) => { 
              console.log("Gemini Live Session Closed", e);
              if (!isIntentionalCloseRef.current) {
                  handleAutoReconnect();
              } else {
                  handleDisconnect();
              }
          },
          onerror: (err: any) => {
            console.error("Gemini Live Session Error:", err);
            if (!isIntentionalCloseRef.current) {
                 handleAutoReconnect();
            } else {
                 const errorMessage = err instanceof Error ? err.message : "Connection error";
                 setError(errorMessage);
                 handleDisconnect();
            }
          }
        },
        config: config.config
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (e: any) {
      console.error("Setup Error:", e);
      let errMsg = e.message || "Failed to initialize connection";
      if (errMsg.includes("Permission denied") || errMsg.includes("permission")) {
        errMsg = "Microphone access denied. Please allow permission.";
      }
      setError(errMsg);
      handleDisconnect();
    }
  };

  const handleAutoReconnect = () => {
      cleanupAudioContexts();
      if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => session.close()).catch(() => {});
        sessionPromiseRef.current = null;
      }
      setIsConnecting(false);
      isProcessingToolRef.current = false;

      if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          const delay = retryCountRef.current * 1000;
          setIsReconnecting(true);
          setError(`Connection lost. Reconnecting (${retryCountRef.current}/${MAX_RETRIES})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
              connectToGemini(true);
          }, delay);
      } else {
          setIsActive(false);
          setIsReconnecting(false);
          setError("Connection lost. Please try again.");
          setVolume(0);
          
          saveSessionToLog("missed");
      }
  };

  const saveSessionToLog = async (status: 'completed' | 'missed' | 'incomplete') => {
      if (sessionStartTimeRef.current === 0) return; 
      
      const duration = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
      if (duration < 2) return; 

      const finalStatus = capturedLeadDataRef.current ? 'missed' : 'incomplete';
      
      const log: ConversationLog = {
          id: `session-${Date.now()}`,
          timestamp: sessionStartTimeRef.current,
          durationSeconds: duration,
          leadData: capturedLeadDataRef.current,
          status: finalStatus,
          transcript: transcriptRef.current || "No transcript recorded.",
      };

      if (onSessionComplete) {
          onSessionComplete(log);
      }
      sessionStartTimeRef.current = 0;
  };

  const handleDisconnect = async () => {
    isIntentionalCloseRef.current = true;
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    
    await saveSessionToLog("incomplete");

    setIsActive(false);
    setIsConnecting(false);
    setIsReconnecting(false);
    setVolume(0);
    isProcessingToolRef.current = false;
    
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => {
            if (typeof session.close === 'function') {
                session.close();
            }
        }).catch(() => {});
    }
    sessionPromiseRef.current = null;
    cleanupAudioContexts();
  };

  const toggleSession = () => {
    if (isActive || isConnecting || isReconnecting) {
        isIntentionalCloseRef.current = true;
        handleDisconnect();
    } else {
        connectToGemini();
    }
  };

  return (
    <section className="bg-black py-12 md:py-16 px-6 md:px-10 border-t border-white/5" id="voice-ai">
      <div className="max-w-4xl mx-auto">
        {/* Single Card Container */}
        <div className="bg-[#111] rounded-[32px] p-6 md:p-10 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-2xl">
          
          {/* Background Ambient Glow */}
          {isActive && (
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-nova-teal/5 blur-[80px] rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-nova-teal/5 blur-[80px] rounded-full transform -translate-y-1/2"></div>
             </div>
          )}

          {/* LEFT: Agent Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 z-10 text-center md:text-left flex-grow">
             <div className="relative">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#222] to-black p-1 flex items-center justify-center border border-white/10 shadow-lg">
                  <User size={32} className={`text-nova-teal ${isReconnecting ? 'opacity-50' : ''}`} />
               </div>
               {/* Status Dot */}
               <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#111] ${isReconnecting ? 'bg-yellow-500 animate-pulse' : isActive ? 'bg-nova-teal' : 'bg-gray-600'}`}></div>
             </div>
             
             <div>
                <h3 className="text-2xl text-white font-medium mb-1">Sarah</h3>
                <p className="text-nova-teal text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Skin Specialist</p>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[300px] hidden md:block">
                  "I can answer questions about laser hair removal, peels, and skincare. Say 'Hello' to begin."
                </p>
                 <div className="md:hidden text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-2">
                   {isReconnecting ? 'RECONNECTING...' : isActive ? 'LISTENING... SAY "HELLO"' : 'TAP MIC TO START'}
                 </div>
             </div>
          </div>

          {/* RIGHT: Actions Container */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 z-10 mt-2 md:mt-0">
            
            {/* Desktop Book Button */}
            <button 
              onClick={onOpenBooking}
              className="hidden md:block px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold tracking-wider uppercase hover:scale-105"
            >
              Book Now
            </button>

            {/* Mic Controls */}
            <div className="flex flex-col items-center justify-center min-w-[120px]">
              <div className="relative">
                  {/* Subtle pulsing ring when active */}
                  {isActive && !isReconnecting && (
                      <div className="absolute -inset-4 rounded-full border border-nova-teal/30 animate-pulse pointer-events-none"></div>
                  )}
                  
                  <button
                  onClick={toggleSession}
                  disabled={isConnecting && !isReconnecting}
                  className={`relative group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-500 
                      ${isReconnecting 
                        ? 'bg-yellow-500/10 border-yellow-500/50'
                        : isActive 
                        ? 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/50' 
                        : 'bg-[#080808] hover:bg-[#222] border border-white/10'}
                  `}
                  >
                  {isConnecting || isReconnecting ? (
                      <Loader2 className="animate-spin text-white" size={24} />
                  ) : isActive ? (
                      <Power className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                  ) : (
                      <Mic className={`text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform`} size={24} />
                  )}
                  </button>
              </div>

              {/* Error/Status Message */}
              {error && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center md:top-auto md:bottom-4 md:left-auto md:right-auto md:relative md:mt-4">
                      <div className={`flex items-center gap-2 text-[10px] px-3 py-1 rounded-full border ${isReconnecting ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                          {isReconnecting ? <RefreshCw size={12} className="animate-spin" /> : <AlertCircle size={12} />}
                          <span>{error}</span>
                      </div>
                  </div>
              )}

              {/* Visualizer */}
              <div className="h-4 mt-4 flex items-center justify-center gap-1 opacity-80">
                  {isActive && !isReconnecting ? (
                      <div ref={visualizerRef} className="flex gap-1 items-end h-full">
                          {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-1 bg-nova-teal rounded-full min-h-[2px] transition-all duration-75 ease-linear" style={{height: '2px'}}></div>
                          ))}
                      </div>
                  ) : (
                      <span className="hidden md:block text-[10px] text-gray-600 font-bold tracking-widest uppercase">
                          {isReconnecting ? 'CONNECTING...' : 'START CHAT'}
                      </span>
                  )}
              </div>
            </div>

            {/* Mobile Book Button */}
            <button 
              onClick={onOpenBooking}
              className="md:hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-xs font-bold tracking-wider uppercase w-full max-w-[200px]"
            >
              Book Consultation
            </button>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default VoiceAISection;
