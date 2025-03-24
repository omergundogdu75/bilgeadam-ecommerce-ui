"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import axiosClient from "@/lib/axiosClient";

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: Category | null;
  imageUrl?: string;
  children?: Category[];
}

export default function CategoryTable() {
  const [rows, setRows] = React.useState<Category[]>([]);
  const [flatRows, setFlatRows] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState<Category | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [parentId, setParentId] = React.useState<number | null>(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const flattenCategories = (
    categories: Category[],
    parent: Category | null = null,
    seen = new Set<number>()
  ): Category[] => {
    let result: Category[] = [];
    for (const cat of categories) {
      if (seen.has(cat.id)) continue;
      seen.add(cat.id);

      const withParent = { ...cat, parent };
      result.push(withParent);

      if (cat.children?.length) {
        result = result.concat(
          flattenCategories(cat.children, withParent, seen)
        );
      }
    }
    return result;
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Category[]>("/categories");
      setRows(response.data);
      const flat = flattenCategories(response.data);
      setFlatRows(flat);
    } catch (error) {
      console.error("Kategoriler alınamadı", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCategoryName("");
    setParentId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (row: Category) => {
    setIsEditing(true);
    setSelectedRow(row);
    setCategoryName(row.name);
    setParentId(row.parent ? row.parent.id : null);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Silme hatası", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCategoryName("");
    setSelectedRow(null);
    setParentId(null);
  };

  const handleSave = async () => {
    const payload = {
      name: categoryName,
      parentId,
      imageUrl
    };

    try {
      if (isEditing && selectedRow) {
        await axiosClient.put(`/categories/${selectedRow.id}`, payload);
      } else {
        await axiosClient.post("/categories", payload);
      }
      fetchCategories();
      handleModalClose();
    } catch (error) {
      console.error("Kaydetme hatası", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Kategori Adı", flex: 1 },
    {
      field: "imageUrl",
      headerName: "Resim",
      flex: 1 ,
      renderCell: (params) => (
        params.row.imageUrl ? (
          <img
            src={params.row.imageUrl}
            alt={params.row.name}
            style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <Box display="flex"
          alignItems="center"
          justifyContent="left"
          width="100%"
          height="100%">Yok</Box>
        )
      ),
    },    
    {
      field: "slug",
      headerName: "Slug",
      width: 150,
    },
    {
      field: "parentName",
      headerName: "Üst Kategori",
      width: 200,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Typography>{params.row.parent?.name || "Yok"}</Typography>
        </Box>
      ),
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">Kategori Yönetimi</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>
          Kategori Ekle
        </Button>
      </Stack>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={flatRows}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          sx={{ height: "80vh" }}
        />
      )}

      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth>
        <DialogTitle>
          {isEditing ? "Kategori Güncelle" : "Yeni Kategori Ekle"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Kategori Adı"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            label="Resim URL"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Üst Kategori</InputLabel>
            <Select
              value={parentId ?? ""}
              label="Üst Kategori"
              onChange={(e) =>
                setParentId(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            >
              <MenuItem value="">(Ana Kategori)</MenuItem>
              {flatRows
                .filter((cat) => !cat.parent)
                .map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>İptal</Button>
          <Button variant="contained" onClick={handleSave}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
