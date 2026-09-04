import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { PwaRegister } from "@/components/common/PwaRegister";
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
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-desk-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DailyDesk",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
      url: "https://mdsuhag.vercel.app",
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
      <head>
        {/* Google Tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D7PY06EQMZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D7PY06EQMZ');
            `,
          }}
        />

        {/* JSON-LD Author & Platform Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md Abdus Salam Suhag",
              url: "https://mdsuhag.vercel.app",
              sameAs: [
                "https://www.linkedin.com/in/suhag102",
                "https://mdsuhag.vercel.app",
                "https://www.facebook.com/mdas.suhag",
              ],
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "DailyDesk",
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-[#F39C12]/20 selection:text-[#F39C12] relative overflow-x-hidden">
        <ThemeProvider>
          <PwaRegister />
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
          <footer className="border-t border-border py-6 sm:py-8 text-center text-xs text-muted-foreground relative z-10 bg-card/80 backdrop-blur-md transition-colors duration-200">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl">
              {/* Copyright Info & Platform Tagline */}
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center md:text-left">
                <span className="font-extrabold text-foreground text-sm sm:text-base">
                  Daily<span className="text-[#F39C12]">Desk</span> Platform
                </span>
                <span className="hidden sm:inline-block text-muted-foreground/40">
                  •
                </span>
                <span>Designed for daily productivity & skill growth.</span>
                <span className="hidden sm:inline-block text-muted-foreground/40">
                  •
                </span>
                <span className="text-muted-foreground/60">
                  © {new Date().getFullYear()}
                </span>
              </div>

              {/* Developer Portfolio / Profile Link with Love Icon */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-amber-500/10 px-4 py-2.5 rounded-2xl border border-[#F39C12]/30 shadow-xs text-xs text-center">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <span>Developed with</span>
                  <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
                  <span>by</span>
                </span>
                <a
                  href="https://www.facebook.com/mdas.suhag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-foreground hover:text-[#F39C12] transition-colors flex flex-wrap items-center justify-center gap-1.5 group"
                  title="Md Abdus Salam Suhag - Software Developer"
                >
                  <span className="whitespace-nowrap underline decoration-[#F39C12]/60 underline-offset-2">
                    Md Abdus Salam Suhag
                  </span>
                  <span className="text-[10px] bg-[#F39C12] text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                    Software Engineer
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#F39C12] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
