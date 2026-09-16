import React from 'react';
import { DollarSign, PlusCircle } from 'lucide-react';

export default function PainelVendasReais({ produtos, onRegistrarVenda }) {
  const totalVendas = produtos.reduce((acc, p) => acc + (p.vendasReais || 0), 0);
  const totalFaturado = produtos.reduce((acc, p) => acc + ((p.vendasReais || 0) * p.preco), 0);

  return (
    <div className="bg-[#101117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Seu Faturamento Real (Pix / Kiwify)
        </span>
        <button
          onClick={onRegistrarVenda}
          className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 transition"
        >
          <PlusCircle className="w-3 h-3" />
          <span>+ Registrar Venda</span>
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-2 pt-0.5">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            R$ {totalFaturado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalVendas === 0 ? "Nenhuma venda registrada ainda. Pronto para começar." : `${totalVendas} vendas aprovadas no Pix`}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-300 block">
            {produtos.length} {produtos.length === 1 ? 'Produto Criado' : 'Produtos Criados'}
          </span>
          <span className="text-[11px] text-slate-500">
            Entrega 100% no email
          </span>
        </div>
      </div>
    </div>
  );
}
