"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import LoginModal from "@/components/login/LoginModal";

export default function NavbarWrapper() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();

  // /admin ile başlayan sayfalarda Navbar gösterme
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Navbar
        auth={auth}
        onLogout={() => setAuth(false)}
        onLoginClick={() => setLoginOpen(true)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => setAuth(true)}
      />
    </>
  );
}
