import React, { useState } from 'react';
import { X, Send, Copy, Check, MessageCircle, Mail } from 'lucide-react';
import { buildOutreachMessage } from '../services/emailTemplates';

export default function OutreachModal({ lead, onClose, onMarkContacted }) {
  const [copiado, setCopiado] = useState(false);
  const mensagem = buildOutreachMessage(lead);

  const handleCopiar = () => {
    navigator.clipboard.writeText(`Assunto: ${mensagem.assunto}\n\n${mensagem.textoEmail}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0f121a] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <h3 className="text-sm font-bold text-white">
              Enviar Mensagem para {lead.apresentador}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Canal: {lead.nomeCanal}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicação da Estratégia */}
        <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/20 text-xs text-emerald-300">
          💡 <strong>Como funciona a venda:</strong> Você entrega os textos do último vídeo dele prontos de presente. Ele vê a qualidade de graça e você oferece fazer toda semana por <strong>R$ {lead.valorMensal}/mês</strong>.
        </div>

        {/* Corpo da Mensagem Pré-visualizado */}
        <div className="p-4 space-y-3 max-h-[45vh] overflow-y-auto text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400 font-semibold">Assunto do Email: </span>
            <span className="text-white font-medium">{mensagem.assunto}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
            {mensagem.textoEmail}
          </div>
        </div>

        {/* Botões de Ação no Celular */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Botão de WhatsApp (se tiver número) */}
            {mensagem.linkWhats ? (
              <a
                href={mensagem.linkWhats}
                target="_blank"
                rel="noreferrer"
                onClick={() => onMarkContacted(lead.id)}
                className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir no WhatsApp</span>
              </a>
            ) : null}

            {/* Botão de Email Nativo */}
            <a
              href={mensagem.linkEmail}
              onClick={() => onMarkContacted(lead.id)}
              className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Abrir no seu Email</span>
            </a>

            {/* Botão de Copiar */}
            <button
              onClick={handleCopiar}
              className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-800 active:scale-95 transition"
            >
              {copiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiado ? 'Texto Copiado!' : 'Copiar Texto Completo'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              onMarkContacted(lead.id);
              onClose();
            }}
            className="w-full py-2 text-[11px] text-slate-400 hover:text-slate-200 text-center font-medium"
          >
            Já mandei a mensagem → Salvar como "Mensagem Enviada"
          </button>
        </div>
      </div>
    </div>
  );
}
