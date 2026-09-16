import React from 'react';
import { Send, Check, Play, MessageSquare, Award } from 'lucide-react';

export default function PipelineView({
  leads,
  filterStatus,
  onGenerateSample,
  onOpenOutreach,
  onOpenResponseModal,
  onOpenDelivery,
  isGenerating
}) {
  const filtered = leads.filter(l => {
    if (filterStatus === 'todos') return true;
    return l.status === filterStatus;
  });

  const getStatusText = (status) => {
    switch (status) {
      case 'novo':
        return <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">Novo Canal</span>;
      case 'amostra_pronta':
        return <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-medium">Amostra Pronta</span>;
      case 'contatado':
        return <span className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md font-medium">Mensagem Enviada</span>;
      case 'cliente_ativo':
        return <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-semibold">Cliente Pagante</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {filtered.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
          <p className="text-sm font-medium">Nenhum canal nesta etapa.</p>
          <p className="text-xs text-slate-500 mt-1">Selecione outro filtro acima ou adicione um novo criador.</p>
        </div>
      ) : (
        filtered.map((lead) => (
          <div
            key={lead.id}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3.5 transition"
          >
            {/* Topo do Card */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-base tracking-tight">
                    {lead.nomeCanal}
                  </h3>
                  {lead.pais === 'US' && (
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      🇺🇸 EUA ($ Dólar)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Apresentador: <span className="text-slate-200 font-medium">{lead.apresentador}</span>
                  {lead.seguidores && ` • ${lead.seguidores}`}
                </p>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  R$ {lead.valorMensal}/mês
                </span>
                {getStatusText(lead.status)}
              </div>
            </div>

            {/* Último Episódio Gravado */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 text-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Último episódio lançado ({lead.duracaoEpisodio}):
              </span>
              <p className="text-slate-200 font-medium leading-relaxed">
                "{lead.ultimoEpisodio}"
              </p>
            </div>

            {/* A Dor do Criador */}
            <div className="text-xs text-slate-400 flex items-start gap-1.5">
              <span className="text-amber-400 font-semibold flex-shrink-0">Oportunidade:</span>
              <span>{lead.oportunidade}</span>
            </div>

            {/* Botão de Ação Principal (Grande, nítido, fácil de tocar) */}
            <div className="pt-2 border-t border-slate-800/60">
              {lead.status === 'novo' && (
                <button
                  onClick={() => onGenerateSample(lead.id)}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gerar Amostra Gratuita com IA (1 Toque)</span>
                </button>
              )}

              {lead.status === 'amostra_pronta' && (
                <div className="space-y-2">
                  <button
                    onClick={() => onOpenOutreach(lead)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Mandar Amostra (WhatsApp ou Email)</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    A IA já escreveu os textos para você enviar gratuitamente.
                  </p>
                </div>
              )}

              {lead.status === 'contatado' && (
                <button
                  onClick={() => onOpenResponseModal(lead)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition active:scale-[0.99]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>O Criador Respondeu? Clique para Fechar a Venda</span>
                </button>
              )}

              {lead.status === 'cliente_ativo' && (
                <button
                  onClick={() => onOpenDelivery(lead)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition active:scale-[0.99]"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Entregar Conteúdo Semanal deste Cliente</span>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
