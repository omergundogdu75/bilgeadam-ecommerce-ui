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
        <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
          <img
            src="https://maps.googleapis.com/maps/api/staticmap?center=41.0082,28.9784&zoom=14&size=800x400&markers=color:red%7Clabel:A%7C41.0082,28.9784&key=AIzaSyDKNE_seBEJkWZMZgS-_bvIMztEy-IVWR8"
            alt="Google Maps"
            width="100%"
            style={{ borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
