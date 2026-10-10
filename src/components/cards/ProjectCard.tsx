import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuArrowRight, LuArrowUpRight, LuBriefcase } from 'react-icons/lu';
import { Project, resolveImage } from '@/lib/api';
import { plural } from '@/lib/format';
import StatusBadge from '../ui/StatusBadge';

function Cover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  return project.coverImage ? (
    <Image
      src={resolveImage(project.coverImage)!}
      alt={project.title}
      fill
      sizes={sizes}
      priority={priority}
      className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
    />
  ) : (
    <div className='absolute inset-0 flex items-center justify-center bg-brand-gradient-d text-6xl font-extrabold text-white/90'>
      {project.title[0]}
    </div>
  );
}

/** Listing card: image on top, details below. */
const ProjectCard: React.FC<{ project: Project; priority?: boolean }> = ({
  project,
  priority = false,
}) => {
  const roles = project.openVacancies ?? 0;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className='card card-hover group flex h-full flex-col overflow-hidden'
    >
      <div className='relative aspect-[16/10] overflow-hidden bg-surface'>
        <Cover
          project={project}
          priority={priority}
          sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent' />
        <div className='absolute left-4 top-4'>
          <StatusBadge status={project.status} glass />
        </div>
        <span className='absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
          <LuArrowUpRight className='h-4 w-4' />
        </span>
      </div>

      <div className='flex flex-1 flex-col p-6'>
        <p className='text-xs font-bold uppercase tracking-[0.14em] text-primary'>
          {project.industry}
        </p>
        <h3 className='mt-2 text-xl font-extrabold text-ink transition-colors group-hover:text-primary'>
          {project.title}
        </h3>
        <p className='mb-5 mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink/60'>
          {project.summary}
        </p>

        <div className='mt-auto flex items-center justify-between border-t border-ink/[0.06] pt-4 text-sm'>
          <span
            className={`flex items-center gap-2 font-semibold ${
              roles > 0 ? 'text-emerald-700' : 'text-ink/45'
            }`}
          >
            <LuBriefcase className='h-4 w-4' />
            {roles > 0 ? `${plural(roles, 'open role')}` : 'No open roles'}
          </span>
          <span className='flex items-center gap-1 font-bold text-ink/70 transition-colors group-hover:text-primary'>
            View
            <LuArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </div>
      </div>
    </Link>
  );
};

/** Full-bleed tile with text over the image — used in the home page bento grid. */
export const ProjectTile: React.FC<{ project: Project; large?: boolean }> = ({
  project,
  large = false,
}) => (
  <Link
    href={`/projects/${project.slug}`}
    className='group relative flex h-full min-h-[280px] overflow-hidden rounded-3xl bg-ink shadow-soft transition-shadow duration-500 hover:shadow-lift'
  >
    <Cover
      project={project}
      sizes={
        large
          ? '(max-width: 1024px) 100vw, 640px'
          : '(max-width: 1024px) 100vw, 320px'
      }
    />
    <div className='absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent transition-opacity duration-500 group-hover:opacity-95' />

    <div className='relative mt-auto w-full p-6 md:p-7'>
      <div className='flex flex-wrap items-center gap-2'>
        <StatusBadge status={project.status} glass />
        <span className='rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/80 ring-1 ring-inset ring-white/15 backdrop-blur-md'>
          {project.industry}
        </span>
      </div>
      <h3
        className={`mt-3 font-extrabold text-white ${
          large ? 'text-3xl md:text-4xl' : 'text-2xl'
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`mt-2 leading-relaxed text-white/70 ${
          large ? 'line-clamp-3 max-w-lg text-base' : 'line-clamp-2 text-sm'
        }`}
      >
        {project.summary}
      </p>
      <span className='mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white'>
        Explore project
        <LuArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
      </span>
    </div>
  </Link>
);

export default ProjectCard;
