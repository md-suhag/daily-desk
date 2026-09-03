'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Flag, Flame, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Hub', shortLabel: 'Hub', icon: LayoutGrid, desc: 'Dashboard & statistics' },
    { href: '/race', label: 'Typing Race', shortLabel: 'Race', icon: Flag, desc: 'Sentence speed racing' },
    { href: '/falling', label: 'Falling Words', shortLabel: 'Falling', icon: Flame, desc: 'Arcade word survival' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md relative shadow-xs">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-base sm:text-xl tracking-tight text-[#111827] hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#F39C12] text-white shadow-sm">
            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
          </div>
          <span className="text-[#111827] font-black">
            Daily<span className="text-[#F39C12]">Desk</span>
          </span>
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
                  'flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[#F39C12] text-white shadow-sm'
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
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Quick Icon Pits for fast mobile navigation without opening menu */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
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
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#111827] border border-slate-200 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F39C12]/40 transition-colors"
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
