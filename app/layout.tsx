import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import ErrorBoundary from '@/components/ui/error-boundary';
import { cn } from '@/lib/utils';
import { RootProvider } from '@/components/providers/root-provider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: {
    default: 'RK Institution - Transform Your Future',
    template: '%s | RK Institution'
  },
  description: 'Discover world-class education that combines innovation, technology, and excellence. Start your journey to success today with RK Institution.',
  keywords: ['education', 'online learning', 'courses', 'technology', 'career development', 'RK Institution', 'higher education', 'professional development'],
  authors: [{ name: 'RK Institution', url: 'https://your-domain.com' }],
  creator: 'RK Institution',
  publisher: 'RK Institution',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'RK Institution - Transform Your Future',
    description: 'Discover world-class education that combines innovation, technology, and excellence.',
    siteName: 'RK Institution',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'RK Institution - Transform Your Future'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RK Institution - Transform Your Future',
    description: 'Discover world-class education that combines innovation, technology, and excellence.',
    creator: '@rkinstitution', // Replace with your Twitter handle
    images: ['/twitter-image.jpg'], // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
    yandex: 'your-yandex-verification', // Add if needed
    bing: 'your-bing-verification', // Add if needed
  },
  alternates: {
    canonical: 'https://your-domain.com',
    languages: {
      'en-US': 'https://your-domain.com',
      // Add other language versions if available
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body className={cn(
        inter.className,
        "min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80"
      )}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <RootProvider>{children}</RootProvider>
          </Suspense>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}