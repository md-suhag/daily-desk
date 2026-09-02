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
  title: 'KeyForge | Advanced Typing Skill Platform',
  description: 'Master touch typing with interactive Typing Race and adaptive Falling Words games.',
  keywords: ['typing game', 'wpm test', 'typing speed', 'keyboard skills', 'nextjs'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
        <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KeyForge Typing Platform. All typing logic computed locally.</p>
        </footer>
      </body>
    </html>
  );
}
