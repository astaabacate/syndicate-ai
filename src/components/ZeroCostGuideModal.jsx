import React, { useState } from 'react';
import { X, CheckCircle2, DollarSign, Smartphone, HelpCircle } from 'lucide-react';

export default function ZeroCostGuideModal({ onClose }) {
  const [secao, setSecao] = useState('oque_vendemos');

  const abas = [
    { id: 'oque_vendemos', label: '1. O Que Vendemos?' },
    { id: 'como_ganhar', label: '2. Como o Dinheiro Entra?' },
    { id: 'passo_passo', label: '3. O Seu Dia a Dia' },
    { id: 'instalar', label: '4. Usar no Celular' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0f121a] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <h3 className="text-sm font-bold text-white">
              Manual Prático da Operação
            </h3>
            <p className="text-xs text-slate-400">
              Tudo explicado de forma simples e direta
            </p>
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
              onClick={() => setSecao(a.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                secao === a.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[50vh] overflow-y-auto text-xs text-slate-300 leading-relaxed">
          {secao === 'oque_vendemos' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                O que você vende para o cliente?
              </h4>
              <p>
                Imagine um empresário, consultor, advogado ou médico que grava um vídeo ou podcast de 40 minutos para o YouTube ou Spotify.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-semibold block">O problema dele:</span>
                <p>
                  Quase ninguém tem 40 minutos para ver o vídeo inteiro. Esse empresário SABE que precisa postar resumos no LinkedIn e mandar uma newsletter por email para atrair clientes. <strong>Mas ele não tem tempo nem paciência para sentar e escrever.</strong>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-semibold block">O que você entrega:</span>
                <p>
                  Você se torna o parceiro de conteúdo dele. Toda semana ele grava o vídeo dele normal, e a nossa IA transforma aquele vídeo em:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 pt-1">
                  <li><strong>1 Newsletter por email</strong> pronta para os clientes dele lerem;</li>
                  <li><strong>3 Posts de alto nível para o LinkedIn</strong> dele;</li>
                  <li><strong>Frases e roteiros curtos</strong> para as redes sociais.</li>
                </ul>
              </div>
            </div>
          )}

          {secao === 'como_ganhar' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                Como o dinheiro entra na sua conta?
              </h4>
              <p>
                O cliente te paga uma <strong>mensalidade recorrente</strong> para você cuidar de todos os episódios que ele lançar no mês:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">1. Clientes no Brasil:</span>
                <p>
                  Você cobra <strong>R$ 390 a R$ 490 por mês</strong> via Pix ou link de cartão (Mercado Pago, Asaas, Nubank).
                </p>
                <p className="text-emerald-400 font-medium pt-1">
                  Exemplo: 5 clientes no Brasil = R$ 1.950 a R$ 2.450 líquidos caindo na sua conta todo mês.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">2. Clientes nos EUA (Mercado Gringo):</span>
                <p>
                  Criadores americanos pagam em dólar. O plano é de <strong>$149 dólares/mês</strong> por podcast (que equivale a cerca de R$ 800 na conversão). Você recebe direto via Stripe ou Wise na sua conta.
                </p>
                <p className="text-emerald-400 font-medium pt-1">
                  Exemplo: 5 clientes gringos = $745 dólares (~R$ 4.090,00 por mês) trabalhando pelo celular.
                </p>
              </div>
            </div>
          )}

          {secao === 'passo_passo' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                O que você faz no celular todo dia?
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white">Passo 1:</strong> Você abre o aplicativo no celular e vai em <em>Fluxo de Vendas</em>.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white">Passo 2:</strong> Clica em <em>"Gerar Amostra Gratuita com IA"</em> no card de um criador. A IA escreve o material de graça.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white">Passo 3:</strong> Clica em <em>"Mandar Amostra (WhatsApp ou Email)"</em>. Você manda de presente para ele.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white">Passo 4:</strong> Ele vê que o trabalho ficou excelente sem você cobrar nada antes. Quando ele responder, você clica em <em>"O Criador Respondeu"</em> e manda a proposta de assinatura (R$ 390/mês).
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white">Passo 5:</strong> Quando ele pagar, você só gasta 2 minutos por semana gerando os novos textos para ele!
                </div>
              </div>
            </div>
          )}

          {secao === 'instalar' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                Como usar na tela do celular como aplicativo:
              </h4>
              <p>
                Depois que subir na Vercel (ou pelo navegador):
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-white block">No Android (Chrome):</strong>
                <p>Toque nos 3 pontinhos no canto superior direito → Toque em <strong>"Adicionar à tela inicial"</strong>.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-white block">No iPhone (Safari):</strong>
                <p>Toque no ícone de compartilhar (quadrado com a setinha para cima) → Toque em <strong>"Adicionar à Tela de Início"</strong>.</p>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Entendido! Ir para o Painel
          </button>
        </div>
      </div>
    </div>
  );
}
