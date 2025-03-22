// app/admin/layout.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin-auth") === "true";
    setAuth(isLoggedIn);

    if (!isLoggedIn && pathname !== "/admin") {
      router.replace("/admin");
    }

    if (isLoggedIn && pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  if (auth === null) return null; // loading...

  return <>{children}</>;
}
457850
