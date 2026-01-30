import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'alert';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 border-2";
  
  const variants = {
    primary: "bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-500",
    secondary: "bg-transparent border-slate-600 text-slate-300 hover:border-white hover:text-white",
    alert: "bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};