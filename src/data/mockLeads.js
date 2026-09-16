// Curated B2B Podcasts & Shows with high monetization potential
// These are real-world archetype channels in the US, UK, and BR with high podcast output but zero written repurposing
export const INITIAL_LEADS = [
  {
    id: "lead-01",
    showTitle: "B2B SaaS Growth Pulse",
    hostName: "Marcus Vance",
    guestName: "Sarah Chen (Founder, MetricFlow)",
    niche: "B2B SaaS & Tech",
    country: "US",
    language: "en",
    platform: "YouTube / Spotify",
    publicEmail: "marcus@growthpulseshow.com",
    channelUrl: "https://youtube.com/@growthpulseshow",
    subscribers: "28.4K",
    latestEpisode: "Ep. 84: How MetricFlow reached $1.8M ARR using Cold Inbound & Clay",
    episodeDuration: "42 min",
    status: "new", // 'new' | 'qualified' | 'sample_ready' | 'contacted' | 'replied' | 'negotiating' | 'won'
    qualificationScore: 94,
    gapIdentified: "Publishes 40m+ weekly episodes on YouTube, but has ZERO Substack newsletter and posts only generic links on LinkedIn without key takeaways.",
    potentialMRR: 199, // USD
    lastUpdated: "2026-09-15",
    transcriptSummary: `Marcus and Sarah discuss why traditional outbound email response rates dropped by 60% in 2025/2026 and how MetricFlow shifted to "Signal-Led Inbound". Sarah reveals their 3-pillar framework: 1) Intent tracking via job postings and website visitor deanonymization; 2) Micro-dossiers created in 10 seconds before outreach; 3) The "Trojan Horse Offer" of delivering a free customized mini-audit before asking for a 15-minute call. They closed 14 enterprise deals in Q2 with an 18% close rate. Key advice: Never pitch a meeting in the first sentence; give the prospect a finished asset first.`,
    sampleKit: null,
    history: [
      { date: "2026-09-16 09:15", action: "Lead descoberto pelo Caçador de Oportunidades" }
    ]
  },
  {
    id: "lead-02",
    showTitle: "The Solo Agency Operator",
    hostName: "David Miller",
    guestName: "Solo Episode",
    niche: "Agencies & Consulting",
    country: "US",
    language: "en",
    platform: "Apple Podcasts / YouTube",
    publicEmail: "david@soloagencyoperator.io",
    channelUrl: "https://soloagencyoperator.io",
    subscribers: "16.2K",
    latestEpisode: "How to Bill $25k/mo as a One-Person AI Automation Boutique",
    episodeDuration: "35 min",
    status: "qualified",
    qualificationScore: 89,
    gapIdentified: "High-ticket consulting audience with disposable budget. Episodes are audio-only with zero Twitter threads, zero LinkedIn slides, and no email digest.",
    potentialMRR: 149,
    lastUpdated: "2026-09-14",
    transcriptSummary: `David breaks down how he charges $3,500 setup + $750/mo retainer for AI Zapier/Make and n8n workflows for boutique law and accounting firms. He highlights that most clients don't care about the tech stack, only the time saved on intake forms and invoice matching. He emphasizes productizing services into three rigid tiers: Bronze (Intake automation), Silver (Full CRM sync), and Gold (Custom AI summaries). His biggest bottleneck is personal branding—he records audio while walking his dog but never has time to write daily LinkedIn authority posts.`,
    sampleKit: null,
    history: [
      { date: "2026-09-15 14:20", action: "Qualificado automaticamente pela IA: Gap severo de repurposing" }
    ]
  },
  {
    id: "lead-03",
    showTitle: "Fintech & Capital Frontiers",
    hostName: "Elena Rostova",
    guestName: "Julian Thorne (Partner, SeedWave Capital)",
    niche: "Venture Capital & Finance",
    country: "UK",
    language: "en",
    platform: "Spotify / YouTube",
    publicEmail: "elena@capitalfrontiers.co.uk",
    channelUrl: "https://youtube.com/@capitalfrontiers",
    subscribers: "41.0K",
    latestEpisode: "Where Smart Money is Flowing in European AI Infrastructure (2026 Outlook)",
    episodeDuration: "51 min",
    status: "sample_ready",
    qualificationScore: 96,
    gapIdentified: "Venture capitalists and angel investors listen to her show, but she misses 80% of LinkedIn virality because she only shares a 15-second teaser clip.",
    potentialMRR: 249,
    lastUpdated: "2026-09-16",
    transcriptSummary: `Julian Thorne details why SeedWave is moving away from wrapper AI apps into vertical infrastructure, data synthetic generation, and edge inference. He shares three red flags in pitch decks: 1) Over-reliance on a single LLM provider without fallback; 2) Lack of proprietary training data loop; 3) Unrealistic 85% gross margin assumptions that ignore token API inflation. He projects that micro-acquisitions of niche AI workflows will hit record highs by end of 2026.`,
    sampleKit: {
      newsletter: {
        subject: "The European AI Shift: Why Smart Money is Leaving 'Wrappers' Behind",
        previewText: "SeedWave Partner Julian Thorne reveals the 3 red flags in modern AI pitch decks and where $50M is going next.",
        content: `Hey friends,\n\nLast week on Fintech & Capital Frontiers, I sat down with Julian Thorne, Partner at SeedWave Capital. We went deep into where venture capital is actually deploying capital across Europe right now—and more importantly, where it is fleeing.\n\nHere are the 3 major shifts every founder and investor must know:\n\n1. The Death of the 'Thin Wrapper'\nInvestors are no longer writing checks for slick UIs slapped onto a single API. If OpenAI or Anthropic can wipe out your feature in their next release, you don't have a startup—you have a feature.\n\n2. The 3 Pitch Deck Red Flags Killing Deals\n- Zero proprietary data flywheel (if anyone can duplicate your prompt, you have no moat)\n- Single-vendor fragility (no multi-model routing or self-hosted fallback)\n- Ignoring inference economics (token bills scale faster than SaaS licenses)\n\n3. The Next $50M Opportunity: Vertical Automation\nThe real money in 2026 isn't general chatbots. It's automated compliance for European banks, automated intake for NHS suppliers, and localized logistics.\n\nWhat's your take? Hit reply and let me know.`
      },
      linkedInPosts: [
        {
          hook: "Most AI startups raising seed capital right now are already dead. They just don't know it yet.",
          body: `I spent an hour with SeedWave Capital Partner Julian Thorne dissecting where $50M in European venture money is actually flowing.\n\nHere are the 3 brutal truths he shared:\n\n1. If your moat is a clever prompt, your company has an expiration date of 90 days.\n2. Investors are rejecting decks that show 85% gross margins without factoring in real inference and token overhead.\n3. The biggest winners of 2026 won't be another ChatGPT wrapper—they will be unsexy vertical AI bots automating compliance, invoices, and legal filings.\n\nSmart founders aren't building for hype. They are building infrastructure people can't turn off.`,
          cta: "Are you building vertical or horizontal AI? Let's debate in the comments."
        },
        {
          hook: "3 questions every VC will ask you before investing in AI this year (and the wrong answers):",
          body: `After interviewing dozens of venture capitalists on the podcast, SeedWave's Julian Thorne gave me the clearest filter yet:\n\n❌ Question 1: 'What model do you use?'\nWrong answer: 'Just GPT-4o.'\nRight answer: 'We route dynamically between open-source local models for cheap tasks and frontier models for complex reasoning, cutting API costs by 70%.'\n\n❌ Question 2: 'What is your retention loop?'\nWrong answer: 'Users love the UI.'\nRight answer: 'Every document processed feeds our fine-tuned proprietary domain model.'\n\nSave this for your next pitch prep.`,
          cta: "Which of these 3 is your team focusing on?"
        },
        {
          hook: "The unsexy side of AI is where the real cash is being made in 2026.",
          body: `While everyone is obsessed with talking avatars and Hollywood video generation, the highest-ROI businesses being acquired right now are doing:\n\n- Medical billing data extraction\n- B2B invoice reconciliations\n- Automated podcast-to-newsletter syndication\n- Regulatory compliance auditing\n\nZero hype. 95% net margins. Predictable ARR.\n\nDon't chase the fireworks. Own the plumbing.`,
          cta: "Full conversation with Julian Thorne is live on Spotify & YouTube."
        }
      ],
      tweets: [
        "The fastest way to burn $1M in AI: Build another general chatbot with zero proprietary data loop. Specialization is the only moat left in 2026.",
        "SeedWave Capital's Julian Thorne on our podcast: 'If your entire value proposition can be replicated in an afternoon with Claude artifacts, you don't have a business.'",
        "Token economics matter. If you aren't routing between cheap open-source models and frontier reasoning models, your unit economics will implode as you scale.",
        "Unsexy AI > Viral AI.\nAutomated invoice processing > Dancing avatars.\nB2B compliance agents > AI horoscope apps.\nFollow the cash flow, not the retweets.",
        "3 things killing AI pitch decks in 2026:\n1. Single-provider dependency\n2. Fictional 90% SaaS margins\n3. Zero data defensibility\nFull breakdown in today's newsletter."
      ],
      videoShorts: [
        {
          hook: "[Close-up / Fast Cut] Stop pitching your AI startup like it's 2023. VCs are rejecting 98% of decks for this ONE reason.",
          body: "Julian Thorne from SeedWave Capital just told me the biggest red flag he sees every single day: founders who think a prompt is a moat. If Anthropic or OpenAI can kill your product on their next Tuesday launch, you don't have a company.",
          cta: "Here is what smart founders are doing instead—link to full episode in bio."
        }
      ],
      executiveSummary: "Julian Thorne (SeedWave Capital) breaks down why European venture capital is rotating out of horizontal AI wrappers into vertical infrastructure, highlighting token margin traps and data moats."
    },
    history: [
      { date: "2026-09-15 11:00", action: "Lead qualificado" },
      { date: "2026-09-16 08:30", action: "Amostra de Conteúdo Multi-Canal gerada pela IA com sucesso" }
    ]
  },
  {
    id: "lead-04",
    showTitle: "Modern Remote Leadership",
    hostName: "Liam O'Connor",
    guestName: "Solo & Guest format",
    niche: "Management & HR Tech",
    country: "Canada",
    language: "en",
    platform: "YouTube / Substack",
    publicEmail: "liam@remoteleadershipcast.com",
    channelUrl: "https://youtube.com/@remoteleadership",
    subscribers: "19.8K",
    latestEpisode: "Async Communication Systems That Saved Our 40-Person Team 15 Hours/Week",
    episodeDuration: "28 min",
    status: "contacted",
    qualificationScore: 91,
    potentialMRR: 149,
    lastUpdated: "2026-09-16",
    transcriptSummary: `Liam explains how replacing weekly status meetings with 3-minute Loom videos and automated AI Notion summaries increased developer velocity by 25%. He shares his 'No Meeting Wednesday' protocol and how managers use AI transcription to generate weekly action boards. He complains at the end of the episode that he has zero time to maintain his company Substack and desires an automated content pipeline.`,
    sampleKit: null,
    history: [
      { date: "2026-09-15 16:40", action: "Lead qualificado" },
      { date: "2026-09-16 10:12", action: "Amostra gerada" },
      { date: "2026-09-16 11:30", action: "Abordagem Valor-Primeiro enviada via Email com amostra pronta" }
    ]
  },
  {
    id: "lead-05",
    showTitle: "Growth & Equity Podcast",
    hostName: "Carlos Drumond & Bia Rezende",
    guestName: "Eduardo Silveira (CEO, ScaleMetrics)",
    niche: "Startups & Growth",
    country: "BR",
    language: "pt",
    platform: "YouTube / Spotify",
    publicEmail: "contato@growthequity.com.br",
    channelUrl: "https://youtube.com/@growthequitycast",
    subscribers: "34.5K",
    latestEpisode: "Como escalamos para R$ 500k MRR sem equipe de vendas tradicional",
    episodeDuration: "48 min",
    status: "replied",
    qualificationScore: 92,
    potentialMRR: 199, // ~R$ 1.090/mês
    lastUpdated: "2026-09-16",
    transcriptSummary: `Eduardo explica como a ScaleMetrics utiliza estratégias de inbound guiadas por dados e prospecção com amostras antecipadas. Ele revela que pararam de fazer Cold Calls e passaram a enviar diagnósticos gratuitos de 1 página feitos com automação, aumentando a taxa de conversão de 1% para 14%. Bia e Carlos comentam que queriam transformar o podcast deles em uma newsletter semanal e posts no LinkedIn, mas falta braço operacional na equipe.`,
    sampleKit: null,
    history: [
      { date: "2026-09-14 10:00", action: "Prospecção realizada" },
      { date: "2026-09-15 15:20", action: "Amostra enviada para Carlos Drumond" },
      { date: "2026-09-16 13:45", action: "Resposta recebida: 'Cara, surreal a qualidade dessa newsletter! Como funciona pra você fazer isso toda semana pra gente?'" }
    ]
  },
  {
    id: "lead-06",
    showTitle: "E-Commerce Titans",
    hostName: "Brett Campbell",
    guestName: "Solo Episode",
    niche: "Shopify & DTC Brands",
    country: "US",
    language: "en",
    platform: "YouTube / Spotify",
    publicEmail: "brett@titansofcommerce.com",
    channelUrl: "https://titansofcommerce.com",
    subscribers: "52.3K",
    latestEpisode: "Post-Purchase Retention: How to Turn 1st-Time Buyers into 4x Lifetime Whales",
    episodeDuration: "39 min",
    status: "won",
    qualificationScore: 95,
    potentialMRR: 199,
    lastUpdated: "2026-09-16",
    transcriptSummary: `Brett outlines the exact SMS and email flows that took a pet supplement brand from 18% repeat purchase rate to 44% in 90 days. Key points: 1) The 'Day 3 Unboxing Experience' email; 2) Replenishment reminder triggers based on estimated consumption; 3) VIP private WhatsApp group for top 5% spenders.`,
    sampleKit: null,
    history: [
      { date: "2026-09-12 09:00", action: "Amostra enviada" },
      { date: "2026-09-13 14:15", action: "Cliente respondeu interessado" },
      { date: "2026-09-14 11:30", action: "Proposta aceita ($199/mês para 4 episódios mensais)" },
      { date: "2026-09-15 08:00", action: "Pagamento recebido via Stripe! Cliente Ativo #1" }
    ]
  }
];

export const NICHE_OPTIONS = [
  { id: "all", label: "Todos os Nichos" },
  { id: "tech_saas", label: "B2B SaaS & Tech", keyword: "B2B SaaS" },
  { id: "agency", label: "Agências & Consultoria", keyword: "Agency Growth" },
  { id: "ai_automation", label: "IA & Automação B2B", keyword: "AI Business" },
  { id: "venture_finance", label: "Finanças & VC", keyword: "Venture Capital" },
  { id: "ecommerce", label: "E-commerce & DTC", keyword: "Shopify DTC" },
  { id: "leadership", label: "Liderança & Gestão", keyword: "Remote Work Leadership" }
];

export const COUNTRY_OPTIONS = [
  { id: "all", label: "Global (Todos)" },
  { id: "US", label: "🇺🇸 Estados Unidos ($ USD)" },
  { id: "UK", label: "🇬🇧 Reino Unido (£ GBP)" },
  { id: "CA", label: "🇨🇦 Canadá ($ CAD)" },
  { id: "BR", label: "🇧🇷 Brasil (R$ BRL)" }
];
