import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CaixaPage from './pages/CaixaPage';
import ProdutosPage from './pages/ProdutosPage';
import RelatoriosPage from './pages/RelatoriosPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';
import DashboardPage from './pages/DashBoardPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/caixa" element={<CaixaPage />} />
      <Route path="/produtos" element={<ProdutosPage />} />
      <Route path="/relatorios" element={<RelatoriosPage />} />
      <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      <Route path="/home" element={<DashboardPage />} />
    </Routes>
  );
}
