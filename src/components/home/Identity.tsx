import React from 'react';
import type { IconType } from 'react-icons';
import { LuCode2, LuHeart, LuUsers } from 'react-icons/lu';
import { identityHeadline, ourIdentity, values } from '@/constants';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const VALUE_ICONS: IconType[] = [LuHeart, LuCode2, LuUsers];

export default function Identity() {
  const sentences = ourIdentity.split('. ');
  const half = Math.ceil(sentences.length / 2);
  const paragraphs = [
    sentences.slice(0, half).join('. ') + '.',
    sentences.slice(half).join('. '),
  ];

  return (
    <section id='our-identity' className='scroll-mt-24 py-24 md:py-32'>
      <div className='container'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          <Reveal>
            <SectionHeading
              eyebrow='Our identity'
              title={
                <>
                  Architects of digital transformation,{' '}
                  <span className='text-gradient'>
                    guardians of tech integrity.
                  </span>
                </>
              }
            />
          </Reveal>

          <Reveal delay={120} className='lg:pt-10'>
            <p className='text-xl font-semibold leading-relaxed text-ink'>
              {identityHeadline}
            </p>
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className='mt-5 leading-relaxed text-ink/60'
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className='mt-16 grid gap-5 md:grid-cols-3'>
          {values.map((value, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <Reveal key={value.title} delay={i * 100} className='h-full'>
                <div className='group relative h-full overflow-hidden rounded-3xl border border-ink/[0.06] bg-gradient-to-br from-white to-surface p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift'>
                  <span className='absolute right-6 top-5 text-6xl font-extrabold leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-primary/[0.12]'>
                    0{i + 1}
                  </span>
                  <Icon className='relative h-7 w-7 text-primary' />
                  <h3 className='relative mt-5 text-xl font-extrabold text-ink'>
                    {value.title}
                  </h3>
                  <p className='relative mt-2 leading-relaxed text-ink/60'>
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
