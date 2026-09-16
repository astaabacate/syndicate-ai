import React, { useState } from 'react';
import { Award, Check, Copy, Send, CheckCircle2 } from 'lucide-react';

export default function DeliveryCenter({ leads, onGenerateWeeklyDelivery }) {
  const clientesAtivos = leads.filter(l => l.status === 'cliente_ativo');

  const [clienteSelecionadoId, setClienteSelecionadoId] = useState(clientesAtivos[0]?.id || null);
  const [tituloEpisodio, setTituloEpisodio] = useState('');
  const [resumoEpisodio, setResumoEpisodio] = useState('');
  const [processando, setProcessando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const cliente = clientesAtivos.find(c => c.id === clienteSelecionadoId) || clientesAtivos[0];

  const handleGerarSemanal = (e) => {
    e.preventDefault();
    if (!cliente) return;

    setProcessando(true);
    setTimeout(() => {
      onGenerateWeeklyDelivery(cliente.id, {
        ultimoEpisodio: tituloEpisodio || "Novo Episódio da Semana",
        resumoConversa: resumoEpisodio || "Resumo das ideias discutidas no episódio."
      });
      setProcessando(false);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    }, 1000);
  };

  const handleCopiarEntrega = () => {
    if (!cliente) return;
    const msg = `Oi ${cliente.apresentador}!\n\n` +
      `Aqui está o seu pacote de conteúdo pronto do novo episódio ("${cliente.ultimoEpisodio}"):\n\n` +
      `👉 1 Newsletter para seus assinantes de email\n` +
      `👉 3 Posts formatados para o seu LinkedIn\n` +
      `👉 3 Frases de destaque para suas redes\n\n` +
      `Já deixei tudo formatado com as quebras certas para você só copiar e postar!\n\n` +
      `Abraço!`;

    navigator.clipboard.writeText(msg);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Topo */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white">
            Clientes Ativos & Entregas Semanais
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quando o cliente lançar o vídeo da semana, gere os textos em 1 minuto e mande no WhatsApp dele.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400">
          {clientesAtivos.length} {clientesAtivos.length === 1 ? 'Cliente Pagante' : 'Clientes Pagantes'}
        </div>
      </div>

      {clientesAtivos.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 space-y-2">
          <Award className="w-8 h-8 mx-auto text-slate-500" />
          <h3 className="text-sm font-semibold text-white">Nenhum cliente ativo no momento</h3>
          <p className="text-xs max-w-sm mx-auto">
            Envie as amostras gratuitas no Fluxo de Vendas. Quando um criador fechar o plano mensal, ele aparecerá aqui para você entregar o conteúdo toda semana.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Lista de Clientes (Coluna Esquerda) */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 block">
              Seus Assinantes Mensais:
            </span>
            {clientesAtivos.map((c) => (
              <button
                key={c.id}
                onClick={() => setClienteSelecionadoId(c.id)}
                className={`w-full p-3 rounded-xl text-left border transition ${
                  cliente?.id === c.id
                    ? 'bg-slate-800 border-emerald-500/60 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs text-white">{c.nomeCanal}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{c.apresentador}</div>
                <div className="text-xs font-semibold text-emerald-400 mt-1">R$ {c.valorMensal}/mês</div>
              </button>
            ))}
          </div>

          {/* Gerador de Entrega Semanal (Coluna Direita) */}
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5">
            <div className="border-b border-slate-800 pb-2.5">
              <span className="text-[11px] font-semibold text-emerald-400 block">
                Produzir Conteúdo da Semana:
              </span>
              <h3 className="font-bold text-white text-sm">
                {cliente?.nomeCanal} ({cliente?.apresentador})
              </h3>
            </div>

            {sucesso && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Textos da semana gerados com sucesso! Pode enviar para o cliente.</span>
              </div>
            )}

            <form onSubmit={handleGerarSemanal} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  1. Título do Novo Episódio que o cliente gravou:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Como organizamos nossa rotina para faturar mais"
                  value={tituloEpisodio}
                  onChange={e => setTituloEpisodio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  2. Resumo rápido do vídeo ou pontos que ele falou:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Cole os principais pontos discutidos no vídeo para a IA transformar em textos..."
                  value={resumoEpisodio}
                  onChange={e => setResumoEpisodio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="submit"
                  disabled={processando}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  {processando ? (
                    <span>A IA está redigindo o conteúdo...</span>
                  ) : (
                    <span>⚡ Gerar Textos da Semana (1 Toque)</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopiarEntrega}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition"
                >
                  {copiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiado ? 'Mensagem Copiada!' : 'Copiar Mensagem pro WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
