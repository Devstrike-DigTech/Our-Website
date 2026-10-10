import React from 'react';
import type { IconType } from 'react-icons';
import {
  LuCompass,
  LuGlobe,
  LuPalette,
  LuServer,
  LuSmartphone,
  LuWorkflow,
} from 'react-icons/lu';
import { services, techStack } from '@/constants';
import Marquee from '../ui/Marquee';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SpotlightCard from '../ui/SpotlightCard';

const ICONS: Record<(typeof services)[number]['title'], IconType> = {
  'Web platforms': LuGlobe,
  'Mobile apps': LuSmartphone,
  'Product & strategy': LuCompass,
  'Business digitalisation': LuWorkflow,
  'Graphics & content design': LuPalette,
  'Networks & infrastructure': LuServer,
};

export default function Services() {
  return (
    <section className='relative overflow-hidden bg-surface py-24 md:py-32'>
      <div className='bg-grid-dark absolute inset-0' aria-hidden />

      <div className='container relative'>
        <Reveal>
          <SectionHeading
            align='center'
            eyebrow='What we do'
            title={
              <>
                Everything it takes to ship a{' '}
                <span className='text-gradient'>digital product</span>
              </>
            }
            description='We provide tech solutions to upcoming, transitioning, and established businesses — digitising their services and giving them a springboard to grow.'
          />
        </Reveal>

        <div className='mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, i) => {
            const Icon = ICONS[service.title];
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className='h-full'
              >
                <SpotlightCard className='card card-hover h-full p-7'>
                  <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-d text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110'>
                    <Icon className='h-[22px] w-[22px]' />
                  </span>
                  <h3 className='mt-6 text-xl font-extrabold text-ink'>
                    {service.title}
                  </h3>
                  <p className='mt-2 leading-relaxed text-ink/60'>
                    {service.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className='mt-20'>
          <p className='mb-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink/40'>
            The stack behind our products
          </p>
          <Marquee items={techStack} />
        </Reveal>
      </div>
    </section>
  );
}
