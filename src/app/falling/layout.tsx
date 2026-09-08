import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/siteConfig';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'Arcade Falling Words - Interactive Typing Skill Game',
  description:
    'Improve your typing reaction time and muscle memory in an arcade falling words challenge with adaptive difficulty scaling on DailyDesk.',
  alternates: {
    canonical: '/falling',
  },
  openGraph: {
    title: 'Arcade Falling Words - Interactive Typing Game | DailyDesk',
    description:
      'Improve your typing reaction time and muscle memory in an arcade falling words challenge with adaptive difficulty scaling.',
    url: `${siteUrl}/falling`,
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
