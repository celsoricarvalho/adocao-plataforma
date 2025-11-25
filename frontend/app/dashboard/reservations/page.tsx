'use client';

import { useEffect, useState } from 'react';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function loadReservations() {
      if (!token) return;
      const res = await fetch('http://localhost:3000/reservations/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    }
    loadReservations();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Minhas reservas</h1>
      {reservations.length === 0 && (
        <p className="text-sm text-gray-600">Você ainda não fez reservas.</p>
      )}
      <ul className="space-y-2">
        {reservations.map((r) => (
          <li key={r.id} className="border rounded p-2 text-sm bg-white">
            <p className="font-semibold">{r.animal?.name}</p>
            <p className="text-xs text-gray-600">
              Status: {r.status} • Criado em: {new Date(r.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}