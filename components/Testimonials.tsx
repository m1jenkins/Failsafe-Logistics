import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Quote } from 'lucide-react';
import { TestimonialData } from '../types';

const testimonials: TestimonialData[] = [
  {
    role: "Aviation Manager",
    location: "Austin-Bergstrom",
    quote: "We had an AOG (Aircraft on Ground) situation. Speedy Bat got the part from Dallas in 3 hours flat. Saved us $50k in delays."
  },
  {
    role: "Law Firm Partner",
    location: "Downtown Houston",
    quote: "The court filing deadline was 5:00 PM. They picked up at 1:30 PM. Walked it into the clerk's office at 4:15 PM. Incredible."
  },
  {
    role: "Medical Coordinator",
    location: "San Antonio Medical Center",
    quote: "When transplant teams need samples, we don't call Uber. We call Speedy Bat. Professional, sterile, and ridiculously fast."
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <SectionHeading title="Client Reviews" subtitle="When failure is not an option, professionals choose Speedy Bat." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 flex flex-col">
              <Quote className="text-slate-700 h-8 w-8 mb-6" />
              <p className="text-slate-300 mb-8 italic flex-grow leading-relaxed">"{t.quote}"</p>

              <div className="mt-auto border-t border-slate-800 pt-4">
                <div className="text-white font-bold uppercase text-sm tracking-wider">{t.role}</div>
                <div className="text-red-500 text-xs font-mono mt-1">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};