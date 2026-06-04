import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
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
    <section id="reviews" className="py-24 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Trusted by leading semiconductor fabs, healthcare networks, and corporate firms throughout Central Texas."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 p-8 rounded-xl relative flex flex-col justify-between hover:border-slate-700 transition-colors shadow-xl"
            >
              {/* Quote Mark Icon */}
              <div className="absolute -top-4 -right-2 text-slate-800/40 pointer-events-none">
                <Quote size={60} />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-red-500 text-red-500" />
                  ))}
                </div>

                {/* Industry Badge */}
                <div className="inline-block text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full mb-4">
                  {review.industry}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 leading-relaxed text-sm italic mb-8 relative z-10">
                  "{review.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="border-t border-slate-900 pt-4 mt-auto flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-base">{review.name}</div>
                  <div className="text-slate-500 text-xs">{review.role}, <span className="text-slate-400">{review.company}</span></div>
                </div>
                <div className="text-green-500 flex items-center space-x-1 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
