// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GND",
  description: "Online alışveriş için modern e-ticaret uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        
        <main className="min-h-[calc(100vh-160px)] px-4 py-6 md:px-8 container mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
