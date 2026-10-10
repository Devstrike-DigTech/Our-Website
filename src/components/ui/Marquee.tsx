import React from 'react';

/** Endless horizontal ticker. Pauses on hover; edges fade out. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className='flex shrink-0 items-center gap-3 pr-3'>
      {items.map((item) => (
        <li
          key={item}
          className='whitespace-nowrap rounded-full border border-ink/[0.07] bg-white px-5 py-2.5 text-sm font-semibold text-ink/60 shadow-soft'
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className='mask-fade-x group flex overflow-hidden'>
      <div className='flex animate-marquee group-hover:[animation-play-state:paused]'>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
