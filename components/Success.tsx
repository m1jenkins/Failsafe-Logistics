import React from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { Header } from './Header';
import { Footer } from './Footer';

export const Success: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen flex flex-col text-slate-200 font-sans relative overflow-x-hidden">
      {/* Soft static backdrop glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-red-950/20 via-ember/8 to-transparent blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-6 py-32">
          <div className="glass-panel-elevated rounded-3xl p-8 md:p-16 shadow-2xl max-w-2xl w-full text-center relative overflow-hidden animate-in fade-in zoom-in duration-500">
            {/* Card highlight border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white mb-6 font-display tracking-tight">Request Logged</h1>
            
            <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-sans font-light">
              Our dispatch team has received your details. Please note that <span className="text-white font-medium">TEXTING is the fastest way to reach us</span>, especially after hours or for urgent dispatch requirements.
            </p>

            <div className="flex flex-col items-center max-w-xs mx-auto gap-4">
              <Button variant="alert" href="sms:5129104938" className="w-full flex items-center justify-center space-x-2 py-4">
                <MessageSquare className="h-4.5 w-4.5" />
                <span>TEXT US NOW</span>
              </Button>

              <a
                href="/"
                className="text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold font-display transition-colors pt-4 pb-2"
              >
                Return Home
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
