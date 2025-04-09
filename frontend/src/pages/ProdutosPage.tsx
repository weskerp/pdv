import React, { useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState<number | string>('');
  const [estoque, setEstoque] = useState<number | string>('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const fetchProdutos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/produtos');
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async () => {
    if (!nome || preco === '' || estoque === '') {
      return alert('Preencha todos os campos.');
    }

    const payload = { nome, preco: Number(preco), estoque: Number(estoque) };

    if (editandoId !== null) {
      await fetch(`http://localhost:3001/api/produtos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditandoId(null);
    } else {
      await fetch('http://localhost:3001/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setNome('');
    setPreco('');
    setEstoque('');
    fetchProdutos();
  };

  const handleEdit = (produto: Produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setEditandoId(produto.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await fetch(`http://localhost:3001/api/produtos/${id}`, { method: 'DELETE' });
      fetchProdutos();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={e => setEstoque(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 transition-colors text-white p-3 rounded-md font-medium mb-6"
      >
        {editandoId !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">Nome</th>
              <th className="border p-3 text-left">Preço</th>
              <th className="border p-3 text-left">Estoque</th>
              <th className="border p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-3">{p.nome}</td>
                <td className="border p-3">R$ {p.preco.toFixed(2)}</td>
                <td className="border p-3">{p.estoque}</td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
