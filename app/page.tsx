"use client";

import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";


export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          backgroundImage: "url('/assets/images/banners/long-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          textAlign: "center",
          py: 10,
          height:"100vh"
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold">En İyi Ürünleri Keşfedin!</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Size özel kampanyalar ve indirimler için hemen alışverişe başlayın.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 4 }}>
            <Link href="/products" style={{ color: "inherit", textDecoration: "none" }}>
              Ürünleri Keşfet
            </Link>
          </Button>
        </Container>
      </Box>

      {/* Kategoriler ve Popüler Ürünler */}
    </Box>
  );
}

