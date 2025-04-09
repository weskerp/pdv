import React, { useState, useEffect } from 'react';

export default function CaixaPage() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const finalizarVenda = () => {
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    fetch('http://localhost:3001/api/vendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itens: carrinho, total })
    }).then(() => {
      alert('Venda finalizada!');
      setCarrinho([]);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Caixa</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Produtos</h2>
          {produtos.map(p => (
            <div key={p.id} className="border p-2 mb-2">
              <p>{p.nome} - R${p.preco.toFixed(2)}</p>
              <button className="bg-green-500 text-white px-2" onClick={() => adicionarAoCarrinho(p)}>Adicionar</button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold mb-2">Carrinho</h2>
          {carrinho.map((item, index) => (
            <p key={index}>{item.nome} - R${item.preco.toFixed(2)}</p>
          ))}
          <p className="mt-2 font-bold">Total: R${carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2)}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2" onClick={finalizarVenda}>Finalizar Venda</button>
        </div>
      </div>
    </div>
  );
}