'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    axiosClient.get(`/categories/${id}`)
      .then(res => setCategory(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axiosClient.put(`/categories/${id}`, category);
    router.push('/admin/category');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kategori Güncelle</h2>
      <input value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
      <input value={category.description} onChange={(e) => setCategory({ ...category, description: e.target.value })} />
      <button type="submit">Kaydet</button>
    </form>
  );
}
