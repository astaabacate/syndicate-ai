import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardFinanceiro from './components/DashboardFinanceiro';
import ListaProdutos from './components/ListaProdutos';
import VisualizadorProdutoModal from './components/VisualizadorProdutoModal';
import NovoProdutoModal from './components/NovoProdutoModal';
import ManualOperacaoModal from './components/ManualOperacaoModal';
import { PRODUTOS_DIGITAIS } from './data/produtosData';

export default function App() {
  const [produtos, setProdutos] = useState(() => {
    const salvo = localStorage.getItem('produtos_digitais_v1');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao carregar produtos salvos", e);
      }
    }
    return PRODUTOS_DIGITAIS;
  });

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarNovoModal, setMostrarNovoModal] = useState(false);
  const [mostrarManualModal, setMostrarManualModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('produtos_digitais_v1', JSON.stringify(produtos));
  }, [produtos]);

  const handleCriarProduto = (novo) => {
    setProdutos(prev => [novo, ...prev]);
    setProdutoSelecionado(novo);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Topo Limpo e Minimalista */}
      <Header
        onAbrirManual={() => setMostrarManualModal(true)}
        onCriarNovo={() => setMostrarNovoModal(true)}
      />

      {/* Conteúdo Central */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-5 space-y-4 pb-16">
        {/* Painel Financeiro */}
        <DashboardFinanceiro produtos={produtos} />

        {/* Catálogo de Produtos Prontos */}
        <ListaProdutos
          produtos={produtos}
          onSelecionarProduto={(prod) => setProdutoSelecionado(prod)}
        />
      </main>

      {/* Modal de Visualização Completa do Produto */}
      {produtoSelecionado && (
        <VisualizadorProdutoModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
        />
      )}

      {/* Modal de Criação de Novo Produto com IA */}
      {mostrarNovoModal && (
        <NovoProdutoModal
          onClose={() => setMostrarNovoModal(false)}
          onCriarProduto={handleCriarProduto}
        />
      )}

      {/* Modal do Manual de Operação e Ganhos */}
      {mostrarManualModal && (
        <ManualOperacaoModal
          onClose={() => setMostrarManualModal(false)}
        />
      )}
    </div>
  );
}
