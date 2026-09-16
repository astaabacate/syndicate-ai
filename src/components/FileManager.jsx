import React, { useState } from 'react';
import { FileCode, Save, Check, Key, ShieldAlert } from 'lucide-react';

export default function FileManager({ arquivos, onSalvarArquivo }) {
  const [arquivoAtivoNome, setArquivoAtivoNome] = useState('index.js');
  const [conteudoEditado, setConteudoEditado] = useState(arquivos.find(a => a.nome === 'index.js')?.conteudo || '');
  const [salvo, setSalvo] = useState(false);

  const handleTrocarArquivo = (nome) => {
    const arq = arquivos.find(a => a.nome === nome);
    if (arq) {
      setArquivoAtivoNome(nome);
      setConteudoEditado(arq.conteudo);
    }
  };

  const handleSalvar = () => {
    onSalvarArquivo(arquivoAtivoNome, conteudoEditado);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  };

  return (
    <div className="space-y-3.5">
      {/* Alerta de Segurança de Token */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-300">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="block text-amber-200">Segurança do Token do Bot:</strong>
          Coloque o token do seu bot no arquivo <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">.env</code> para não deixar o token exposto no código aberto.
        </div>
      </div>

      {/* Editor de Arquivos */}
      <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Barra de Abas dos Arquivos */}
        <div className="bg-[#12141c] border-b border-slate-800 px-3 py-2 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            {arquivos.map((arq) => (
              <button
                key={arq.nome}
                onClick={() => handleTrocarArquivo(arq.nome)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 flex-shrink-0 ${
                  arquivoAtivoNome === arq.nome
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{arq.nome}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleSalvar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
          >
            {salvo ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{salvo ? 'Salvo!' : 'Salvar Arquivo'}</span>
          </button>
        </div>

        {/* Editor de Código em Textarea Estilizado */}
        <div className="p-3 bg-[#0d0e14]">
          <textarea
            value={conteudoEditado}
            onChange={(e) => setConteudoEditado(e.target.value)}
            rows={18}
            className="w-full bg-transparent border-none text-xs sm:text-sm font-mono text-slate-200 leading-relaxed focus:outline-none resize-y selection:bg-emerald-500/30"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
