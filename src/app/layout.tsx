import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Heart, ExternalLink } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dailydesk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DailyDesk | Ultimate Daily Productivity & Typing Skills Platform",
    template: "%s | DailyDesk",
  },
  description:
    "DailyDesk is a next-gen productivity and skill trainer featuring sentence speed racing, arcade falling words, real-time WPM metrics, and adaptive difficulty scaling.",
  keywords: [
    "DailyDesk",
    "typing speed test",
    "typing race",
    "falling words game",
    "WPM calculator",
    "typing practice",
    "touch typing trainer",
    "Md Abdus Salam Suhag",
    "productivity tools",
    "developer tools",
  ],
  authors: [
    {
      name: "Md Abdus Salam Suhag",
      url: "https://www.facebook.com/mdas.suhag",
    },
  ],
  creator: "Md Abdus Salam Suhag",
  publisher: "DailyDesk Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "DailyDesk | Level Up Your Typing Speed & Accuracy",
    description:
      "Forge flawless muscle memory through sentence speed racing and arcade falling words with millisecond real-time telemetry.",
    siteName: "DailyDesk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DailyDesk | Level Up Your Typing Speed & Accuracy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyDesk | Level Up Your Typing Speed & Accuracy",
    description:
      "Forge flawless muscle memory through sentence speed racing and arcade falling words with millisecond real-time telemetry.",
    creator: "@mdas_suhag",
    images: ["/og-image.png"],
  },
  verification: {
    google: "MX2jC7pdHuwWBUis2IsD2GqhbR0cngjSXU79Accz890",
  },
};

export const viewport: Viewport = {
  themeColor: "#F39C12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-[#F39C12]/20 selection:text-[#F39C12] relative overflow-x-hidden">
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
        <main className="flex-1 container mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 max-w-7xl relative z-10">
          {children}
        </main>

        {/* Professional Footer with Developer Credits */}
        <footer className="border-t border-[#E5E7EB] py-8 text-center text-xs text-[#64748B] relative z-10 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl">
            {/* Copyright Info & Platform Tagline */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
              <span className="font-extrabold text-[#111827]">
                Daily<span className="text-[#F39C12]">Desk</span> Platform
              </span>
              <span className="hidden sm:inline-block text-slate-300">•</span>
              <span>Designed for daily productivity & skill growth.</span>
              <span className="hidden sm:inline-block text-slate-300">•</span>
              <span className="text-slate-400">
                © {new Date().getFullYear()}
              </span>
            </div>

            {/* Developer Portfolio / Profile Link with Love Icon */}
            <div className="flex items-center gap-2 bg-amber-50/80 px-4 py-1.5 rounded-full border border-[#F39C12]/30 shadow-xs">
              <span className="flex items-center gap-1.5">
                <span>Developed with</span>
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
                <span>by</span>
              </span>
              <a
                href="https://www.facebook.com/mdas.suhag"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#111827] hover:text-[#F39C12] transition-colors flex items-center gap-1 group"
                title="Md Abdus Salam Suhag - Software Developer"
              >
                <span>Md Abdus Salam Suhag</span>
                <span className="text-[10px] bg-[#F39C12] text-white px-1.5 py-0.2 rounded font-semibold ml-0.5">
                  Software Developer
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-[#F39C12] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
