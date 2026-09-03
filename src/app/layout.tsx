import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'DailyDesk | Ultimate Daily Productivity & Skills Platform',
  description: 'DailyDesk is an all-in-one productivity suite for daily skills, career building, typing mastery, and performance utilities.',
  keywords: ['DailyDesk', 'productivity tools', 'typing speed', 'career tools', 'developer tools', 'nextjs'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
        {/* Soft Warm Ambient Background Layers */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Left Warm Amber Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[140px] animate-float-slow" />
          
          {/* Top Right Light Orange Glow */}
          <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-orange-400/10 blur-[150px] animate-float-reverse" />
          
          {/* Subtle Clean Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
        </div>

        <Navbar />
        <main className="flex-1 container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-6xl relative z-10">
          {children}
        </main>
        <footer className="border-t border-border/80 py-6 text-center text-xs text-muted-foreground relative z-10 bg-white/70 backdrop-blur-xs">
          <p>© {new Date().getFullYear()} DailyDesk Platform. Designed for daily productivity & skill growth.</p>
        </footer>
      </body>
    </html>
  );
}
