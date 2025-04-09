import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuLateral() {
  return (
    <div className="bg-gray-800 text-white h-full w-full md:w-64 p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">PDV Web</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/caixa" className="hover:bg-gray-700 p-2 rounded">Caixa</Link>
        <Link to="/produtos" className="hover:bg-gray-700 p-2 rounded">Produtos</Link>
        <Link to="/relatorios" className="hover:bg-gray-700 p-2 rounded">Relatórios</Link>
        <Link to="/configuracoes" className="hover:bg-gray-700 p-2 rounded">Configurações</Link>
      </nav>
    </div>
  );
}
