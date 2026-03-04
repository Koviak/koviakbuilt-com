import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Koviak Built | Luxury Custom Homes in Texas Hill Country',
    template: '%s | Koviak Built',
  },
  description:
    'Koviak Built is a luxury custom home builder in the Texas Hill Country, serving Kerrville, Boerne, Comfort, and Bandera. Exceptional craftsmanship, transparency, and attention to detail in every home we build.',
  keywords: [
    'custom home builder',
    'luxury homes',
    'Texas Hill Country',
    'Kerrville',
    'Boerne',
    'Comfort',
    'Bandera',
    'custom homes Texas',
    'Koviak Built',
  ],
  metadataBase: new URL('https://koviakbuilt.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://koviakbuilt.com',
    siteName: 'Koviak Built',
    title: 'Koviak Built | Luxury Custom Homes in Texas Hill Country',
    description:
      'Crafting exceptional custom homes in the Texas Hill Country with integrity, transparency, and unmatched attention to detail.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen bg-background font-lato text-foreground antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
