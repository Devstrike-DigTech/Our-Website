import React from 'react';

/**
 * Decorative backdrop for dark sections: slow-drifting brand-coloured glows
 * over a faint grid. Place inside a `relative overflow-hidden` parent.
 */
export default function Aurora({ grid = true }: { grid?: boolean }) {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 overflow-hidden'
    >
      <div className='absolute -left-[10%] -top-[30%] h-[70%] w-[55%] animate-drift rounded-full bg-primary/40 blur-[120px]' />
      <div
        className='absolute -right-[10%] top-[5%] h-[65%] w-[50%] animate-drift rounded-full bg-secondary/60 blur-[120px]'
        style={{ animationDelay: '-6s' }}
      />
      <div
        className='absolute bottom-[-40%] left-[30%] h-[60%] w-[40%] animate-drift rounded-full bg-[#7c3aed]/25 blur-[120px]'
        style={{ animationDelay: '-12s' }}
      />
      {grid && <div className='bg-grid absolute inset-0' />}
    </div>
  );
}
