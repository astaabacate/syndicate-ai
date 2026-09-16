import React, { useState } from 'react';
import { X, Sparkles, Zap } from 'lucide-react';

export default function NovoProdutoModal({ onClose, onCriarProduto }) {
  const [nicho, setNicho] = useState('');
  const [preco, setPreco] = useState(37);
  const [gerando, setGerando] = useState(false);

  const sugestoes = [
    "Personal Trainers",
    "Advogados Trabalhistas",
    "Confeitaria & Bolos",
    "Designers Freelancers",
    "Nutricionistas"
  ];

  const handleGerar = (e) => {
    e.preventDefault();
    if (!nicho) return;

    setGerando(true);
    setTimeout(() => {
      const novoProduto = {
        id: `prod-${Date.now()}`,
        titulo: `Kit de Automação & Prompts para ${nicho}`,
        subtitulo: `Modelos prontos e prompts de inteligência artificial específicos para profissionais de ${nicho}.`,
        categoria: nicho,
        precoSugerido: Number(preco),
        moeda: "BRL",
        tempoCriacao: "Instantâneo",
        publicoAlvo: `Profissionais de ${nicho} que precisam de templates prontos para acelerar o dia a dia.`,
        status: "pronto",
        downloadsRealizados: 0,
        faturamentoGerado: 0,
        conteudoProduto: `# KIT DE PROMPTS E MODELOS PARA ${nicho.toUpperCase()}

## 1. Atendimento Rápido no WhatsApp
Copie e cole este prompt no ChatGPT ou Gemini:
\`\`\`
Atue como um especialista em vendas para ${nicho}.
Crie 3 opções de mensagens curtas para responder novos contatos no WhatsApp, explicando o serviço com clareza e convidando para fechar o atendimento.
\`\`\`

## 2. Conteúdo Semanal para Redes Sociais
\`\`\`
Gere 5 ideias de posts educativos e diretos para o Instagram de um profissional de ${nicho}.
Cada post deve conter:
- Título chamativo
- Conteúdo em 3 tópicos
- Pergunta final para gerar comentários
\`\`\`

## 3. Resposta a Dúvidas Frequentes e Orçamentos
\`\`\`
O cliente perguntou: "Quanto custa o serviço?"
Crie uma resposta que apresente o valor gerado antes de falar o preço, diminuindo a sensação de caro.
\`\`\``,
        copyVendas: {
          headline: `Acelere seu trabalho em ${nicho} com modelos e prompts prontos de IA.`,
          subheadline: `O guia prático para economizar horas semanais no atendimento e captação de clientes.`,
          beneficios: [
            `Respostas prontas para fechar mais clientes no WhatsApp`,
            `Planejamento de conteúdo sem travar na folha em branco`,
            `Como precificar e apresentar propostas sem desconto`,
            `Acesso imediato no email em formato de texto e PDF`
          ],
          chamadaAcao: `Baixar Kit de ${nicho} por R$ ${preco}`,
          garantia: "Garantia total de 7 dias com devolução integral."
        },
        divulgacaoOrganica: [
          {
            canal: `Grupos de ${nicho} no Facebook e WhatsApp`,
            texto: `Pessoal de ${nicho}: organizei um documento com os prompts de IA mais úteis que uso para economizar tempo no dia a dia. Deixei disponível aqui: [SEU_LINK_KIWIFY]`
          }
        ]
      };

      onCriarProduto(novoProduto);
      setGerando(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#12141c] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white">
              Criar Novo Micro-Produto com IA
            </h3>
            <p className="text-xs text-slate-400">
              A IA gera o produto completo e os textos de venda em 5 segundos
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGerar} className="p-4 sm:p-5 space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Para qual público ou profissão você quer criar o produto?
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Confeiteiras, Advogados, Personal Trainers..."
              value={nicho}
              onChange={e => setNicho(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            {/* Sugestões rápidas */}
            <div className="flex flex-wrap gap-1 mt-2">
              {sugestoes.map((sug, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setNicho(sug)}
                  className="text-[10px] text-slate-400 bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded-md"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Preço de Venda do Produto:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[27, 37, 47, 97].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPreco(p)}
                  className={`py-2 rounded-xl border text-xs font-bold transition ${
                    preco === p
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                <span>A IA está gerando o produto e a página de vendas...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Produto Pronto para Venda (1 Toque)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
