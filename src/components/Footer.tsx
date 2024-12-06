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
  faTwitter, 
  faLinkedin, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { toast } from 'react-toastify';

interface FooterProps {
  logo: string;
  address: string;
  phone: string;
  email: string;
}

interface ContactFormData {
  contactType: string;
  name: string;
  email: string;
  message: string;
}


const Footer: React.FC<FooterProps> = ({
  logo,
  address,
  phone,
  email
}) => {
  const [formData, setFormData] = useState({
    contactType: '',
    name: '',
    email: '',
    message: ''
  });
   const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await addDoc(collection(db, 'contacts'), formData);
      setIsSuccess(true);
      toast.success('Message sent successfully!');
      setFormData({ contactType: '', name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      setIsError(true);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    // Handle form submission
    // console.log(formData);
  

  const currentYear = new Date().getFullYear();

  const socialLinks = [
  { icon: faTwitter, name: "Twitter", url: "https://x.com/devstrikeltd" },
  { icon: faLinkedin, name: "LinkedIn", url: "https://www.linkedin.com/in/devstrike-digital-limited/" },
  { icon: faGithub, name: "GitHub", url: "https://github.com/Devstrike-DigTech" },
  { icon: faInstagram, name: "Instagram", url: "https://www.instagram.com/devstrike.limited/profilecard/?igsh=MjR2OWEyamhvMnF4" }
];

  return (
    <footer id='footer' className="bg-[#1B1831] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info Column */}
          <div className="space-y-4">
             <Image
        src={logo}
        alt="Devstrike"
        width={60}
        height={60}
        className="object-cover rounded-lg"
      />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-300">{address}</p>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-300">{phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-300">{email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Projects', 'Careers', 'Contents'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
      <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
      <div className="flex flex-wrap gap-4 lg:flex-col lg:items-start">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url} // Set the actual link for each social media
            className="flex items-center group"
            target="_blank" // Open the link in a new tab
            rel="noopener noreferrer" // Add security measures when opening the link
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors duration-200">
              <FontAwesomeIcon icon={social.icon as any} className="w-5 h-5 text-white" />
            </div>
            <span className="hidden lg:block ml-3 text-white group-hover:text-gray-600">
              {social.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
          {/* Contact Form Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.contactType}
                onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary"
                required
              >
                <option value="">Select Contact Type</option>
                <option value="enquiry">Enquiry</option>
                <option value="investment">Investment</option>
                <option value="service">Service</option>
              </select>

              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary"
                required
              />

              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary min-h-[100px]"
                required
              />

              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 
                         rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
            <>
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 2.577 1.032 4.911 2.709 6.709l1.291-1.418z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#881B51] my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Devstrike. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Terms', 'Conditions', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
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