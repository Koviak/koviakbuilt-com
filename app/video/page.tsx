import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Watch Koviak Built in action. See our luxury custom home building process in the Texas Hill Country, from breaking ground to the final walkthrough.',
};

export default function VideoPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            See Our Work in Motion
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Video
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Experience the craftsmanship and beauty of a Koviak Built home
            through our featured video.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-card">
            <div className="relative aspect-video">
              <video
                controls
                playsInline
                poster="/images/home/hero-poster.jpg"
                className="h-full w-full object-cover"
                preload="metadata"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
                <p className="p-8 text-cream/60">
                  Your browser does not support the video tag.
                </p>
              </video>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="font-playfair text-2xl font-bold text-cream">
              Craftsmanship in Every Detail
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cream/60">
              From the foundation to the finish, every Koviak Built home is a testament
              to quality craftsmanship and thoughtful design. Watch how we bring our
              clients&apos; visions to life in the Texas Hill Country.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
