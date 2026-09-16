/**
 * Trojan Horse Value-First Pitch Templates
 * Instead of asking for a meeting, we deliver a 100% finished sample of their content
 */

export function buildOutreachEmail(lead) {
  const isPt = lead.language === "pt" || lead.country === "BR";
  const host = lead.hostName?.split(" ")[0] || "there";
  const episode = lead.latestEpisode || "your latest episode";
  const show = lead.showTitle || "your show";

  if (isPt) {
    const subject = `Amostra pronta do episódio: ${episode.slice(0, 45)}...`;
    const body = `Oi ${host},\n\n` +
      `Estava ouvindo o episódio mais recente do ${show} ("${episode}") e achei os pontos levantados sobre escala e processos sensacionais.\n\n` +
      `Como sei que a maioria dos tomadores de decisão no LinkedIn e email não tem 45 minutos para escutar o áudio completo, tomei a liberdade de transformar o episódio em um Kit de Distribuição Multi-Canal (com uma Newsletter pronta para Substack/Email + 3 Posts de Autoridade para o LinkedIn).\n\n` +
      `👉 Não estou te cobrando nada por isso. O conteúdo é 100% seu, pode copiar e postar direto:\n\n` +
      `----------------------------------------\n` +
      `[POST 1 - LINKEDIN / AUTORIDADE]\n` +
      `${lead.sampleKit?.linkedInPosts?.[0]?.hook || "90% das empresas continuam errando na forma como escalam..."}\n\n` +
      `${lead.sampleKit?.linkedInPosts?.[0]?.body || "Confira os 3 insights brutais compartilhados no episódio..."}\n\n` +
      `----------------------------------------\n` +
      `[NEWSLETTER COMPLETA]\n` +
      `Assunto: ${lead.sampleKit?.newsletter?.subject || "Deep Dive do Episódio"}\n\n` +
      `${lead.sampleKit?.newsletter?.content?.slice(0, 450) || "Resumo executivo com os pontos táticos..."}...\n` +
      `----------------------------------------\n\n` +
      `Se você curtir o resultado e quiser que eu faça isso automaticamente para todos os seus episódios semanais (para multiplicar seu alcance sem você gastar 1 minuto escrevendo), eu cuido de tudo por apenas R$ 490/mês.\n\n` +
      `Se não quiser, sem problemas nenhum! Espero de verdade que a amostra acima te traga novos leitores e clientes essa semana.\n\n` +
      `Abraço!\n`;

    return {
      subject,
      body,
      mailtoUrl: `mailto:${lead.publicEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    };
  }

  // English default (US / UK / CA)
  const subject = `Free repurposing sample for "${episode.slice(0, 38)}..."`;
  const body = `Hi ${host},\n\n` +
    `Really enjoyed your latest episode on ${show} ("${episode}"). The breakdown you and your guest shared was pure gold.\n\n` +
    `I noticed that while you publish consistently, you don't have a dedicated written newsletter or multi-part LinkedIn thought-leadership breakdown for each episode. Since most B2B buyers don't have 45 minutes to listen to full recordings, they often miss your best insights.\n\n` +
    `To show you what's possible, I went ahead and converted this episode into a complete Multi-Channel Syndication Pack for you (Substack newsletter + 3 LinkedIn authority posts). Zero charge—feel free to post it directly:\n\n` +
    `----------------------------------------\n` +
    `[SAMPLE LINKEDIN AUTHORITY POST]\n` +
    `${lead.sampleKit?.linkedInPosts?.[0]?.hook || "95% of podcast episodes die within 48 hours..."}\n\n` +
    `${lead.sampleKit?.linkedInPosts?.[0]?.body || "Here are the 3 big takeaways from our conversation..."}\n\n` +
    `----------------------------------------\n` +
    `[SAMPLE EMAIL NEWSLETTER]\n` +
    `Subject: ${lead.sampleKit?.newsletter?.subject || "The unfiltered truth behind your episode"}\n\n` +
    `${lead.sampleKit?.newsletter?.content?.slice(0, 500) || "Tactical takeaways from the latest show..."}...\n` +
    `----------------------------------------\n\n` +
    `If you like this format and want me to handle this for all your upcoming weekly episodes so your reach compounds on autopilot, I do this for podcast hosts for just $149/month (covers 4 weekly episodes).\n\n` +
    `Either way, hope the free asset above drives great engagement for you this week!\n\n` +
    `Best regards,\n`;

  return {
    subject,
    body,
    mailtoUrl: `mailto:${lead.publicEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  };
}
