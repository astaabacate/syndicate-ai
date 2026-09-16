import React from 'react';
import { ArrowRight, Download, DollarSign, CheckCircle2 } from 'lucide-react';

export default function ListaProdutos({ produtos, onSelecionarProduto }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-white tracking-tight">
          Seus Micro-Produtos Ativos ({produtos.length})
        </h2>
        <span className="text-[11px] text-slate-400">
          Prontos para faturar
        </span>
      </div>

      <div className="space-y-3">
        {produtos.map((prod) => {
          const precoFormatado = prod.moeda === 'USD' 
            ? `$${prod.precoSugerido} USD (~R$ ${prod.precoSugerido * 5.5})` 
            : `R$ ${prod.precoSugerido},00`;

          return (
            <div
              key={prod.id}
              className="bg-[#12141c] hover:bg-[#151722] border border-slate-800/80 rounded-2xl p-4 sm:p-5 transition space-y-3"
            >
              {/* Topo do Produto */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                      {prod.categoria}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Entrega Automática
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {prod.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prod.subtitulo}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 block">
                    {precoFormatado}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {prod.downloadsRealizados} vendas
                  </span>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Público: {prod.publicoAlvo.slice(0, 45)}...
                </span>

                <button
                  onClick={() => onSelecionarProduto(prod)}
                  className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-slate-700/80 active:scale-95 transition"
                >
                  <span>Ver Produto & Vendas</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
