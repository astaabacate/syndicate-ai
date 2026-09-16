import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';

export default function ModalProduto({ produto, onClose, onRegistrarVendaProduto }) {
  const [aba, setAba] = useState('produto');
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleBaixar = () => {
    const blob = new Blob([produto.conteudoCompleto], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${produto.titulo.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111218] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white">
              {produto.titulo}
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">
              Preço de Venda: R$ {produto.preco},00
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs">
          {[
            { id: 'produto', label: '1. Conteúdo Pronto' },
            { id: 'copy', label: '2. Página de Vendas' },
            { id: 'divulgacao', label: '3. Onde Postar' },
            { id: 'kiwify', label: '4. Passo a Passo' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAba(item.id)}
              className={`flex-1 py-2.5 text-center font-medium border-b-2 transition ${
                aba === item.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[50vh] overflow-y-auto text-xs leading-relaxed">
          {/* Aba 1: O Produto Real */}
          {aba === 'produto' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Arquivo completo pronto para o comprador:
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleCopiar(produto.conteudoCompleto)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  >
                    {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={handleBaixar}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Arquivo</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] whitespace-pre-wrap max-h-64 overflow-y-auto">
                {produto.conteudoCompleto}
              </div>
            </div>
          )}

          {/* Aba 2: Copy da Página de Vendas */}
          {aba === 'copy' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Textos prontos para cadastrar na Kiwify:
                </span>
                <button
                  onClick={() => handleCopiar(`Título: ${produto.copyVendas.tituloPagina}\n\nDescrição: ${produto.copyVendas.descricao}\n\nO que está incluso:\n${produto.copyVendas.topicos.map(t => `- ${t}`).join('\n')}\n\nGarantia: ${produto.copyVendas.garantia}`)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Tudo</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Título:</span>
                <p className="font-bold text-white">{produto.copyVendas.tituloPagina}</p>

                <span className="text-[10px] text-slate-500 font-bold uppercase block pt-1">Descrição:</span>
                <p className="text-slate-300">{produto.copyVendas.descricao}</p>

                <span className="text-[10px] text-slate-500 font-bold uppercase block pt-1">O que vem dentro:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  {produto.copyVendas.topicos.map((top, i) => (
                    <li key={i}>{top}</li>
                  ))}
                </ul>

                <p className="text-emerald-400 font-medium pt-1">
                  {produto.copyVendas.garantia}
                </p>
              </div>
            </div>
          )}

          {/* Aba 3: Divulgação Orgânica */}
          {aba === 'divulgacao' && (
            <div className="space-y-3">
              <span className="text-slate-400 block">
                Copie e poste em grupos ou fóruns sem parecer vendedor chato:
              </span>

              {produto.ondeDivulgar.map((div, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">{div.local}</span>
                    <button
                      onClick={() => handleCopiar(div.mensagem)}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]"
                    >
                      Copiar
                    </button>
                  </div>
                  <p className="text-slate-300">{div.mensagem}</p>
                </div>
              ))}
            </div>
          )}

          {/* Aba 4: Passo a Passo */}
          {aba === 'kiwify' && (
            <div className="space-y-3 text-slate-300">
              <h4 className="font-bold text-white">Como colocar no ar em 3 minutos:</h4>
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>Baixe o arquivo na aba 1 no seu celular;</li>
                <li>Abra <strong>kiwify.com.br</strong> e crie sua conta grátis;</li>
                <li>Vá em <strong>Produtos</strong> → <strong>Criar Produto</strong>;</li>
                <li>Escolha <strong>Pagamento Único</strong> e <strong>Arquivo Digital</strong>;</li>
                <li>Cole o título da aba 2, coloque o preço de R$ {produto.preco},00 e suba o arquivo;</li>
                <li>Copie o link de checkout e use na divulgação. A Kiwify entrega o arquivo no email e deposita o Pix para você!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={() => onRegistrarVendaProduto(produto.id)}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            + Adicionar 1 Venda a Este Produto
          </button>

          <button
            onClick={onClose}
            className="py-1.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
