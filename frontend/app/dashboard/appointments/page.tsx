'use client';

import { useEffect, useState } from 'react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function loadAppointments() {
      if (!token) return;
      const res = await fetch('http://localhost:3000/appointments/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    }
    loadAppointments();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Meus agendamentos</h1>
      {appointments.length === 0 && (
        <p className="text-sm text-gray-600">Você ainda não tem agendamentos.</p>
      )}
      <ul className="space-y-2">
        {appointments.map((a) => (
          <li key={a.id} className="border rounded p-2 text-sm bg-white">
            <p className="font-semibold">{a.animal?.name}</p>
            <p className="text-xs text-gray-600">
              Tipo: {a.type} • Status: {a.status}
            </p>
            <p className="text-xs text-gray-600">
              Data: {new Date(a.date_time).toLocaleString()} • Local: {a.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}