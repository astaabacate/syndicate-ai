import React, { useState } from 'react';
import { Copy, Check, Download, Send, RefreshCw, FileText } from 'lucide-react';

export default function ContentFactory({ leads, selectedLeadId, onSelectLead, onGenerateSample, onOpenOutreach, isGenerating }) {
  const [abaAtiva, setAbaAtiva] = useState('newsletter');
  const [copiado, setCopiado] = useState(false);

  const lead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleCopiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const kit = lead?.kitConteudo;

  return (
    <div className="space-y-4">
      {/* Seletor de Criador */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
            Selecione o Criador para Visualizar:
          </label>
          <select
            value={lead?.id}
            onChange={(e) => onSelectLead(e.target.value)}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>
                {l.nomeCanal} ({l.apresentador}) {l.kitConteudo ? '✓ Amostra Gerada' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onGenerateSample(lead.id)}
            disabled={isGenerating}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{kit ? 'Regenerar Conteúdo' : 'Gerar com IA Agora'}</span>
          </button>
        </div>
      </div>

      {/* Visualização do Conteúdo Gerado */}
      {!kit ? (
        <div className="text-center py-12 px-4 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <FileText className="w-8 h-8 mx-auto text-slate-500" />
          <h4 className="text-sm font-semibold text-white">Nenhum conteúdo gerado para este canal ainda</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Toque no botão abaixo para a IA transformar o último episódio em textos prontos em 2 segundos.
          </p>
          <button
            onClick={() => onGenerateSample(lead.id)}
            disabled={isGenerating}
            className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs active:scale-95 transition"
          >
            ⚡ Gerar Textos Agora
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Abas simples */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto no-scrollbar">
            {[
              { id: 'newsletter', label: '📬 Newsletter' },
              { id: 'linkedin', label: '💼 Posts LinkedIn' },
              { id: 'redes', label: '📱 Posts Curtos' },
              { id: 'video', label: '🎬 Roteiro de Vídeo' }
            ].map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                  abaAtiva === aba.id
                    ? 'border-emerald-400 text-emerald-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>

          {/* Conteúdo da Aba */}
          <div className="p-4 sm:p-5">
            {abaAtiva === 'newsletter' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold">
                    Assunto: <strong className="text-white">{kit.newsletter?.assunto}</strong>
                  </span>
                  <button
                    onClick={() => handleCopiarTexto(`${kit.newsletter?.assunto}\n\n${kit.newsletter?.conteudo}`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                  >
                    {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {kit.newsletter?.conteudo}
                </div>
              </div>
            )}

            {abaAtiva === 'linkedin' && (
              <div className="space-y-3">
                {kit.postsLinkedin?.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                      <span className="text-xs font-bold text-white">{p.titulo}</span>
                      <button
                        onClick={() => handleCopiarTexto(p.texto)}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-[11px] text-slate-200 border border-slate-700"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {p.texto}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {abaAtiva === 'redes' && (
              <div className="space-y-2">
                {kit.postsRedes?.map((frase, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{frase}</p>
                    <button
                      onClick={() => handleCopiarTexto(frase)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {abaAtiva === 'video' && kit.roteiroVideoCurto && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs">
                <span className="text-[11px] font-semibold text-amber-400 block">
                  Gancho dos Primeiros 3 Segundos:
                </span>
                <p className="text-slate-200 font-medium">{kit.roteiroVideoCurto.gancho}</p>
                
                <span className="text-[11px] font-semibold text-slate-400 block pt-1">
                  Desenvolvimento (30 segundos):
                </span>
                <p className="text-slate-300 leading-relaxed">{kit.roteiroVideoCurto.desenvolvimento}</p>

                <span className="text-[11px] font-semibold text-emerald-400 block pt-1">
                  Chamada no Final:
                </span>
                <p className="text-slate-200">{kit.roteiroVideoCurto.chamada}</p>
              </div>
            )}
          </div>

          {/* Rodapé de Envio */}
          <div className="p-3.5 bg-slate-950/90 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => onOpenOutreach(lead)}
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar para o Apresentador</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
