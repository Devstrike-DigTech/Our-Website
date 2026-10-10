import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuArrowRight, LuBriefcase, LuSparkles } from 'react-icons/lu';
import type { Project } from '@/lib/api';
import { plural } from '@/lib/format';
import Aurora from '../ui/Aurora';
import StatusBadge from '../ui/StatusBadge';

export interface HomeStats {
  projects: number;
  ongoing: number;
  openRoles: number;
  industries: number;
}

export default function Hero({
  stats,
  nowBuilding,
}: {
  stats: HomeStats;
  nowBuilding?: Project;
}) {
  const statItems = [
    { value: stats.projects, label: 'Products in our portfolio' },
    { value: stats.ongoing, label: 'In active development' },
    { value: stats.openRoles, label: 'Open roles right now' },
    { value: stats.industries, label: 'Industries served' },
  ];

  return (
    <section className='relative overflow-hidden bg-ink-950 text-white'>
      <Aurora />

      <div className='container relative pb-20 pt-36 md:pb-28 md:pt-44'>
        <div className='grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12'>
          <div>
            <span className='eyebrow-light animate-fade-up'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
              </span>
              Devstrike Digital Limited · Abuja, Nigeria
            </span>

            <h1
              className='mt-7 animate-fade-up text-[2.75rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl'
              style={{ animationDelay: '100ms' }}
            >
              Empowering innovation,{' '}
              <span className='text-gradient-light'>
                transforming tomorrow.
              </span>
            </h1>

            <p
              className='mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-white/65 md:text-xl'
              style={{ animationDelay: '200ms' }}
            >
              We build web platforms, mobile apps, and digital products that
              solve real problems for businesses and everyday people —
              engineered with integrity, the tech way.
            </p>

            <div
              className='mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row'
              style={{ animationDelay: '300ms' }}
            >
              <Link
                href='/projects'
                className='btn-primary group !px-7 !py-4 !text-base'
              >
                Explore our projects
                <LuArrowRight className='btn-arrow h-5 w-5' />
              </Link>
              <a
                href='#footer'
                className='btn-ghost-light !px-7 !py-4 !text-base'
              >
                Start a conversation
              </a>
            </div>
          </div>

          <div
            className='relative mx-auto w-full max-w-lg animate-fade-up lg:max-w-none'
            style={{ animationDelay: '250ms' }}
          >
            <div className='absolute -inset-4 rounded-[2.5rem] bg-brand-gradient-d opacity-40 blur-2xl' />
            <div className='relative aspect-[4/3.4] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:rotate-[1.5deg]'>
              <Image
                src='/assets/images/webdemo.png'
                alt='The Devstrike team at work'
                fill
                priority
                sizes='(max-width: 1024px) 100vw, 560px'
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-primary/20' />
            </div>

            {nowBuilding && (
              <Link
                href={`/projects/${nowBuilding.slug}`}
                className='group absolute -left-3 top-8 max-w-[15rem] animate-float rounded-2xl border border-white/15 bg-ink-900/70 p-4 shadow-2xl backdrop-blur-xl transition-colors hover:border-white/30 sm:-left-8'
              >
                <span className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50'>
                  <LuSparkles className='h-3.5 w-3.5 text-pink-300' />
                  Now building
                </span>
                <span className='mt-1.5 block text-lg font-extrabold leading-tight text-white'>
                  {nowBuilding.title}
                </span>
                <span className='mt-2 flex items-center gap-2'>
                  <StatusBadge status={nowBuilding.status} glass />
                  <LuArrowRight className='h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1' />
                </span>
              </Link>
            )}

            {stats.openRoles > 0 && (
              <Link
                href='/careers'
                className='group absolute -bottom-6 -right-2 flex animate-float items-center gap-3 rounded-2xl border border-ink/5 bg-white p-3 pr-5 text-ink shadow-2xl sm:-right-6'
                style={{ animationDelay: '-3s' }}
              >
                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-d text-white shadow-glow'>
                  <LuBriefcase className='h-5 w-5' />
                </span>
                <span>
                  <span className='block text-sm font-extrabold'>
                    We&apos;re hiring
                  </span>
                  <span className='block text-xs font-semibold text-ink/50 group-hover:text-primary'>
                    {plural(stats.openRoles, 'open role')} →
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>

        {stats.projects > 0 && (
          <dl
            className='mt-20 grid animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:mt-24 lg:grid-cols-4'
            style={{ animationDelay: '400ms' }}
          >
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className='bg-ink-950/80 px-6 py-7 backdrop-blur md:px-8'
              >
                <dt className='text-sm font-semibold text-white/50'>
                  {stat.label}
                </dt>
                <dd className='mt-2 text-4xl font-extrabold tracking-tight md:text-5xl'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
