import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typing Speed Race - Real-Time WPM Test & Sentence Trainer',
  description:
    'Challenge your typing speed and accuracy with real-time WPM metrics, error tracking, and sentence speed racing on DailyDesk.',
  openGraph: {
    title: 'Typing Speed Race - Real-Time WPM Test | DailyDesk',
    description:
      'Challenge your typing speed and accuracy with real-time WPM metrics, error tracking, and sentence speed racing.',
    url: 'https://daily-desk-app.vercel.app/race',
    siteName: 'DailyDesk',
    images: [
      {
        url: '/typing-race.png',
        width: 1200,
        height: 630,
        alt: 'DailyDesk Typing Speed Race',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Speed Race - Real-Time WPM Test | DailyDesk',
    description:
      'Challenge your typing speed and accuracy with real-time WPM metrics, error tracking, and sentence speed racing.',
    images: ['/typing-race.png'],
  },
};

export default function RaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
