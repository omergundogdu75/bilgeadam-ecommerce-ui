"use client";

import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function AboutPage() {
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
            Hakkımızda
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            E-Ticarette Güven ve Kalitenin Adresi
          </Typography>
        </Container>
      </Box>

      {/* Şirket Hakkında */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          Şirketimiz Hakkında
        </Typography>
        <Typography variant="body1" textAlign="center" maxWidth="md" mx="auto">
          2025 yılında kurulan e-ticaret platformumuz, en kaliteli ürünleri en uygun fiyatlarla sunmayı hedeflemektedir.
          Müşterilerimize geniş ürün yelpazesi ve hızlı teslimat seçenekleriyle hizmet vermekteyiz.
        </Typography>
      </Container>

      {/* Misyon & Vizyon */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Misyonumuz
              </Typography>
              <Typography variant="body1">
                Müşteri memnuniyetini en üst seviyede tutarak kaliteli ve uygun fiyatlı ürünleri sunmak.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Vizyonumuz
              </Typography>
              <Typography variant="body1">
                Türkiye’nin en güvenilir ve tercih edilen e-ticaret platformu olmak.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Ekip Tanıtımı */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          Ekibimiz
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: "ÖMER GÜNDOĞDU", role: "CEO & Kurucu & Mechatronics Engineer", image: "/assets/images/team/omergundogdu.jpg" },
            { name: "Zeynep Kaya", role: "Operasyon Müdürü", image: "/assets/images/team/17.jpg" },
            { name: "Mehmet Demir", role: "Teknik Direktör", image: "/assets/images/team/10.jpg" },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardMedia component="img" height="400" image={member.image} alt={member.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* İletişim Bilgileri */}
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          İletişim
        </Typography>
        <Typography variant="body1">📍 İstanbul, Türkiye</Typography>
        <Typography variant="body1">📧 omergundogdu75@gmail.com</Typography>
        <Typography variant="body1">📞 +90 538 283 68 73</Typography>
      </Container>
    </Box>
  );
}
