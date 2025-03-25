"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Mesajınız alındı! Ad: ${formData.name}, E-posta: ${formData.email}`);
    setFormData({ name: "", email: "", message: "" }); // Form sıfırlama
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/assets/images/logos/GND.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          textAlign: "center",
          py: 10,
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold">
            Bize Ulaşın
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Size yardımcı olmaktan memnuniyet duyarız.
          </Typography>
        </Container>
      </Box>

      {/* İletişim Bilgileri */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                İletişim Bilgilerimiz
              </Typography>
              <Typography variant="body1">📍 İstanbul, Türkiye</Typography>
              <Typography variant="body1">
                📧 omergundogdu75@gmail.com
              </Typography>
              <Typography variant="body1">📞 +90 538 283 68 73</Typography>
            </Paper>
          </Grid>

          {/* İletişim Formu */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Bize Mesaj Gönderin
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Adınız"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="E-Posta"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Mesajınız"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  required
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Gönder
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Google Harita (Statik Harita Resmi) */}
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Konumumuz
        </Typography>
        <Box
          sx={{
            maxWidth: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23640.207278123908!2d28.97678237149475!3d41.01901016026092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1742907175267!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Box>
  );
}
