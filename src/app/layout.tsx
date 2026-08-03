export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css"
import { Navbar } from "../components/NavBar";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import Footer from "@/components/Footer";
import { logo } from "@/utils";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false // Prevent Font Awesome from adding its own CSS

const urbanist = localFont({
  src: [
    { path: "../../public/fonts/Urbanist-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Urbanist-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Urbanist-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Urbanist-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Urbanist-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Urbanist-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devstrike",
  description: "Empowering Innovation, Transforming Tomorrow",
  icons: "/assets/images/logo.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-sans antialiased bg-white">
        <Navbar />
        {children}
        <Footer
          logo={logo}
          address="House 9, Kobi Makaranta, Asokoro Extension, Guzape, Abuja, FCT, Nigeria"
          phone="+234 (0) 813 266 5650"
          email="devstrike.digtech@gmail.com"
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
