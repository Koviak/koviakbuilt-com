'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  autoplayDelay?: number;
  alt?: string;
}

export default function ImageCarousel({
  images,
  className = '',
  autoplayDelay = 4000,
  alt = 'Project image',
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <div className={`group relative ${className}`} aria-roledescription="carousel" aria-label="Image gallery">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-lg">
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div
              key={src}
              className="relative aspect-[16/10] min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-[#b87333] group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-0 sm:h-12 sm:w-12"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-[#b87333] group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-0 sm:h-12 sm:w-12"
        aria-label="Next image"
      >
        <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dot navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Slide navigation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-6 bg-[#b87333]'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
