import Link from 'next/link';
import React from 'react';
import { LuCheck, LuSearch } from 'react-icons/lu';
import Reveal from './Reveal';

/** Splits newline-separated text into paragraphs; first one renders as a lead. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <div className='prose-article'>
      {text
        .split('\n')
        .filter(Boolean)
        .map((para, i) => (
          <p key={i}>{para}</p>
        ))}
    </div>
  );
}

export function CheckList({
  items,
  columns = 1,
}: {
  items: readonly string[];
  columns?: 1 | 2;
}) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className='flex items-start gap-3.5 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-soft'
        >
          <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient-d text-white'>
            <LuCheck className='h-3.5 w-3.5' strokeWidth={3} />
          </span>
          <span className='leading-relaxed text-ink/75'>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DetailSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className='mt-14 border-t border-ink/[0.06] pt-12'>
        <h2 className='text-2xl font-extrabold text-ink md:text-3xl'>
          {title}
        </h2>
        {intro && <p className='mt-3 leading-relaxed text-ink/60'>{intro}</p>}
        {children && <div className='mt-6'>{children}</div>}
      </section>
    </Reveal>
  );
}

export function SideCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='card p-6'>
      {title && (
        <p className='mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/40'>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

export function FactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-between gap-4 border-b border-ink/[0.05] py-3 text-sm last:border-0 last:pb-0 first:pt-0'>
      <dt className='font-semibold text-ink/50'>{label}</dt>
      <dd className='text-right font-bold text-ink'>{children}</dd>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  resetHref,
}: {
  title: string;
  description: string;
  resetHref?: string;
}) {
  return (
    <div className='card flex flex-col items-center px-6 py-16 text-center'>
      <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary'>
        <LuSearch className='h-6 w-6' />
      </span>
      <h3 className='mt-5 text-xl font-extrabold text-ink'>{title}</h3>
      <p className='mt-2 max-w-sm text-ink/55'>{description}</p>
      {resetHref && (
        <Link href={resetHref} className='btn-secondary mt-6'>
          Clear filters
        </Link>
      )}
    </div>
  );
}

/** Pill tabs for switching between views inside a dark PageHero. */
export function HeroTabs({
  tabs,
}: {
  tabs: { label: string; href: string; active: boolean; count?: number }[];
}) {
  return (
    <div className='inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md'>
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          scroll={false}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
            tab.active
              ? 'bg-white text-ink shadow-lg'
              : 'text-white/65 hover:text-white'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                tab.active
                  ? 'bg-ink/[0.07] text-ink/70'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {tab.count}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
