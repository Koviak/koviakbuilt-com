import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the Koviak Built blog.`,
    openGraph: {
      title: `${post.title} | Koviak Built Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-40 lg:pt-48">
        {post.coverImage && (
          <>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/50" />
          </>
        )}
        <div
          className={`relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${
            !post.coverImage ? 'bg-gradient-to-b from-[#111111] to-background' : ''
          }`}
        >
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-copper transition-colors hover:text-copper-light"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="font-playfair text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-cream/50">
            {formattedDate && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-copper" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-copper" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg prose-invert max-w-none
              prose-headings:font-playfair prose-headings:text-cream
              prose-p:text-cream/70 prose-p:leading-relaxed
              prose-a:text-copper prose-a:no-underline hover:prose-a:text-copper-light
              prose-strong:text-cream
              prose-blockquote:border-l-copper prose-blockquote:text-cream/60
              prose-code:text-copper-light
              prose-li:text-cream/70
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Back to blog */}
      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-copper px-6 py-3 text-sm font-semibold uppercase tracking-wider text-copper transition-all duration-300 hover:bg-copper hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to All Posts
          </Link>
        </div>
      </section>
    </>
  );
}
