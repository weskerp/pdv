import { useState } from 'react';
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
            navigate('/dashboard');
        } else {
            alert('Login inválido');
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-30 items-center flex rounded-lg">
                <div className="min-h-60 flex items-center justify-center bg-gray from-blue-100 via-white to-blue-200 px-4">
                    <div className="bg-gray w-full max-w-md rounded-2xl p-8 md:p-10 transition-all">
                        <div className="flex flex-col items-center mb-6">
                            <svg
                                className="h-16 w-16 text-white-600 mb-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c0 2.21-1.79 4-4 4S4 13.21 4 11s1.79-4 4-4 4 1.79 4 4zm6 0c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
                                />
                            </svg>
                            <h1 className="text-3xl font-bold text-white-800">Acessar</h1>
                            <p className="text-white-500 text-sm mt-1">Bem-vindo</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-blue-500">
                                    <i className="fas fa-envelope"></i>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Senha"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-blue-500">
                                    <i className="fas fa-lock"></i>
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                className="w-full text-white font-semibold py-2 rounded-lg transition duration-200"
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
