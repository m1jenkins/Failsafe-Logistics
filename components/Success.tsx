import React from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { Header } from './Header';
import { Footer } from './Footer';

export const Success: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col text-slate-200 font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 py-24">
        <div className="bg-slate-950 rounded-2xl p-8 md:p-16 border border-slate-800 shadow-2xl max-w-2xl w-full text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 mx-auto">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Request Logged</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
            Our dispatch team has received your details. Please be advised that <span className="text-white font-bold">TEXTING is the fastest way to reach us</span>, especially after hours or for urgent dispatch requirements.
          </p>

          <div className="flex flex-col items-center max-w-xs mx-auto gap-4">
            <Button variant="alert" href="sms:5129104938" className="rounded-lg w-full flex items-center justify-center space-x-2 py-4">
              <MessageSquare className="h-5 w-5" />
              <span>TEXT US NOW</span>
            </Button>

            <a
              href="/"
              className="text-slate-500 hover:text-white text-sm underline underline-offset-4 transition-colors pt-4 pb-2"
            >
              Return Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
