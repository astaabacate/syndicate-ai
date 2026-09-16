import React from 'react';
import { ShieldCheck, ArrowUpRight, Zap } from 'lucide-react';

export default function DashboardFinanceiro({ produtos }) {
  const totalVendas = produtos.reduce((acc, p) => acc + (p.downloadsRealizados || 0), 0);
  const totalFaturamento = produtos.reduce((acc, p) => acc + (p.faturamentoGerado || 0), 0);

  return (
    <div className="bg-[#12141c] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Faturamento no Piloto Automático
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          Zero Atendimento a Clientes
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2 pt-1">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            R$ {totalFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <p className="text-xs text-slate-400 mt-0.5">
            Cai direto no seu Pix ou conta bancária
          </p>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold text-slate-200">
            {totalVendas} downloads
          </span>
          <span className="text-[11px] text-slate-500 block">
            entregues no email
          </span>
        </div>
      </div>

      {/* Frase explicativa simples */}
      <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
        <span>A pessoa compra no checkout, o arquivo é enviado e você não fala com ninguém.</span>
      </div>
    </div>
  );
}
