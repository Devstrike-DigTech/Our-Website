import React from 'react';
import type { Project } from '@/lib/api';

const STATUS: Record<
  Project['status'],
  { label: string; dot: string; tone: string }
> = {
  ongoing: {
    label: 'Ongoing',
    dot: 'bg-emerald-400',
    tone: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20',
  },
  upcoming: {
    label: 'Upcoming',
    dot: 'bg-amber-400',
    tone: 'bg-amber-500/10 text-amber-700 ring-amber-500/20',
  },
  concluded: {
    label: 'Concluded',
    dot: 'bg-slate-400',
    tone: 'bg-slate-500/10 text-slate-600 ring-slate-500/20',
  },
};

export default function StatusBadge({
  status,
  glass = false,
}: {
  status: Project['status'];
  /** Frosted variant for use on top of images or dark backgrounds. */
  glass?: boolean;
}) {
  const s = STATUS[status] ?? STATUS.ongoing;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
        glass ? 'bg-black/30 text-white ring-white/20 backdrop-blur-md' : s.tone
      }`}
    >
      <span className='relative flex h-1.5 w-1.5'>
        {status === 'ongoing' && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`}
        />
      </span>
      {s.label}
    </span>
  );
}
