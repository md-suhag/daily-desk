import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-[#111827] border-slate-200',
    primary: 'bg-[#FEF3C7] text-[#D68910] border-[#F39C12]/40 font-bold',
    success: 'bg-[#FEF3C7] text-[#D68910] border-[#F39C12]/50 font-bold',
    warning: 'bg-amber-50 text-[#D68910] border-[#F39C12]/40 font-bold',
    destructive: 'bg-red-50 text-[#DC2626] border-red-200 font-bold',
    outline: 'bg-white text-[#111827] border-[#E5E7EB]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
