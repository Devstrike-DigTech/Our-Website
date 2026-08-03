'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { resolveImage } from '@/lib/api';

const ImageCarousel: React.FC<{ images: string[]; alt: string }> = ({
  images,
  alt,
}) => {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 md:h-96 lg:h-[28rem]">
      <Image
        src={resolveImage(images[index])!}
        alt={`${alt} — image ${index + 1}`}
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        className="object-cover"
        priority
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90"
          >
            <IoChevronBack />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90"
          >
            <IoChevronForward />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-5 bg-white' : 'w-2 bg-white/60'
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
