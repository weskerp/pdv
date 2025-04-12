import React, { useState, useEffect, useCallback } from 'react';

export default function ProdutosPage() {
  type Produto = {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
  };

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState<number | string>('');
  const [estoque, setEstoque] = useState<number | string>('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProdutos = async () => {
    try {
      if (filtro.trim() !== '') {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/produtos?search=${encodeURIComponent(filtro)}`);
        const data = await res.json();
        setProdutos(data.produtos);
        setHasMore(false);
        setTotal(data.total || data.produtos.length);
        setLoading(false);
      } else {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/produtos?page=${page}&limit=${perPage}`);
        const data = await res.json();
        setProdutos(data.produtos);
        setHasMore(data.hasMore);
        setTotal(data.total);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [page, filtro, perPage]);

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

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => [...prev, produto]);
  };

  const finalizarVenda = () => {
    const totalVenda = carrinho.reduce((acc, item) => acc + item.preco, 0);
    fetch('http://localhost:3001/api/vendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itens: carrinho, total: totalVenda }),
    }).then(() => {
      alert('Venda finalizada!');
      setCarrinho([]);
    });
  };

  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`transition-colors text-white p-3 rounded-md font-medium mb-6 ${
          page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        Anterior
      </button>
    );

    const startPage = Math.max(1, page - 3);
    for (let p = startPage; p < page; p++) {
      buttons.push(
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className="transition-colors bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-medium mb-6"
        >
          {p}
        </button>
      );
    }

    buttons.push(
      <button
        key={page}
        disabled
        className="transition-colors bg-blue-600 text-white p-3 rounded-md font-bold mb-6"
      >
        {page}
      </button>
    );

    const endPage = Math.min(totalPages, page + 3);
    for (let p = page + 1; p <= endPage; p++) {
      buttons.push(
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className="transition-colors bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-medium mb-6"
        >
          {p}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`transition-colors text-white p-3 rounded-md font-medium mb-6 ${
          page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        Próximo
      </button>
    );

    return buttons;
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

      <div className="mb-6">
        <label className="mr-2 font-medium">Itens por página:</label>
        <select
          value={perPage}
          onChange={e => {
            setPerPage(Number(e.target.value));
            setPage(1); // reinicia para a primeira página
          }}
          className="border rounded p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mb-6">
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

      <div className="flex flex-wrap gap-2 justify-center">
        {renderPaginationButtons()}
      </div>

      <div className="mt-4 text-center">
        <p>Página {page} de {totalPages} ({total} itens)</p>
      </div>
    </div>
  );
}
