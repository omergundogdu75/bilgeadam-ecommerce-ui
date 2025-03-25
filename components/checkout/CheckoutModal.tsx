"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "@/lib/axiosClient";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const steps = ["Adres Bilgileri", "Ödeme Bilgileri", "Onay"];

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const { state, dispatch } = useCart();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Oturum geçersiz. Lütfen tekrar giriş yapın.");
          return;
        }

        const payload = {
          userId: 0,
          shipping: {
            name: form.name,
            email: form.email,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
          },
          payment: {
            cardNumber: form.cardNumber,
            cardMonth: form.cardMonth,
            cardYear: form.cardYear,
            cardCvv: form.cardCvv,
          },
          items: state.items.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        await axiosClient.post("/orders", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Sipariş başarıyla oluşturuldu 🎉");
        dispatch({ type: "SET_CART", payload: [] });
        onClose();
      } catch {
        toast.error("Sipariş oluşturulamadı");
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Ad Soyad" name="name" value={form.name} onChange={handleChange} />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
            <TextField label="Adres" name="address" value={form.address} onChange={handleChange} />
            <TextField label="Şehir" name="city" value={form.city} onChange={handleChange} />
            <TextField label="Posta Kodu" name="postalCode" value={form.postalCode} onChange={handleChange} />
          </Box>
        );
      case 1:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Kart Numarası" name="cardNumber" value={form.cardNumber} onChange={handleChange} />
            <Box display="flex" gap={2}>
              <TextField label="Ay" name="cardMonth" value={form.cardMonth} onChange={handleChange} />
              <TextField label="Yıl" name="cardYear" value={form.cardYear} onChange={handleChange} />
              <TextField label="CVV" name="cardCvv" value={form.cardCvv} onChange={handleChange} />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography>Bilgiler doğru mu? Sipariş tamamlanacak.</Typography>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </Box>
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Sipariş Oluştur</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Geri
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Siparişi Tamamla" : "İleri"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}