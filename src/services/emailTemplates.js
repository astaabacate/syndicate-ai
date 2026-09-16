/**
 * Modelos de mensagens simples, humanos e diretos
 * Sem parecer robô ou spam
 */

export function buildOutreachMessage(lead) {
  const isGringo = lead.pais === "US" || lead.idioma === "en";
  const primeiroNome = lead.apresentador?.split(" ")[0] || "amigo";
  const canal = lead.nomeCanal;
  const episodio = lead.ultimoEpisodio;

  if (isGringo) {
    const subject = `Free sample for your episode "${episodio.slice(0, 35)}..."`;
    const body = `Hi ${primeiroNome},\n\n` +
      `Loved your recent episode on ${canal} ("${episodio}"). Great insights.\n\n` +
      `Since most executives on LinkedIn and email don't have 40 minutes to listen to full recordings, I went ahead and created a ready-to-post Substack newsletter + 2 LinkedIn authority posts for this episode.\n\n` +
      `Zero charge—feel free to post it directly:\n\n` +
      `----------------------------------------\n` +
      `[LINKEDIN POST PREVIEW]\n` +
      `${lead.kitConteudo?.postsLinkedin?.[0]?.texto || "Most B2B operators are doing outbound wrong..."}\n\n` +
      `----------------------------------------\n` +
      `[NEWSLETTER PREVIEW]\n` +
      `${lead.kitConteudo?.newsletter?.conteudo?.slice(0, 380) || "Summary takeaways from your show..."}...\n` +
      `----------------------------------------\n\n` +
      `If you'd like your future episodes automatically turned into weekly multi-channel assets so you multiply your reach on autopilot, I handle this for just $149/month.\n\n` +
      `Hope the sample brings great engagement for you this week!\n\nBest,`;

    return {
      assunto: subject,
      textoEmail: body,
      linkEmail: `mailto:${lead.contatoEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      linkWhats: null
    };
  }

  // Versão em Português limpa e direta
  const assunto = `Amostra pronta do seu episódio: "${episodio.slice(0, 35)}..."`;
  
  const textoEmail = `Oi ${primeiroNome}, tudo bem?\n\n` +
    `Acompanhei o episódio mais recente do ${canal} ("${episodio}") e achei o conteúdo muito bom.\n\n` +
    `Como sei que a maioria das pessoas no LinkedIn e no email não tem 40 minutos para assistir o vídeo inteiro, peguei os pontos centrais da conversa e transformei em um pacote de conteúdo pronto (uma Newsletter formatada + 2 Posts para o seu LinkedIn).\n\n` +
    `👉 Não estou cobrando nada por isso! Pode copiar e postar direto se quiser:\n\n` +
    `----------------------------------------\n` +
    `[POST PARA O LINKEDIN]\n` +
    `${lead.kitConteudo?.postsLinkedin?.[0]?.texto || "A maioria das empresas erra ao tentar vender no primeiro contato..."}\n\n` +
    `----------------------------------------\n` +
    `[NEWSLETTER DE EMAIL]\n` +
    `Assunto: ${lead.kitConteudo?.newsletter?.assunto || "Resumo Executivo do Episódio"}\n\n` +
    `${lead.kitConteudo?.newsletter?.conteudo?.slice(0, 380) || "No episódio mais recente discutimos..."}...\n` +
    `----------------------------------------\n\n` +
    `Se você gostar do resultado e quiser que eu faça isso toda semana para os seus novos episódios (para manter suas redes ativas sem você gastar tempo escrevendo), eu cuido de tudo por R$ 390/mês.\n\n` +
    `Se não fizer sentido agora, fica como um presente pelo ótimo conteúdo que vocês produziram!\n\n` +
    `Abraço!`;

  // Mensagem mais curta para WhatsApp
  const textoWhats = `Oi ${primeiroNome}, tudo bem? Assisti o último episódio do ${canal} sobre "${episodio.slice(0, 30)}..." e achei sensacional.\n\n` +
    `Como sei que você é corrido, peguei os melhores insights do episódio e montei 2 posts prontos pro seu LinkedIn e 1 newsletter de graça pra você ver como fica.\n\n` +
    `Posso te mandar aqui pra você dar uma olhada?`;

  const linkWhats = lead.contatoWhats 
    ? `https://wa.me/${lead.contatoWhats}?text=${encodeURIComponent(textoWhats)}` 
    : null;

  return {
    assunto,
    textoEmail,
    linkEmail: `mailto:${lead.contatoEmail}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(textoEmail)}`,
    textoWhats,
    linkWhats
  };
}
