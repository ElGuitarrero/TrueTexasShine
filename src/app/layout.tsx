import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
