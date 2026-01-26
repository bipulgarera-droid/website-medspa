
import React from 'react';
import { Star } from 'lucide-react';

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

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-nova-gray py-20 px-6 md:px-10 border-t border-gray-200" id="testimonials">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-gray-400 text-sm flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-nova-teal rounded-full"></span>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl text-nova-dark font-medium leading-tight">
            Client Stories & <br/>
            <span className="font-serif italic font-normal">Glowing Reviews</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="flex gap-1 mb-6 text-nova-teal">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-8 italic flex-grow">
                "{testimonial.text}"
              </p>
              <div className="mt-auto">
                <h4 className="text-nova-dark font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{testimonial.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
