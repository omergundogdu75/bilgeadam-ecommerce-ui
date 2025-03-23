'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

export default function NewCategoryPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axiosClient.post('/categories', { name, description });
    router.push('/admin/category');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Kategori</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama" />
      <button type="submit">Ekle</button>
    </form>
  );
}
