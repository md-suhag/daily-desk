'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-pop-in">
      <div
        className={cn(
          'w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative flex flex-col gap-4',
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {title && <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
