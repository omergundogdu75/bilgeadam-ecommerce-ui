// app/admin/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin-auth") === "true";
    if (!isLoggedIn) {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    router.replace("/admin");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hoş geldin, Admin!
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </Box>
  );
}
