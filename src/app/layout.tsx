import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css"
import { Navbar } from "../components/NavBar";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import Footer from "@/components/Footer";
import { logo } from "@/utils";
config.autoAddCss = false // Prevent Font Awesome from adding its own CSS


const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const urbanist = localFont({
  src: [{path: "../../public/fonts/Urbanist-BlackItalic.ttf",
    weight: "100 900",
  }],
  variable: "--font-urbanist"
});

export const metadata: Metadata = {
  title: "Devstrike",
  description: "Empowering Innovation, Transforming Tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist} antialiased bg-white`}
      >
        <Navbar />
        {children}
        <Footer
  logo={logo}
  address="123 Tech Street, Digital City, DC 12345"
  phone="+1 (234) 567-8900"
  email="contact@devstrike.com"
/>
      </body>
    </html>
  );
}
