/**
 * Gerenciador de Licenças com Trava de Conta do Discord
 */

export function gerarNovaChaveLicenca() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bloco = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `NEXUS-${bloco()}-${bloco()}-${bloco()}`;
}

export function validarEAtivarLicenca({ chave, discordUsuario, licencasAtuais }) {
  const chaveFormatada = chave.trim().toUpperCase();
  const licenca = licencasAtuais.find(l => l.chave === chaveFormatada);

  if (!licenca) {
    return {
      sucesso: false,
      mensagem: "Chave de licença inválida! Verifique se você digitou corretamente."
    };
  }

  // Verifica se já está vinculada a outra conta
  if (licenca.status === "ativada" && licenca.discordIdTravado !== discordUsuario.id) {
    return {
      sucesso: false,
      mensagem: `Esta licença já está permanentemente vinculada ao usuário @${licenca.usuarioDiscord}. Ela não pode ser transferida para outra conta!`
    };
  }

  // Se já pertencer ao mesmo usuário
  if (licenca.status === "ativada" && licenca.discordIdTravado === discordUsuario.id) {
    return {
      sucesso: true,
      mensagem: "Sua licença já está ativa e vinculada a esta conta do Discord!",
      licenca
    };
  }

  // Ativação da chave nova
  const hoje = new Date();
  const expira = new Date();
  expira.setDate(hoje.getDate() + 30);

  const licencaAtivada = {
    ...licenca,
    status: "ativada",
    discordIdTravado: discordUsuario.id,
    usuarioDiscord: `${discordUsuario.username}${discordUsuario.tag}`,
    criadaEm: hoje.toISOString().slice(0, 10),
    expiraEm: expira.toISOString().slice(0, 10)
  };

  return {
    sucesso: true,
    mensagem: `Licença de 30 Dias ativada com sucesso e travada na conta @${discordUsuario.username}!`,
    licenca: licencaAtivada
  };
}
