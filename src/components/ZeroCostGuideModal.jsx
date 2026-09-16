import React, { useState } from 'react';
import { X, DollarSign, Smartphone, Key, ShieldCheck, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function ZeroCostGuideModal({ onClose }) {
  const [activeSection, setActiveSection] = useState('zero_cost');

  const sections = [
    { id: 'zero_cost', label: '1. Regra de R$ 0', icon: ShieldCheck },
    { id: 'payments', label: '2. Receber em Dólar / Pix', icon: DollarSign },
    { id: 'mobile', label: '3. Instalar no Celular', icon: Smartphone },
    { id: 'ai_keys', label: '4. IA Gratuita (Gemini / Groq)', icon: Key }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Guia Operacional R$0 & Mobile
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Como Operar 100% Grátis pelo Celular
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto no-scrollbar">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition ${
                  activeSection === sec.id
                    ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[55vh] overflow-y-auto text-xs leading-relaxed text-slate-300 font-sans">
          {activeSection === 'zero_cost' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Como garantimos R$ 0 de custo em tudo:</span>
              </h4>
              <p>
                Este modelo de negócio foi estruturado para <strong>eliminar 100% de qualquer gasto fixo</strong>:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sem domínio e sem hospedagem paga:</strong> Este painel web roda gratuitamente no Vercel/Cloudflare Pages (plano Free vitalício).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sem banco de dados de leads pago (Apollo/ZoomInfo):</strong> Os podcasts divulgam seus emails de contato publicamente na descrição do canal no YouTube, no perfil do Spotify e no Substack.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sem ferramentas caras de automação (Make/Zapier pago):</strong> Todo o fluxo de geração, qualificação e disparo é executado diretamente por este aplicativo com 1 toque no celular.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Sem risco de bloqueio de email:</strong> Não fazemos spam frio massivo. Enviamos abordagens manuais ultra-personalizadas com a amostra de valor já feita no corpo. 10 emails desse tipo geram mais vendas que 10.000 spams automáticos.</span>
                </li>
              </ul>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Como cobrar em Dólar ($) e cair na sua conta brasileira via Pix:</span>
              </h4>
              <p>
                Vender para criadores dos EUA, Canadá e Europa é a maior alavanca financeira, pois <strong>$149 USD equivalem a cerca de R$ 815 BRL</strong> por cliente:
              </p>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-emerald-400">Opção 1: Stripe Payment Links (Recomendado)</p>
                <p className="text-[11px] text-slate-400">
                  Crie uma conta gratuita na Stripe (disponível para residentes no Brasil com CPF ou CNPJ). Você cria um "Link de Pagamento Recorrente" de $149/mês. O cliente gringo passa o cartão de crédito e a Stripe converte e deposita direto na sua conta bancária no Brasil. Custo: R$ 0 mensal (apenas taxa por transação bem-sucedida de ~3%).
                </p>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-cyan-400">Opção 2: Wise (TransferWise)</p>
                <p className="text-[11px] text-slate-400">
                  Crie uma conta multimoeda na Wise gratuitamente. Ela te fornece dados bancários americanos (Routing Number e Account Number). O cliente transfere em dólares e você transfere para o seu Nubank/Inter via Pix em 2 segundos com IOF mínimo.
                </p>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-purple-400">Opção 3: Mercado Pago / Asaas / Pix (Para clientes do Brasil)</p>
                <p className="text-[11px] text-slate-400">
                  Para podcasters brasileiros, gere um link de assinatura Pix no Mercado Pago ou Asaas por R$ 490/mês.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'mobile' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Como colocar este app na tela inicial do seu celular:</span>
              </h4>
              <div className="space-y-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-slate-200">No Android (Google Chrome):</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Toque nos 3 pontinhos no canto superior direito do Chrome → Toque em <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>. Ele se comportará como um app nativo, abrindo em tela cheia sem barras de navegador.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-slate-200">No iPhone (Safari):</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Toque no botão de <strong>Compartilhar</strong> (quadrado com seta para cima) → Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai_keys' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>IA 100% Gratuita (Sem Cartão de Crédito):</span>
              </h4>
              <p>
                Este sistema já possui um <strong>motor semântico heurístico nativo</strong> que gera kits de conteúdo de altíssima qualidade sem precisar de nenhuma chave de API.
              </p>
              <p>
                Porém, se você quiser conectar uma LLM de ponta em tempo real, use os free tiers generosos que existem hoje:
              </p>
              <ul className="space-y-2">
                <li className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">Google Gemini 2.0 Flash (Google AI Studio):</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    1.500 requisições por dia 100% gratuitas, janela de 1 milhão de tokens. Não pede cartão de crédito. Acesse <code>aistudio.google.com</code> com sua conta Google e gere uma chave em 1 minuto.
                  </p>
                </li>
                <li className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-cyan-400">Groq Cloud (Llama 3.3 70B):</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Incríveis 30 requisições por minuto gratuitas. Gera o kit inteiro em menos de 1 segundo. Acesse <code>console.groq.com</code> e crie uma chave grátis.
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Entendido, ir para a Operação!
          </button>
        </div>
      </div>
    </div>
  );
}
