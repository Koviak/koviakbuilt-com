import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioProject } from '@/lib/portfolio';

interface ProjectCardProps {
  project: PortfolioProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/our-portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-transparent bg-[#2a2a2a] transition-all duration-500 hover:border-[#b87333]/50 hover:shadow-xl hover:shadow-[#b87333]/5"
      aria-label={`View ${project.title} project in ${project.location}`}
    >
      {/* Image with hover zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-playfair text-xl font-semibold text-[#f5f0e8] sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#c9a227]">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {project.location}
          </p>
        </div>

        {/* Copper accent line on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#b87333] transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Specs bar */}
      <div className="flex items-center justify-between border-t border-white/5 px-5 py-3">
        <div className="flex gap-4 text-xs text-[#f5f0e8]/50">
          <span>{project.sqft} sq ft</span>
          <span>{project.bedrooms} bed</span>
          <span>{project.bathrooms} bath</span>
        </div>
        <span className="text-xs font-medium text-[#b87333] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Project &rarr;
        </span>
      </div>
    </Link>
  );
}
