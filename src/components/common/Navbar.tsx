'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flag, Flame, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/', label: 'Home', shortLabel: 'Home', icon: Home, desc: 'Dashboard & statistics' },
    { href: '/race', label: 'Typing Race', shortLabel: 'Race', icon: Flag, desc: 'Sentence speed racing' },
    { href: '/falling', label: 'Falling Words', shortLabel: 'Falling', icon: Flame, desc: 'Arcade word survival' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-xs transition-colors duration-200">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 xs:px-4 sm:px-8 max-w-7xl relative">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-base xs:text-lg sm:text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity shrink-0 group"
        >
          <div className="relative flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F39C12] via-[#E67E22] to-[#D68910] text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="absolute inset-0.5 rounded-[10px] border border-white/25 pointer-events-none" />
            <svg
              className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 fill-none stroke-current stroke-[2.2] text-white"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="12" rx="2.5" />
              <path d="M7 20h10" />
              <path d="M12 16v4" />
              <path d="M8 9h8" />
              <path d="M10 12h4" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-black tracking-tight text-base xs:text-lg sm:text-xl">
                <span className="text-foreground">Daily</span>
                <span className="bg-gradient-to-r from-[#F39C12] via-amber-500 to-[#D68910] bg-clip-text text-transparent">Desk</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F39C12] animate-pulse" />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          <nav className="flex items-center gap-1.5 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200',
                    isActive
                      ? 'bg-[#F39C12] text-white shadow-sm scale-[1.02]'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9.5 items-center gap-2 rounded-xl border border-border bg-secondary px-3.5 py-1.5 text-xs font-extrabold text-foreground hover:border-[#F39C12]/50 transition-all active:scale-95 shadow-xs cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-[#F39C12]" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-muted-foreground" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Action Bar (Optimized for 320px+ ultra-small screens) */}
        <div className="flex sm:hidden items-center gap-1.5 xs:gap-2">
          {/* Quick Icon Links (Visible on 360px+ screens) */}
          <div className="hidden xs:flex items-center gap-0.5 bg-secondary p-1 rounded-xl border border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#F39C12] text-white shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  title={item.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8.5 w-8.5 xs:h-9 xs:w-9 items-center justify-center rounded-xl bg-secondary text-foreground border border-border hover:border-[#F39C12]/50 focus:outline-none transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label="Toggle Theme Mode"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#F39C12]" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="flex h-8.5 w-8.5 xs:h-9 xs:w-9 items-center justify-center rounded-xl bg-secondary text-foreground border border-border hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-[#F39C12]/40 transition-colors cursor-pointer shrink-0 z-50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5 text-[#F39C12]" /> : <Menu className="h-4.5 w-4.5 text-foreground" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Container */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 border-b border-border bg-card shadow-2xl p-3.5 sm:p-4 flex flex-col gap-2.5 z-[100] animate-pop-in">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Navigation Menu
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-[#F39C12]/30 text-xs font-bold text-[#F39C12]"
              >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl p-3 transition-all duration-200 border',
                    isActive
                      ? 'bg-amber-500/10 border-[#F39C12]/40 text-[#F39C12] font-bold shadow-xs'
                      : 'bg-card border-border text-foreground hover:border-[#F39C12]/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg',
                        isActive
                          ? 'bg-[#F39C12] text-white shadow-xs'
                          : 'bg-secondary text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className={cn('h-4.5 w-4.5', isActive ? 'text-[#F39C12]' : 'text-muted-foreground/40')} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
