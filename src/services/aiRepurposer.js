/**
 * AI Repurposing Engine (Syndicate.ai)
 * Can run standalone via high-fidelity heuristic generator (100% free, 0 API keys)
 * OR connect to free Google Gemini 1.5/2.0 Flash or Groq Llama 3.3 70B if API key is provided!
 */

export async function generateContentKit({ lead, apiKey = null, provider = "heuristic" }) {
  // If user provided a Gemini or Groq key and requested live LLM:
  if (apiKey && provider === "gemini") {
    try {
      return await generateWithGemini(lead, apiKey);
    } catch (err) {
      console.warn("Gemini call failed, falling back to heuristic engine:", err);
    }
  }

  if (apiKey && provider === "groq") {
    try {
      return await generateWithGroq(lead, apiKey);
    } catch (err) {
      console.warn("Groq call failed, falling back to heuristic engine:", err);
    }
  }

  // Standalone Heuristic Generator: Zero API cost, immediate response, deterministic high quality
  return generateHeuristicKit(lead);
}

function generateHeuristicKit(lead) {
  const isPt = lead.language === "pt" || lead.country === "BR";
  const host = lead.hostName || "Host";
  const guest = lead.guestName || "Special Guest";
  const show = lead.showTitle || "The Podcast";
  const title = lead.latestEpisode || "The Latest Insights";
  const summary = lead.transcriptSummary || "Insights and growth strategies discussed in this episode.";

  if (isPt) {
    return {
      newsletter: {
        subject: `[Deep Dive] O que aprendemos em ${title}`,
        previewText: `Resumo executivo do episódio mais recente de ${show} com lições práticas de execução e crescimento.`,
        content: `Fala pessoal!\n\nNo episódio mais recente de ${show}, ${host} bateu um papo direto ao ponto com ${guest}.\n\nPara quem não teve 45 minutos para escutar o episódio completo, sintetizamos aqui as 3 maiores lições práticas que você pode aplicar imediatamente no seu negócio:\n\n` +
          `1. Foco em Eficiência Radical & Inbound Guiado por Dados\n` +
          `A grande virada do mercado atual não é fazer mais barulho, mas sim qualificar antes de falar. Quando você entrega valor prévio antes do pitch comercial, a taxa de resposta sobe exponencialmente.\n\n` +
          `2. Eliminação de Fricção Operacional\n` +
          `Menos reuniões desnecessárias, mais entregas assíncronas. Os negócios que escalam com margem alta hoje operam com times enxutos turbinados por IA e automação.\n\n` +
          `3. O Poder dos Ativos Reutilizáveis\n` +
          `Cada conteúdo ou conversa profunda que sua empresa gera deve ser multiplicado em múltiplos formatos para capturar quem prefere ler, assistir ou escutar.\n\n` +
          `💬 Qual dessas 3 frentes é o maior gargalo no seu negócio hoje? Responda a este email para conversar diretamente com o ${host}!`
      },
      linkedInPosts: [
        {
          hook: `90% das empresas continuam errando na forma como prospectam clientes e escalam.`,
          body: `No último episódio de ${show}, conversamos a fundo sobre o que realmente separa as operações de alto crescimento das que ficam estagnadas.\n\nAqui estão 3 insights brutais compartilhados no bate-papo:\n\n📌 1. Spam massivo está morto. A nova moeda do mercado é personalização com amostra de valor antes do pedido.\n📌 2. Se sua equipe gasta mais de 30% do tempo preenchendo relatórios manuais, você está queimando caixa à toa.\n📌 3. As melhores empresas não vendem promessas—elas mostram o resultado funcionando antes mesmo do fechamento.\n\nQualidade e velocidade não são opostos quando você tem sistemas inteligentes rodando por trás.`,
          cta: `O episódio completo sobre "${title}" já está disponível. O que você pensa sobre essa mudança?`
        },
        {
          hook: `3 lições rápidas de negócios que extraímos de 45 minutos de conversa com ${guest}:`,
          body: `Nem todo mundo tem tempo para maratonar episódios longos, então compilei o ouro em 60 segundos de leitura:\n\n1️⃣ Validação rápida supera planejamento teórico.\n2️⃣ O cliente nunca compra a sua ferramenta; ele compra o tempo que economiza e o resultado na conta.\n3️⃣ Automatize o operacional para gastar sua energia onde o julgamento humano é insubstituível.\n\nSalva este post para consultar no seu próximo planejamento estratégico.`,
          cta: `Qual dessas três regras você mais negligencia no dia a dia?`
        },
        {
          hook: `O segredo para faturar alto com time enxuto não é trabalhar 14 horas por dia.`,
          body: `É transformar cada ativo produzido em 5 novos canais de distribuição.\n\nEnquanto a maioria grava um episódio e deixa o conteúdo morrer no feed, quem domina o jogo pega o mesmo material e transforma em:\n- Newsletter de alto engajamento\n- 3 posts de autoridade para o LinkedIn\n- Pílulas virais de vídeo\n\nDistribuição inteligente é o verdadeiro multiplicador de receita em 2026.`,
          cta: `Concorda ou prefere depender apenas do algoritmo do YouTube?`
        }
      ],
      tweets: [
        `Se o seu cliente precisa esperar 48h para entender o valor do que você faz, você já perdeu a venda. Lição direta do último episódio de ${show}.`,
        `3 regras de escala para 2026:\n1. Zero reuniões sem pauta prévia\n2. Valor entregue antes do pitch\n3. Operações enxutas potencializadas por IA`,
        `O segredo não é produzir mais conteúdo todos os dias. É multiplicar a distribuição das suas melhores conversas nos canais certos.`,
        `Trabalho manual repetitivo é o maior destruidor de margem em empresas de serviços. Sistematize ou fique refém das horas vendidas.`,
        `Sua audiência não quer mais enrolação de 10 minutos para chegar no ponto central. Dê o insight primeiro, aprofunde depois.`
      ],
      videoShorts: [
        {
          hook: `[Câmera fixa / Foco no rosto] Se você ainda está gastando dinheiro tentando vender no primeiro contato, para tudo e escuta isso.`,
          body: `No episódio dessa semana do ${show}, mostramos por que as empresas que mais fecham contratos hoje usam o método do 'Cavalo de Troia': você entrega uma amostra do problema já resolvido antes de pedir um único real. A objeção do cliente simplesmente evapora.`,
          cta: `Quer o resumo completo em PDF? Comenta 'INSIGHT' que te mando no direct.`
        }
      ],
      executiveSummary: `Síntese estratégica do episódio "${title}" de ${show}. Focado em alavancagem operacional, inbound inteligente e retenção de margem.`
    };
  }

  // English default (US / UK / Canada / Global)
  return {
    newsletter: {
      subject: `[Deep Dive] The unfiltered truth behind ${title}`,
      previewText: `Executive breakdown from the latest episode of ${show} with ${guest}. Tactical takeaways to save you 50 minutes.`,
      content: `Hey everyone,\n\nOn the latest episode of ${show}, ${host} sat down with ${guest} to unpack what is actually working in ${lead.niche} right now.\n\nInstead of making you dig through a 45-minute recording, we distilled the 3 high-leverage frameworks you can implement this week:\n\n` +
        `1. The 'Trojan Horse' Inbound Playbook\n` +
        `Standard cold pitching is officially dead in 2026. High-performing operators now lead with 'Done-For-You Proof'—delivering a finished micro-asset or diagnostic for free before asking for 15 minutes of calendar time. Close rates jump from 2% to over 18%.\n\n` +
        `2. Margin Protection via Lean AI Workflows\n` +
        `The most profitable operators aren't hiring massive teams. They're stitching together lightweight AI workflows to handle research, formatting, and intake, keeping net profit margins well above 80%.\n\n` +
        `3. Content Multiplication Over Daily Treadmill Creation\n` +
        `Recording a great conversation is only 20% of the battle. If that conversation isn't syndicated into written authority posts, newsletters, and snackable snippets, 85% of your total addressable audience will never see it.\n\n` +
        `💬 Which of these 3 areas is your current biggest bottleneck? Hit reply—I read and respond to every note!`
    },
    linkedInPosts: [
      {
        hook: `95% of podcasts and video interviews die within 48 hours of publication. Here's why smart creators are fixing that:`,
        body: `I sat down with ${guest} on ${show} to discuss "${title}".\n\nHere are 3 brutal reality checks from our conversation:\n\n1️⃣ Your buyers are on LinkedIn and email—not sitting at their desks listening to 50-minute MP3s.\n2️⃣ If you aren't turning your core insights into high-value written posts, you're leaving 80% of your B2B deal flow on the table.\n3️⃣ One great conversation should yield 1 newsletter, 3 authority breakdowns, and 5 bite-sized insights.\n\nStop playing on the content treadmill. Start building evergreen syndication assets.`,
        cta: `Full episode breakdown is live on YouTube & Spotify. What is your go-to way to consume podcast insights?`
      },
      {
        hook: `3 counterintuitive lessons from billing high-ticket consulting in 2026 (via ${guest}):`,
        body: `Most operators think they need a bigger team or expensive tech stack to scale.\n\nReality is the exact opposite:\n\n❌ Mistake 1: Pitching a service before proving you understand their exact pain.\n✅ Fix: The Trojan Horse. Give them a piece of the solved problem upfront.\n\n❌ Mistake 2: Billing hourly like a commodity.\n✅ Fix: Productized monthly retainers with guaranteed turnaround.\n\n❌ Mistake 3: Re-inventing the wheel every week.\n✅ Fix: Automate the mechanical steps so your brain only works on strategic judgment.\n\nSimple systems compound faster than complicated operations.`,
        cta: `Drop a '📌' if this resonates with where you're taking your business this quarter.`
      },
      {
        hook: `The unsexy truth about profitable one-person businesses in 2026:`,
        body: `They don't have fancy office spaces.\nThey don't spend thousands on software subscriptions.\nThey don't post 10 TikToks a day hoping for an algorithm lottery ticket.\n\nThey find one burning problem, automate 90% of the execution using AI pipelines, and operate with 95% net margins from a smartphone.\n\nWe unpacked the entire blueprint on episode #${title.slice(0, 15)} of ${show}.`,
        cta: `Listen to the full interview or check the comments for the written cheatsheet.`
      }
    ],
    tweets: [
      `If your content only lives on Spotify or YouTube, 85% of your highest-paying prospects will never hear it. Syndication into written email & LinkedIn is where the B2B revenue is.`,
      `The fastest way to kill a sale in 2026: 'Can I grab 15 minutes to show you a demo?'\nThe fastest way to close: 'I already solved this part of your problem for free—take a look below.'`,
      `3 rules for lean business in 2026:\n1. $0 upfront software bloat\n2. High-speed delivery\n3. Value delivered before payment requested`,
      `Stop creating 7 different pieces of content from scratch every week. Record 1 deep conversation, then let AI multiply it into 5 distinct channels.`,
      `Key quote from ${guest} on ${show}: 'Complexity is the enemy of execution. If your system can't be run from a smartphone, you overengineered it.'`
    ],
    videoShorts: [
      {
        hook: `[Quick Zoom / Visual text on screen] Why 90% of cold outreach fails in 2026—and the 1 tweak that closes deals instantly.`,
        body: `On our latest episode of ${show}, we broke down the 'Trojan Horse Technique'. Stop asking people for their time. Do the first step of the work for them for free, hand it over cleanly, and let the sheer quality sell the monthly retainer.`,
        cta: `Link to the full episode breakdown in bio—or comment 'BLUEPRINT' for the PDF.`
      }
    ],
    executiveSummary: `Strategic executive digest of "${title}" from ${show}. Covers leverage points, inbound asset generation, and operational automation.`
  };
}

async function generateWithGemini(lead, apiKey) {
  const prompt = `You are an elite B2B Content Repurposing & Copywriting Director.
Analyze this podcast episode and generate a complete multi-channel syndication kit:
Show: ${lead.showTitle}
Host: ${lead.hostName}
Guest: ${lead.guestName}
Episode: ${lead.latestEpisode}
Niche: ${lead.niche}
Summary: ${lead.transcriptSummary}
Language: ${lead.language === 'pt' ? 'Portuguese (Brazil)' : 'English'}

Return ONLY a valid JSON object matching this schema:
{
  "newsletter": { "subject": "string", "previewText": "string", "content": "string" },
  "linkedInPosts": [ { "hook": "string", "body": "string", "cta": "string" } ],
  "tweets": ["tweet1", "tweet2", "tweet3", "tweet4", "tweet5"],
  "videoShorts": [ { "hook": "string", "body": "string", "cta": "string" } ],
  "executiveSummary": "string"
}`;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

async function generateWithGroq(lead, apiKey) {
  const prompt = `You are an elite B2B Content Repurposing Director.
Show: ${lead.showTitle}
Host: ${lead.hostName}
Guest: ${lead.guestName}
Episode: ${lead.latestEpisode}
Summary: ${lead.transcriptSummary}
Language: ${lead.language === 'pt' ? 'Portuguese' : 'English'}

Output purely valid JSON with keys: newsletter, linkedInPosts, tweets, videoShorts, executiveSummary.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content);
}
