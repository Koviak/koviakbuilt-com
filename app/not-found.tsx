import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-24 pt-40">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-8xl font-bold text-copper/20 sm:text-9xl">404</p>
        <h1 className="mt-4 font-playfair text-3xl font-bold text-cream sm:text-4xl">
          Page Not Found
        </h1>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        <p className="mt-6 text-lg text-cream/60">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-sm border border-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
