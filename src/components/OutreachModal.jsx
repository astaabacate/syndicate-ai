import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { buildOutreachEmail } from '../services/emailTemplates';

export default function OutreachModal({ lead, onClose, onMarkContacted }) {
  const [copied, setCopied] = useState(false);
  const emailData = buildOutreachEmail(lead);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${emailData.subject}\n\n${emailData.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeMailOpen = () => {
    window.open(emailData.mailtoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Método Cavalo de Troia (Valor-Primeiro)
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Abordagem para {lead.hostName} ({lead.showTitle})
            </h3>
            <p className="text-xs text-slate-400">
              Enviando para: <span className="text-slate-200 font-mono">{lead.publicEmail}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Value Proposition Callout */}
        <div className="px-5 py-2.5 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Não é spam frio! Você já entrega a amostra pronta no corpo do email. A taxa de resposta é 8x maior.
          </span>
        </div>

        {/* Email Preview Container */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[50vh] overflow-y-auto text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400">Assunto: </span>
            <strong className="text-white font-sans">{emailData.subject}</strong>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
            {emailData.body}
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col gap-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Native mail app button (1 touch) */}
            <a
              href={emailData.mailtoUrl}
              onClick={() => onMarkContacted(lead.id)}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              <span>Abrir no Gmail / Mail (1 Toque)</span>
            </a>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Texto Copiado!' : 'Copiar Assunto + Mensagem'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
            <span>Já enviou manualmente pelo celular?</span>
            <button
              onClick={() => {
                onMarkContacted(lead.id);
                onClose();
              }}
              className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Marcar como "Contatado"</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
