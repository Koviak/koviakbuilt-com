import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import ImageCarousel from '@/components/ImageCarousel';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import { getAllProjects } from '@/lib/portfolio';
import locationsData from '@/data/locations.json';
import { MapPinIcon, CheckBadgeIcon, EyeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const CAROUSEL_IMAGES = [
  '/images/home/carousel-1.jpg',
  '/images/home/carousel-2.jpg',
  '/images/home/carousel-3.jpg',
  '/images/home/carousel-4.jpg',
  '/images/home/carousel-5.jpg',
];

const FEATURES = [
  {
    icon: CheckBadgeIcon,
    title: 'Experience',
    description:
      'Over 15 years of luxury home building in the Texas Hill Country. We know the land, the climate, and the craftsmanship required to build homes that endure.',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Craftsmanship',
    description:
      'Every detail matters. From the foundation to the finish, we use premium materials and work with the finest tradespeople in the region.',
  },
  {
    icon: EyeIcon,
    title: 'Transparency',
    description:
      'Real-time project updates through BuilderTrend, detailed budgeting, and open communication at every stage. No surprises, only trust.',
  },
] as const;

export default function HomePage() {
  const projects = getAllProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <HeroVideo />

      {/* Why Koviak Built */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Koviak Built"
            subtitle="We don't just build houses. We craft homes that reflect your vision, honor the landscape, and stand the test of time."
          />
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group rounded-lg border border-white/5 bg-card p-8 transition-all duration-500 hover:border-copper/30 hover:shadow-lg hover:shadow-copper/5 stagger-${index + 1}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-copper/10">
                    <Icon className="h-7 w-7 text-copper" />
                  </div>
                  <h3 className="mt-6 font-playfair text-xl font-bold text-cream">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Craftsmanship"
            subtitle="A glimpse into the quality and attention to detail that defines every Koviak Built home."
          />
          <div className="mt-12">
            <ImageCarousel
              images={CAROUSEL_IMAGES}
              alt="Koviak Built luxury home"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#151515] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore some of our finest custom homes throughout the Texas Hill Country."
          />
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/our-portfolio"
              className="inline-flex items-center rounded-sm border border-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Locations We Serve */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Locations We Serve"
            subtitle="Building luxury custom homes across the Texas Hill Country's most desirable communities."
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locationsData.map((location) => (
              <Link
                key={location.slug}
                href={`/${location.slug}`}
                className="group rounded-lg border border-white/5 bg-card p-6 transition-all duration-500 hover:border-copper/30 hover:shadow-lg hover:shadow-copper/5"
              >
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-copper" />
                  <h3 className="font-playfair text-lg font-bold text-cream transition-colors group-hover:text-copper">
                    {location.city}
                  </h3>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-gold">
                  {location.state}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream/50">
                  {location.description}
                </p>
                <span className="mt-4 inline-block text-xs font-medium text-copper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-transparent to-gold/5" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Ready to Build Your Dream Home?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Let&apos;s start a conversation about your vision. From the first sketch to the final
            walkthrough, we&apos;re with you every step of the way.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm bg-copper px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
            >
              Start Your Project
            </Link>
            <a
              href="tel:+18302412660"
              className="inline-flex items-center rounded-sm border border-cream/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all duration-300 hover:border-copper hover:text-copper"
            >
              Call (830) 241-2660
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
