/**
 * Respostas prontas para fechar a venda quando o criador responder
 */

export const RESPOSTAS_TIPO = [
  {
    id: "pediu_preco",
    titulo: "Gostou e pediu preço / como funciona",
    descricao: "O criador achou a amostra boa e quer saber valores."
  },
  {
    id: "achou_caro",
    titulo: "Achou caro ou sem orçamento no momento",
    descricao: "Gostou mas pediu desconto ou plano menor."
  },
  {
    id: "quer_mais_um",
    titulo: "Pediu para fazer mais um teste grátis",
    descricao: "Quer ver mais uma amostra antes de fechar."
  },
  {
    id: "perguntou_video",
    titulo: "Perguntou se entrega cortes em vídeo",
    descricao: "Quer saber sobre Reels e vídeos verticais."
  }
];

export function gerarRespostaFechamento({ lead, tipoResposta }) {
  const isGringo = lead.pais === "US" || lead.idioma === "en";
  const nome = lead.apresentador?.split(" ")[0] || "amigo";

  if (isGringo) {
    if (tipoResposta === "pediu_preco") {
      return {
        estrategia: "Apresentar assinatura simples de $149/mês sem fidelidade.",
        texto: `Hi ${nome}!\n\nGlad you liked the format! Here is how simple it is:\n\nEvery week when you record a new episode, you just send me the link. Within 24 hours, you receive:\n- 1 Ready-to-send email newsletter;\n- 2 Thought-leadership LinkedIn posts;\n- 3 Punchy snippets for social media.\n\nIt's a flat $149/month (covers 4 weekly episodes, cancel anytime).\n\nIf you'd like to start with your next episode, you can activate your spot here:\n👉 https://buy.stripe.com/exemplo_link_seguro\n\nExcited to partner up!`
      };
    }
    return {
      estrategia: "Negociação flexível.",
      texto: `Hi ${nome}! I can offer a LinkedIn-only package for just $79/month so you still get full B2B visibility without stretching your budget. Let me know if that works for you!`
    };
  }

  // Português
  switch (tipoResposta) {
    case "pediu_preco":
      return {
        estrategia: "Apresentar a assinatura mensal de R$ 390 a R$ 490 sem fidelidade.",
        texto: `Oi ${nome}!\n\nFunciona de forma muito simples e sem tomar seu tempo:\n\nToda vez que você gravar ou publicar um episódio novo, você só me manda o link. Em até 24 horas eu te entrego:\n\n1. Uma Newsletter completa pronta para você disparar por email;\n2. Três posts de alto nível para o seu LinkedIn prontos para copiar e colar;\n3. Frases e destaques curtos para suas redes;\n4. Roteiro com o gancho exato dos primeiros 3 segundos para cortes de vídeo.\n\nO plano mensal cobre 4 episódios por mês (1 por semana) por R$ 390/mês (sem carência nem contrato longo, você só continua se estiver gostando).\n\nPara ativarmos já no seu próximo episódio, você pode fazer por este link do Pix/cartão:\n👉 [Seu link de pagamento do Mercado Pago/Asaas/Stripe]\n\nAssim que você confirmar, já deixo sua pauta organizada aqui. Bora fechar?`
      };

    case "achou_caro":
      return {
        estrategia: "Oferecer um plano enxuto (apenas LinkedIn) por R$ 190/mês.",
        texto: `Oi ${nome}, super entendo! No momento atual o caixa precisa estar seguro.\n\nPara você não deixar seus episódios sem presença no LinkedIn, posso fazer uma versão focada apenas nos 3 posts de LinkedIn por R$ 190/mês.\n\nAssim você já gera autoridade e atrai clientes corporativos sem pesar no orçamento. Se fizer sentido, me dá um toque que te passo a chave Pix!`
      };

    case "quer_mais_um":
      return {
        estrategia: "Garantia de 100% de devolução em vez de trabalhar de graça mais uma vez.",
        texto: `Oi ${nome}! Para você não correr risco nenhum, vamos fazer o seguinte:\n\nVocê ativa o plano do primeiro mês (R$ 390). Se após a entrega do primeiro episódio completo você não achar que o material está excelente, eu devolvo 100% do seu dinheiro no mesmo dia, sem nenhuma burocracia.\n\nCombinado assim? Se sim, me avisa que te envio os dados de ativação!`
      };

    case "perguntou_video":
      return {
        estrategia: "Oferecer pacote completo com vídeos por R$ 690/mês.",
        texto: `Oi ${nome}! No pacote padrão já entrego os roteiros e os minutos exatos com os melhores ganchos para cortar.\n\nMas se você quiser os vídeos verticais já cortados com legenda dinâmica prontos para postar no Reels e TikTok, temos o pacote com vídeo por R$ 690/mês (inclui os textos + 8 cortes em vídeo no mês).\n\nQual dos dois modelos você prefere?`
      };

    default:
      return {
        estrategia: "Resposta padrão cortês.",
        texto: `Perfeito, ${nome}! Muito obrigado pelo retorno e muito sucesso com o canal! Qualquer coisa estou à disposição.`
      };
  }
}
