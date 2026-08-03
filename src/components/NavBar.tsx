'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUserTie } from '@fortawesome/free-solid-svg-icons';
import logo from '@/assets/images/logo.svg';
import { IoIosArrowDown } from 'react-icons/io';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Content', href: '/content' },
];

const CAREER_ITEMS = [
  {
    label: 'Vacancies',
    description: 'Open roles across our project teams.',
    href: '/careers',
    icon: faBriefcase,
  },
  {
    label: 'Management',
    description: 'Meet the people leading Devstrike.',
    href: '/careers?view=management',
    icon: faUserTie,
  },
];

function linkClasses(active: boolean) {
  return `mx-2 font-semibold transition-colors ${
    active ? 'text-primary' : 'text-black hover:text-primary'
  }`;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div
        ref={animationParent}
        className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 lg:px-8"
      >
        <Link href="/" aria-label="Devstrike home">
          <Image src={logo} alt="Devstrike" width={52} height={52} priority />
        </Link>

        {isOpen && <MobileNav closeSideMenu={() => setIsOpen(false)} />}

        {/* Desktop navigation */}
        <div className="hidden items-center md:flex">
          <Link href="/" className={linkClasses(pathname === '/')}>
            Home
          </Link>
          <Link
            href="/projects"
            className={linkClasses(pathname.startsWith('/projects'))}
          >
            Projects
          </Link>

          {/* Careers dropdown */}
          <div className="group relative px-2 py-3">
            <Link
              href="/careers"
              className={`flex items-center gap-1.5 font-semibold transition-colors ${
                pathname.startsWith('/careers')
                  ? 'text-primary'
                  : 'text-black group-hover:text-primary'
              }`}
            >
              <span>Careers</span>
              <IoIosArrowDown className="transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute left-1/2 top-full hidden w-72 -translate-x-1/2 flex-col gap-1 rounded-xl border border-gray-100 bg-white p-2 shadow-lg group-hover:flex">
              {CAREER_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50"
                >
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-primary" />
                  </span>
                  <span>
                    <p className="font-bold text-black">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/content"
            className={linkClasses(pathname.startsWith('/content'))}
          >
            Content
          </Link>
        </div>

        <div className="hidden md:block">
          <a
            href="#footer"
            className="rounded-md bg-brand-gradient-b px-5 py-2.5 font-bold text-white shadow-md transition-opacity hover:opacity-90"
          >
            Contact Us
          </a>
        </div>

        <BiMenuAltRight
          onClick={() => setIsOpen(true)}
          className="cursor-pointer text-4xl text-black md:hidden"
          aria-label="Open menu"
        />
      </div>
    </nav>
  );
};

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const [careersOpen, setCareersOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[75%] max-w-xs overflow-y-auto bg-white px-5 py-5">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-3xl text-black"
            aria-label="Close menu"
          />
        </div>

        <div ref={animationParent} className="mt-4 flex flex-col gap-1">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSideMenu}
              className="rounded-lg px-3 py-2.5 font-bold text-black hover:bg-gray-50 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setCareersOpen(!careersOpen)}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left font-bold text-black hover:bg-gray-50"
          >
            <span>Careers</span>
            <IoIosArrowDown
              className={`transition-transform ${careersOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {careersOpen && (
            <div className="ml-2 flex flex-col">
              {CAREER_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeSideMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-black">{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/content"
            onClick={closeSideMenu}
            className="rounded-lg px-3 py-2.5 font-bold text-black hover:bg-gray-50 hover:text-primary"
          >
            Content
          </Link>
        </div>

        <a
          href="#footer"
          onClick={closeSideMenu}
          className="mt-6 block rounded-md bg-brand-gradient-b px-4 py-2.5 text-center font-bold text-white shadow-md"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
