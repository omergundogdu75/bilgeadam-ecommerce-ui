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
  CircularProgress
} from "@mui/material";
import Link from "next/link"; 
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient"; 
import { useCart } from "@/context/CartContext"; 
import { toast } from "react-toastify"; 
import { useParams } from "next/navigation"; 

// Kategori ve ürün tip tanımları
interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
  parent?: { id: number; name: string; slug: string };
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
}

export default function CategoryPage() {
  const { slug } = useParams(); // URL'den kategori slug'ını al
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useCart(); // Sepet context'inden ürün ekleme/çıkarma işlemleri

  // Kategori ve ürünleri çek
  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      const allCategories: Category[] = [];

      // Alt kategorileri düz liste haline getir
      res.data.forEach((cat) => {
        allCategories.push(cat);
        if (cat.children) {
          cat.children.forEach((child) => {
            allCategories.push({
              ...child,
              parent: { id: cat.id, name: cat.name, slug: cat.slug },
            });
          });
        }
      });

      // Slug'a göre kategori bul
      const found = allCategories.find((cat) => cat.slug === slug);

      if (found) {
        setCategory(found);

        // Ürünleri kategori ID'ye göre çek
        const prodRes = await axiosClient.get<Product[]>(
          `/products/category/${found.id}`
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
    if (slug) fetchCategoryAndProducts(); // Sayfa yüklendiğinde veya slug değiştiğinde verileri çek
  }, [slug]);

  // Ürünü sepete ekle
  const handleAddToCart = (prod: Product) => {
    const existingItem = state.items.find((item) => item.id === prod.id);
    const currentQuantity = existingItem?.quantity ?? 0;
    const stock = prod.stock ?? Infinity;

    if (currentQuantity >= stock) {
      toast.warning(`Bu üründen maksimum ${stock} adet sepete eklenebilir.`);
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

  // Yüklenme animasyonu göster
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
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
        <Grid container spacing={3} mb={4}>
          {category.children.map((sub) => (
            <Grid item key={sub.id}>
              <Link href={`/category/${sub.slug}`} passHref style={{ textDecoration: "none" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={sub.imageUrl || "/placeholder.png"}
                    alt={sub.name}
                    sx={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", mb: 1 }}
                  />
                  <Typography variant="h6">{sub.name}</Typography>
                </CardContent>
              </Link>
            </Grid>
          ))}
        </Grid>
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
                    sx={{ height: 350, objectFit: "contain" }}
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
    </Box>
  );
}
