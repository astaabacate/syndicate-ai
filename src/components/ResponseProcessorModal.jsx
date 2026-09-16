import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Award, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { OBJECTION_PRESETS, handleObjection } from '../services/objectionHandler';

export default function ResponseProcessorModal({ lead, onClose, onAdvanceToNegotiating, onMarkWon }) {
  const [selectedPreset, setSelectedPreset] = useState('pricing_interest');
  const [customInput, setCustomInput] = useState('');
  const [copied, setCopied] = useState(false);

  const result = handleObjection({
    lead,
    responseType: selectedPreset,
    customText: customInput,
    paymentLink: "https://buy.stripe.com/test_syndicate" // Customizable by user
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(result.replyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
              Classificador de Respostas & Fechamento
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Negociação com {lead.hostName} ({lead.showTitle})
            </h3>
            <p className="text-xs text-slate-400">
              Valor da assinatura: <strong className="text-emerald-400">${lead.potentialMRR}/mês</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection of Lead Reply */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[55vh] overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              1. O que o Host respondeu? (Selecione a situação):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBJECTION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs active:scale-[0.98] ${
                    selectedPreset === preset.id
                      ? 'bg-slate-800 border-pink-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="font-bold">{preset.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Strategy Diagnosis */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Diagnóstico da IA:</span>
              <span className="font-bold text-pink-400">{result.sentiment}</span>
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-amber-400">Estratégia: </strong>
              {result.strategy}
            </div>
            {result.recommendedPrice !== '-' && (
              <div className="text-xs text-emerald-400">
                <strong>Preço sugerido: </strong>{result.recommendedPrice}
              </div>
            )}
          </div>

          {/* Winning Response Script */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                2. Resposta Pronta para Enviar (Fechamento):
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
              {result.replyText}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              handleCopy();
              onAdvanceToNegotiating(lead.id);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition"
          >
            <Copy className="w-4 h-4" />
            <span>Copiar & Salvar como "Em Proposta"</span>
          </button>

          <button
            onClick={() => {
              onMarkWon(lead.id);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
          >
            <Award className="w-4 h-4" />
            <span>🏆 Cliente Pagou! Marcar como Venda</span>
          </button>
        </div>
      </div>
    </div>
  );
}
