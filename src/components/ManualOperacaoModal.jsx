import React, { useState } from 'react';
import { X, CheckCircle2, DollarSign, Smartphone } from 'lucide-react';

export default function ManualOperacaoModal({ onClose }) {
  const [secao, setSecao] = useState('como_ganhar');

  const abas = [
    { id: 'como_ganhar', label: '1. Como o Dinheiro Entra?' },
    { id: 'zero_cliente', label: '2. Por que Zero Clientes?' },
    { id: 'rotina', label: '3. Sua Rotina no Celular' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#12141c] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white">
              Como Funciona a Máquina de Vendas Automáticas
            </h3>
            <p className="text-xs text-slate-400">
              O modelo sem clientes, sem reuniões e sem propostas
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

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

        <div className="p-4 sm:p-5 space-y-3.5 max-h-[50vh] overflow-y-auto text-xs text-slate-300 leading-relaxed">
          {secao === 'como_ganhar' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                Como você faz dinheiro com isso?
              </h4>
              <p>
                Em vez de vender "serviço" (onde você tem que conversar, mandar proposta e negociar com cliente chato), você vende <strong>micro-produtos digitais prontos por R$ 37 a R$ 47</strong>.
              </p>
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-emerald-400 block">Exemplo real:</strong>
                <p>
                  Um vendedor do Mercado Livre quer criar descrições que vendem rápido. Ele vê o seu <strong>"Kit de IA para Mercado Livre"</strong> por <strong>R$ 37</strong>.
                </p>
                <p>
                  Ele clica no link, paga no Pix pelo celular em 5 segundos. A plataforma (Kiwify ou Hotmart) envia o arquivo automaticamente para o email dele e o dinheiro cai na sua conta.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-bold text-white block mb-1">A matemática das vendas:</span>
                <ul className="space-y-1">
                  <li>• 1 venda por dia (R$ 37) = <strong>R$ 1.110,00/mês</strong></li>
                  <li>• 3 vendas por dia (R$ 37) = <strong>R$ 3.330,00/mês</strong></li>
                  <li>• 5 vendas por dia (R$ 37) = <strong>R$ 5.550,00/mês</strong></li>
                </ul>
              </div>
            </div>
          )}

          {secao === 'zero_cliente' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                Por que você não precisa "aceitar cliente" nem conversar com ninguém?
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Checkout 100% automático:</strong> Você não envia chave Pix no WhatsApp de ninguém. O comprador paga na página da Kiwify ou Gumroad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Entrega 100% automática:</strong> O arquivo já fica hospedado na plataforma. Assim que o Pix é aprovado, a própria plataforma envia o download para o email do comprador.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero suporte:</strong> Como é um documento de prompts e modelos prontos, não tem software para dar erro nem reunião para marcar.</span>
                </li>
              </ul>
            </div>
          )}

          {secao === 'rotina' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                O que você faz no celular todo dia?
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white block">1. Criar o produto (leva 10 segundos):</strong>
                  Você escolhe um nicho aqui no app (ex: Corretores, Vendedores, Confeiteiras). A IA cria o kit completo e a página de vendas.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white block">2. Cadastrar na Kiwify (leva 3 minutos):</strong>
                  Abre o site gratuito da Kiwify, cola o título, coloca o preço de R$ 37 e sobe o arquivo. Pega o seu link de pagamento.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white block">3. Divulgar o link de graça (15 minutos por dia):</strong>
                  Pega os textos prontos gerados na aba "Divulgação" e posta em grupos de Facebook, Reddit ou comentários do TikTok onde as pessoas estão com essa dor.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-white block">4. Dinheiro no Pix:</strong>
                  Conforme as pessoas compram, você recebe as notificações de venda aprovada no celular sem ter conversado com ninguém.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Entendido! Voltar para o Painel
          </button>
        </div>
      </div>
    </div>
  );
}
