import { useEffect, useState } from 'react';

export default function RelatoriosPage() {
  type Venda = {
    id: number;
    total: number;
    data: Date;
    nome: string;
    preco: number;
    estoque: number;
  };
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/vendas')
      .then(res => res.json())
      .then(data => setVendas(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Relatórios de Vendas</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Data</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id}>
              <td className="p-2 border">{venda.id}</td>
              <td className="p-2 border">R${venda.total.toFixed(2)}</td>
              <td className="p-2 border">{new Date(venda.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}