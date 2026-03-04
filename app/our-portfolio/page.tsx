import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Our Portfolio',
  description:
    'Browse our portfolio of luxury custom homes built throughout the Texas Hill Country. Each home showcases our commitment to quality craftsmanship and timeless design.',
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/portfolio/hill-country-modern/cover.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Our Work Speaks for Itself
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Our Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Every home we build is a one-of-a-kind creation, tailored to the land and the
            lifestyle of its owners. Explore our collection of completed projects.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-lg text-cream/60">
                Portfolio coming soon. Check back for our latest projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-cream sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/60">
            Every great home begins with a conversation. Tell us about your vision and
            let&apos;s explore the possibilities together.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
