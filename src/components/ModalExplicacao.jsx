import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function ModalExplicacao({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111218] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white">Como Funciona a Operação</h3>
            <p className="text-xs text-slate-400">Direto ao ponto, sem termos difíceis</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5 max-h-[50vh] overflow-y-auto text-xs text-slate-300 leading-relaxed">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">1. O que nós vendemos?</h4>
            <p>
              Vendemos <strong>manuais práticos e guias completos em formato digital</strong> que resolvem um problema urgente de quem trabalha por conta própria (ex: como fechar vendas no WhatsApp, como destravar anúncios no Mercado Livre).
            </p>
            <p className="text-emerald-400 font-medium">
              Não são prompts soltos para a pessoa ter que ir pro ChatGPT. É o material final pronto que a pessoa lê no celular e já aplica.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-white text-sm">2. Como o dinheiro entra sem você falar com ninguém?</h4>
            <p>
              Você cadastra o produto na <strong>Kiwify</strong> (plataforma brasileira gratuita). Ela gera um link de compra.
            </p>
            <p>
              Quando alguém clica e paga R$ 27 no Pix, <strong>a Kiwify entrega o arquivo no email da pessoa automaticamente</strong> e deposita o dinheiro na sua conta. Você não precisa responder mensagem, nem aceitar cliente, nem dar suporte.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-white text-sm">3. O que a IA faz vs O que você faz?</h4>
            <p>
              <strong>A IA faz 95% do trabalho pesado:</strong> Ela pesquisa a dor do nicho, redige o conteúdo completo do guia de ponta a ponta, cria a página de vendas e escreve os posts de divulgação.
            </p>
            <p>
              <strong>Você só faz o que realmente precisa de um humano:</strong> Baixa o arquivo, cola na Kiwify para pegar o seu link de Pix e compartilha nos locais indicados.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-white text-sm">4. Quanto dá para ganhar?</h4>
            <p>
              Com preço de impulso (R$ 27 a R$ 37), as pessoas compram no Pix na hora:
            </p>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
              <li>1 venda por dia = <strong>R$ 810 a R$ 1.110/mês</strong></li>
              <li>3 vendas por dia = <strong>R$ 2.430 a R$ 3.330/mês</strong></li>
              <li>5 vendas por dia = <strong>R$ 4.050 a R$ 5.550/mês</strong></li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Entendido, ir para o painel!
          </button>
        </div>
      </div>
    </div>
  );
}
