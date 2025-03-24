"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      const allCategories: Category[] = [];

      // flatten all categories and children
      res.data.forEach((cat) => {
        allCategories.push(cat);
        if (cat.children) {
          cat.children.forEach((child) => {
            allCategories.push({
              ...child,
              parent: { id: cat.id, name: cat.name, slug: cat.slug }, // parent ekleniyor
            });
          });
        }
      });

      const found = allCategories.find((cat) => cat.slug === slug);

      if (found) {
        setCategory(found);

        // ürünler için istek yapılıyor
        const prodRes = await axiosClient.get<Product[]>(
          `/products?categorySlug=${slug}`
        );
        setProducts(prodRes.data);
      } else {
        setCategory(null);
        setProducts([]);
      }
    } catch (err) {
      console.error("Veri alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchCategoryAndProducts();
  }, [slug]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {category?.name} Kategorisi
      </Typography>

      {/* Alt Kategoriler */}
      {category?.children?.length ? (
        <>
          <Grid container spacing={3} mb={4} justifyContent="left">
            {category.children.map((sub) => (
              <Grid item 
              // xs={6} sm={4} md={3} 
              key={sub.id}>
                <Link
                  href={`/category/${sub.slug}`}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src={sub.imageUrl}
                      alt={sub.name}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                        mb: 1,
                      }}
                    />
                    <Typography variant="h6">{sub.name}</Typography>
                  </CardContent>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}

      {/* Ürünler */}
      <Typography variant="h6" gutterBottom>
        Ürünler
      </Typography>
      {products.length === 0 ? (
        <Typography>Bu kategoride ürün bulunamadı.</Typography>
      ) : (
        <Grid container spacing={3}>
        {products.map((prod) => (
          <Grid item key={prod.id} xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              {prod.imageUrl && (
                <CardMedia
                  component="img"
                  image={prod.imageUrl}
                  alt={prod.name}
                  sx={{
                    height: 350,
                    objectFit: "fit",
                  }}
                />
              )}
              <CardContent
                sx={{
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.price} ₺
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      )}
    </Box>
  );
}
