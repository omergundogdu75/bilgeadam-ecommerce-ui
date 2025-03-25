"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  cardLast4: string;
  items: OrderItem[];
  createdAt: string;
}

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false); 
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true); 

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await axiosClient.get<Order[]>("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Siparişler alınamadı", err);
      }
    };

    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  if (!mounted) return null; 

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Geçmiş Siparişlerim
      </Typography>

      {orders.length === 0 ? (
        <Typography>Hiç siparişiniz bulunmamaktadır.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sipariş #{order.id} -{" "}
                    {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                  </Typography>

                  <Typography fontWeight="bold" mt={1}>
                    Adres:
                  </Typography>
                  <Typography variant="body2">
                    {order.name}, {order.address}, {order.city} - {order.postalCode}
                  </Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Ödeme:
                  </Typography>
                  <Typography variant="body2">
                    Kart Son 4 Hane: **** **** **** {order.cardLast4}
                  </Typography>

                  <Divider sx={{ my: 2 }} />
                  <Typography fontWeight="bold">Ürünler:</Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} variant="body2">
                      {item.name} x {item.quantity} - {item.price} ₺
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
