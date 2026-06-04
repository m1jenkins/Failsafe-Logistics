import React from 'react';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface ReviewData {
  name: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  rating: number;
}

const reviews: ReviewData[] = [
  {
    name: "Marcus T.",
    role: "Logistics Manager",
    company: "Silicon Fab Solutions",
    industry: "High-Tech / Semiconductor",
    quote: "During a critical line-down event, we needed spare parts moved from Austin to a fab in Sherman immediately. Speedy Bat picked up the wafers within 45 minutes of our request and drove them straight through. Zero downtime saved us millions. They are our go-to hot shot partner.",
    rating: 5
  },
  {
    name: "Sarah E., RN",
    role: "Director of Clinical Operations",
    company: "Central Texas Health Alliance",
    industry: "Healthcare & Life Sciences",
    quote: "Reliability is non-negotiable for medical transport. Speedy Bat handles our temperature-controlled STAT specimens with total professionalism. Their HIPAA-compliant couriers are prompt, courteous, and provide seamless chain of custody logs.",
    rating: 5
  },
  {
    name: "David K.",
    role: "Managing Partner",
    company: "Kemp & Associates LLP",
    industry: "Legal & Corporate Services",
    quote: "Filing deadlines wait for no one. We trust Speedy Bat for all our high-stakes court filings and sensitive documents. They're fast, dependable, and always communicate updates via text the moment a delivery is signed for. Highly recommended.",
    rating: 5
  }
];

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-obsidian border-b border-white/5 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-royal-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by leading semiconductor fabs, healthcare networks, and corporate firms throughout Central Texas."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-2xl relative flex flex-col justify-between shadow-xl"
            >
              {/* Quote Mark Icon */}
              <div className="absolute -top-3 -right-1 text-white/[0.02] pointer-events-none">
                <Quote size={80} />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-red-500 text-red-500" />
                  ))}
                </div>

                {/* Industry Badge */}
                <div className="inline-block text-[9px] uppercase font-bold tracking-widest text-red-400 bg-red-950/20 border border-red-500/10 px-3 py-1 rounded-full mb-4 font-display">
                  {review.industry}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 leading-relaxed text-sm italic mb-8 relative z-10">
                  "{review.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="border-t border-white/5 pt-4 mt-auto flex items-center">
                <div>
                  <div className="text-white font-bold text-sm md:text-base font-display">{review.name}</div>
                  <div className="text-slate-500 text-xs font-accent">{review.role}, <span className="text-slate-400 font-medium">{review.company}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
