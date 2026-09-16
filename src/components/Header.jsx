import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function Header({ onOpenGuide, activeTab, setActiveTab }) {
  const tabs = [
    { id: "pipeline", label: "Fluxo de Vendas" },
    { id: "hunter", label: "Buscar Criadores" },
    { id: "factory", label: "Ver Amostras" },
    { id: "delivery", label: "Clientes Ativos" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="font-black text-sm text-emerald-400">S</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white leading-none">
              Syndicate
            </h1>
            <span className="text-[11px] text-slate-400 font-medium">
              Painel de Renda Extra com IA
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 active:scale-95 transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Como Funciona</span>
        </button>
      </div>

      {/* Navegação simples por abas */}
      <div className="max-w-3xl mx-auto mt-3 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
