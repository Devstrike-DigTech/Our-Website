import Link from 'next/link';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import type { Project } from '@/lib/api';
import { ProjectTile } from '../cards/ProjectCard';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Bento grid: the first project gets a 2×2 tile, the next four fill the rest. */
export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  if (projects.length === 0) return null;
  const [lead, ...rest] = projects;

  return (
    <section className='py-24 md:py-32'>
      <div className='container'>
        <div className='flex flex-col justify-between gap-8 md:flex-row md:items-end'>
          <Reveal>
            <SectionHeading
              eyebrow='Featured work'
              title='Products we are building right now'
              description='Each one starts with a real problem — then gets engineered into something people rely on.'
            />
          </Reveal>
          <Reveal delay={100}>
            <Link href='/projects' className='btn-secondary group shrink-0'>
              View all projects
              <LuArrowRight className='btn-arrow h-4 w-4' />
            </Link>
          </Reveal>
        </div>

        <div className='mt-14 grid auto-rows-[300px] gap-5 md:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-4'>
          <Reveal className='h-full md:col-span-2 md:row-span-2'>
            <ProjectTile project={lead} large />
          </Reveal>
          {rest.slice(0, 4).map((project, i) => (
            <Reveal key={project.id} delay={(i + 1) * 90} className='h-full'>
              <ProjectTile project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
