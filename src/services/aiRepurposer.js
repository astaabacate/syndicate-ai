/**
 * Motor de Transformação de Conteúdo (Syndicate AI)
 * Gera automaticamente os textos em português claro e profissional
 */

export async function generateContentKit({ lead }) {
  // Simula o processamento rápido da IA
  await new Promise(r => setTimeout(r, 600));

  const isGringo = lead.pais === "US" || lead.idioma === "en";
  const nome = lead.apresentador || "Apresentador";
  const canal = lead.nomeCanal || "Canal";
  const episodio = lead.ultimoEpisodio || "Último Episódio";
  const resumo = lead.resumoConversa || "Conversa sobre negócios e crescimento.";

  if (isGringo) {
    return {
      newsletter: {
        assunto: `[Deep Dive] 3 actionable takeaways from: ${episodio.slice(0, 40)}...`,
        conteudo: `Hi there,\n\nOn the latest episode of ${canal}, ${nome} shared a breakdown on "${episodio}".\n\nIf you missed the 40-minute audio, here are the 3 big frameworks you can use this week:\n\n1. Stop asking for meetings cold. Provide a free sample of the solved problem upfront to drop buyer resistance.\n2. Productize your services into predictable retainers instead of billing by the hour.\n3. Turn every piece of audio into written evergreen assets.\n\nWhich of these 3 resonates most with you? Hit reply to let us know!`
      },
      postsLinkedin: [
        {
          titulo: "Post 1: Lição Principal",
          texto: `Most B2B operators are doing outbound completely wrong.\n\nIn our latest episode on ${canal}, we discussed why leading with a free sample or diagnostic closes 3x more deals than asking for '15 minutes on the calendar'.\n\nGive value first. The sale becomes the natural next step.\n\nWhat is your go-to outreach method right now?`
        },
        {
          titulo: "Post 2: Três Regras Práticas",
          texto: `3 lessons from our conversation on "${episodio}":\n\n1. Simplicity scales, complexity stalls.\n2. Retainers beat hourly billing every single time.\n3. Distribution is where 80% of revenue is made.\n\nSave this for your team.`
        }
      ],
      postsRedes: [
        `If your podcast only lives on Spotify, 80% of your buyers will never hear it. Written distribution is the key.`,
        `The best cold message is not a pitch—it's the finished work handed over for free.`,
        `Don't create more content from scratch. Multiply the reach of what you already recorded.`
      ],
      roteiroVideoCurto: {
        gancho: "[Direct to camera] Stop pitching clients before they know what you can do.",
        desenvolvimento: "The fastest way to close deals this year is delivering a piece of the finished work for free. Their guard drops instantly.",
        chamada: "Full episode breakdown link is in bio."
      }
    };
  }

  // Versão em Português limpa e humana
  return {
    newsletter: {
      assunto: `[Resumo Executivo] Os principais pontos de: ${episodio.slice(0, 45)}...`,
      conteudo: `Olá!\n\nNo episódio mais recente do ${canal}, ${nome} bateu um papo direto ao ponto sobre "${episodio}".\n\nPara quem não teve tempo de assistir os 40 minutos de vídeo, separamos os 3 maiores aprendizados práticos:\n\n1. Entregue valor antes de pedir a venda\nA forma mais rápida de fechar novos clientes é mostrar o problema resolvido antes mesmo de cobrar. Quando a pessoa vê o resultado funcionando na frente dela, a confiança é imediata.\n\n2. Crie contratos mensais recorrentes\nDepender de trabalhos avulsos cria uma montanha-russa de faturamento. Serviços empacotados com entrega semanal trazem previsibilidade e tranquilidade de caixa.\n\n3. Aproveite o que você já produziu\nNão precisa gravar conteúdo novo todos os dias. Uma boa conversa gravada pode virar newsletter, posts no LinkedIn e pílulas para as redes sociais durante a semana toda.\n\nQual desses pontos faz mais sentido para o seu momento atual? Responda a este email para conversarmos!`
    },
    postsLinkedin: [
      {
        titulo: "Post 1: Visão Contra-intuitiva",
        texto: `A maioria das empresas erra ao tentar vender logo no primeiro contato.\n\nNo último episódio do ${canal}, falamos sobre uma mudança simples que triplica as respostas comerciais:\n\nEm vez de pedir 15 minutos de reunião para apresentar uma proposta, entregue uma amostra rápida do trabalho pronto sem cobrar nada.\n\nQuando o cliente vê o valor na prática antes de abrir a carteira, a barreira de compra desaparece.\n\nVocê prefere receber uma mensagem genérica de venda ou uma solução já pronta para o seu negócio?`
      },
      {
        titulo: "Post 2: Três Lições do Episódio",
        texto: `3 lições que resumem 40 minutos de conversa com nossos convidados:\n\n1️⃣ Faturamento alto sem lucro no bolso é apenas vaidade.\n2️⃣ O cliente não quer saber quantas horas você trabalhou, ele quer o resultado final entregue com pontualidade.\n3️⃣ Automatize o trabalho mecânico para focar apenas nas decisões estratégicas.\n\nO episódio completo sobre "${episodio}" já está disponível no YouTube e Spotify.`
      }
    ],
    postsRedes: [
      `Se você gasta horas gravando um vídeo e deixa ele morrer no feed sem transformar em textos, você está perdendo 80% do público.`,
      `O segredo para crescer sem se sobrecarregar é transformar 1 conversa semanal em 5 canais de distribuição diferentes.`,
      `Trabalho manual repetitivo destrói a sua margem de lucro. Deixe a IA fazer a parte mecânica e use seu tempo para fechar vendas.`
    ],
    roteiroVideoCurto: {
      gancho: "[Olhando para a câmera] Se você está com dificuldade de fechar clientes novos, para tudo e escuta isso.",
      desenvolvimento: "Pare de mandar propostas longas de 20 páginas. Faça uma demonstração pequena do trabalho pronta e mande no direct do cliente. A taxa de resposta é impressionante.",
      chamada: "O resumo completo com as lições está disponível no link da bio."
    }
  };
}
