"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function LoginModal({ open, onClose, onLogin }: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "test@gnd.com" && password === "123456") {
      onLogin();
      onClose();
    } else {
      alert("Hatalı giriş bilgileri");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Giriş Yap</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Şifre"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DialogActions>
            <Button onClick={onClose}>İptal</Button>
            <Button type="submit" variant="contained">Giriş Yap</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
