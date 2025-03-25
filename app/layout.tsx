import type { Metadata } from "next"; 
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer"; 
import { Box } from "@mui/material";
import ThemeRegistry from "./ThemeRegistry";
import NavbarWrapper from "@/components/navbar/NavbarWrapper"; 
import { CartProvider } from "@/context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; 
import { AuthProvider } from "@/context/AuthContext"; 

// Google Font yapılandırması
const inter = Inter({ subsets: ["latin"] });

// Metadata, sayfa başlığı ve açıklaması
export const metadata: Metadata = {
  title: "GND",
  description: "Online alışveriş için modern e-ticaret uygulaması",
};

// Uygulamanın kök layout'u
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        {/* AuthProvider: kullanıcı oturum bilgisi sağlar */}
        <AuthProvider>
          {/* CartProvider: sepet state'ini global olarak sunar */}
          <CartProvider>
            {/* ThemeRegistry: MUI teması uygular */}
            <ThemeRegistry>
              {/* Navbar'ı saran wrapper (kategorileri vs. dinamik yükler) */}
              <NavbarWrapper />
              {/* Sayfa içeriği, overflow için Box kullanılmış */}
              <Box sx={{ overflowY: "auto" }}>{children}</Box>
              {/* Sayfa altındaki footer */}
              <Footer />
            </ThemeRegistry>
          </CartProvider>
        </AuthProvider>
        
        {/* Toast bildirimlerini göstermek için */}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
