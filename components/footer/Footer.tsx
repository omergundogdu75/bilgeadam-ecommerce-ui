"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LinkedIn } from "@mui/icons-material";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // /admin ile başlayan sayfalarda Navbar gösterme
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "white", padding: 5 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Kategoriler */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Kategoriler</Typography>
            <Link
              href="/category/supplements"
              color="inherit"
              underline="none"
              display="block"
            >
              Takviye Edici Gıdalar
            </Link>
            <Link
              href="/category/cosmetics"
              color="inherit"
              underline="none"
              display="block"
            >
              Kozmetik
            </Link>
            <Link
              href="/category/medical"
              color="inherit"
              underline="none"
              display="block"
            >
              Medikal
            </Link>
            <Link
              href="/category/sports"
              color="inherit"
              underline="none"
              display="block"
            >
              Sporcu Sağlığı
            </Link>
          </Grid>

          {/* Hakkımızda */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Hakkımızda</Typography>
            <Link
              href="/about"
              color="inherit"
              underline="none"
              display="block"
            >
              Şirket Bilgileri
            </Link>
            <Link
              href="/contact"
              color="inherit"
              underline="none"
              display="block"
            >
              İletişim
            </Link>
            <Link href="/faq" color="inherit" underline="none" display="block">
              Sıkça Sorulan Sorular
            </Link>
            <Link
              href="/admin"
              color="inherit"
              underline="none"
              display="block"
            >
              Admin Login
            </Link>
          </Grid>

          {/* Sosyal Medya */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Bizi Takip Edin</Typography>
            <IconButton
              href="https://facebook.com/omergundogdu75"
              target="_blank"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com/omergundogdu75"
              target="_blank"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/omergundogdu75"
              target="_blank"
              color="inherit"
            >
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} OMER GUNDOGDU | Tüm Hakları Saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
