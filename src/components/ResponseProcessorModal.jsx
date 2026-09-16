import React, { useState } from 'react';
import { X, Copy, Check, Award } from 'lucide-react';
import { RESPOSTAS_TIPO, gerarRespostaFechamento } from '../services/objectionHandler';

export default function ResponseProcessorModal({ lead, onClose, onMarkWon }) {
  const [tipoSelecionado, setTipoSelecionado] = useState('pediu_preco');
  const [copiado, setCopiado] = useState(false);

  const resposta = gerarRespostaFechamento({
    lead,
    tipoResposta: tipoSelecionado
  });

  const handleCopiar = () => {
    navigator.clipboard.writeText(resposta.texto);
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
              O que responder para {lead.apresentador}?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Valor da assinatura: <strong className="text-emerald-400">R$ {lead.valorMensal}/mês</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Escolha do que o criador falou */}
        <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Selecione o que o criador te respondeu:
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {RESPOSTAS_TIPO.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setTipoSelecionado(tipo.id)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
                    tipoSelecionado === tipo.id
                      ? 'bg-slate-800 border-emerald-500/60 text-white font-medium'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold">{tipo.titulo}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tipo.descricao}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Resposta Sugerida */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Sua resposta pronta para fechar o contrato:
              </span>
              <button
                onClick={handleCopiar}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
              >
                {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiado ? 'Copiado!' : 'Copiar Resposta'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
              {resposta.texto}
            </div>
          </div>
        </div>

        {/* Rodapé com Fechamento de Venda */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCopiar}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition active:scale-95"
          >
            <Copy className="w-4 h-4" />
            <span>Copiar para Mandar</span>
          </button>

          <button
            onClick={() => {
              onMarkWon(lead.id);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>🏆 O Cliente Pagou! Fechar Venda</span>
          </button>
        </div>
      </div>
    </div>
  );
}
