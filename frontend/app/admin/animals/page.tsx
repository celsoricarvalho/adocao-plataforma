'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

async function fetchAnimals() {
  const res = await fetch('http://localhost:3000/animals?limit=100', {
    cache: 'no-store',
  });
  if (!res.ok) return { items: [] };
  return res.json();
}

export default function AdminAnimalsPage() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadAnimals() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAnimals();
      setAnimals(data.items ?? []);
    } catch (e) {
      setError('Erro ao carregar animais');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAnimals();
  }, []);

  async function handleDelete(id: number) {
    const confirma = window.confirm('Tem certeza que deseja excluir este animal?');
    if (!confirma) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado como ADMIN.');
      return;
    }

    const res = await fetch(`http://localhost:3000/animals/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert('Erro ao excluir animal (verifique se o usuário é ADMIN).');
      return;
    }

    // remove da lista sem recarregar a página
    setAnimals((current) => current.filter((a) => a.id !== id));
  }

  if (loading) {
    return <p className="text-sm text-gray-600">Carregando animais...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Animais cadastrados</h1>
        <Link
          href="/admin/animals/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded"
        >
          + Novo animal
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-4 md:grid-cols-3">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white rounded shadow p-3 text-sm flex flex-col">
            <img
              src={animal.mainPhotoUrl ?? '/placeholder.jpg'}
              alt={animal.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="font-semibold">{animal.name}</h2>
            <p className="text-xs text-gray-600">
              {animal.species} • {animal.size} • {animal.age} anos
            </p>
            <p className="text-xs mt-1 line-clamp-2 flex-1">{animal.description}</p>

            <div className="flex justify-between items-center mt-3 text-xs">
              <Link
                href={`/admin/animals/${animal.id}/edit`}
                className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(animal.id)}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        {animals.length === 0 && (
          <p className="text-sm text-gray-600 col-span-full">
            Nenhum animal cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
