"use client";

import { Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation"; // router yönlendirmeleri için
import { useEffect, useState } from "react";

// Bu layout, /admin altındaki tüm sayfaların sarmalayıcısıdır.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();               // yönlendirme işlemleri için
  const pathname = usePathname();           // şu anki sayfa yolunu alır
  const [auth, setAuth] = useState<boolean | null>(null); // auth kontrol durumu

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin-auth") === "true"; // localStorage üzerinden admin giriş kontrolü
    setAuth(isLoggedIn); // state'e aktarılır

    // Giriş yapılmamışsa ve login sayfasında değilsek → login sayfasına yönlendir
    if (!isLoggedIn && pathname !== "/admin") {
      router.replace("/admin");
    }

    // Giriş yapılmışsa ve hala login sayfasındaysak → dashboard'a yönlendir
    if (isLoggedIn && pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  // auth null ise henüz localStorage kontrolü yapılmamış demektir → geçici olarak boş render
  if (auth === null) return null;

  // Eğer her şey uygunsa, ilgili admin alt sayfa içeriğini children olarak render et
  return <Box sx={{ height: "100vh" }}>{children}</Box>;
}
