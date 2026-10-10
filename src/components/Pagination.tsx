import Link from 'next/link';
import React from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

interface PaginationProps {
  page: number;
  pages: number;
  /** Builds the href for a given page, preserving current filters. */
  hrefFor: (page: number) => string;
}

function pageNumbers(page: number, pages: number): (number | '…')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 4, '…', pages];
  if (page >= pages - 2)
    return [1, '…', pages - 3, pages - 2, pages - 1, pages];
  return [1, '…', page - 1, page, page + 1, '…', pages];
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, hrefFor }) => {
  if (pages <= 1) return null;

  const edge =
    'inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-bold text-ink/70 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary';
  const disabled = 'pointer-events-none opacity-40';

  return (
    <nav
      aria-label='Pagination'
      className='mt-14 flex items-center justify-between gap-4'
    >
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={edge}>
          <LuArrowLeft className='h-4 w-4' /> Previous
        </Link>
      ) : (
        <span className={`${edge} ${disabled}`}>
          <LuArrowLeft className='h-4 w-4' /> Previous
        </span>
      )}

      <ol className='hidden items-center gap-1 rounded-full border border-ink/[0.06] bg-white p-1 shadow-soft sm:flex'>
        {pageNumbers(page, pages).map((n, i) =>
          n === '…' ? (
            <li key={`gap-${i}`} className='px-2 text-sm text-ink/30'>
              …
            </li>
          ) : (
            <li key={n}>
              <Link
                href={hrefFor(n)}
                aria-current={n === page ? 'page' : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${
                  n === page
                    ? 'bg-brand-gradient text-white shadow-glow'
                    : 'text-ink/55 hover:bg-surface hover:text-ink'
                }`}
              >
                {n}
              </Link>
            </li>
          )
        )}
      </ol>

      <span className='text-sm font-semibold text-ink/50 sm:hidden'>
        Page {page} of {pages}
      </span>

      {page < pages ? (
        <Link href={hrefFor(page + 1)} className={edge}>
          Next <LuArrowRight className='h-4 w-4' />
        </Link>
      ) : (
        <span className={`${edge} ${disabled}`}>
          Next <LuArrowRight className='h-4 w-4' />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
