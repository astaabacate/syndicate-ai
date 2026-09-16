import React from 'react';
import { Sparkles, HelpCircle, Plus } from 'lucide-react';

export default function Header({ onAbrirManual, onCriarNovo }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0e12]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Logo Minimalista */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="font-bold text-sm text-emerald-400">P</span>
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-tight leading-none">
              PRODUTO<span className="text-emerald-400">.AI</span>
            </h1>
            <span className="text-[11px] text-slate-400 font-medium">
              Vendas Digitais 100% Automáticas
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCriarNovo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Produto</span>
          </button>

          <button
            onClick={onAbrirManual}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title="Como funciona"
          >
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
