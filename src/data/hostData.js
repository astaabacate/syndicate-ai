// Dados iniciais da plataforma de hospedagem de bots
export const BOT_CONFIG_PADRAO = {
  nomeBot: "MeuBot Discord",
  linguagem: "Node.js (discord.js v14)",
  status: "online", // 'online' | 'offline' | 'reiniciando'
  uptime: "4 dias, 18 horas e 32 min",
  usoRam: "148 MB",
  limiteRam: "512 MB",
  usoCpu: "3.2%",
  diasRestantes: 28,
  tokenDiscord: "MTA4ODkyOTM5Mj...••••••••••••••••••••••••",
  discordVinculado: {
    username: "astaabacate",
    tag: "#0001",
    id: "320058999",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&q=80"
  },
  licencaAtiva: {
    chave: "NEXUS-88A2-9F1C-44B0",
    tipo: "Mensal (30 Dias)",
    dataAtivacao: "2026-09-14",
    dataExpiracao: "2026-10-14",
    discordIdTravado: "320058999"
  },
  arquivos: [
    {
      nome: "index.js",
      tipo: "javascript",
      conteudo: `const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(\`[SISTEMA] Bot logado com sucesso como: \${client.user.tag}!\`);
  console.log(\`[SISTEMA] Hospedado 24/7 na plataforma NexusHost.\`);
  client.user.setActivity('Hospedado na NexusHost', { type: 3 });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    const ping = client.ws.ping;
    message.reply(\`🏓 Pong! Latência atual: \${ping}ms\`);
  }

  if (message.content === '!host') {
    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('⚡ Status da Hospedagem')
      .setDescription('Bot operando 24/7 com licença ativa.')
      .addFields(
        { name: 'Uptime', value: '99.98%', inline: true },
        { name: 'RAM', value: '148MB / 512MB', inline: true }
      );
    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);`
    },
    {
      nome: ".env",
      tipo: "env",
      conteudo: `DISCORD_TOKEN=MTA4ODkyOTM5MjAxMjg1ODQ5MA.GxYr_Q.Zk918d2...
NODE_ENV=production
PORT=3000`
    },
    {
      nome: "package.json",
      tipo: "json",
      conteudo: `{
  "name": "discord-bot",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "discord.js": "^14.14.1",
    "dotenv": "^16.4.5"
  }
}`
    }
  ],
  logsIniciais: [
    "[16:04:10] [KERNEL] Alocando contêiner isolado de 512MB...",
    "[16:04:11] [NPM] Instalando dependências (discord.js v14.14.1)...",
    "[16:04:12] [NPM] Pacotes verificados. 0 vulnerabilidades.",
    "[16:04:13] [ENV] Variável DISCORD_TOKEN carregada com segurança.",
    "[16:04:14] [NODE] Iniciando processo: node index.js",
    "[16:04:15] [WEBSOCKET] Conectando ao gateway oficial do Discord (v10)...",
    "[16:04:16] [SISTEMA] Bot logado com sucesso como: NexusBot#4920!",
    "[16:04:16] [STATUS] Heartbeat ACK recebido. Latência: 24ms.",
    "[16:04:18] [SISTEMA] Hospedado 24/7 na plataforma NexusHost.",
    "[16:05:00] [PING] Comando !ping executado pelo usuário @pedro_gamer. Resposta em 21ms."
  ]
};

// Licenças iniciais cadastradas no sistema
export const LICENCAS_INICIAIS = [
  {
    id: "lic-01",
    chave: "NEXUS-88A2-9F1C-44B0",
    plano: "Host 30 Dias (512MB RAM)",
    status: "ativada",
    discordIdTravado: "320058999",
    usuarioDiscord: "astaabacate#0001",
    criadaEm: "2026-09-14",
    expiraEm: "2026-10-14"
  },
  {
    id: "lic-02",
    chave: "NEXUS-34B1-77FA-90C2",
    plano: "Host 30 Dias (512MB RAM)",
    status: "disponivel",
    discordIdTravado: null,
    usuarioDiscord: null,
    criadaEm: "2026-09-16",
    expiraEm: null
  },
  {
    id: "lic-03",
    chave: "NEXUS-99F0-11ED-55A3",
    plano: "Host 30 Dias (512MB RAM)",
    status: "disponivel",
    discordIdTravado: null,
    usuarioDiscord: null,
    criadaEm: "2026-09-16",
    expiraEm: null
  }
];
