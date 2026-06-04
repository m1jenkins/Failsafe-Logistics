import React from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'alert';
  children: React.ReactNode;
  className?: string;
};

type AnchorProps = BaseButtonProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonNodeProps = BaseButtonProps & {
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorProps | ButtonNodeProps;

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3.5 font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center font-display rounded-full cursor-pointer text-xs md:text-sm";

  const variants = {
    primary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/25 shadow-lg shadow-black/30 backdrop-blur-sm",
    secondary: "bg-transparent border border-white/8 text-slate-300 hover:border-white/20 hover:text-white hover:bg-white/5 shadow-md",
    alert: "bg-gradient-to-r from-red-600 to-red-700 border border-red-500/20 text-white hover:from-red-500 hover:to-red-600 hover:border-red-400/30 shadow-lg shadow-red-950/30 active:translate-y-[1px]"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};