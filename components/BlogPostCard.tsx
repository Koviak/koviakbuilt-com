import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg bg-[#2a2a2a] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b87333]/5"
      aria-label={`Read ${post.title}`}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] via-transparent to-transparent opacity-40" />
        </div>
      )}

      <div className="p-6">
        {/* Date */}
        {formattedDate && (
          <time
            dateTime={post.date}
            className="text-xs font-medium uppercase tracking-wider text-[#b87333]"
          >
            {formattedDate}
          </time>
        )}

        {/* Title */}
        <h3 className="mt-2 font-playfair text-xl font-bold leading-snug text-[#f5f0e8] transition-colors duration-300 group-hover:text-[#b87333]">
          {post.title}
        </h3>

        {/* Excerpt - 2-3 lines with line-clamp */}
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#f5f0e8]/60">
            {post.excerpt}
          </p>
        )}

        {/* Footer: author and Read More */}
        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-xs text-[#f5f0e8]/40">
            By {post.author}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#b87333] transition-all duration-300 group-hover:gap-2">
            Read More
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
