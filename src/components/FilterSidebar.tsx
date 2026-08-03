'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

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
 * Sidebar with a search box and single-select filter groups, matching the
 * Figma listing layouts. State lives in the URL so server components refetch.
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

  useEffect(() => {
    setSearch(params.get('search') ?? '');
  }, [params]);

  const apply = (param: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    resetParams.forEach((p) => next.delete(p));
    if (value === null || value === '') next.delete(param);
    else next.set(param, value);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <aside className="w-full lg:w-56 lg:shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply('search', search || null);
        }}
        className="relative mb-8"
      >
        <IoSearchOutline className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
        />
      </form>

      {groups.map((group) => {
        const active = params.get(group.param) ?? group.options[0]?.value ?? '';
        return (
          <div key={group.title} className="mb-8">
            <p className="mb-3 text-sm font-medium text-primary">{group.title}</p>
            <ul className="space-y-1">
              {group.options.map((opt) => {
                const isActive = active === opt.value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => apply(group.param, opt.value)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-gray-100 font-semibold text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};

export default FilterSidebar;
