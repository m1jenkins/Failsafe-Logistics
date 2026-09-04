import React from 'react';

export const NotFound: React.FC = () => (
  <main className="mt-[76px] flex min-h-[70svh] items-center bg-ink px-5 py-20 text-white lg:mt-[84px]">
    <div className="mx-auto w-full max-w-[1536px]">
      <p className="display-face text-6xl text-signal md:text-8xl">404</p>
      <h1 className="display-face mt-7 max-w-4xl text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.84] text-white">This route doesn’t exist</h1>
      <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-white/70">The page you’re looking for is not available. Return home or send the route you need.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/" className="inline-flex min-h-12 items-center rounded-[5px] bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-signal hover:text-white">Back to home</a>
        <a href="sms:+15129104938" className="inline-flex min-h-12 items-center rounded-[5px] border border-white/35 px-6 py-3 text-sm font-bold text-white hover:border-white">Text (512) 910-4938</a>
      </div>
    </div>
  </main>
);
