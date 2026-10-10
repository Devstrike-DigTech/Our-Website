'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LuArrowRight,
  LuBriefcase,
  LuChevronDown,
  LuMenu,
  LuUsers,
  LuX,
} from 'react-icons/lu';
import logo from '@/assets/images/logo.svg';

const CAREER_ITEMS = [
  {
    label: 'Vacancies',
    description: 'Open roles across our project teams.',
    href: '/careers',
    icon: LuBriefcase,
  },
  {
    label: 'Management',
    description: 'Meet the people leading Devstrike.',
    href: '/careers?view=management',
    icon: LuUsers,
  },
];

function pillClasses(active: boolean) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
    active
      ? 'bg-primary/[0.08] text-primary'
      : 'text-ink/70 hover:bg-ink/[0.04] hover:text-ink'
  }`;
}

/**
 * Floating glass navigation. It is `fixed`, so every page's first section
 * must leave room for it at the top (PageHero and the home hero do).
 */
export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4'>
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border py-2 pl-3 pr-2 transition-all duration-500 md:pl-4 ${
          scrolled
            ? 'border-ink/[0.08] bg-white/85 shadow-lift backdrop-blur-xl'
            : 'border-white/50 bg-white/75 shadow-soft backdrop-blur-md'
        }`}
      >
        <Link
          href='/'
          aria-label='Devstrike home'
          className='flex items-center gap-2.5'
        >
          <Image src={logo} alt='' width={36} height={36} priority />
          <span className='text-lg font-extrabold tracking-tight text-ink'>
            devstrike
          </span>
        </Link>

        <div className='hidden items-center gap-1 md:flex'>
          <Link href='/' className={pillClasses(isActive('/'))}>
            Home
          </Link>
          <Link href='/projects' className={pillClasses(isActive('/projects'))}>
            Projects
          </Link>

          <div className='group relative'>
            <Link
              href='/careers'
              className={`${pillClasses(
                isActive('/careers')
              )} flex items-center gap-1`}
            >
              Careers
              <LuChevronDown className='h-4 w-4 transition-transform duration-300 group-hover:rotate-180' />
            </Link>
            <div className='invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
              <div className='w-80 rounded-2xl border border-ink/[0.06] bg-white p-2 shadow-lift'>
                {CAREER_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface'
                  >
                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-d text-white shadow-glow'>
                      <item.icon className='h-[18px] w-[18px]' />
                    </span>
                    <span>
                      <span className='block font-bold text-ink group-hover/item:text-primary'>
                        {item.label}
                      </span>
                      <span className='block text-sm text-ink/55'>
                        {item.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href='/content' className={pillClasses(isActive('/content'))}>
            Content
          </Link>
        </div>

        <a
          href='#footer'
          className='btn-primary group hidden !px-5 !py-2.5 md:inline-flex'
        >
          Contact us
          <LuArrowRight className='btn-arrow h-4 w-4' />
        </a>

        <button
          type='button'
          onClick={() => setOpen(true)}
          aria-label='Open menu'
          className='flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-ink/5 md:hidden'
        >
          <LuMenu className='h-6 w-6' />
        </button>
      </nav>

      {open && (
        <MobileMenu isActive={isActive} onClose={() => setOpen(false)} />
      )}
    </header>
  );
};

function MobileMenu({
  isActive,
  onClose,
}: {
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Vacancies', href: '/careers' },
    { label: 'Management', href: '/careers?view=management' },
    { label: 'Content', href: '/content' },
  ];

  return (
    <div className='fixed inset-0 z-[60] md:hidden'>
      <div
        className='absolute inset-0 animate-[page-in_0.3s_ease-out_backwards] bg-ink/40 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative m-3 animate-pop-in rounded-3xl bg-white p-5 shadow-lift'>
        <div className='flex items-center justify-between'>
          <span className='flex items-center gap-2.5'>
            <Image src={logo} alt='' width={34} height={34} />
            <span className='text-lg font-extrabold tracking-tight'>
              devstrike
            </span>
          </span>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close menu'
            className='flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-ink/5'
          >
            <LuX className='h-6 w-6' />
          </button>
        </div>

        <ul className='mt-6 space-y-1'>
          {links.map((link, i) => (
            <li
              key={link.href}
              className='animate-fade-up'
              style={{ animationDelay: `${60 + i * 45}ms` }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold transition-colors ${
                  isActive(link.href.split('?')[0]) &&
                  link.label !== 'Management'
                    ? 'bg-primary/[0.07] text-primary'
                    : 'text-ink hover:bg-surface'
                }`}
              >
                {link.label}
                <LuArrowRight className='h-5 w-5 opacity-40' />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href='#footer'
          onClick={onClose}
          className='btn-primary group mt-6 w-full !py-3.5'
        >
          Contact us
          <LuArrowRight className='btn-arrow h-4 w-4' />
        </a>
      </div>
    </div>
  );
}
