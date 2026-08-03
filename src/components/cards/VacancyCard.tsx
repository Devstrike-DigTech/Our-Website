import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { Vacancy } from '@/lib/api';

const TAG_COLORS = [
  'text-blue-600 bg-blue-50',
  'text-pink-600 bg-pink-50',
  'text-red-500 bg-red-50',
  'text-indigo-600 bg-indigo-50',
  'text-green-600 bg-green-50',
  'text-amber-600 bg-amber-50',
];

function tagColor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

const VacancyCard: React.FC<{ vacancy: Vacancy }> = ({ vacancy }) => (
  <div className="border-b border-gray-100 py-6 first:pt-0">
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-bold text-gray-900">{vacancy.title}</h3>
        {vacancy.project && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColor(
              vacancy.project.title,
            )}`}
          >
            • {vacancy.project.title}
          </span>
        )}
      </div>
      <Link
        href={`/careers/${vacancy.id}`}
        className="shrink-0 text-sm font-semibold text-primary hover:underline"
      >
        Apply
      </Link>
    </div>

    <p className="mt-2 text-sm leading-relaxed text-gray-600">{vacancy.summary}</p>

    {vacancy.skillSet.length > 0 && (
      <p className="mt-2 text-sm text-gray-700">
        <span className="font-semibold">Skill Set:</span>{' '}
        {vacancy.skillSet.join(', ')}.
      </p>
    )}

    <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
        {vacancy.payType}
      </span>
      {vacancy.salaryRange && (
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMoneyBill1} className="h-4 w-4" />
          {vacancy.salaryRange}
        </span>
      )}
    </div>
  </div>
);

export default VacancyCard;
