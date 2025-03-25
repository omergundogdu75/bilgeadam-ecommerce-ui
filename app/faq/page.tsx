"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FaqPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
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
            Sıkça Sorulan Sorular
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
          </Typography>
        </Container>
      </Box>

      {/* FAQ Bölümü */}
      <Container sx={{ py: 5, maxWidth: "800px" }}>
        {[
          { 
            question: "Siparişimi nasıl takip edebilirim?", 
            answer: "Sipariş takibinizi 'Hesabım > Siparişlerim' sekmesinden yapabilirsiniz." 
          },
          { 
            question: "İade ve değişim işlemleri nasıl yapılıyor?", 
            answer: "Siparişinizi teslim aldıktan sonra 14 gün içinde iade edebilir veya değişim yapabilirsiniz. Detaylar için İade Politikamızı inceleyin." 
          },
          { 
            question: "Ödeme yöntemleri nelerdir?", 
            answer: "Kredi kartı, banka havalesi ve kapıda ödeme seçeneklerimiz mevcuttur." 
          },
          { 
            question: "Ürünleriniz orijinal mi?", 
            answer: "Evet, tüm ürünlerimiz orijinal ve üretici firmalar tarafından garanti altındadır." 
          },
          { 
            question: "Müşteri hizmetlerine nasıl ulaşabilirim?", 
            answer: "Bize omergundogdu75@gmail.com adresinden veya +90 538 283 68 73 numaralı telefondan ulaşabilirsiniz." 
          },
        ].map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
