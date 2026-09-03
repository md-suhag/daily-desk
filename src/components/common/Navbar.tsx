'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flag, Flame, Menu, X, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', shortLabel: 'Home', icon: Home, desc: 'Dashboard & statistics' },
    { href: '/race', label: 'Typing Race', shortLabel: 'Race', icon: Flag, desc: 'Sentence speed racing' },
    { href: '/falling', label: 'Falling Words', shortLabel: 'Falling', icon: Flame, desc: 'Arcade word survival' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md relative shadow-xs">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-8 max-w-7xl">
        {/* Professional Modern Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-lg sm:text-2xl tracking-tight text-[#111827] hover:opacity-90 transition-opacity shrink-0 group"
        >
          {/* Distinctive Executive Dual-Tone Emblem */}
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F39C12] via-[#E67E22] to-[#D68910] text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="absolute inset-0.5 rounded-[10px] border border-white/25 pointer-events-none" />
            <svg
              className="h-5 w-5 sm:h-5.5 sm:w-5.5 fill-none stroke-current stroke-[2.2] text-white"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Sleek desk / workstation layered geometric mark */}
              <rect x="3" y="4" width="18" height="12" rx="2.5" />
              <path d="M7 20h10" />
              <path d="M12 16v4" />
              <path d="M8 9h8" />
              <path d="M10 12h4" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-black tracking-tight text-lg sm:text-xl">
                <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 bg-clip-text text-transparent">Daily</span>
                <span className="bg-gradient-to-r from-[#F39C12] via-amber-500 to-[#D68910] bg-clip-text text-transparent">Desk</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F39C12] animate-pulse" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#64748B] hidden xs:inline-block">
              Skill & Productivity
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (Visible on sm and up) */}
        <nav className="hidden sm:flex items-center gap-1.5 md:gap-2">
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
                    : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Quick Bar & Hamburger Toggle Button (Visible on mobile) */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick Icon Pits for fast mobile navigation without opening menu */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
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
                      : 'text-[#64748B] hover:text-[#111827]'
                  )}
                  title={item.label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>

          {/* Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-slate-100 text-[#111827] border border-slate-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F39C12]/40 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#F39C12]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Positioned directly under navbar) */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 border-b border-[#E5E7EB] bg-white/98 shadow-xl p-3 flex flex-col gap-2 z-50 animate-pop-in">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] px-2 pt-1">
            Navigation Menu
          </span>
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
                    ? 'bg-amber-50 border-[#F39C12]/40 text-[#D68910] font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-[#111827] hover:border-[#F39C12]/30'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg',
                      isActive
                        ? 'bg-[#F39C12] text-white shadow-xs'
                        : 'bg-slate-100 text-[#64748B]'
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{item.label}</span>
                    <span className="text-xs text-[#64748B]">{item.desc}</span>
                  </div>
                </div>
                <ChevronRight className={cn('h-4.5 w-4.5', isActive ? 'text-[#F39C12]' : 'text-slate-300')} />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
