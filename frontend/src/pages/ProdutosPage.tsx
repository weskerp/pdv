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
    const res = await fetch('http://localhost:3001/api/produtos');
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async () => {
    if (!nome || preco === '' || estoque === '') return alert('Preencha todos os campos.');

    if (editandoId !== null) {
      await fetch(`http://localhost:3001/api/produtos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco: Number(preco), estoque: Number(estoque) }),
      });
      setEditandoId(null);
    } else {
      await fetch('http://localhost:3001/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco: Number(preco), estoque: Number(estoque) }),
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} className="p-2 border" />
        <input type="number" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} className="p-2 border" />
        <input type="number" placeholder="Estoque" value={estoque} onChange={e => setEstoque(e.target.value)} className="p-2 border" />
      </div>

      <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded mb-4 w-full md:w-auto">
        {editandoId !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Estoque</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.nome}</td>
              <td className="border p-2">R$ {p.preco.toFixed(2)}</td>
              <td className="border p-2">{p.estoque}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
