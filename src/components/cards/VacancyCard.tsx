import Link from 'next/link';
import React from 'react';
import { LuArrowRight, LuClock, LuWallet } from 'react-icons/lu';
import { Vacancy } from '@/lib/api';

const MAX_SKILLS = 5;

const VacancyCard: React.FC<{ vacancy: Vacancy }> = ({ vacancy }) => {
  const extra = vacancy.skillSet.length - MAX_SKILLS;
  return (
    <Link
      href={`/careers/${vacancy.id}`}
      className='card card-hover group block h-full p-6 md:p-7'
    >
      <div className='flex flex-wrap items-center gap-2'>
        <span className='rounded-full bg-primary/[0.08] px-3 py-1 text-xs font-bold text-primary'>
          {vacancy.role}
        </span>
        {vacancy.project && (
          <span className='rounded-full bg-secondary/[0.08] px-3 py-1 text-xs font-bold text-secondary'>
            {vacancy.project.title}
          </span>
        )}
      </div>

      <div className='mt-4 flex items-start justify-between gap-4'>
        <h3 className='text-xl font-extrabold text-ink transition-colors group-hover:text-primary'>
          {vacancy.title}
        </h3>
        <span className='hidden shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-all duration-300 group-hover:bg-brand-gradient group-hover:shadow-glow sm:inline-flex'>
          Apply
          <LuArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
        </span>
      </div>

      <p className='mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink/60'>
        {vacancy.summary}
      </p>

      {vacancy.skillSet.length > 0 && (
        <ul className='mt-4 flex flex-wrap gap-1.5'>
          {vacancy.skillSet.slice(0, MAX_SKILLS).map((skill) => (
            <li key={skill} className='chip'>
              {skill}
            </li>
          ))}
          {extra > 0 && <li className='chip'>+{extra} more</li>}
        </ul>
      )}

      <div className='mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/[0.06] pt-4 text-sm font-semibold text-ink/55'>
        <span className='flex items-center gap-2'>
          <LuClock className='h-4 w-4 text-ink/40' />
          {vacancy.payType}
        </span>
        {vacancy.salaryRange && (
          <span className='flex items-center gap-2'>
            <LuWallet className='h-4 w-4 text-ink/40' />
            {vacancy.salaryRange}
          </span>
        )}
      </div>
    </Link>
  );
};

export default VacancyCard;
