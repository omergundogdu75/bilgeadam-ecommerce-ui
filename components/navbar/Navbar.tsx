"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  children?: Category[];
}

export default function Navbar({
  auth,
  onLogout,
  onLoginClick,
}: {
  auth: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
    setSubmenuAnchorEl(null);
  };

  const handleHover = (
    category: Category,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setHoveredCategory(category);
    setSubmenuAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" onClick={handleMainMenuOpen}>
          <MenuIcon />
        </IconButton> */}

        {/* Ana Menü */}
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMainMenuClose}
        >
          {categories.map((cat) => (
            <MenuItem
            key={cat.id}
            onMouseEnter={(e) => handleHover(cat, e)}
            onClick={handleMainMenuClose}
          >
            <Link
              href={`/category/${cat.slug}`}
              style={{ textDecoration: "none", color: "inherit", width: "100%" }}
            >
              {cat.name}
            </Link>
          </MenuItem>
          
          ))}
        </Menu> */}

        {/* Alt Kategoriler Hover Popover */}
        {/* <Popover
          open={Boolean(hoveredCategory?.children?.length && submenuAnchorEl)}
          anchorEl={submenuAnchorEl}
          onClose={() => {
            setHoveredCategory(null);
            setSubmenuAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          disableRestoreFocus
        >
          <Box sx={{ p: 1, minWidth: 200 }}>
            {hoveredCategory?.children?.map((sub) => (
              <MenuItem
              key={sub.id}
              onClick={handleMainMenuClose}
            >
              <Link
                href={`/category/${sub.slug}`}
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                {sub.name}
              </Link>
            </MenuItem>
            
            ))}
          </Box>
        </Popover> */}

        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            GND
          </Link>
        </Typography>

        {/* Giriş / Çıkış Butonları */}
        {auth ? (
          <Button color="inherit" onClick={onLogout}>
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
