import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Box } from "@mui/material";
import ThemeRegistry from "./ThemeRegistry";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";

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
      <body>
        <NavbarWrapper />
        <Box>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Box>
        <Footer />
      </body>
    </html>
  );
}
