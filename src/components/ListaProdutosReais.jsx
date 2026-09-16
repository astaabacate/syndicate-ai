import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function ListaProdutosReais({ produtos, onSelecionarProduto }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Seus Produtos Prontos ({produtos.length})
        </h2>
        <span className="text-[11px] text-slate-500">
          Toque para ver o conteúdo
        </span>
      </div>

      <div className="space-y-2.5">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-[#101117] hover:bg-[#13151e] border border-slate-800/80 rounded-2xl p-4 sm:p-5 transition space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {prod.nicho}
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                  {prod.titulo}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {prod.subtitulo}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 block">
                  R$ {prod.preco},00
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {prod.vendasReais} {prod.vendasReais === 1 ? 'venda' : 'vendas'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Arquivo digital pronto para download
              </span>

              <button
                onClick={() => onSelecionarProduto(prod)}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
              >
                <span>Acessar Arquivos</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
