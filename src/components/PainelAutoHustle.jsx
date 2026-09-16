import React, { useState } from 'react';
import { Send, Zap, CheckCircle2, MessageSquare, DollarSign, Award, ArrowRight, ShieldAlert } from 'lucide-react';
import { OPORTUNIDADES_ALTO_TICKET } from '../data/altoTicketData';

export default function PainelAutoHustle() {
  const [oportunidades, setOportunidades] = useState(OPORTUNIDADES_ALTO_TICKET);
  const [faturamentoReal, setFaturamentoReal] = useState(0);
  const [vendasFechadas, setVendasFechadas] = useState(0);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalFechamento, setModalFechamento] = useState(null);
  const [chavePix, setChavePix] = useState('seu-pix@aqui.com');
  const [editandoPix, setEditandoPix] = useState(false);

  // 1 Clique: Disparo no WhatsApp
  const handleDispararWhatsApp = (item) => {
    const textoCodificado = encodeURIComponent(item.mensagemDisparo);
    const linkWhats = `https://wa.me/${item.contatoWhats}?text=${textoCodificado}`;
    
    // Atualiza status para 'contatado'
    setOportunidades(prev => prev.map(o => o.id === item.id ? { ...o, status: 'contatado' } : o));
    
    window.open(linkWhats, '_blank');
  };

  // 1 Clique: Fechamento com Pix
  const handleConfirmarVenda = (item) => {
    setFaturamentoReal(prev => prev + item.ticketServico);
    setVendasFechadas(prev => prev + 1);
    setOportunidades(prev => prev.map(o => o.id === item.id ? { ...o, status: 'fechado' } : o));
    setModalFechamento(null);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Faturamento Real (Começa em Zero) */}
      <div className="bg-[#101117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Seu Dinheiro no Pix Hoje
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Sua Chave Pix:</span>
            {editandoPix ? (
              <input
                type="text"
                value={chavePix}
                onChange={e => setChavePix(e.target.value)}
                onBlur={() => setEditandoPix(false)}
                autoFocus
                className="bg-slate-900 border border-emerald-500 rounded px-2 py-0.5 text-white text-xs"
              />
            ) : (
              <button
                onClick={() => setEditandoPix(true)}
                className="font-bold text-emerald-400 hover:underline"
              >
                {chavePix} ✏️
              </button>
            )}
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-3xl font-black text-white tracking-tight">
              R$ {faturamentoReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              {vendasFechadas === 0 ? "Pronto para disparar. 1 fechamento = R$ 490 no Pix." : `${vendasFechadas} Pix aprovados na sua conta`}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Alta Velocidade (Menor Tempo)
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Alvos Pré-Diagnosticados com Falhas Graves */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Empresas com Falhas Críticas Auditadas ({oportunidades.length})
          </h2>
          <span className="text-[11px] text-slate-500">
            Prontas para receber a oferta
          </span>
        </div>

        {oportunidades.map((item) => (
          <div
            key={item.id}
            className="bg-[#101117] hover:bg-[#13151e] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3 transition"
          >
            {/* Topo do Card */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {item.nicho} • {item.cidade}
                </span>
                <h3 className="font-bold text-white text-base mt-1">
                  {item.empresa}
                </h3>
                <p className="text-xs text-slate-400">
                  Responsável: <strong className="text-slate-200">{item.responsavel}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 block">
                  R$ {item.ticketServico} no Pix
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {item.status === 'fechado' ? '✅ Pago no Pix' : item.status === 'contatado' ? 'Mensagem Enviada' : 'Aguardando Disparo'}
                </span>
              </div>
            </div>

            {/* O Erro Grave que Custa Dinheiro para a Empresa */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-red-500/20 space-y-1 text-xs">
              <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Falha Crítica que a IA Detectou:</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                {item.problemaGraveIdentificado}
              </p>
            </div>

            {/* Botões de 1 Toque */}
            <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row gap-2">
              {item.status !== 'fechado' && (
                <button
                  onClick={() => handleDispararWhatsApp(item)}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Disparar no WhatsApp do Dono (1 Toque)</span>
                </button>
              )}

              <button
                onClick={() => setItemSelecionado(item)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700/80 transition active:scale-95"
              >
                Ver Auditoria Completa
              </button>

              {item.status === 'contatado' && (
                <button
                  onClick={() => setModalFechamento(item)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition active:scale-95"
                >
                  💰 O Dono Respondeu! Fechar Pix
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal da Auditoria Completa */}
      {itemSelecionado && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#111218] border border-slate-800 rounded-2xl w-full max-w-lg p-5 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm">{itemSelecionado.empresa}</h3>
                <span className="text-xs text-emerald-400 font-semibold">Valor da Solução: R$ {itemSelecionado.ticketServico}</span>
              </div>
              <button onClick={() => setItemSelecionado(null)} className="text-slate-400 hover:text-white text-xs">
                Fechar
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed max-h-[50vh] overflow-y-auto">
              <div>
                <strong className="text-red-400 block mb-1">Diagnóstico do Erro:</strong>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] whitespace-pre-wrap">
                  {itemSelecionado.diagnosticoIA}
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1">Mensagem que Abre no WhatsApp:</strong>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap">
                  {itemSelecionado.mensagemDisparo}
                </p>
              </div>

              <div>
                <strong className="text-emerald-400 block mb-1">O Que a IA Entrega para a Empresa (Solução Pronta):</strong>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] whitespace-pre-wrap">
                  {itemSelecionado.entregaProntaIA}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleDispararWhatsApp(itemSelecionado);
                setItemSelecionado(null);
              }}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Abrir WhatsApp Agora
            </button>
          </div>
        </div>
      )}

      {/* Modal de Fechamento com Pix */}
      {modalFechamento && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#111218] border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Fechamento Imediato</span>
              <h3 className="font-bold text-white text-sm">{modalFechamento.empresa}</h3>
              <p className="text-xs text-slate-400">Copie e mande para o WhatsApp do dono:</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {`Perfeito, ${modalFechamento.responsavel}!

Já deixei toda a solução pronta aqui para você:
- As respostas profissionais para as reclamações
- O roteiro de captação de avaliações 5 estrelas
- O fluxo de atendimento rápido no WhatsApp

O valor total do pacote fica em R$ ${modalFechamento.ticketServico} no Pix.

Minha chave Pix para ativação imediata:
👉 ${chavePix}

Assim que fizer o Pix, já te envio o documento com tudo liberado aqui no WhatsApp em 1 minuto!`}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Perfeito, ${modalFechamento.responsavel}!\n\nJá deixei toda a solução pronta aqui para você:\n- As respostas profissionais para as reclamações\n- O roteiro de captação de avaliações 5 estrelas\n- O fluxo de atendimento rápido no WhatsApp\n\nO valor total do pacote fica em R$ ${modalFechamento.ticketServico} no Pix.\n\nMinha chave Pix:\n👉 ${chavePix}\n\nAssim que fizer o Pix, já te envio tudo pronto!`);
                  alert("Texto de fechamento com Pix copiado!");
                }}
                className="flex-1 py-2.5 bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-700"
              >
                Copiar Texto + Pix
              </button>

              <button
                onClick={() => handleConfirmarVenda(modalFechamento)}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
              >
                🏆 O Dono Pagou o Pix!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
