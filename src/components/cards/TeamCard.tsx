import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { TeamMember, resolveImage } from '@/lib/api';

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <Link href={`/careers/management/${member.id}`} className="group block">
    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100">
      {member.avatarUrl ? (
        <Image
          src={resolveImage(member.avatarUrl)!}
          alt={member.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      ) : (
        <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-gray-400" />
      )}
    </div>
    <h3 className="mt-4 font-bold text-gray-900 group-hover:text-primary">
      {member.name}
    </h3>
    <p className="mt-0.5 text-sm font-medium text-primary">{member.title}</p>
    <p className="mt-2 text-sm leading-relaxed text-gray-600">{member.summary}</p>
  </Link>
);

export default TeamCard;
