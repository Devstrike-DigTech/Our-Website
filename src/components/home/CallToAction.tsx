import Link from 'next/link';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import Reveal from '../ui/Reveal';

export default function CallToAction() {
  return (
    <section className='container pb-24 md:pb-32'>
      <Reveal>
        <div className='relative overflow-hidden rounded-[2rem] bg-brand-gradient-d px-6 py-16 text-center text-white shadow-glow md:rounded-[2.5rem] md:px-12 md:py-24'>
          <div className='bg-grid absolute inset-0' aria-hidden />
          <div
            aria-hidden
            className='absolute -right-20 -top-20 h-72 w-72 animate-drift rounded-full bg-white/10 blur-3xl'
          />
          <div className='relative mx-auto max-w-2xl'>
            <h2 className='text-4xl font-extrabold leading-[1.05] md:text-6xl'>
              Have an idea worth building?
            </h2>
            <p className='mt-5 text-lg leading-relaxed text-white/75 md:text-xl'>
              We partner with startups, businesses, and institutions to turn
              real problems into products. Let&apos;s talk about yours.
            </p>
            <div className='mt-10 flex flex-col justify-center gap-3 sm:flex-row'>
              <a
                href='#footer'
                className='btn group bg-white !px-7 !py-4 !text-base text-ink shadow-xl hover:-translate-y-0.5'
              >
                Start a conversation
                <LuArrowRight className='btn-arrow h-5 w-5' />
              </a>
              <Link
                href='/careers'
                className='btn-ghost-light !px-7 !py-4 !text-base'
              >
                Join the team
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
