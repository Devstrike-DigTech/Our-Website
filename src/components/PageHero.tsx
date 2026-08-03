import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

/** Gradient page banner used on Projects, Careers, and Content pages. */
const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => (
  <section className="bg-brand-gradient">
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">{title}</h1>
      {subtitle && <p className="max-w-2xl text-white/85">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
