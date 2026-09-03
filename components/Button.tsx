import React from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
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
  const baseStyles =
    'px-6 py-3.5 font-bold tracking-wide transition-all duration-300 inline-flex items-center justify-center font-display rounded-full cursor-pointer text-xs md:text-sm min-h-11 active:translate-y-[1px]';

  const variants = {
    primary:
      'bg-signal text-white shadow-[0_14px_28px_-12px_rgba(232,73,15,0.55)] hover:bg-signal-strong hover:shadow-[0_18px_34px_-12px_rgba(201,59,8,0.6)] hover:-translate-y-px',
    secondary:
      'bg-ink text-paper hover:bg-ink-deep shadow-[0_14px_28px_-16px_rgba(22,24,29,0.5)] hover:-translate-y-px',
    ghost:
      'bg-white/70 border border-ink/12 text-ink hover:border-signal/50 hover:text-signal-strong hover:bg-white'
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
