import React from 'react';
import PainelAutoHustle from './components/PainelAutoHustle';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0d] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Topo Limpo */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-black text-base text-white tracking-tight leading-none">
              AUTOHUSTLE<span className="text-emerald-400">.AI</span>
            </h1>
            <span className="text-[11px] text-slate-400">
              Máquina de Renda Rápida de 1 Clique
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            R$ 0 Custo • 100% Automático
          </span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-5 space-y-4 pb-16">
        <PainelAutoHustle />
      </main>
    </div>
  );
}
