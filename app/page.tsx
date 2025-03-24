"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Kategoriler alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold">
            En İyi Ürünleri Keşfedin!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Size özel kampanyalar ve indirimler için hemen alışverişe başlayın.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 4 }}>
            <Link
              href="/products"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Ürünleri Keşfet
            </Link>
          </Button>
        </Container>
      </Box>
      {/* Kategoriler */}
      <Container>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item 
            // xs={12} sm={6} md={4} lg={3} 
            key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                style={{ textDecoration: "none" }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={cat.imageUrl}
                    alt={cat.name}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mb: 1,
                    }}
                  />
                  <Typography variant="h6">{cat.name}</Typography>
                </CardContent>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
