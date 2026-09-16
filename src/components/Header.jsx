import React from 'react';
import { DollarSign, ShieldCheck, Sparkles, Smartphone, HelpCircle } from 'lucide-react';

export default function Header({ currency, setCurrency, onOpenGuide, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white">SYNDICATE<span className="text-emerald-400">.AI</span></span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                R$0 Zero-Cost
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Operação Autônoma de Content Repurposing B2B</p>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === "USD" ? "BRL" : "USD")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 active:scale-95 transition"
            title="Alternar moeda de visualização"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currency === "USD" ? "USD ($)" : "BRL (R$)"}</span>
          </button>

          {/* Guide / Manual Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-600/30 active:scale-95 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Manual R$0</span>
          </button>
        </div>
      </div>

      {/* Mobile-First Navigation Pill Bar */}
      <div className="max-w-5xl mx-auto mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: "pipeline", label: "🎯 Funil (Botão de Dinheiro)" },
          { id: "hunter", label: "🔍 Caçador de Leads" },
          { id: "factory", label: "⚡ Fábrica de Conteúdo" },
          { id: "delivery", label: "📦 Entregas & Clientes" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
