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
    default: 'text-foreground border-border',
    primary: 'text-primary border-primary/30 bg-primary/5',
    accent: 'text-accent border-accent/30 bg-accent/5',
    success: 'text-success border-success/30 bg-success/5',
    warning: 'text-warning border-warning/30 bg-warning/5',
    destructive: 'text-destructive border-destructive/30 bg-destructive/5',
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/40',
        colorStyles[color],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {Icon && <Icon className="h-4 w-4 opacity-70" />}
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-black tracking-tight font-mono">{value}</span>
        {unit && <span className="text-xs font-medium text-muted-foreground">{unit}</span>}
      </div>
      {trend && <span className="text-xs font-medium text-muted-foreground mt-0.5">{trend}</span>}
    </div>
  );
}
