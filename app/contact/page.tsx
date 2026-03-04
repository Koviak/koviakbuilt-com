import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import siteData from '@/data/site.json';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Koviak Built to discuss your luxury custom home project in the Texas Hill Country. Call us at (830) 241-2660 or fill out our contact form.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Let&apos;s Build Something Extraordinary
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Ready to start your custom home journey? Reach out and let&apos;s talk about
            bringing your vision to life.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-playfair text-2xl font-bold text-cream">
                Send Us a Message
              </h2>
              <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl font-bold text-cream">
                Get in Touch
              </h2>
              <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />

              <div className="mt-8 space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 rounded-lg border border-white/5 bg-card p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-copper/10">
                    <PhoneIcon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">
                      Phone
                    </h3>
                    <a
                      href="tel:+18302412660"
                      className="mt-1 block text-cream/70 transition-colors hover:text-copper"
                    >
                      {siteData.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 rounded-lg border border-white/5 bg-card p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-copper/10">
                    <EnvelopeIcon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">
                      Email
                    </h3>
                    <a
                      href={`mailto:${siteData.email}`}
                      className="mt-1 block text-cream/70 transition-colors hover:text-copper"
                    >
                      {siteData.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 rounded-lg border border-white/5 bg-card p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-copper/10">
                    <MapPinIcon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">
                      Location
                    </h3>
                    <p className="mt-1 text-cream/70">
                      {siteData.address.city}, {siteData.address.state}
                    </p>
                    <p className="text-sm text-cream/50">
                      Serving the Texas Hill Country
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 rounded-lg border border-white/5 bg-card p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-copper/10">
                    <ClockIcon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">
                      Hours
                    </h3>
                    <p className="mt-1 text-cream/70">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-sm text-cream/50">Weekends by appointment</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 overflow-hidden rounded-lg border border-white/5">
                <div className="flex aspect-[4/3] items-center justify-center bg-card">
                  <div className="text-center">
                    <MapPinIcon className="mx-auto h-8 w-8 text-copper/50" />
                    <p className="mt-2 text-sm text-cream/40">
                      {siteData.address.city}, {siteData.address.state}
                    </p>
                    <p className="text-xs text-cream/30">Map coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
