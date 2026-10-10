'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';

export interface FilterGroup {
  title: string;
  param: string;
  options: { label: string; value: string }[];
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  searchPlaceholder?: string;
  /** Params to clear when a filter changes (e.g. page). */
  resetParams?: string[];
}

/**
 * Search box plus single-select filter groups. A sticky panel on desktop,
 * horizontally scrolling chips on mobile. State lives in the URL so the
 * server component refetches.
 */
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  groups,
  searchPlaceholder = 'Search',
  resetParams = ['page'],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearch(params.get('search') ?? '');
  }, [params]);

  const apply = (param: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    resetParams.forEach((p) => next.delete(p));
    if (value === null || value === '') next.delete(param);
    else next.set(param, value);
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  return (
    <aside className='w-full lg:sticky lg:top-28 lg:w-64 lg:shrink-0 lg:self-start'>
      <div
        className={`transition-opacity duration-300 lg:max-h-[calc(100vh-8.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:rounded-2xl lg:border lg:border-ink/[0.06] lg:bg-white lg:p-5 lg:shadow-soft ${
          isPending ? 'opacity-60' : ''
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apply('search', search || null);
          }}
          className='relative'
        >
          <LuSearch className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40' />
          <input
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className='input !rounded-full !pl-10 !pr-10 [&::-webkit-search-cancel-button]:hidden'
          />
          {search && (
            <button
              type='button'
              aria-label='Clear search'
              onClick={() => {
                setSearch('');
                apply('search', null);
              }}
              className='absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-ink'
            >
              <LuX className='h-3.5 w-3.5' />
            </button>
          )}
        </form>

        {groups.map((group) => {
          const active =
            params.get(group.param) ?? group.options[0]?.value ?? '';
          return (
            <div key={group.title} className='mt-6'>
              <p className='mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/40'>
                {group.title}
              </p>
              <ul className='-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden'>
                {group.options.map((opt) => {
                  const isActive = active === opt.value;
                  return (
                    <li key={opt.value} className='shrink-0'>
                      <button
                        type='button'
                        aria-pressed={isActive}
                        onClick={() => apply(group.param, opt.value)}
                        className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 lg:rounded-xl lg:border-transparent lg:px-3 lg:text-left ${
                          isActive
                            ? 'border-ink bg-ink text-white lg:bg-primary/[0.08] lg:text-primary'
                            : 'border-ink/10 bg-white text-ink/65 hover:border-ink/20 hover:text-ink lg:bg-transparent lg:hover:bg-surface'
                        }`}
                      >
                        <span
                          className={`hidden h-1.5 w-1.5 rounded-full transition-colors lg:block ${
                            isActive ? 'bg-primary' : 'bg-ink/15'
                          }`}
                        />
                        {opt.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default FilterSidebar;
