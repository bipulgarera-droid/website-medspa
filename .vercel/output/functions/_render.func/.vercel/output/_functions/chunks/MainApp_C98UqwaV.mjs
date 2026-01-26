import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as SERVICES, N as Navbar, F as Footer } from './Footer_C7Y0ykxF.mjs';
import { Plus, ArrowRight, Star, X, ArrowLeft, Calendar, CheckCircle, Sparkles, Clock, User, Phone } from 'lucide-react';

const ServiceCard = ({ service, onBook }) => {
  return /* @__PURE__ */ jsxs("div", { className: "group relative h-[240px] md:h-[350px] w-full bg-white rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-500 ease-in-out hover:bg-nova-dark overflow-hidden shadow-sm hover:shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 p-4 md:p-6 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0 pointer-events-none group-hover:pointer-events-none", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-lg md:rounded-xl bg-gray-50 flex items-center justify-center p-1", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: service.image,
            alt: service.title,
            className: "w-full h-full object-cover rounded-md md:rounded-lg"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-light text-xs md:text-base", children: "( + )" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
        /* @__PURE__ */ jsxs("span", { className: "block text-gray-400 text-[10px] md:text-xs mb-1 md:mb-2", children: [
          "(",
          service.number,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "text-lg md:text-3xl text-gray-900 font-medium leading-tight", children: [
          service.title,
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal block md:inline", children: service.italicWord })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 p-4 md:p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 bg-nova-dark rounded-xl md:rounded-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onBook();
            },
            className: "text-white text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:underline underline-offset-4",
            children: [
              "Book ",
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "an Appointment" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "opacity-70", children: "( + )" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-white/20", children: /* @__PURE__ */ jsx(Plus, { className: "rotate-45", size: 16 }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-2 md:space-y-4", children: [
        /* @__PURE__ */ jsxs("span", { className: "block text-white/50 text-[10px] md:text-xs", children: [
          "(",
          service.number,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "text-lg md:text-3xl text-white font-medium leading-tight", children: [
          service.title,
          " ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-white ml-1 md:ml-0", children: service.italicWord })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-[10px] md:text-sm leading-relaxed max-w-[90%] line-clamp-3 md:line-clamp-none", children: service.description }),
        /* @__PURE__ */ jsx("div", { className: "pt-2 hidden md:block", children: /* @__PURE__ */ jsx("span", { className: "inline-block p-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white hover:text-black transition-colors", onClick: onBook, children: /* @__PURE__ */ jsx(ArrowRight, { size: 16 }) }) })
      ] })
    ] })
  ] });
};

const HeroSection = ({ onOpenBooking }) => {
  return /* @__PURE__ */ jsx("section", { className: "bg-nova-gray py-12 md:py-20 px-4 md:px-10 min-h-screen", id: "services", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10 md:mb-20 text-center md:text-left", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-6xl lg:text-7xl text-nova-dark font-medium leading-tight mb-4 md:mb-6", children: [
        "Effortless Beauty with ",
        /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal", children: "State of the Art" }),
        " Technology"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-lg text-sm md:text-base leading-relaxed mx-auto md:mx-0", children: "Specializing in premium laser hair removal, cosmelan treatments, and advanced skin rejuvenation. Experience the confidence of flawless skin with our expert med spa services." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6", children: SERVICES.map((service) => /* @__PURE__ */ jsx(
      ServiceCard,
      {
        service,
        onBook: onOpenBooking
      },
      service.id
    )) })
  ] }) });
};

const CommitmentSection = ({ onOpenBooking }) => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen min-h-[600px] overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/hero-luxury-spa.png",
        alt: "Smooth radiant skin",
        className: "absolute inset-0 w-full h-full object-cover object-[35%_20%] md:object-top md:scale-125 md:translate-x-[10%]"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-between p-6 md:p-16 max-w-[1440px] mx-auto w-full pt-24 md:pt-32", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-48 md:mt-10", children: /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] tracking-tight drop-shadow-lg", children: [
        "Your Skin, ",
        /* @__PURE__ */ jsx("br", {}),
        "Our Passion for ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal", children: "Perfection" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10 md:mb-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white/90 text-sm md:text-base mb-6 font-light leading-relaxed", children: "Advanced aesthetic treatments designed for your unique needs. Reveal your best self with our expert laser and skin care solutions." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onOpenBooking,
            className: "bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group",
            children: "( Book a Consultation )"
          }
        )
      ] }) })
    ] })
  ] });
};

const AboutSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-20 px-6 md:px-10", id: "about", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs("span", { className: "text-gray-400 text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-gray-400 rounded-full" }),
      "About Us"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-16 lg:gap-24 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:w-2/3", children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl text-nova-dark leading-tight font-medium", children: [
        "At Rondebosch Laser, we combine ",
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-gray-600", children: "state-of-the-art technology" }),
        " with expert care to deliver exceptional results. From laser hair removal to ",
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-gray-600", children: "advanced peels and cosmelan" }),
        ", our goal is your absolute confidence."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/3 flex flex-col justify-end h-full mt-8 lg:mt-0", children: [
        /* @__PURE__ */ jsx("div", { className: "relative mb-8", children: /* @__PURE__ */ jsx("div", { className: "w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 max-w-[300px]", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/about-spa-interior.png",
            alt: "Advanced Skin Care Tool",
            className: "w-full h-full object-cover"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-black rounded-full" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed max-w-[300px]", children: "We are a dedicated med spa offering top-tier aesthetic procedures in a luxurious environment. Our specialists use the latest diode lasers and clinical skincare to ensure safe, effective, and beautiful results." })
      ] })
    ] })
  ] }) });
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The laser hair removal here is truly painless! I was skeptical at first, but after just 3 sessions, the results are incredible. The staff is so professional.",
    rating: 5,
    treatment: "Laser Hair Removal"
  },
  {
    id: 2,
    name: "Michael Torres",
    text: "I struggled with pigmentation for years. The Cosmelan peel treatment was a game changer. My skin is clear and even-toned for the first time in a decade.",
    rating: 5,
    treatment: "Cosmelan Peel"
  },
  {
    id: 3,
    name: "Emily Reus",
    text: "Loved the dermaplaning facial. My skin felt so smooth and glowing immediately after. Highly recommend for a quick refresh before an event.",
    rating: 5,
    treatment: "Dermaplaning"
  }
];
const TestimonialsSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-nova-gray py-20 px-6 md:px-10 border-t border-gray-200", id: "testimonials", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-gray-400 text-sm flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-nova-teal rounded-full" }),
        "Testimonials"
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl text-nova-dark font-medium leading-tight", children: [
        "Client Stories & ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal", children: "Glowing Reviews" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: TESTIMONIALS.map((testimonial) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-6 text-nova-teal", children: [...Array(testimonial.rating)].map((_, i) => /* @__PURE__ */ jsx(Star, { size: 16, fill: "currentColor" }, i)) }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-base leading-relaxed mb-8 italic flex-grow", children: [
        '"',
        testimonial.text,
        '"'
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-nova-dark font-bold text-lg", children: testimonial.name }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs uppercase tracking-wider mt-1", children: testimonial.treatment })
      ] })
    ] }, testimonial.id)) })
  ] }) });
};

const BookingModal = ({ isOpen, onClose, onConfirm, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Laser Hair Removal",
    date: "",
    time: "",
    notes: ""
  });
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        name: initialData.name || prev.name,
        phone: initialData.phone || prev.phone,
        email: initialData.email || prev.email,
        service: initialData.service || prev.service,
        date: initialData.date || prev.date,
        time: initialData.time || prev.time,
        notes: initialData.notes || prev.notes
      }));
    }
  }, [initialData, isOpen]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: `apt-${Date.now()}`,
      submissionTimestamp: Date.now(),
      clientName: formData.name,
      clientPhone: formData.phone,
      clientEmail: formData.email,
      service: formData.service,
      appointmentDate: formData.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      // Fallback if empty
      appointmentTime: formData.time || "09:00",
      // Fallback if empty
      notes: formData.notes,
      status: "confirmed"
    };
    try {
      const existing = localStorage.getItem("appointments");
      const appointments = existing ? JSON.parse(existing) : [];
      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } catch (err) {
      console.error("Failed to save appointment", err);
    }
    alert(`Appointment Confirmed for ${formData.name}!`);
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "Laser Hair Removal",
      date: "",
      time: "",
      notes: ""
    });
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[60] flex items-center justify-center px-4 overflow-y-auto", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl animate-fade-in-up my-8", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors",
          children: /* @__PURE__ */ jsx(X, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif italic mb-2", children: "Book Your Visit" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6", children: "Confirm your details below. We'll contact you to finalize your appointment." }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "name",
                value: formData.name,
                onChange: handleChange,
                type: "text",
                className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm",
                placeholder: "Jane Doe",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                type: "tel",
                className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm",
                placeholder: "(555) 000-0000",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Email Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              name: "email",
              value: formData.email,
              onChange: handleChange,
              type: "email",
              className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm",
              placeholder: "jane@example.com",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Treatment" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              name: "service",
              value: formData.service,
              onChange: handleChange,
              className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm",
              children: [
                /* @__PURE__ */ jsx("option", { children: "Laser Hair Removal" }),
                /* @__PURE__ */ jsx("option", { children: "Cosmelan Peel" }),
                /* @__PURE__ */ jsx("option", { children: "Dermaplaning" }),
                /* @__PURE__ */ jsx("option", { children: "Chemical Peel" }),
                /* @__PURE__ */ jsx("option", { children: "Threading / Waxing" }),
                /* @__PURE__ */ jsx("option", { children: "Microneedling" }),
                /* @__PURE__ */ jsx("option", { children: "Other / Consultation" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Preferred Date" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "date",
                value: formData.date,
                onChange: handleChange,
                type: "date",
                required: true,
                className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm font-sans"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Preferred Time" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "time",
                value: formData.time,
                onChange: handleChange,
                type: "time",
                required: true,
                className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm font-sans"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-wider text-gray-500 mb-1", children: "Notes" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "notes",
              value: formData.notes,
              onChange: handleChange,
              rows: 2,
              className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm resize-none",
              placeholder: "Any specific concerns or requests..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full bg-nova-dark text-white py-4 rounded-lg hover:bg-black transition-colors font-medium text-sm tracking-wide", children: "CONFIRM APPOINTMENT" }) })
      ] })
    ] })
  ] });
};

const AdminDashboard = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      const mocks = [
        {
          id: "apt-1",
          submissionTimestamp: Date.now() - 864e5,
          clientName: "Sarah Jenkins",
          clientPhone: "+27 72 123 4567",
          clientEmail: "sarah.j@example.com",
          service: "Laser Hair Removal",
          appointmentDate: "2026-02-15",
          appointmentTime: "14:30",
          status: "confirmed",
          notes: "First time patient, sensitive skin."
        },
        {
          id: "apt-2",
          submissionTimestamp: Date.now() - 1728e5,
          clientName: "Michael Torres",
          clientPhone: "+27 82 999 8888",
          clientEmail: "mike.t@example.com",
          service: "Cosmelan Peel",
          appointmentDate: "2026-02-10",
          appointmentTime: "09:00",
          status: "pending",
          notes: ""
        }
      ];
      localStorage.setItem("appointments", JSON.stringify(mocks));
      setAppointments(mocks);
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@clinic.com" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" });
  };
  const formatSubmissionTime = (ts) => {
    return new Date(ts).toLocaleString("en-ZA", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-nova-gray flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-xl w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-nova-dark uppercase tracking-wide", children: "Admin Access" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-2", children: "Please log in to view appointments" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-gray-500 mb-1", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-nova-teal bg-transparent",
              placeholder: "admin@clinic.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-gray-500 mb-1", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full border-b border-gray-300 py-2 focus:outline-none focus:border-nova-teal bg-transparent",
              placeholder: "••••••••"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full bg-nova-dark text-white py-3 rounded-lg hover:bg-black transition-colors font-bold mt-4", children: "LOGIN DASHBOARD" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onBack, className: "w-full text-gray-400 text-xs py-2 hover:text-black", children: "Back to Website" })
      ] })
    ] }) });
  }
  const total = appointments.length;
  const confirmed = appointments.filter((a) => a.status === "confirmed").length;
  const serviceCounts = {};
  appointments.forEach((a) => {
    serviceCounts[a.service] = (serviceCounts[a.service] || 0) + 1;
  });
  const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans text-nova-dark", children: [
    /* @__PURE__ */ jsxs("nav", { className: "bg-nova-dark text-white py-4 px-6 md:px-10 flex justify-between items-center shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: onBack, className: "p-2 hover:bg-white/10 rounded-full transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold tracking-widest uppercase", children: "Nova Admin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
        "Live System Active"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto p-6 md:p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs uppercase font-bold tracking-wider", children: "Total Bookings" }),
              /* @__PURE__ */ jsx("h3", { className: "text-4xl font-medium mt-1", children: total })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 text-blue-500 rounded-lg", children: /* @__PURE__ */ jsx(Calendar, { size: 20 }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "All time requests" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs uppercase font-bold tracking-wider", children: "Confirmed" }),
              /* @__PURE__ */ jsx("h3", { className: "text-4xl font-medium mt-1", children: confirmed })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-50 text-green-500 rounded-lg", children: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-600 font-bold", children: "Upcoming Appointments" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs uppercase font-bold tracking-wider", children: "Top Service" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium mt-2 truncate", children: topService })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-purple-50 text-purple-500 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(Sparkles, { size: 20 }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Most requested treatment" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Upcoming Appointments" }),
          /* @__PURE__ */ jsx("button", { onClick: () => window.location.reload(), className: "text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200", children: "Refresh Data" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-4 border-b", children: "Submitted" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 border-b", children: "Appointment Slot" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 border-b", children: "Client Details" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 border-b", children: "Service" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 border-b", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: appointments.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "p-8 text-center text-gray-400", children: "No appointments scheduled yet." }) }) : appointments.sort((a, b) => b.submissionTimestamp - a.submissionTimestamp).map((apt) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors group", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 text-gray-400 text-xs", children: formatSubmissionTime(apt.submissionTimestamp) }),
            /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-mono text-nova-dark", children: [
                /* @__PURE__ */ jsx(Calendar, { size: 14, className: "text-nova-teal" }),
                /* @__PURE__ */ jsx("span", { children: formatDate(apt.appointmentDate) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1 text-xs text-gray-500 font-mono", children: [
                /* @__PURE__ */ jsx(Clock, { size: 12 }),
                /* @__PURE__ */ jsx("span", { children: apt.appointmentTime })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "p-4 relative", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 font-bold text-nova-dark", children: [
                  /* @__PURE__ */ jsx(User, { size: 12 }),
                  " ",
                  apt.clientName
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsx(Phone, { size: 12 }),
                  " ",
                  apt.clientPhone
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 pl-4", children: apt.clientEmail })
              ] }),
              apt.notes && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-[10px] bg-yellow-50 text-yellow-700 p-2 rounded border border-yellow-100 max-w-[200px]", children: [
                '"',
                apt.notes,
                '"'
              ] })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block text-[11px] bg-nova-teal/5 text-nova-teal px-3 py-1 rounded-full font-bold uppercase tracking-wide border border-nova-teal/10", children: apt.service }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${apt.status === "confirmed" ? "bg-green-100 text-green-700" : apt.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-600"}
                      `, children: apt.status }) })
          ] }, apt.id)) })
        ] }) })
      ] })
    ] })
  ] });
};

const MainApp = ({ prospectData }) => {
  const [view, setView] = useState("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("owner") === "1") {
        setView("admin");
      }
    }
  }, []);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const handleBookingConfirmed = () => setIsBookingOpen(false);
  if (view === "admin") {
    return /* @__PURE__ */ jsx(AdminDashboard, { onBack: () => setView("home") });
  }
  return /* @__PURE__ */ jsxs("div", { className: "font-sans antialiased text-nova-text bg-nova-gray min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      Navbar,
      {
        onOpenBooking: openBooking,
        businessName: prospectData?.businessName,
        logoUrl: prospectData?.logoUrl
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsx(CommitmentSection, { onOpenBooking: openBooking }),
      /* @__PURE__ */ jsx(HeroSection, { onOpenBooking: openBooking }),
      /* @__PURE__ */ jsx(AboutSection, {}),
      /* @__PURE__ */ jsx(TestimonialsSection, {})
    ] }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        onAdminClick: () => setView("admin"),
        businessName: prospectData?.businessName,
        phone: prospectData?.phone,
        email: prospectData?.email,
        address: prospectData?.address
      }
    ),
    /* @__PURE__ */ jsx(
      BookingModal,
      {
        isOpen: isBookingOpen,
        onClose: closeBooking,
        onConfirm: handleBookingConfirmed,
        initialData: null
      }
    )
  ] });
};

export { MainApp as M };
