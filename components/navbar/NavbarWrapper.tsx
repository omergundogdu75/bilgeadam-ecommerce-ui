"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import LoginModal from "@/components/login/LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function NavbarWrapper() {
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <Navbar
        auth={isAuthenticated}
        onLogout={logout}
        onLoginClick={() => setLoginOpen(true)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}
