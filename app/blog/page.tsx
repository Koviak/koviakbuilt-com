import type { Metadata } from 'next';
import BlogPostCard from '@/components/BlogPostCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, tips, and stories from the Koviak Built team. Learn about luxury home building in the Texas Hill Country, design trends, construction best practices, and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Insights &amp; Inspiration
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            Expert insights on luxury home building, design trends, and life in the
            Texas Hill Country.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h2 className="font-playfair text-2xl font-bold text-cream">
                Coming Soon
              </h2>
              <p className="mt-4 text-cream/60">
                We&apos;re working on some great content for you. Check back soon for articles
                about luxury home building in the Texas Hill Country.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
