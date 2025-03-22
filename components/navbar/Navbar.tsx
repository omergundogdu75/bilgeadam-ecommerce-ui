"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar({ auth, onLogout, onLoginClick }: {
  auth: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/products">Ürünler</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/category/supplements">Takviye Edici Gıdalar</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/category/cosmetics">Kozmetik</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/category/medical">Medikal</Link>
          </MenuItem>
        </Menu>

        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>GND</Link>
        </Typography>

        {auth ? (
          <Button color="inherit" onClick={onLogout}>Çıkış Yap</Button>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>Giriş Yap</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
