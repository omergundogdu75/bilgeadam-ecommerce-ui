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
import SignUp from "../sign-up/SignUp";

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
  const [openRegister, setOpenRegister] = useState(false);

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
    <>
      {/* Giriş Modal */}
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
            <DialogActions sx={{ mt: 1, justifyContent: "space-between" }}>
              <Button onClick={onClose}>İptal</Button>
              <Button type="submit" variant="contained">
                Giriş Yap
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        <Box textAlign="center" pb={2}>
          <Button variant="text" onClick={() => {
            onClose();
            setOpenRegister(true);
          }}>
            Hesabınız yok mu? Kayıt olun
          </Button>
        </Box>
      </Dialog>

      {/* Kayıt Modal */}
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)} >
        <SignUp onClose={() => setOpenRegister(false)}/>
      </Dialog>
    </>
  );
}