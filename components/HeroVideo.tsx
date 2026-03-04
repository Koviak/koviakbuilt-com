'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  heading?: string;
  subheading?: string;
}

export default function HeroVideo({
  videoSrc = '/videos/hero.mp4',
  posterSrc = '/images/home/hero-poster.jpg',
  heading = 'Luxury Custom Homes in the Texas Hill Country',
  subheading = 'Craftsmanship. Integrity. Excellence.',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplaythrough', handleCanPlay);

    // Attempt to play (browsers may block autoplay)
    video.play().catch(() => {
      // Autoplay blocked, poster will show
    });

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        preload="auto"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Poster fallback (shown until video loads) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${posterSrc})` }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Gold accent line */}
        <div className="mx-auto mb-6 h-px w-24 bg-[#c9a227]" aria-hidden="true" />

        <h1 className="font-playfair text-4xl font-bold leading-tight tracking-wide text-[#f5f0e8] sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        {subheading && (
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light uppercase tracking-[0.25em] text-[#c9a227] sm:text-xl">
            {subheading}
          </p>
        )}

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/our-portfolio"
            className="inline-flex min-w-[220px] items-center justify-center rounded-sm bg-[#b87333] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#d4956a] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b87333] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            View Our Portfolio
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-w-[220px] items-center justify-center rounded-sm border-2 border-[#f5f0e8]/60 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#f5f0e8] transition-all duration-300 hover:border-[#b87333] hover:text-[#b87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f0e8] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg
          className="h-8 w-8 text-[#f5f0e8]/50"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
