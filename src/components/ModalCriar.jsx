import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { gerarProdutoCompleto } from '../services/geradorAutomatico';

export default function ModalCriar({ onClose, onCriar }) {
  const [tema, setTema] = useState('');
  const [preco, setPreco] = useState(27);
  const [gerando, setGerando] = useState(false);

  const sugestoes = ["Corretores de Imóveis", "Vendas no Mercado Livre", "Prestadores de Serviços", "Nutrição & Emagrecimento"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tema) return;

    setGerando(true);
    setTimeout(() => {
      const prod = gerarProdutoCompleto({ tema, preco });
      onCriar(prod);
      setGerando(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111218] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white">Criar Novo Produto com IA</h3>
            <p className="text-xs text-slate-400">A IA gera o manual completo e os textos de venda</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Qual é o tema, dor ou público?
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Como atrair clientes para advogados..."
              value={tema}
              onChange={e => setTema(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex flex-wrap gap-1 mt-2">
              {sugestoes.map((s, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setTema(s)}
                  className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Preço de Venda Sugerido:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[19, 27, 37, 47].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPreco(p)}
                  className={`py-2 rounded-xl border text-xs font-bold transition ${
                    preco === p
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  R$ {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={gerando}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
            >
              {gerando ? (
                <span>A IA está gerando o produto completo...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Produto Pronto (1 Toque)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
