import React from 'react';
import { LuEye, LuTarget } from 'react-icons/lu';
import { mission, vision } from '@/constants';
import Aurora from '../ui/Aurora';
import Reveal from '../ui/Reveal';

const ITEMS = [
  { title: 'Our mission', text: mission, icon: LuTarget },
  { title: 'Our vision', text: vision, icon: LuEye },
];

export default function MissionVision() {
  return (
    <section className='container'>
      <Reveal>
        <div className='relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-16 text-white md:rounded-[2.5rem] md:px-14 md:py-24'>
          <Aurora />
          <div className='relative grid gap-6 lg:grid-cols-2'>
            {ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className='h-full'>
                <div className='h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] md:p-10'>
                  <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15'>
                    <item.icon className='h-6 w-6 text-pink-300' />
                  </span>
                  <h2 className='mt-7 text-3xl font-extrabold md:text-4xl'>
                    {item.title}
                  </h2>
                  <p className='mt-4 text-lg leading-relaxed text-white/70'>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
