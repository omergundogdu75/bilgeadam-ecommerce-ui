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
  Stack,
  TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import axiosClient from "@/lib/axiosClient";

interface Brand {
  id: number;
  name: string;
  description: string;
}

export default function BrandTable() {
  const [rows, setRows] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Brand | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get<Brand[]>("/brands");
      setRows(res.data);
    } catch (err) {
      console.error("Markalar alınamadı", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setName("");
    setDescription("");
    setModalOpen(true);
  };

  const handleOpenEdit = (row: Brand) => {
    setIsEditing(true);
    setSelectedRow(row);
    setName(row.name);
    setDescription(row.description);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/brands/${id}`);
      fetchBrands();
    } catch (err) {
      console.error("Silme hatası", err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    const payload = { name, description };
    try {
      if (isEditing && selectedRow) {
        await axiosClient.put(`/brands/${selectedRow.id}`, payload);
      } else {
        await axiosClient.post("/brands", payload);
      }
      fetchBrands();
      handleModalClose();
    } catch (err) {
      console.error("Kaydetme hatası", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Marka Adı", flex: 1 },
    { field: "description", headerName: "Açıklama", flex: 2 },
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
          Marka Ekle
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
        <DialogTitle>{isEditing ? "Marka Güncelle" : "Yeni Marka Ekle"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Marka Adı" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Açıklama" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
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
