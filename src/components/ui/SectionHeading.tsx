import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={`${
        centered ? 'mx-auto text-center' : ''
      } max-w-2xl ${className}`}
    >
      <p className={dark ? 'eyebrow text-pink-300' : 'eyebrow'}>
        <span
          className={`h-px w-6 ${dark ? 'bg-pink-300/60' : 'bg-primary/50'}`}
        />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-[1.1] md:text-[2.75rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            dark ? 'text-white/65' : 'text-ink/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
