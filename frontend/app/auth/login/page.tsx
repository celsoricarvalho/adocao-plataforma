'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError('Erro ao fazer login');
      return;
    }

    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    router.push('/dashboard');
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-4">
      <h1 className="text-xl font-bold mb-4">Entrar</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded text-sm"
        >
          Entrar
        </button>
      </form>
      <p className="text-xs mt-2">
        Não tem conta?{' '}
        <a href="/auth/register" className="text-blue-600 underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}