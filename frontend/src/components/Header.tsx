// Header.tsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel de Controle</h1>
        <nav className="space-x-4">
          <Link to="/home">Dashboard</Link>
          <Link to="/produtos">Produtos</Link>
        </nav>
      </div>
    </header>
  );
}
