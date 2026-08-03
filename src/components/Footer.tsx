"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import {
  faXTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { API_URL } from '@/lib/api';

interface FooterProps {
  logo: string;
  address: string;
  phone: string;
  email: string;
}

const PRODUCT_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Careers', href: '/careers' },
  { label: 'Content', href: '/content' },
  { label: 'About Us', href: '/#our-identity' },
];

const SOCIAL_LINKS = [
  { icon: faXTwitter, name: 'X-Twitter', url: 'https://x.com/devstrikeltd' },
  { icon: faLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/devstrike-digital-limited/' },
  { icon: faGithub, name: 'GitHub', url: 'https://github.com/Devstrike-DigTech' },
  { icon: faInstagram, name: 'Instagram', url: 'https://www.instagram.com/devstrike.limited/profilecard/?igsh=MjR2OWEyamhvMnF4' },
  { icon: faWhatsapp, name: "What's App", url: 'https://wa.me/2348132665650' },
  { icon: faYoutube, name: 'Youtube', url: 'https://www.youtube.com/@devstrike' },
];

const Footer: React.FC<FooterProps> = ({ logo, address, phone, email }) => {
  const [formData, setFormData] = useState({
    contactType: '',
    name: '',
    email: '',
    message: ''
  });
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
      toast.success('Message sent successfully!');
      setFormData({ contactType: '', name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const inputClasses =
    'w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/15 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <footer id="footer" className="bg-ink text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] gap-10 lg:gap-12 mb-12">
          {/* Company info */}
          <div className="space-y-4">
            <Image
              src={logo}
              alt="Devstrike"
              width={56}
              height={56}
              className="rounded-lg object-cover"
            />
            <p className="text-xs tracking-widest text-gray-400">&lt;/dev strike&gt;</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Head Office: </span>
                  {address}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faPhone} className="mt-1 h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Phone: </span>
                  {phone}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="mt-1 h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Email: </span>
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Product
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Social
            </h3>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <FontAwesomeIcon
                      icon={social.icon as IconProp}
                      className="h-4 w-4 text-gray-400 transition-colors group-hover:text-white"
                    />
                    <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
                      {social.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact form */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Contact Form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                value={formData.contactType}
                onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                className={inputClasses}
                required
              >
                <option value="" className="text-black">Contact Type</option>
                <option value="enquiry" className="text-black">Enquiry</option>
                <option value="investment" className="text-black">Investment</option>
                <option value="service" className="text-black">Service</option>
              </select>

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
                required
              />

              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} min-h-[90px]`}
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/80 disabled:opacity-60"
              >
                {isLoading ? 'Sending…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        <div className="my-8 h-px bg-[#881B51]" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            © {currentYear} Devstrike. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm text-gray-400 transition-colors hover:text-white"
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
