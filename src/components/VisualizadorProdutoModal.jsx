import React, { useState } from 'react';
import { X, Copy, Check, Download, ArrowRight, ExternalLink } from 'lucide-react';

export default function VisualizadorProdutoModal({ produto, onClose }) {
  const [abaAtiva, setAbaAtiva] = useState('conteudo');
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleBaixarArquivo = () => {
    const blob = new Blob([produto.conteudoProduto], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${produto.titulo.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const abas = [
    { id: 'conteudo', label: '1. O Produto (Arquivo)' },
    { id: 'copy', label: '2. Página de Vendas' },
    { id: 'divulgacao', label: '3. Textos de Divulgação' },
    { id: 'tutorial', label: '4. Cadastrar na Kiwify (3 min)' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#12141c] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              {produto.categoria}
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">
              {produto.titulo}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto no-scrollbar">
          {abas.map((a) => (
            <button
              key={a.id}
              onClick={() => setAbaAtiva(a.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                abaAtiva === a.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Conteúdo da Aba */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[50vh] overflow-y-auto text-xs">
          {/* Aba 1: Conteúdo do Produto */}
          {abaAtiva === 'conteudo' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Este é o arquivo final que o comprador recebe no email dele:
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleCopiar(produto.conteudoProduto)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                  >
                    {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={handleBaixarArquivo}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Arquivo</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                {produto.conteudoProduto}
              </div>
            </div>
          )}

          {/* Aba 2: Copy da Página de Vendas */}
          {abaAtiva === 'copy' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Textos prontos para colar na página da Kiwify ou Gumroad:
                </span>
                <button
                  onClick={() => handleCopiar(`Título: ${produto.copyVendas.headline}\n\nSubtítulo: ${produto.copyVendas.subheadline}\n\nBenefícios:\n${produto.copyVendas.beneficios.map(b => `- ${b}`).join('\n')}\n\nPreço: R$ ${produto.precoSugerido}\n\nGarantia: ${produto.copyVendas.garantia}`)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Todos os Textos</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Título Principal:</span>
                <p className="text-sm font-bold text-white leading-snug">{produto.copyVendas.headline}</p>

                <span className="text-[10px] text-slate-500 uppercase font-bold block pt-2">Subtítulo Explicativo:</span>
                <p className="text-slate-300 leading-relaxed">{produto.copyVendas.subheadline}</p>

                <span className="text-[10px] text-slate-500 uppercase font-bold block pt-2">O que o comprador ganha:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  {produto.copyVendas.beneficios.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="pt-2 flex items-center justify-between text-emerald-400 font-bold border-t border-slate-800">
                  <span>Preço: R$ {produto.precoSugerido},00</span>
                  <span className="text-[11px] text-slate-400 font-normal">{produto.copyVendas.garantia}</span>
                </div>
              </div>
            </div>
          )}

          {/* Aba 3: Divulgação Gratuita */}
          {abaAtiva === 'divulgacao' && (
            <div className="space-y-3">
              <span className="text-slate-400 block">
                Poste esses textos em grupos e redes sem parecer que está forçando a barra:
              </span>

              {produto.divulgacaoOrganica.map((div, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400">{div.canal}</span>
                    <button
                      onClick={() => handleCopiar(div.texto)}
                      className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{div.texto}</p>
                </div>
              ))}
            </div>
          )}

          {/* Aba 4: Passo a Passo Kiwify */}
          {abaAtiva === 'tutorial' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                Como colocar para vender em 3 minutos no celular (R$ 0):
              </h4>
              <ol className="space-y-2 pl-4 list-decimal text-slate-300">
                <li>
                  Acesse <strong>kiwify.com.br</strong> no celular e crie sua conta gratuita em 1 minuto. Não paga nada.
                </li>
                <li>
                  Vá no menu <strong>Produtos</strong> → Toque em <strong>Criar Produto</strong>.
                </li>
                <li>
                  Escolha <strong>Pagamento Único</strong> e tipo <strong>Arquivo Digital</strong>.
                </li>
                <li>
                  Copie o título e a descrição aqui da aba 2 e cole lá.
                </li>
                <li>
                  Defina o preço: <strong>R$ {produto.precoSugerido},00</strong>.
                </li>
                <li>
                  Na área de entrega, suba o arquivo que você baixou na aba 1.
                </li>
                <li>
                  Pronto! A Kiwify te dá um link de pagamento imediato. Quando alguém comprar no Pix ou Cartão, a Kiwify envia o arquivo automaticamente para o email da pessoa e o dinheiro cai na sua conta. Você não precisa falar com ninguém!
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
