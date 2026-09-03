import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-[#F39C12] text-white hover:bg-[#D68910] font-bold shadow-sm',
      secondary: 'bg-slate-100 text-[#111827] hover:bg-slate-200 font-semibold border border-slate-200',
      accent: 'bg-[#F39C12] text-white hover:bg-[#D68910] font-bold shadow-sm',
      outline: 'border border-[#E5E7EB] bg-white hover:bg-slate-100 text-[#111827] font-semibold',
      ghost: 'bg-transparent text-[#111827] hover:bg-slate-100',
      destructive: 'bg-[#DC2626] text-white hover:bg-red-700 font-bold shadow-sm',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
    };

    const glowStyles = glow ? 'glow-primary' : '';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
