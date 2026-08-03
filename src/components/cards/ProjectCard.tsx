import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Project, resolveImage } from '@/lib/api';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Link href={`/projects/${project.slug}`} className="group block">
    <div className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-100 md:h-72">
      {project.coverImage && (
        <Image
          src={resolveImage(project.coverImage)!}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
    </div>
    <p className="mt-4 text-sm font-medium text-primary">
      Vacancy : {project.openVacancies ?? 0} Open
    </p>
    <h3 className="mt-1 text-xl font-bold text-gray-900 group-hover:text-primary">
      {project.title}
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
      {project.summary}
    </p>
  </Link>
);

export default ProjectCard;
