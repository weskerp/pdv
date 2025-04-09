import React, { useState } from 'react';

export default function ConfiguracoesPage() {
  const [empresa, setEmpresa] = useState('Minha Empresa');
  const [cnpj, setCnpj] = useState('');

  const salvar = () => {
    alert(`Dados salvos:\nEmpresa: ${empresa}\nCNPJ: ${cnpj}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>
      <input type="text" placeholder="Nome da Empresa" value={empresa} onChange={e => setEmpresa(e.target.value)} className="w-full p-2 mb-2 border" />
      <input type="text" placeholder="CNPJ" value={cnpj} onChange={e => setCnpj(e.target.value)} className="w-full p-2 mb-4 border" />
      <button onClick={salvar} className="bg-blue-600 text-white w-full p-2">Salvar</button>
    </div>
  );
}