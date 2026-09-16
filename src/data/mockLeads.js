// Base de criadores e podcasts de exemplo com dados em português
export const CRIADORES_INICIAIS = [
  {
    id: "lead-01",
    nomeCanal: "Podcast Negócios & Escala",
    apresentador: "Rafael Duarte",
    convidado: "Lucas Mendes (SaaS Founder)",
    nicho: "Tecnologia & Startups",
    pais: "BR",
    idioma: "pt",
    plataforma: "YouTube / Spotify",
    contatoEmail: "rafael@negocioseescala.com.br",
    contatoWhats: "5511999998888",
    seguidores: "32 mil inscritos",
    ultimoEpisodio: "Ep. 42: Como faturar os primeiros R$ 100k sem equipe comercial",
    duracaoEpisodio: "45 minutos",
    status: "novo", // 'novo' | 'amostra_pronta' | 'contatado' | 'respondeu' | 'cliente_ativo'
    oportunidade: "Grava episódios longos semanais, mas não tem newsletter e não posta resumos no LinkedIn.",
    valorMensal: 490, // R$
    resumoConversa: `Rafael e Lucas discutem estratégias de prospecção com amostras antecipadas. Lucas explica que parar de ligar e começar a entregar uma amostra de valor antes do pitch aumentou as vendas da empresa em 300%. Rafael comenta no final que gostaria de ter uma newsletter semanal do podcast, mas não tem tempo de escrever.`,
    kitConteudo: null,
    historico: ["Encontrado no YouTube com episódio publicado há 2 dias."]
  },
  {
    id: "lead-02",
    nomeCanal: "Gestão Descomplicada",
    apresentador: "Camila Bittencourt",
    convidado: "Episódio Solo",
    nicho: "Pequenas Empresas & Serviços",
    pais: "BR",
    idioma: "pt",
    plataforma: "YouTube / Spotify",
    contatoEmail: "camila@gestaodescomplicada.com.br",
    contatoWhats: "5521988887777",
    seguidores: "18 mil inscritos",
    ultimoEpisodio: "3 erros na precificação que estão comendo o lucro da sua empresa",
    duracaoEpisodio: "32 minutos",
    status: "amostra_pronta",
    oportunidade: "Dona de consultoria com clientes de alto poder aquisitivo. Não tem presença ativa no LinkedIn.",
    valorMensal: 390,
    resumoConversa: `Camila ensina como calcular margem líquida real de serviços, alertando que empresários confundem faturamento bruto com lucro no bolso. Ela dá 3 regras práticas para reajustar contratos sem perder clientes.`,
    kitConteudo: {
      newsletter: {
        assunto: "O erro silencioso que está comendo o seu lucro",
        conteudo: `Olá!\n\nNo episódio mais recente do Gestão Descomplicada, discutimos uma das maiores armadilhas de quem presta serviços: faturar alto e sobrar quase nada no fim do mês.\n\nSe você não teve 30 minutos para assistir o episódio, separei aqui as 3 principais lições:\n\n1. Confundir faturamento com sobra de caixa\nDinheiro na conta da empresa não é lucro seu. Se você não separar o pró-labore dos custos fixos no primeiro dia do mês, a conta nunca fecha.\n\n2. Precificar por hora em vez de valor entregue\nQuem cobra por hora é punido por ser rápido e eficiente. Contratos recorrentes e pacotes fechados dão previsibilidade e margem maior.\n\n3. Como reajustar sem perder clientes\nApresente melhorias entregues antes de falar do reajuste. Quem vê valor aceita a correção com tranquilidade.\n\nQual dessas frentes é o maior desafio na sua empresa hoje? Responda a este email para conversarmos!`
      },
      postsLinkedin: [
        {
          titulo: "Post 1: O erro de cobrar por hora",
          texto: `Cobrar por hora é o caminho mais rápido para a estagnação na prestação de serviços.\n\nSe você leva 5 horas para fazer algo que antes levava 10 porque ficou mais experiente, cobrar por hora faz você ganhar METADE pelo mesmo resultado excelente.\n\nTrês regras que apliquei para mudar isso:\n\n1. Venda o problema resolvido, não o relógio.\n2. Pacotes fechados trazem paz de espírito para o cliente.\n3. Receita previsível todo mês vale 3x mais que freelas picados.\n\nComo você cobra hoje na sua empresa?`
        },
        {
          titulo: "Post 2: Três sinais de preço errado",
          texto: `Se você fecha 100% das propostas que envia, seu preço está muito baixo.\n\nNo último episódio do podcast falamos sobre isso: uma taxa de fechamento saudável fica entre 30% e 50%. Se todo mundo fecha sem hesitar, você está deixando muito dinheiro na mesa.\n\nRevise seus custos esta semana.`
        }
      ],
      postsRedes: [
        "Faturamento é vaidade, lucro é sanidade e caixa é rei. Pare de comemorar venda que dá prejuízo na entrega.",
        "Se o cliente fecha com você no primeiro segundo sem pedir desconto, você cobrou pelo menos 30% mais barato do que podia.",
        "Trabalhar 14 horas por dia não é mérito se a sua conta bancária continua no zero a zero."
      ],
      roteiroVideoCurto: {
        gancho: "[Olhando para a câmera] Se você fecha todos os clientes que atende, tenho uma péssima notícia para você.",
        desenvolvimento: "Se ninguém nunca reclama do seu preço, significa que você está cobrando muito barato. O preço ideal faz cerca de 40% das pessoas hesitarem. Aumente seu valor no próximo cliente e teste.",
        chamada: "Quer o guia completo de precificação? O link do episódio completo está na bio."
      }
    },
    historico: ["Amostra gratuita gerada com sucesso."]
  },
  {
    id: "lead-03",
    nomeCanal: "B2B SaaS Growth Pulse",
    apresentador: "Marcus Vance",
    convidado: "Sarah Chen (Founder, MetricFlow)",
    nicho: "Tecnologia Internacional (EUA)",
    pais: "US",
    idioma: "en",
    plataforma: "YouTube / Spotify",
    contatoEmail: "marcus@growthpulseshow.com",
    contatoWhats: "",
    seguidores: "28 mil inscritos",
    ultimoEpisodio: "Ep. 84: How MetricFlow reached $1.8M ARR using Cold Inbound",
    duracaoEpisodio: "42 minutos",
    status: "novo",
    oportunidade: "Mercado Americano (Paga em Dólar). Sem newsletter e sem resumos escritos.",
    valorMensal: 820, // $149 USD (~R$ 820)
    resumoConversa: `Marcus and Sarah discuss why traditional outbound email response rates dropped by 60% and how MetricFlow shifted to Signal-Led Inbound. They deliver free mini-audits before asking for calls.`,
    kitConteudo: null,
    historico: ["Canal americano identificado com alto poder de compra."]
  },
  {
    id: "lead-04",
    nomeCanal: "Agência Sem Fronteiras",
    apresentador: "Rodrigo Barcellos",
    convidado: "Renan Costa",
    nicho: "Marketing & Agências",
    pais: "BR",
    idioma: "pt",
    plataforma: "YouTube / Spotify",
    contatoEmail: "contato@agenciasemfronteiras.com.br",
    contatoWhats: "5511977776666",
    seguidores: "29 mil inscritos",
    ultimoEpisodio: "Como fechar clientes que pagam em dólar morando no Brasil",
    duracaoEpisodio: "44 minutos",
    status: "cliente_ativo",
    oportunidade: "Cliente fechado! Pagando assinatura mensal de R$ 490.",
    valorMensal: 490,
    resumoConversa: `Rodrigo e Renan discutem como pequenas agências prestam serviços de valor agregado para o exterior usando IA.`,
    kitConteudo: null,
    historico: ["Proposta aceita! Assinatura ativa de R$ 490/mês."]
  }
];

export const NICHOS = [
  { id: "todos", nome: "Todos os Nichos" },
  { id: "negocios", nome: "Negócios & Gestão" },
  { id: "tecnologia", nome: "Tecnologia & Startups" },
  { id: "marketing", nome: "Marketing & Agências" },
  { id: "gringos", nome: "Mercado Gringo (Dólar)" }
];
