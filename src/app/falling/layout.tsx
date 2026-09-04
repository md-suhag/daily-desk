import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arcade Falling Words - Interactive Typing Skill Game',
  description:
    'Improve your typing reaction time and muscle memory in an arcade falling words challenge with adaptive difficulty scaling on DailyDesk.',
  openGraph: {
    title: 'Arcade Falling Words - Interactive Typing Game | DailyDesk',
    description:
      'Improve your typing reaction time and muscle memory in an arcade falling words challenge with adaptive difficulty scaling.',
    url: 'https://daily-desk-app.vercel.app/falling',
    siteName: 'DailyDesk',
    images: [
      {
        url: '/falling-words.png',
        width: 1200,
        height: 630,
        alt: 'DailyDesk Arcade Falling Words Game',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcade Falling Words - Interactive Typing Game | DailyDesk',
    description:
      'Improve your typing reaction time and muscle memory in an arcade falling words challenge with adaptive difficulty scaling.',
    images: ['/falling-words.png'],
  },
};

export default function FallingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
