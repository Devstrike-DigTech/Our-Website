'use client';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer () {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Column 1: Business Info */}
          <div className="mb-6 lg:mb-0 lg:w-1/4">
            <h2 className="text-2xl font-bold">Energy Doctor</h2>
            <p className="mt-4 text-gray-400">
              Providing sustainable energy solutions to homes and businesses.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white text-gray-800 rounded-full flex justify-center items-center hover:bg-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white text-gray-800 rounded-full flex justify-center items-center hover:bg-gray-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white text-gray-800 rounded-full flex justify-center items-center hover:bg-gray-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: About */}
          <div className="mb-6 lg:mb-0 lg:w-1/4">
            <h3 className="text-xl font-semibold">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:underline">How it works
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-gray-400 hover:underline">Featured
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-400 hover:underline">Partnership
                </Link>
              </li>
              <li>
                <Link href="/business-relation" className="text-gray-400 hover:underline">Business Relation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Similar to About */}
          <div className="mb-6 lg:mb-0 lg:w-1/4">
            <h3 className="text-xl font-semibold">Community</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/solar-installation" className="text-gray-400 hover:underline">Events
                </Link>
              </li>
              <li>
                <Link href="/energy-consulting" className="text-gray-400 hover:underline">Blogs
                </Link>
              </li>
              <li>
                <Link href="/energy-saving" className="text-gray-400 hover:underline">Podcast
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="text-gray-400 hover:underline">Invite a friend
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Similar to About */}
          <div className="lg:w-1/4">
            <h3 className="text-xl font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:underline">FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:underline">Contact Us
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:underline">+234 (0) 812 345 6789
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-400 hover:underline">Sustainability
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-gray-400">
          <p>&copy; {currentYear} Energy Doctor. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:underline">Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
