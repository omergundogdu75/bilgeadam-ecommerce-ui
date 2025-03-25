"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { login as loginService } from "@/auth/authService";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await loginService(email, password);
      login(accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("Giriş başarılı 🎉");
      onClose();
    } catch (err) {
      toast.error("Giriş başarısız. Lütfen bilgileri kontrol edin.");
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
          <DialogActions sx={{ mt: 1 }}>
            <Button onClick={onClose}>İptal</Button>
            <Button type="submit" variant="contained">
              Giriş Yap
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
