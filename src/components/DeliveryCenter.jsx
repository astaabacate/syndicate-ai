import React, { useState } from 'react';
import { 
  Award, CheckCircle, Clock, Send, Sparkles, Download, 
  ExternalLink, Play, Copy, Check, DollarSign, Calendar 
} from 'lucide-react';

export default function DeliveryCenter({ leads, onGenerateWeeklyDelivery, currency }) {
  const USD_TO_BRL = 5.50;
  const wonClients = leads.filter(l => l.status === 'won');

  const [selectedClientId, setSelectedClientId] = useState(wonClients[0]?.id || null);
  const [newEpisodeUrl, setNewEpisodeUrl] = useState('');
  const [newEpisodeTitle, setNewEpisodeTitle] = useState('');
  const [newEpisodeSummary, setNewEpisodeSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedClient = wonClients.find(c => c.id === selectedClientId) || wonClients[0];

  const handleGenerateWeekly = (e) => {
    e.preventDefault();
    if (!selectedClient) return;

    setIsProcessing(true);
    setTimeout(() => {
      onGenerateWeeklyDelivery(selectedClient.id, {
        latestEpisode: newEpisodeTitle || "Episódio da Semana",
        transcriptSummary: newEpisodeSummary || "Resumo tático das ideias discutidas no novo episódio."
      });
      setIsProcessing(false);
      setDeliverySuccess(true);
      setTimeout(() => setDeliverySuccess(false), 4000);
    }, 1500);
  };

  const copyDeliveryText = () => {
    if (!selectedClient) return;
    const text = `Hi ${selectedClient.hostName}!\n\nYour Weekly Content Syndication Pack for "${selectedClient.latestEpisode}" is ready!\n\n` +
      `Here is the executive digest + 3 LinkedIn thought-leadership posts + Newsletter ready to copy-paste.\n\n` +
      `Check your dashboard or find the full markdown file attached.\n\nBest,\nYour Syndicate Partner`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Central de Clientes Ativos & Entregas Semanais</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gere e entregue o pacote semanal de cada cliente em menos de 2 minutos pelo celular
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5" />
          <span>{wonClients.length} Assinatura(s) Ativa(s)</span>
        </div>
      </div>

      {wonClients.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 space-y-2">
          <Award className="w-10 h-10 mx-auto text-slate-600" />
          <h3 className="text-sm font-bold text-white">Nenhum cliente pago ainda</h3>
          <p className="text-xs max-w-sm mx-auto">
            Assim que você enviar as primeiras abordagens com amostra pronta e fechar uma assinatura, seu cliente aparecerá aqui para entregas automáticas toda semana.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Client List (Left col) */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Selecione o Cliente:
            </label>
            {wonClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              const mrr = currency === "USD"
                ? `$${client.potentialMRR}/mo`
                : `R$ ${(client.potentialMRR * USD_TO_BRL).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}/mês`;

              return (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full p-3 rounded-2xl text-left border transition active:scale-[0.98] ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{client.showTitle}</span>
                    <span className="text-xs font-bold text-emerald-400">{mrr}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Host: {client.hostName}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Semanal
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">Stripe Ativo</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Weekly Delivery Form (Right cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Episódio da Semana
                </span>
                <h3 className="font-bold text-white text-sm">
                  {selectedClient?.showTitle} (Host: {selectedClient?.hostName})
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Email: <strong className="text-slate-200">{selectedClient?.publicEmail}</strong>
              </span>
            </div>

            {deliverySuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Pacote gerado com sucesso!</strong> Todos os 5 formatos estão prontos para envio.
                </span>
              </div>
            )}

            <form onSubmit={handleGenerateWeekly} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  1. Link do Novo Episódio (YouTube / Spotify / RSS):
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={newEpisodeUrl}
                  onChange={e => setNewEpisodeUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  2. Título do Episódio:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ep. 85: The Secret to 80% Retainer Retention"
                  value={newEpisodeTitle}
                  onChange={e => setNewEpisodeTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  3. Transcrição, Tópicos ou Resumo do Episódio:
                </label>
                <textarea
                  rows={3}
                  placeholder="Cole aqui a transcrição gerada pelo YouTube (gratuita), notas do episódio ou tópicos discutidos..."
                  value={newEpisodeSummary}
                  onChange={e => setNewEpisodeSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Processando & Formatando com IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>⚡ Gerar Pacote Semanal Completo (1 Toque)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={copyDeliveryText}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Mensagem Copiada!' : 'Copiar Mensagem de Entrega'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
