import type { Metadata } from "next";
import "@/app/globals.css"
import { Playfair_Display } from "next/font/google";

import Footer from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "True Texas Shine | Professional Cleaning Services",
  description: "Experience the sparkle of southern charm with top-tier home and office cleaning. Book your appointment today with True Texas Shine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${playfair.variable} antialiased flex-grow`}
      >
        <AdminNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

