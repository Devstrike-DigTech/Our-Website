'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faXTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { LuArrowRight, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import { toast } from 'react-toastify';
import logo from '@/assets/images/logo.svg';
import { API_URL } from '@/lib/api';
import Aurora from './ui/Aurora';

interface FooterProps {
  address: string;
  phone: string;
  email: string;
}

const EXPLORE_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Careers', href: '/careers' },
  { label: 'Management', href: '/careers?view=management' },
  { label: 'Content', href: '/content' },
  { label: 'About us', href: '/#our-identity' },
];

const SOCIAL_LINKS = [
  { icon: faXTwitter, name: 'X (Twitter)', url: 'https://x.com/devstrikeltd' },
  {
    icon: faLinkedin,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/devstrike-digital-limited/',
  },
  {
    icon: faGithub,
    name: 'GitHub',
    url: 'https://github.com/Devstrike-DigTech',
  },
  {
    icon: faInstagram,
    name: 'Instagram',
    url: 'https://www.instagram.com/devstrike.limited/profilecard/?igsh=MjR2OWEyamhvMnF4',
  },
  { icon: faWhatsapp, name: 'WhatsApp', url: 'https://wa.me/2348132665650' },
  {
    icon: faYoutube,
    name: 'YouTube',
    url: 'https://www.youtube.com/@devstrike',
  },
];

const CONTACT_TYPES = [
  { value: 'enquiry', label: 'Enquiry' },
  { value: 'service', label: 'Service' },
  { value: 'investment', label: 'Investment' },
];

const EMPTY_FORM = { contactType: 'enquiry', name: '', email: '', message: '' };

const Footer: React.FC<FooterProps> = ({ address, phone, email }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      toast.success('Message sent — thank you for reaching out!');
      setFormData(EMPTY_FORM);
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactRows = [
    { icon: LuMapPin, label: 'Head office', value: address },
    {
      icon: LuPhone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
    },
    { icon: LuMail, label: 'Email', value: email, href: `mailto:${email}` },
  ];

  return (
    <footer
      id='footer'
      className='relative scroll-mt-24 overflow-hidden bg-ink-950 text-white'
    >
      <div className='opacity-60'>
        <Aurora />
      </div>

      <div className='container relative pb-10 pt-20 md:pt-28'>
        <div className='grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20'>
          <div>
            <span className='eyebrow-light'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
              Get in touch
            </span>
            <h2 className='mt-6 text-4xl font-extrabold leading-[1.05] md:text-5xl'>
              Let&apos;s build something{' '}
              <span className='text-gradient-light'>worth using.</span>
            </h2>
            <p className='mt-5 max-w-md text-lg leading-relaxed text-white/60'>
              Tell us about your idea, project, or partnership — the right
              person on our team will get back to you.
            </p>

            <ul className='mt-10 space-y-5'>
              {contactRows.map((row) => {
                const content = (
                  <>
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-pink-300 transition-colors group-hover:border-white/25'>
                      <row.icon className='h-5 w-5' />
                    </span>
                    <span>
                      <span className='block text-xs font-semibold uppercase tracking-wider text-white/40'>
                        {row.label}
                      </span>
                      <span className='mt-0.5 block text-[15px] text-white/85 transition-colors group-hover:text-white'>
                        {row.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={row.label}>
                    {row.href ? (
                      <a
                        href={row.href}
                        className='group flex items-start gap-4'
                      >
                        {content}
                      </a>
                    ) : (
                      <div className='group flex items-start gap-4'>
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className='mt-10 flex flex-wrap gap-2.5'>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white'
                >
                  <FontAwesomeIcon
                    icon={social.icon as IconProp}
                    className='h-4 w-4'
                  />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8'
          >
            <p className='text-sm font-semibold text-white/50'>
              I&apos;m reaching out about
            </p>
            <div className='mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-white/[0.05] p-1'>
              {CONTACT_TYPES.map((type) => {
                const active = formData.contactType === type.value;
                return (
                  <button
                    key={type.value}
                    type='button'
                    aria-pressed={active}
                    onClick={() =>
                      setFormData({ ...formData, contactType: type.value })
                    }
                    className={`rounded-xl py-2.5 text-sm font-bold transition-all duration-300 ${
                      active
                        ? 'bg-white text-ink shadow-lg'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>

            <div className='mt-5 grid gap-4 sm:grid-cols-2'>
              <label className='block'>
                <span className='mb-1.5 block text-sm font-semibold text-white/60'>
                  Name
                </span>
                <input
                  type='text'
                  placeholder='Ada Lovelace'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='input-dark'
                  required
                  minLength={2}
                />
              </label>
              <label className='block'>
                <span className='mb-1.5 block text-sm font-semibold text-white/60'>
                  Email
                </span>
                <input
                  type='email'
                  placeholder='you@company.com'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='input-dark'
                  required
                />
              </label>
            </div>

            <label className='mt-4 block'>
              <span className='mb-1.5 block text-sm font-semibold text-white/60'>
                Message
              </span>
              <textarea
                placeholder='Tell us a little about what you have in mind…'
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className='input-dark min-h-[140px] resize-y'
                required
                minLength={5}
              />
            </label>

            <button
              type='submit'
              disabled={isLoading}
              className='btn-primary group mt-6 w-full !py-3.5'
            >
              {isLoading ? 'Sending…' : 'Send message'}
              {!isLoading && <LuArrowRight className='btn-arrow h-4 w-4' />}
            </button>
          </form>
        </div>

        <div className='mt-20 flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-start md:justify-between'>
          <div>
            <Link href='/' className='flex items-center gap-2.5'>
              <Image src={logo} alt='' width={34} height={34} />
              <span className='text-lg font-extrabold tracking-tight'>
                devstrike
              </span>
            </Link>
            <p className='mt-2 font-mono text-xs tracking-widest text-white/35'>
              &lt;/dev strike&gt;
            </p>
          </div>

          <nav aria-label='Footer' className='flex flex-wrap gap-x-8 gap-y-3'>
            {EXPLORE_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='text-sm font-semibold text-white/55 transition-colors hover:text-white'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className='mt-10 flex flex-col items-start justify-between gap-4 text-sm text-white/40 md:flex-row md:items-center'>
          <p>
            © {new Date().getFullYear()} Devstrike Digital Limited. All rights
            reserved.
          </p>
          <div className='flex items-center gap-6'>
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className='transition-colors hover:text-white'
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
