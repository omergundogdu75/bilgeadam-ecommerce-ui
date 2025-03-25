// Bu dosya client tarafında render edilen bir layout bileşenidir
"use client";

// Gerekli React ve MUI kütüphaneleri import ediliyor
import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Tema ve layout bileşenleri
import AppTheme from "@/components/shared-theme/AppTheme"; // Uygulamanın tema sağlayıcısı
import SideMenu from "@/components/admin/components/SideMenu"; // Sol menü (navigasyon)
import AppNavbar from "@/components/admin/components/AppNavbar"; // Üst menü barı

// MUI bileşenleri için özel tema özelleştirmeleri import ediliyor
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/components/admin/theme/customizations";

// Tüm özelleştirmeleri tek bir nesnede birleştiriyoruz
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// Admin paneli için layout bileşeni
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppTheme themeComponents={xThemeComponents}> {/* Tema sağlayıcı */}
      <CssBaseline enableColorScheme /> {/* Tarayıcılar arası tutarlı CSS ve dark/light desteği */}
      <Box sx={{ display: "flex" }}> {/* Ana düzen (yatay) */}
        <SideMenu /> {/* Sol navigasyon menüsü */}
        <AppNavbar /> {/* Üstteki navbar */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1, // İçerik genişlesin
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto", // Taşma olursa scroll
          })}
        >
          {children} {/* Sayfa içeriği buraya yerleşir */}
        </Box>
      </Box>
    </AppTheme>
  );
}
