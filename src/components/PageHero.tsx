import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { resolveImage } from '@/lib/api';
import Aurora from './ui/Aurora';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  crumbs?: Crumb[];
  /** Optional photo shown dimmed behind the gradient (detail pages). */
  image?: string;
  /** Extra content under the subtitle — badges, buttons, stats. */
  children?: React.ReactNode;
}

/**
 * Dark banner at the top of every inner page. Its top padding clears the
 * fixed navbar.
 */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  crumbs,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className='relative overflow-hidden bg-ink-950 text-white'>
      {image && (
        <>
          <Image
            src={resolveImage(image)!}
            alt=''
            fill
            priority
            sizes='100vw'
            className='scale-105 object-cover opacity-30 blur-[2px]'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950' />
        </>
      )}
      <Aurora />

      <div className='container relative pb-16 pt-36 md:pb-20 md:pt-44'>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label='Breadcrumb' className='mb-8 animate-fade-up'>
            <ol className='flex flex-wrap items-center gap-1.5 text-sm'>
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <li
                    key={`${crumb.label}-${i}`}
                    className='flex items-center gap-1.5'
                  >
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className='font-medium text-white/50 transition-colors hover:text-white'
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className='line-clamp-1 font-semibold text-white/90'>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <LuChevronRight className='h-3.5 w-3.5 text-white/30' />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <div className='animate-fade-up' style={{ animationDelay: '60ms' }}>
            {eyebrow}
          </div>
        )}

        <h1
          className='mt-5 max-w-4xl animate-fade-up text-4xl font-extrabold leading-[1.05] md:text-6xl'
          style={{ animationDelay: '120ms' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className='mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/65 md:text-xl'
            style={{ animationDelay: '200ms' }}
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div
            className='mt-8 animate-fade-up'
            style={{ animationDelay: '280ms' }}
          >
            {children}
          </div>
        )}
      </div>

      <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />
    </section>
  );
}
