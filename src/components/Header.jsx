import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';

export default function Header({ onCriarNovo, onAbrirAjuda }) {
  return (
    <header className="sticky top-0 z-40 bg-[#090a0f]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        <div>
          <h1 className="font-bold text-sm text-white tracking-tight leading-none">
            PRODUTO<span className="text-emerald-400">.AI</span>
          </h1>
          <span className="text-[11px] text-slate-400">
            Micro-Produtos Digitais com Entrega Automática
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCriarNovo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Produto</span>
          </button>

          <button
            onClick={onAbrirAjuda}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700/80 transition"
            title="Como Funciona"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
