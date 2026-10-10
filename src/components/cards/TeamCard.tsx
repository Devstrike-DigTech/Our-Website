import Link from 'next/link';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { TeamMember } from '@/lib/api';
import Avatar from '../ui/Avatar';

const TeamCard: React.FC<{ member: TeamMember; featured?: boolean }> = ({
  member,
  featured = false,
}) => (
  <Link
    href={`/careers/management/${member.id}`}
    className={`card card-hover group flex h-full ${
      featured
        ? 'flex-col gap-6 p-7 sm:flex-row sm:items-center md:p-9'
        : 'flex-col p-6'
    }`}
  >
    <Avatar
      name={member.name}
      src={member.avatarUrl}
      size={featured ? 96 : 56}
      className='shadow-glow'
    />
    <div className={`flex flex-1 flex-col ${featured ? '' : 'mt-5'}`}>
      <h3
        className={`font-extrabold text-ink transition-colors group-hover:text-primary ${
          featured ? 'text-2xl' : 'text-lg'
        }`}
      >
        {member.name}
      </h3>
      <p className='mt-0.5 text-sm font-bold text-primary'>{member.title}</p>
      <p
        className={`mb-4 mt-3 leading-relaxed text-ink/60 ${
          featured ? 'text-base' : 'line-clamp-3 text-[15px]'
        }`}
      >
        {member.summary}
      </p>
      <span className='mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink/70 transition-colors group-hover:text-primary'>
        View profile
        <LuArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
      </span>
    </div>
  </Link>
);

export default TeamCard;
