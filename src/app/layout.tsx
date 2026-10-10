export const dynamic = 'force-dynamic';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { Navbar } from '../components/NavBar';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false; // Prevent Font Awesome from adding its own CSS

const urbanist = localFont({
  src: [
    {
      path: '../../public/fonts/Urbanist-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Urbanist-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Urbanist-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Urbanist-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Urbanist-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Devstrike — Empowering Innovation, Transforming Tomorrow',
    template: '%s',
  },
  description:
    'Devstrike Digital Limited builds web platforms, mobile apps, and digital products that solve real problems — engineered the tech way.',
  icons: '/assets/images/logo.svg',
  openGraph: {
    type: 'website',
    siteName: 'Devstrike Digital Limited',
    title: 'Devstrike — Empowering Innovation, Transforming Tomorrow',
    description:
      'Web platforms, mobile apps, and digital products that solve real problems — engineered the tech way.',
    images: ['/assets/images/webdemo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1B1831',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={urbanist.variable}>
      <body className='font-sans antialiased'>
        <noscript>
          <style>
            {'.reveal{opacity:1!important;transform:none!important}'}
          </style>
        </noscript>
        <Navbar />
        {children}
        <Footer
          address='House 9, Kobi Makaranta, Asokoro Extension, Guzape, Abuja, FCT, Nigeria'
          phone='+234 (0) 813 266 5650'
          email='devstrike.digtech@gmail.com'
        />
        <ToastContainer position='bottom-right' autoClose={3500} theme='dark' />
      </body>
    </html>
  );
}
