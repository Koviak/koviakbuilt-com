import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProjectGallery from '@/components/ProjectGallery';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/portfolio';
import {
  ArrowLeftIcon,
  HomeModernIcon,
  MapPinIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.title} | Our Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Koviak Built`,
      description: project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allImages = [project.coverImage, ...project.images];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-16 pt-40">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/our-portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm text-copper transition-colors hover:text-copper-light"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-gold">
            <MapPinIcon className="h-5 w-5" />
            <span className="text-lg">{project.location}</span>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-card p-6 sm:grid-cols-4 sm:p-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <HomeModernIcon className="h-5 w-5 text-copper" />
                <span className="text-xs font-medium uppercase tracking-wider text-cream/50">
                  Square Feet
                </span>
              </div>
              <p className="mt-2 font-playfair text-2xl font-bold text-cream">
                {project.sqft}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 text-copper"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider text-cream/50">
                  Bedrooms
                </span>
              </div>
              <p className="mt-2 font-playfair text-2xl font-bold text-cream">
                {project.bedrooms}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 text-copper"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider text-cream/50">
                  Bathrooms
                </span>
              </div>
              <p className="mt-2 font-playfair text-2xl font-bold text-cream">
                {project.bathrooms}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <CalendarIcon className="h-5 w-5 text-copper" />
                <span className="text-xs font-medium uppercase tracking-wider text-cream/50">
                  Year Built
                </span>
              </div>
              <p className="mt-2 font-playfair text-2xl font-bold text-cream">
                {project.year}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 max-w-3xl">
            <h2 className="font-playfair text-2xl font-bold text-cream sm:text-3xl">
              About This Project
            </h2>
            <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              {project.description}
            </p>
          </div>

          {/* Gallery */}
          <div className="mt-16">
            <h2 className="font-playfair text-2xl font-bold text-cream sm:text-3xl">
              Project Gallery
            </h2>
            <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
            <div className="mt-8">
              <ProjectGallery images={allImages} alt={project.title} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-cream sm:text-4xl">
            Inspired by This Project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/60">
            Let&apos;s discuss how we can bring your vision to life with the same level of
            craftsmanship and attention to detail.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
