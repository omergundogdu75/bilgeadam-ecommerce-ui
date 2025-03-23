"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import axiosClient from "@/lib/axiosClient";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: Category;
}

export default function ProductTable() {
  const [rows, setRows] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get<Product[]>("/products");
      setRows(res.data);
    } catch (err) {
      console.error("Ürünler alınamadı", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Kategoriler alınamadı", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setImageUrl("");
    setCategoryId("");
    setModalOpen(true);
  };

  const handleOpenEdit = (row: Product) => {
    setIsEditing(true);
    setSelectedRow(row);
    setName(row.name);
    setDescription(row.description);
    setPrice(row.price);
    setStock(row.stock);
    setImageUrl(row.imageUrl);
    setCategoryId(row.category.id);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Silme hatası", err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    const payload = {
      name,
      description,
      price,
      stock,
      imageUrl,
      categoryId,
    };
    try {
      if (isEditing && selectedRow) {
        await axiosClient.put(`/products/${selectedRow.id}`, payload);
      } else {
        await axiosClient.post("/products", payload);
      }
      fetchProducts();
      handleModalClose();
    } catch (err) {
      console.error("Kaydetme hatası", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Ürün Adı", flex: 1 },
    { field: "imageUrl", headerName: "Url", flex: 1 },
    { field: "price", headerName: "Fiyat", width: 100 },
    { field: "stock", headerName: "Stok", width: 100 },
    {
      field: "category",
      headerName: "Kategori",
      width: 150,
      valueGetter: (category) => {

        if (!category) return "-";
      
        const parentName = category.parent?.name ?? "";
        const name = category.name ?? "";
      
        if (parentName) {
          return `${parentName} -> ${name}`;
        }
        return name || "-";
      }
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Düzenle"
          onClick={() => handleOpenEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Sil"
          onClick={() => handleDelete(params.row.id)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: "90vh", width: "100%", p: 4 }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>
          Ürün Ekle
        </Button>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick sx={{ height: "80vh" }} />
      )}

      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Ürünü Güncelle" : "Yeni Ürün Ekle"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Ürün Adı" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Açıklama" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField label="Fiyat" type="number" fullWidth value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <TextField label="Stok" type="number" fullWidth value={stock} onChange={(e) => setStock(Number(e.target.value))} />
            <TextField label="Görsel URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={categoryId}
                label="Kategori"
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>İptal</Button>
          <Button variant="contained" onClick={handleSave}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}