"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Auth durumunu sağlayan context

// Bu bileşen, kullanıcı giriş yapmamışsa login sayfasına yönlendirme yapan bir koruma katmanıdır.
// Herhangi bir sayfayı bu bileşenle sarmalayarak sadece giriş yapmış kullanıcıların erişmesini sağlayabiliriz.
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth(); // Context'ten auth durumu alınır
  const router = useRouter();

  useEffect(() => {
    // Eğer kullanıcı giriş yapmamışsa "/login" sayfasına yönlendir
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Giriş yapılmamışken boş bir "Yükleniyor..." mesajı göster
  if (!isAuthenticated) {
    return <p>Yükleniyor...</p>; 
  }

  // Giriş yapılmışsa children (sayfa içeriği) render edilir
  return <>{children}</>;
}
