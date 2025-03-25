"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // ✅ AuthContext

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
}

export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { state } = useCart();
  const { isAuthenticated, logout } = useAuth(); // ✅ context'ten alındı
  const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);

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
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            GND
          </Link>
        </Typography>

        {/* Sepet Butonu */}
        <Link href="/cart">
          <IconButton color="inherit">
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>

        {/* Giriş / Çıkış */}
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>
            Çıkış Yap
          </Button>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>
            Giriş Yap
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
