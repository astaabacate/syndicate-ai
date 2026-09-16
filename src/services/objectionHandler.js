/**
 * AI Response Classifier & Objection Buster
 * Converts lead replies into closed sales with 1-click counter-proposals
 */

export const OBJECTION_PRESETS = [
  {
    id: "pricing_interest",
    label: "Pediu Preço / Como funciona? 💰",
    category: "hot_lead",
    description: "O lead adorou a amostra e quer saber valores e como contratar."
  },
  {
    id: "want_trial",
    label: "Quer mais um teste grátis 🧪",
    category: "warm_lead",
    description: "Pediu para fazer mais um episódio antes de fechar contrato."
  },
  {
    id: "budget_objection",
    label: "Achou caro / Sem orçamento 📉",
    category: "negotiation",
    description: "Gostou do material mas diz que está sem verba no momento."
  },
  {
    id: "scope_video",
    label: "Quer saber se inclui vídeos curtos / Reels 🎥",
    category: "upsell",
    description: "Pergunta sobre edição de vídeo e formatos para TikTok/Shorts."
  },
  {
    id: "not_interested",
    label: "Não tem interesse / Encerrar 🛑",
    category: "closed_lost",
    description: "Pediu para não entrar mais em contato ou disse que não precisa."
  }
];

export function handleObjection({ lead, responseType, customText = "", paymentLink = "https://buy.stripe.com/test_syndicate" }) {
  const isPt = lead.language === "pt" || lead.country === "BR";
  const host = lead.hostName?.split(" ")[0] || "there";

  if (isPt) {
    switch (responseType) {
      case "pricing_interest":
        return {
          sentiment: "Alto Interesse (Lead Quente)",
          strategy: "Fechar na hora com garantia incondicional e link direto de ativação.",
          recommendedPrice: "R$ 490/mês (ou teste avulso de R$ 97)",
          replyText: `Oi ${host}!\n\nFunciona de forma 100% assíncrona e sem tomar seu tempo:\n\n1. Toda vez que você publicar um novo episódio (ou nos mandar o link/áudio), nosso sistema gera em até 24h:\n   - 1 Newsletter completa formatada para seu Substack ou ferramenta de email;\n   - 3 Posts de Autoridade para seu LinkedIn prontos para copiar e colar;\n   - 5 Pílulas de conteúdo para o X/Twitter;\n   - Roteiros com ganchos para Shorts/Reels.\n\nO plano mensal cobre 4 episódios por mês (1 por semana) por apenas R$ 490/mês (sem fidelidade, pode cancelar quando quiser).\n\nPara ativarmos no seu próximo episódio, você pode iniciar diretamente por este link seguro:\n👉 ${paymentLink}\n\nAssim que confirmar, já conecto o seu canal e cuidamos de tudo. Bora fechar?`
        };

      case "want_trial":
        return {
          sentiment: "Interesse com Hesitação",
          strategy: "Oferecer garantia de devolução de 100% em vez de trabalhar de graça.",
          recommendedPrice: "R$ 490/mês com garantia de 7 dias",
          replyText: `Oi ${host}!\n\nEntendo perfeitamente o seu cuidado. Vamos fazer o seguinte para você não correr risco nenhum:\n\nVocê ativa o plano mensal de R$ 490 pelo link abaixo e já me passa o próximo episódio. Se após a entrega do primeiro episódio completo você não achar que o material está no mais alto nível, eu devolvo 100% do seu dinheiro no mesmo dia, sem nenhuma burocracia.\n\nLink seguro para ativar: ${paymentLink}\n\nO que acha? Combinado?`
        };

      case "budget_objection":
        return {
          sentiment: "Sensível a Preço",
          strategy: "Downsell para plano básico (apenas LinkedIn) ou pacote avulso.",
          recommendedPrice: "R$ 190/mês (Light) ou R$ 80 avulso",
          replyText: `Oi ${host}, super compreendo! O orçamento tem que fazer sentido para o momento atual.\n\nPara não deixar seu podcast sem distribuição no LinkedIn, posso fazer uma versão 'Light' para você:\n- Focamos apenas nos 3 Posts de Autoridade para o LinkedIn por episódio;\n- Por apenas R$ 190/mês (cobre os 4 episódios).\n\nAssim você garante alcance orgânico e leads B2B sem estourar o orçamento. Se fizer sentido, me avisa que te passo o link do plano Light!`
        };

      case "scope_video":
        return {
          sentiment: "Oportunidade de Upsell",
          strategy: "Explicar que já entregamos os roteiros e oferecer corte automatizado.",
          recommendedPrice: "R$ 790/mês (com cortes verticais)",
          replyText: `Oi ${host}!\n\nNo pacote padrão já entregamos os roteiros com os ganchos exatos dos primeiros 3 segundos e minutos de corte.\n\nMas se você quiser os vídeos verticais já cortados, com legendas dinâmicas e prontos para postar no Reels/Shorts, temos o pacote 'Full Video + Text' por R$ 790/mês (inclui os textos + 8 cortes em vídeo por mês).\n\nSe preferir esse pacote completo, é só me avisar que te envio os detalhes!`
        };

      default:
        return {
          sentiment: "Desengajado",
          strategy: "Agradecer educadamente e encerrar sem insistência.",
          recommendedPrice: "-",
          replyText: `Perfeito, ${host}! Obrigado pelo retorno e sucesso contínuo com o ${lead.showTitle}. Grande abraço!`
        };
    }
  }

  // English default (US / UK / Global)
  switch (responseType) {
    case "pricing_interest":
      return {
        sentiment: "High Intent / Qualified Lead",
        strategy: "Present frictionless monthly retainer with instant Stripe checkout.",
        recommendedPrice: "$149 - $199 / month",
        replyText: `Hi ${host}!\n\nGlad you liked the sample!\n\nHere is how simple it is: You just keep recording your episodes as usual. The moment an episode goes live (or you send me the draft link), you receive within 24 hours:\n\n- 1 Ready-to-send Substack/Beehiiv email newsletter\n- 3 High-converting LinkedIn thought-leadership posts\n- 5 Punchy X/Twitter snippets\n- 2 Short-form video scripts with retention hooks\n\nThe monthly retainer is just $149/month (covers 4 weekly episodes, cancel anytime, zero long-term contract).\n\nYou can activate your spot right here via Stripe:\n👉 ${paymentLink}\n\nOnce activated, just send over your next episode and we'll handle the rest. Excited to partner up!`
      };

    case "want_trial":
      return {
        sentiment: "Hesitant / Seeking Trust",
        strategy: "Risk-reversal: Offer 100% money-back guarantee on episode 1 instead of free labor.",
        recommendedPrice: "$149 / month (100% Money-Back Guarantee)",
        replyText: `Totally understand, ${host}! Let's make this 100% zero-risk for you:\n\nGo ahead and start the $149/mo retainer via the link below. If after our first full episode delivery you don't feel the quality is exceptional, just reply to this email and I will issue an instant, 100% full refund on Stripe. No questions asked.\n\nSecure link: ${paymentLink}\n\nSound like a fair deal?`
      };

    case "budget_objection":
      return {
        sentiment: "Price Sensitive",
        strategy: "Downsell to LinkedIn-Only tier at $79/mo or $29 single episode.",
        recommendedPrice: "$79/mo (LinkedIn Only)",
        replyText: `Completely understand, ${host}—cash flow comes first.\n\nIf you still want to leverage your episodes for B2B deal flow without the full cost, I can do a LinkedIn-Only package: 3 formatted thought-leadership posts per episode for just $79/month.\n\nThat way your episodes still generate inbound client leads on LinkedIn without straining your budget. Let me know if you'd like to test that!`
      };

    case "scope_video":
      return {
        sentiment: "Upsell Opportunity",
        strategy: "Offer video clip add-on package ($299/mo).",
        recommendedPrice: "$299 / month (Full Text + 8 Video Clips)",
        replyText: `Great question, ${host}!\n\nOur standard $149 plan includes the video clip scripts and exact timestamps. However, if you want fully edited 9:16 vertical video clips with dynamic captions and hooks ready for Shorts/TikTok/Reels, we have our 'Full Stack Media' plan at $299/month (covers 4 written packs + 8 edited short-form clips per month).\n\nWould you prefer the all-in-one media package?`
      };

    default:
      return {
        sentiment: "Closed Lost",
        strategy: "Polite close, maintain clean brand reputation.",
        recommendedPrice: "-",
        replyText: `Got it, ${host}! Really appreciate you taking the time to reply. Wishing you and the ${lead.showTitle} show continued growth and success!`
      };
  }
}
