"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // Kullanıcı bilgisi için

const steps = ["Adres Bilgileri", "Ödeme Bilgileri", "Onay"];

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const { state: cartState, dispatch } = useCart();
  const { user } = useAuth();

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

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.fullName,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const payload = {
          userId: user?.id,
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
          items: cartState.items.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        await axiosClient.post("/orders", payload);
        toast.success("Sipariş başarıyla oluşturuldu 🎉");
        dispatch({ type: "CLEAR_CART" });
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
            <TextField name="name" label="Ad Soyad" value={form.name} onChange={handleChange} />
            <TextField name="email" label="E-posta" value={form.email} onChange={handleChange} />
            <TextField name="address" label="Adres" value={form.address} onChange={handleChange} />
            <TextField name="city" label="Şehir" value={form.city} onChange={handleChange} />
            <TextField name="postalCode" label="Posta Kodu" value={form.postalCode} onChange={handleChange} />
          </Box>
        );
      case 1:
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField name="cardNumber" label="Kart Numarası" value={form.cardNumber} onChange={handleChange} />
            <Box display="flex" gap={2}>
              <TextField name="cardMonth" label="Ay" value={form.cardMonth} onChange={handleChange} />
              <TextField name="cardYear" label="Yıl" value={form.cardYear} onChange={handleChange} />
              <TextField name="cardCvv" label="CVV" value={form.cardCvv} onChange={handleChange} />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography>Bilgiler doğru mu?</Typography>
            <pre>{JSON.stringify(form, null, 2)}</pre>
            <Typography variant="h6" mt={2}>Toplam: {cartState.items.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₺</Typography>
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

        <Box display="flex" justifyContent="space-between" mt={4}>
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
