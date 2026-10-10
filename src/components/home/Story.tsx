import React from 'react';
import { storyChapters } from '@/constants';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Story() {
  return (
    <section className='py-24 md:py-32'>
      <div className='container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
        <div className='lg:sticky lg:top-32 lg:self-start'>
          <Reveal>
            <SectionHeading
              eyebrow='Our story'
              title={
                <>
                  A journey of innovation{' '}
                  <span className='text-gradient'>and inspiration</span>
                </>
              }
              description='From students exploring programming languages and hardware repairs to a company building products for real people.'
            />
          </Reveal>
        </div>

        <div className='relative'>
          <span
            aria-hidden
            className='absolute bottom-6 left-[1.1875rem] top-6 w-px bg-gradient-to-b from-primary via-secondary to-transparent'
          />
          <ol>
            {storyChapters.map((chapter, i) => (
              <li key={chapter.title} className='pb-12 last:pb-0'>
                <Reveal delay={60} className='relative pl-16'>
                  <span className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-extrabold text-primary shadow-soft ring-1 ring-primary/20'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className='pt-1.5 text-2xl font-extrabold text-ink'>
                    {chapter.title}
                  </h3>
                  <p className='mt-3 leading-relaxed text-ink/60'>
                    {chapter.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
