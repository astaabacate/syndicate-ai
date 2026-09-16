import React from 'react';
import { 
  CheckCircle, Zap, Mail, MessageSquare, Award, ArrowRight, 
  ExternalLink, Sparkles, AlertCircle, Clock, Play, UserCheck 
} from 'lucide-react';

export default function PipelineView({
  leads,
  filterStatus,
  onQualifyLead,
  onGenerateSample,
  onOpenOutreach,
  onOpenResponseModal,
  onOpenDelivery,
  currency,
  isGenerating
}) {
  const USD_TO_BRL = 5.50;

  const filteredLeads = leads.filter(l => {
    if (filterStatus === 'all') return true;
    return l.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Novo</span>;
      case 'qualified':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Qualificado</span>;
      case 'sample_ready':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Amostra Pronta</span>;
      case 'contacted':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Contatado</span>;
      case 'replied':
        return <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Respondeu!</span>;
      case 'negotiating':
        return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Proposta Enviada</span>;
      case 'won':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">🏆 Cliente Ativo</span>;
      default:
        return null;
    }
  };

  const getCountryFlag = (country) => {
    switch (country) {
      case 'US': return '🇺🇸 EUA';
      case 'UK': return '🇬🇧 UK';
      case 'CA': return '🇨🇦 CA';
      case 'BR': return '🇧🇷 BR';
      default: return '🌐 Global';
    }
  };

  return (
    <div className="space-y-4">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Pipeline Operacional</span>
            <span className="text-xs font-normal text-slate-400">({filteredLeads.length} leads)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Ações de 1 toque do celular: execute cada etapa em segundos
          </p>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-500" />
          <p className="font-semibold text-sm">Nenhum lead nesta etapa no momento</p>
          <p className="text-xs mt-1">Troque o filtro acima ou busque novos podcasts no Caçador de Leads.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredLeads.map((lead) => {
            const mrrDisplay = currency === "USD"
              ? `$${lead.potentialMRR}/mo`
              : `R$ ${(lead.potentialMRR * USD_TO_BRL).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}/mês`;

            return (
              <div
                key={lead.id}
                className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 transition-all shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden group"
              >
                {/* Status bar accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  lead.status === 'won' ? 'bg-emerald-500' :
                  lead.status === 'sample_ready' ? 'bg-amber-500' :
                  lead.status === 'replied' ? 'bg-pink-500' :
                  lead.status === 'contacted' ? 'bg-purple-500' :
                  'bg-slate-800'
                }`} />

                {/* Top Info */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                        {getCountryFlag(lead.country)}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {mrrDisplay}
                      </span>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  {/* Show Title & Host */}
                  <h3 className="font-bold text-white text-base leading-snug tracking-tight">
                    {lead.showTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <span>Host: <strong className="text-slate-200">{lead.hostName}</strong></span>
                    <span>•</span>
                    <span>{lead.subscribers} subs</span>
                  </p>

                  {/* Latest Episode */}
                  <div className="mt-2.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <p className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                      <span>Último Episódio ({lead.episodeDuration}):</span>
                    </p>
                    <p className="text-slate-200 font-medium line-clamp-1 mt-0.5">
                      {lead.latestEpisode}
                    </p>
                  </div>

                  {/* Opportunity Gap Identified */}
                  <div className="mt-2 text-xs text-slate-400">
                    <span className="text-amber-400/90 font-semibold">Oportunidade: </span>
                    <span className="line-clamp-2">{lead.gapIdentified}</span>
                  </div>
                </div>

                {/* One-Click Action Buttons for Mobile */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                  {/* Primary Dynamic Action */}
                  {lead.status === 'new' && (
                    <button
                      onClick={() => onQualifyLead(lead.id)}
                      disabled={isGenerating}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition active:scale-[0.98]"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Qualificar Lead com IA (1 Clique)</span>
                    </button>
                  )}

                  {lead.status === 'qualified' && (
                    <button
                      onClick={() => onGenerateSample(lead.id)}
                      disabled={isGenerating}
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition active:scale-[0.98]"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Gerar Amostra de Conteúdo (1 Clique)</span>
                    </button>
                  )}

                  {lead.status === 'sample_ready' && (
                    <button
                      onClick={() => onOpenOutreach(lead)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Enviar Abordagem Valor-Primeiro</span>
                    </button>
                  )}

                  {lead.status === 'contacted' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenOutreach(lead)}
                        className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                      >
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <span>Ver Email</span>
                      </button>
                      <button
                        onClick={() => onOpenResponseModal(lead)}
                        className="py-2 px-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/20 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Host Respondeu!</span>
                      </button>
                    </div>
                  )}

                  {(lead.status === 'replied' || lead.status === 'negotiating') && (
                    <button
                      onClick={() => onOpenResponseModal(lead)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 transition active:scale-[0.98]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Tratar Objeção & Enviar Link de Venda</span>
                    </button>
                  )}

                  {lead.status === 'won' && (
                    <button
                      onClick={() => onOpenDelivery(lead)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition active:scale-[0.98]"
                    >
                      <Award className="w-4 h-4" />
                      <span>Produzir & Entregar Pacote Semanal</span>
                    </button>
                  )}

                  {/* Secondary Quick View link */}
                  {lead.sampleKit && lead.status !== 'won' && (
                    <button
                      onClick={() => onOpenOutreach(lead)}
                      className="text-[11px] text-slate-400 hover:text-emerald-400 text-center font-medium transition py-0.5"
                    >
                      Ver Amostra Gerada (Newsletter + LinkedIn + Tweets) →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
