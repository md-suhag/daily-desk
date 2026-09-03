import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive' | 'default';
  trend?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  color = 'default',
  trend,
  className,
}: StatCardProps) {
  const colorStyles = {
    default: 'text-foreground border-border bg-card',
    primary: 'text-[#F39C12] border-[#F39C12]/40 bg-amber-500/10',
    accent: 'text-[#F39C12] border-[#F39C12]/40 bg-amber-500/10',
    success: 'text-[#F39C12] border-[#F39C12]/40 bg-amber-500/10',
    warning: 'text-[#F39C12] border-[#F39C12]/40 bg-amber-500/10',
    destructive: 'text-red-500 border-red-500/40 bg-red-500/10',
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-xl border p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-primary/50 min-w-0 backdrop-blur-xs',
        colorStyles[color],
        className
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">
          {label}
        </span>
        {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-80 shrink-0" />}
      </div>
      <div className="flex items-baseline gap-1 mt-1 min-w-0">
        <span className="text-lg sm:text-2xl font-black tracking-tight font-mono truncate">{value}</span>
        {unit && <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground shrink-0">{unit}</span>}
      </div>
      {trend && <span className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5 truncate">{trend}</span>}
    </div>
  );
}
