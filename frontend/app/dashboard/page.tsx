'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function loadMe() {
      if (!token) return;
      const res = await fetch('http://localhost:3000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    loadMe();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Meu Painel</h1>
      {user ? (
        <div className="space-y-2">
          <p className="text-sm">Olá, {user.name}</p>
          <p className="text-xs text-gray-600">E-mail: {user.email}</p>
          <p className="text-xs text-gray-600">Papel: {user.role}</p>
          <div className="space-x-2 mt-2 text-sm">
            <a href="/dashboard/reservations" className="underline">
              Minhas reservas
            </a>
            <a href="/dashboard/appointments" className="underline">
              Meus agendamentos
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          Você precisa entrar para ver seu painel.
        </p>
      )}
    </div>
  );
}