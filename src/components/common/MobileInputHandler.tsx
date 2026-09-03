'use client';

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Keyboard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GameStatus } from '@/types/game';

export interface MobileInputHandlerProps {
  onTypeChar: (char: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  status: GameStatus;
  disabled?: boolean;
  className?: string;
  autoFocusOnPlay?: boolean;
}

export interface MobileInputHandlerRef {
  focus: () => void;
  blur: () => void;
}

const DUMMY_CHAR = '\u200B'; // Zero-width space for mobile soft keyboard backspace detection

export const MobileInputHandler = forwardRef<MobileInputHandlerRef, MobileInputHandlerProps>(
  (
    {
      onTypeChar,
      onBackspace,
      onEnter,
      onEscape,
      status,
      disabled = false,
      className,
      autoFocusOnPlay = true,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Detect if device supports touch
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
    }));

    // Maintain focus during active gameplay
    useEffect(() => {
      if (autoFocusOnPlay && (status === 'PLAYING' || status === 'COUNTDOWN')) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      }
    }, [status, autoFocusOnPlay]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === '') {
        // Zero-width space was deleted via Backspace on soft keyboard
        onBackspace();
      } else {
        // Strip zero-width space to get new typed characters
        const cleaned = value.replaceAll(DUMMY_CHAR, '');
        for (const char of cleaned) {
          onTypeChar(char);
        }
      }

      // Reset value back to dummy char to prepare for next keypress / backspace
      if (inputRef.current) {
        inputRef.current.value = DUMMY_CHAR;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Backspace') {
        onBackspace();
      } else if (e.key === 'Enter') {
        onEnter?.();
      } else if (e.key === 'Escape') {
        onEscape?.();
      }
    };

    const triggerMobileFocus = (e?: React.MouseEvent | React.TouchEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <div className={cn('relative w-full', className)}>
        {/* Hidden input field for capturing mobile virtual keyboard & IME */}
        <input
          ref={inputRef}
          type="text"
          defaultValue={DUMMY_CHAR}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
          aria-label="Mobile Typing Input"
          tabIndex={0}
          style={{
            position: 'absolute',
            opacity: 0.01,
            pointerEvents: 'none',
            left: 0,
            top: 0,
            width: '1px',
            height: '1px',
            zIndex: -1,
          }}
        />

        {/* Mobile Keyboard Trigger / Status Banner */}
        <div
          onClick={triggerMobileFocus}
          onTouchStart={triggerMobileFocus}
          className={cn(
            'flex items-center justify-between gap-3 rounded-2xl px-4 py-3 border transition-all duration-200 cursor-pointer select-none',
            isFocused
              ? 'bg-amber-500/10 border-[#F39C12] text-amber-600 dark:text-amber-400 shadow-sm'
              : 'bg-card border-border text-muted-foreground hover:border-[#F39C12]/50',
            !isTouchDevice && 'sm:hidden' // Show prominently on touch screens, hide on desktop unless focused
          )}
        >
          <div className="flex items-center gap-2.5 font-medium text-xs sm:text-sm">
            <Keyboard className={cn('h-4 w-4 sm:h-5 sm:w-5', isFocused ? 'text-[#F39C12] animate-bounce' : '')} />
            <span>
              {isFocused
                ? 'Mobile Keyboard Active - Ready to Type'
                : 'Tap to Open Mobile Keyboard'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold">
            {isFocused ? (
              <span className="flex items-center gap-1 text-[#F39C12] bg-[#F39C12]/15 px-2.5 py-1 rounded-full border border-[#F39C12]/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Active
              </span>
            ) : (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20">
                Tap Here
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MobileInputHandler.displayName = 'MobileInputHandler';
