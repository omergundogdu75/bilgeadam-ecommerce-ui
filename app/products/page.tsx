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
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient"; 
import { useCart } from "@/context/CartContext"; 
import { toast } from "react-toastify"; 

// Kategori tipi
interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
}

// Ürün tipi
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
}

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]); // İlgili kategori datası
  const [products, setProducts] = useState<Product[]>([]); // Ürün listesi
  const { state, dispatch } = useCart(); // Sepet işlemleri için context hook

  // Sayfa ilk yüklendiğinde kategorileri ve ürünleri getir
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Kategorileri çek (şimdilik sadece kullanılmakta ama gelecekte filtreleme için kullanılabilir)
  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Kategoriler alınamadı:", err);
    }
  };

  // Ürünleri API'den getir (limitli - örneğin son 20 ürün)
  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get<Product[]>("/products?limit=20");
      setProducts(res.data);
    } catch (err) {
      console.error("Ürünler alınamadı:", err);
    }
  };

  // Sepete ürün ekleme işlemi
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

  // Render
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Ürünler
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
                {/* Ürün resmi */}
                {prod.imageUrl && (
                  <CardMedia
                    component="img"
                    image={prod.imageUrl}
                    alt={prod.name}
                    sx={{ height: 200, objectFit: "contain" }}
                  />
                )}

                {/* Ürün detayları */}
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
  );
};

export default Products;
