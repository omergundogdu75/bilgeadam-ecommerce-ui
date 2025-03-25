"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axiosClient.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Siparişler alınamadı", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handleCancel = async () => {
    if (confirmDialog.id === null) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axiosClient.delete(`/orders/${confirmDialog.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfirmDialog({ open: false, id: null });
      fetchOrders();
      toast.success("Sipariş başarıyla iptal edildi ✅");
    } catch (err) {
      console.error("İptal hatası", err);
      toast.error("Sipariş iptali sırasında hata oluştu ❌");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sipariş No", width: 100 },
    { field: "name", headerName: "Ad Soyad", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "city", headerName: "Şehir", flex: 1 },
    { field: "status", headerName: "Durum", flex: 1 },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenDetails(params.row)}
            sx={{ mr: 1 }}
          >
            Detay
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => setConfirmDialog({ open: true, id: params.row.id })}
          >
            İptal
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={4} sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Sipariş Yönetimi
      </Typography>

      <TextField
        label="Ara (isim veya email)"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataGrid
        rows={filteredOrders}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Sipariş Detayı</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography>
                <strong>Ad Soyad:</strong> {selectedOrder.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedOrder.email}
              </Typography>
              <Typography>
                <strong>Adres:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postalCode}
              </Typography>
              <Typography>
                <strong>Ödeme:</strong> **** **** **** {selectedOrder.cardLast4}
              </Typography>
              <Typography>
                <strong>Durum:</strong> {selectedOrder.status}
              </Typography>
              <Typography mt={2} fontWeight="bold">Ürünler:</Typography>
              {selectedOrder.items.map((item: any, index: number) => (
                <Typography key={index} variant="body2">
                  {item.name} x {item.quantity} - {item.price} ₺
                </Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, id: null })}
      >
        <DialogTitle>İptal Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu siparişi iptal etmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Vazgeç</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Evet, İptal Et
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
