import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Bot, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DiscordTicketGuide() {
  const [copiado, setCopiado] = useState(null);

  const handleCopiar = (texto, id) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const textoAnuncioDiscord = `⚡ **NEXUS HOST — HOSPEDAGEM DE BOTS DE DISCORD 24/7** ⚡

Cansado de deixar seu bot caindo no Replit ou tendo que deixar o PC ligado o dia todo?
Tenha seu bot rodando 24 horas por dia com painel próprio e console ao vivo!

📌 **O QUE ESTÁ INCLUSO:**
- Painel Web moderno (Pterodactyl / Vercel style)
- Console em tempo real para ver logs e erros
- Editor de código e gerenciador de arquivos (.env seguro)
- Suporte para Node.js (discord.js v14) e Python
- 512MB RAM dedicada com 99.9% Uptime garantido
- Licença com trava de segurança vinculada à sua conta

💰 **VALOR:** Apenas **R$ 15,00 / mês** no Pix!

👉 **COMO CONTRATAR:**
Abra um ticket abaixo clicando no botão **[Hospedar Meu Bot]** e receba sua chave de ativação na hora!`;

  const textoTicketAtendimento = `Olá! Obrigado por escolher a NexusHost.

Para ativar seu bot por 30 dias na nossa infraestrutura 24/7:
1. Chave Pix: \`sua-chave-pix@aqui.com\`
2. Valor: **R$ 15,00**
3. Envie o comprovante aqui no ticket.

Assim que confirmar, te envio sua **Chave de Licença Exclusiva** e o link do painel para você ativar direto na sua conta do Discord!`;

  return (
    <div className="space-y-4 max-w-2xl mx-auto text-xs leading-relaxed">
      {/* Bloco de Visão Geral */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">
            Como Vender no Discord com Sistema de Ticket
          </h2>
        </div>
        <p className="text-slate-400">
          Você não precisa de site de e-commerce nem gateway caro. A comunidade de bots do Discord compra 100% via <strong>Ticket + Pix</strong>.
        </p>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-slate-300">
          <strong className="text-white block">O Fluxo de Venda em 4 Passos:</strong>
          <ol className="list-decimal pl-4 space-y-1 text-slate-400">
            <li>Você cria um canal chamado <code className="text-emerald-400">#hospedar-bot</code> no seu servidor do Discord;</li>
            <li>Coloca um bot de ticket gratuito (ex: <em>Ticket Tool</em> ou <em>Open Ticket</em>) com o anúncio abaixo;</li>
            <li>O cliente clica no botão do ticket, paga R$ 15 no Pix e manda o comprovante;</li>
            <li>Você vai na aba <strong>Painel do Dono</strong> deste app, gera uma chave com 1 clique e entrega no ticket.</li>
          </ol>
        </div>
      </div>

      {/* Caixa 1: Mensagem para o Canal de Anúncios */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 uppercase">
            1. Mensagem para o Canal #hospedar-bot (Discord Embed):
          </span>
          <button
            onClick={() => handleCopiar(textoAnuncioDiscord, 'anuncio')}
            className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            {copiado === 'anuncio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiado === 'anuncio' ? 'Copiado!' : 'Copiar Anúncio'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
          {textoAnuncioDiscord}
        </div>
      </div>

      {/* Caixa 2: Mensagem de Resposta Dentro do Ticket */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 uppercase">
            2. Mensagem que o Bot / Você manda dentro do Ticket aberto:
          </span>
          <button
            onClick={() => handleCopiar(textoTicketAtendimento, 'ticket')}
            className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            {copiado === 'ticket' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiado === 'ticket' ? 'Copiado!' : 'Copiar Resposta'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
          {textoTicketAtendimento}
        </div>
      </div>
    </div>
  );
}
