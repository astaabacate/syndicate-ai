import React from 'react';
import { TrendingUp, CheckCircle, Mail, MessageSquare, DollarSign, Award, Target, Zap } from 'lucide-react';

export default function MetricsBar({ leads, currency, filterStatus, setFilterStatus }) {
  // Count counts per funnel stage
  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    sample_ready: leads.filter(l => l.status === 'sample_ready').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    replied: leads.filter(l => l.status === 'replied').length,
    negotiating: leads.filter(l => l.status === 'negotiating').length,
    won: leads.filter(l => l.status === 'won').length
  };

  // Calculate MRR (Monthly Recurring Revenue)
  const USD_TO_BRL = 5.50;
  const wonLeads = leads.filter(l => l.status === 'won');
  const mrrUSD = wonLeads.reduce((acc, l) => acc + (l.potentialMRR || 149), 0);
  const mrrBRL = mrrUSD * USD_TO_BRL;

  const displayMRR = currency === "USD" 
    ? `$${mrrUSD.toLocaleString()}/mo` 
    : `R$ ${mrrBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`;

  const pipelineCards = [
    { id: 'all', label: 'Total', count: counts.all, icon: Target, color: 'text-slate-300' },
    { id: 'new', label: 'Novos', count: counts.new, icon: Zap, color: 'text-cyan-400' },
    { id: 'qualified', label: 'Qualificados', count: counts.qualified, icon: CheckCircle, color: 'text-blue-400' },
    { id: 'sample_ready', label: 'Amostras', count: counts.sample_ready, icon: Zap, color: 'text-amber-400' },
    { id: 'contacted', label: 'Contatados', count: counts.contacted, icon: Mail, color: 'text-purple-400' },
    { id: 'replied', label: 'Respostas', count: counts.replied, icon: MessageSquare, color: 'text-pink-400' },
    { id: 'negotiating', label: 'Propostas', count: counts.negotiating, icon: TrendingUp, color: 'text-orange-400' },
    { id: 'won', label: 'Vendas ($)', count: counts.won, icon: Award, color: 'text-emerald-400' }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-3 sm:p-4">
      <div className="max-w-5xl mx-auto space-y-3">
        {/* Top summary row: Real-time MRR callout */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-emerald-950/40 via-slate-800/60 to-slate-900 p-2.5 sm:p-3 rounded-xl border border-emerald-500/20">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">Receita Recorrente Ativa (MRR):</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black text-emerald-400 tracking-tight">
              {displayMRR}
            </span>
            <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              {wonLeads.length} {wonLeads.length === 1 ? 'cliente retido' : 'clientes retidos'}
            </span>
          </div>
        </div>

        {/* Funnel "Botão de Dinheiro" Stages Horizontal Scroll */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
          {pipelineCards.map((card) => {
            const Icon = card.icon;
            const isSelected = filterStatus === card.id;
            return (
              <button
                key={card.id}
                onClick={() => setFilterStatus(card.id)}
                className={`p-2 rounded-xl text-center transition flex flex-col items-center justify-center border active:scale-95 ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                  <span className={`text-[11px] font-bold ${card.color}`}>
                    {card.count}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 truncate w-full">
                  {card.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
