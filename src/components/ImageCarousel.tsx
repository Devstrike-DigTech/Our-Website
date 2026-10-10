'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { resolveImage } from '@/lib/api';

const AUTOPLAY_MS = 6000;

/** Crossfading gallery with arrows, dots, keyboard support, and gentle autoplay. */
const ImageCarousel: React.FC<{ images: string[]; alt: string }> = ({
  images,
  alt,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, paused, go]);

  if (count === 0) return null;

  const arrow =
    'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lift backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white';

  return (
    <div
      className='group relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-surface shadow-lift'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
      tabIndex={count > 1 ? 0 : undefined}
      role='region'
      aria-roledescription='carousel'
      aria-label={`${alt} gallery`}
    >
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={resolveImage(src)!}
          alt={`${alt} — image ${i + 1} of ${count}`}
          fill
          sizes='(max-width: 1024px) 100vw, 800px'
          priority={i === 0}
          className={`object-cover transition-all duration-1000 ease-out ${
            i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
      ))}

      {count > 1 && (
        <>
          <button
            type='button'
            aria-label='Previous image'
            onClick={() => go(-1)}
            className={`${arrow} left-4 md:opacity-0 md:group-hover:opacity-100`}
          >
            <LuChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label='Next image'
            onClick={() => go(1)}
            className={`${arrow} right-4 md:opacity-0 md:group-hover:opacity-100`}
          >
            <LuChevronRight className='h-5 w-5' />
          </button>
          <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md'>
            {images.map((_, i) => (
              <button
                key={i}
                type='button'
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
