import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      navigate('/caixa');
    } else {
      alert('Login inválido');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login PDV</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-2 border" />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full rounded">Entrar</button>
    </div>
  );
}