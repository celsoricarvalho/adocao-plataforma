'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AdminEditAnimalPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [mainPhotoUrl, setMainPhotoUrl] = useState('');
  const [photoUrls, setPhotoUrls] = useState('');

  useEffect(() => {
    async function loadAnimal() {
      try {
        const res = await fetch(`http://localhost:3000/animals/${id}`);
        if (!res.ok) {
          setError('Erro ao carregar dados do animal');
          setLoading(false);
          return;
        }
        const animal = await res.json();
        setName(animal.name ?? '');
        setSpecies(animal.species ?? '');
        setBreed(animal.breed ?? '');
        setAge(animal.age ?? '');
        setSize(animal.size ?? '');
        setGender(animal.gender ?? '');
        setDescription(animal.description ?? '');
        setMainPhotoUrl(animal.mainPhotoUrl ?? '');
        setPhotoUrls((animal.photoUrls ?? []).join(', '));
      } catch (e) {
        setError('Erro ao carregar dados do animal');
      }
      setLoading(false);
    }
    loadAnimal();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado como ADMIN.');
      setSaving(false);
      return;
    }

    const payload: any = {
      name,
      species,
      breed,
      age: age === '' ? undefined : Number(age),
      size,
      gender,
      description,
      mainPhotoUrl: mainPhotoUrl || null,
      photoUrls:
        photoUrls.trim().length > 0
          ? photoUrls.split(',').map((u) => u.trim())
          : [],
    };

    const res = await fetch(`http://localhost:3000/animals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      setError('Erro ao salvar alterações (verifique se o usuário é ADMIN).');
      return;
    }

    router.push('/admin/animals');
  }

  if (loading) {
    return <p className="text-sm text-gray-600">Carregando dados...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-4 space-y-4">
      <h1 className="text-2xl font-bold">Editar animal</h1>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">Espécie</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Raça</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block mb-1">Idade (anos)</label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block mb-1">Porte</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Sexo</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Descrição / personalidade</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">URL da foto principal</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={mainPhotoUrl}
            onChange={(e) => setMainPhotoUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">
            Outras fotos (URLs separadas por vírgula)
          </label>
          <input
            className="w-full border rounded px-2 py-1"
            value={photoUrls}
            onChange={(e) => setPhotoUrls(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </div>
  );
}
