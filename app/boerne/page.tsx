import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckIcon, MapPinIcon } from '@heroicons/react/24/outline';
import locationsData from '@/data/locations.json';

const location = locationsData.find((l) => l.slug === 'boerne')!;

export const metadata: Metadata = {
  title: `Custom Homes in ${location.city}, ${location.state}`,
  description: `Luxury custom home builder in ${location.city}, Texas. ${location.description.slice(0, 150)}...`,
  openGraph: {
    title: `Custom Homes in ${location.city} | Koviak Built`,
    description: location.description,
  },
};

export default function BoernePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-copper">
            <MapPinIcon className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">
              {location.state}
            </p>
          </div>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            {location.city}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Luxury Custom Homes in {location.city}, Texas
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-cream/70">
            {location.description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#151515] py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl font-bold text-cream sm:text-3xl">
            Why Build in {location.city}?
          </h2>
          <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
          <ul className="mt-8 space-y-4">
            {location.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-copper/20">
                  <CheckIcon className="h-3 w-3 text-copper" />
                </span>
                <span className="text-cream/70">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-cream sm:text-4xl">
            Build Your Dream Home in {location.city}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/60">
            Ready to explore building in {location.city}? Contact us to discuss your
            vision and learn about available homesites in the area.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
            >
              Contact Us
            </Link>
            <Link
              href="/our-portfolio"
              className="inline-flex items-center rounded-sm border border-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
