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
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

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
  stock?: number;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { state, dispatch } = useCart();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Kategoriler alınamadı:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get<Product[]>("/products?limit=8");
      setProducts(res.data);
    } catch (err) {
      console.error("Ürünler alınamadı:", err);
    }
  };

  const handleAddToCart = (prod: Product) => {
    const existingItem = state.items.find((item) => item.id === prod.id);
    const currentQuantity = existingItem?.quantity ?? 0;
    const stock = prod.stock ?? Infinity;

    if (currentQuantity >= stock) {
      toast.warning(`Bu üründen maksimum ${stock} adet eklenebilir.`);
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        imageUrl: prod.imageUrl,
        quantity: 1,
        stock: prod.stock,
      },
    });

    toast.success("Ürün sepete eklendi ✅");
  };

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
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Kategoriler
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                style={{ textDecoration: "none" }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={cat.imageUrl || "/placeholder.png"}
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

      {/* Öne Çıkan Ürünler */}
      <Container >
        <Typography variant="h5" gutterBottom>
          Öne Çıkan Ürünler
        </Typography>
        {products.length === 0 ? (
          <Typography>Henüz ürün bulunamadı.</Typography>
        ) : (
          <Grid container spacing={3} sx={{ mb: 8 }}>
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
                        height: 200,
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {prod.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {prod.price} ₺
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleAddToCart(prod)}
                    >
                      Sepete Ekle
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
