import Image from 'next/image';
import React from 'react';
import { resolveImage } from '@/lib/api';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

/** Photo when available, otherwise brand-gradient initials. */
export default function Avatar({
  name,
  src,
  size = 56,
  className = '',
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-gradient-d font-extrabold text-white ring-4 ring-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {src ? (
        <Image
          src={resolveImage(src)!}
          alt={name}
          fill
          sizes={`${size}px`}
          className='object-cover'
        />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </div>
  );
}
