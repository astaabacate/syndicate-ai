import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PainelVendasReais from './components/PainelVendasReais';
import ListaProdutosReais from './components/ListaProdutosReais';
import ModalProduto from './components/ModalProduto';
import ModalCriar from './components/ModalCriar';
import ModalExplicacao from './components/ModalExplicacao';
import { PRODUTOS_INICIAIS } from './data/produtosReais';

export default function App() {
  const [produtos, setProdutos] = useState(() => {
    const salvo = localStorage.getItem('produtos_reais_v2');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    }
    return PRODUTOS_INICIAIS;
  });

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalAjudaAberto, setModalAjudaAberto] = useState(false);

  useEffect(() => {
    localStorage.setItem('produtos_reais_v2', JSON.stringify(produtos));
  }, [produtos]);

  const handleCriarProduto = (novo) => {
    setProdutos(prev => [novo, ...prev]);
    setProdutoSelecionado(novo);
  };

  const handleRegistrarVenda = (produtoId = null) => {
    setProdutos(prev => prev.map(p => {
      if (produtoId) {
        if (p.id === produtoId) {
          return { ...p, vendasReais: (p.vendasReais || 0) + 1 };
        }
        return p;
      }
      // Se não passou id, adiciona ao primeiro produto
      if (p.id === prev[0].id) {
        return { ...p, vendasReais: (p.vendasReais || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Topo Limpo */}
      <Header
        onCriarNovo={() => setModalCriarAberto(true)}
        onAbrirAjuda={() => setModalAjudaAberto(true)}
      />

      {/* Conteúdo Central */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-5 space-y-4 pb-16">
        {/* Painel Real de Vendas (Sem números falsos) */}
        <PainelVendasReais
          produtos={produtos}
          onRegistrarVenda={() => handleRegistrarVenda()}
        />

        {/* Lista dos Produtos Prontos */}
        <ListaProdutosReais
          produtos={produtos}
          onSelecionarProduto={(prod) => setProdutoSelecionado(prod)}
        />
      </main>

      {/* Modais */}
      {produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          onRegistrarVendaProduto={(id) => handleRegistrarVenda(id)}
        />
      )}

      {modalCriarAberto && (
        <ModalCriar
          onClose={() => setModalCriarAberto(false)}
          onCriar={handleCriarProduto}
        />
      )}

      {modalAjudaAberto && (
        <ModalExplicacao
          onClose={() => setModalAjudaAberto(false)}
        />
      )}
    </div>
  );
}
