import Link from 'next/link';
import React from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

const Breadcrumb: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-gray-500 hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-primary' : 'text-gray-500'}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-gray-300">›</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
