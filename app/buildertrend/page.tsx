import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChartBarIcon,
  DocumentTextIcon,
  CameraIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'BuilderTrend Client Portal',
  description:
    'Access your Koviak Built project through BuilderTrend. Track progress, view schedules, communicate with your team, and manage your custom home build in real time.',
};

const FEATURES = [
  {
    icon: ChartBarIcon,
    title: 'Real-Time Progress',
    description: 'Track every phase of your build with live updates and milestone notifications.',
  },
  {
    icon: CalendarIcon,
    title: 'Project Schedule',
    description: 'View your complete construction timeline with key dates and deliverables.',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Budget Tracking',
    description: 'Full transparency into project costs, change orders, and payment schedules.',
  },
  {
    icon: CameraIcon,
    title: 'Daily Photos',
    description: 'See daily progress photos from your job site, organized by date and category.',
  },
  {
    icon: DocumentTextIcon,
    title: 'Documents & Plans',
    description: 'Access all project documents, blueprints, specifications, and selections in one place.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Direct Communication',
    description: 'Message your project manager, ask questions, and approve selections directly.',
  },
] as const;

export default function BuilderTrendPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Client Portal
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            BuilderTrend
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Your custom home build, at your fingertips. We use BuilderTrend to give
            you complete transparency throughout every phase of construction.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-white/5 bg-card p-8 transition-all duration-500 hover:border-copper/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-copper/10">
                    <Icon className="h-6 w-6 text-copper" />
                  </div>
                  <h3 className="mt-4 font-playfair text-lg font-bold text-cream">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access Portal CTA */}
      <section className="bg-[#151515] py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-cream sm:text-4xl">
            Access Your Project
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/60">
            If you are a current Koviak Built client, click below to log in to your
            BuilderTrend project portal. If you need assistance accessing your account,
            please contact us.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://buildertrend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
            >
              Log In to BuilderTrend
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm border border-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
            >
              Need Help? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
