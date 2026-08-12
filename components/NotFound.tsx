import React from 'react';
import { ArrowRight, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 font-display">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-white font-display tracking-tight">
            This route doesn't exist
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-md mx-auto">
            The page you're looking for isn't on our map. Our couriers never get lost — but this link did.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center space-x-2 font-display"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </a>
          <a
            href="sms:+15129104938"
            className="bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center space-x-2 font-display"
          >
            <span>Text Dispatch (512) 910-4938</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </main>
  );
};
