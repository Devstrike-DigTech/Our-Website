import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  page: number;
  pages: number;
  /** Builds the href for a given page, preserving current filters. */
  hrefFor: (page: number) => string;
}

function pageNumbers(page: number, pages: number): (number | '…')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, '…', pages - 2, pages - 1, pages];
  if (page >= pages - 2) return [1, 2, 3, '…', pages - 2, pages - 1, pages];
  return [1, '…', page - 1, page, page + 1, '…', pages];
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, hrefFor }) => {
  if (pages <= 1) return null;

  const btn =
    'flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50';

  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={btn}>
          ← Previous
        </Link>
      ) : (
        <span className={`${btn} pointer-events-none opacity-40`}>← Previous</span>
      )}

      <div className="hidden items-center gap-1 sm:flex">
        {pageNumbers(page, pages).map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <Link
              key={n}
              href={hrefFor(n)}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-sm ${
                n === page
                  ? 'border border-primary font-semibold text-primary'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {n}
            </Link>
          ),
        )}
      </div>

      {page < pages ? (
        <Link href={hrefFor(page + 1)} className={btn}>
          Next →
        </Link>
      ) : (
        <span className={`${btn} pointer-events-none opacity-40`}>Next →</span>
      )}
    </div>
  );
};

export default Pagination;
