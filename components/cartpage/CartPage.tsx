"use client";

import { useCart } from "@/context/CartContext";
import { Box, Typography, IconButton, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useState } from "react";
import CheckoutModal from "@/components/checkout/CheckoutModal";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [open, setOpen] = useState(false);

  // Sepetteki toplam tutar
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Ürün adedini artır
  const handleIncrement = (id: number) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;

    if (item.stock && item.quantity >= item.stock) {
      toast.warning(`Bu üründen maksimum ${item.stock} adet eklenebilir.`);
      return;
    }

    dispatch({ type: "INCREMENT", payload: id });
    toast.success("Ürün adedi artırıldı");
  };

  // Ürün adedini azalt (1'e inerse sepetten çıkar)
  const handleDecrement = (id: number) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      toast.info("Ürün sepetten kaldırıldı");
    } else {
      dispatch({ type: "DECREMENT", payload: id });
      toast.info("Ürün adedi azaltıldı");
    }
  };

  // Ürünü doğrudan sepetten çıkar
  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.error("Ürün sepetten kaldırıldı");
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Sepetim
      </Typography>

      {state.items.length === 0 ? (
        <Typography>Sepetinizde ürün bulunmuyor.</Typography>
      ) : (
        <>
          {state.items.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              mb={3}
              p={2}
              boxShadow={2}
              borderRadius={2}
            >
              {/* Ürün bilgileri */}
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", borderRadius: 8 }}
                />
                <Box>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography color="text.secondary">
                    {item.price} ₺ x {item.quantity} ={" "}
                    <strong>{(item.price * item.quantity).toFixed(2)} ₺</strong>
                  </Typography>
                </Box>
              </Box>

              {/* Butonlar */}
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={() => handleDecrement(item.id)}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  onClick={() => handleIncrement(item.id)}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemove(item.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 4 }} />

          <Box textAlign="right">
            <Typography variant="h6">
              Toplam Tutar: {total.toFixed(2)} ₺
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setOpen(true)}
            >
              Satın Al
            </Button>
          </Box>
        </>
      )}

      {/* Sipariş tamamlama modalı */}
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
