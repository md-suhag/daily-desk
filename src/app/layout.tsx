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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground relative overflow-x-hidden">
        {/* Rich Dynamic Ambient Background Layers */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Left Neon Indigo Blob */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-[120px] animate-float-slow" />
          
          {/* Top Right Cyan Glow Blob */}
          <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-accent/15 blur-[130px] animate-float-reverse" />
          
          {/* Bottom Left Vibrant Purple Blob */}
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-purple-600/10 blur-[110px] animate-float-slow" />
          
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
        </div>

        <Navbar />
        <main className="flex-1 container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-6xl relative z-10">
          {children}
        </main>
        <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground relative z-10 bg-background/60 backdrop-blur-xs">
          <p>© {new Date().getFullYear()} DailyDesk Platform. Designed for daily productivity & skill growth.</p>
        </footer>
      </body>
    </html>
  );
}
