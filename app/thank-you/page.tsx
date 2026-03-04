import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Koviak Built. We will be in touch within 24 hours.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-24 pt-40">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-copper/10">
          <CheckCircleIcon className="h-10 w-10 text-copper" />
        </div>
        <h1 className="mt-8 font-playfair text-3xl font-bold text-cream sm:text-4xl">
          Thank You
        </h1>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        <p className="mt-6 text-lg text-cream/70">
          Your message has been received. We appreciate your interest in Koviak Built
          and will be in touch within <strong className="text-cream">24 hours</strong>.
        </p>
        <p className="mt-4 text-cream/50">
          In the meantime, feel free to explore our portfolio or give us a call at{' '}
          <a
            href="tel:+18302412660"
            className="text-copper transition-colors hover:text-copper-light"
          >
            (830) 241-2660
          </a>
          .
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
          >
            Return Home
          </Link>
          <Link
            href="/our-portfolio"
            className="inline-flex items-center rounded-sm border border-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
