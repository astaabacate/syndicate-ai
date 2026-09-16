import React, { useState, useEffect } from 'react';
import HostHeader from './components/HostHeader';
import ConsoleTerminal from './components/ConsoleTerminal';
import FileManager from './components/FileManager';
import LicenseActivator from './components/LicenseActivator';
import AdminLicenseGenerator from './components/AdminLicenseGenerator';
import DiscordTicketGuide from './components/DiscordTicketGuide';
import { BOT_CONFIG_PADRAO, LICENCAS_INICIAIS } from './data/hostData';
import { gerarNovaChaveLicenca, validarEAtivarLicenca } from './services/licenseManager';

export default function App() {
  const [activeTab, setActiveTab] = useState('console');
  
  const [botConfig, setBotConfig] = useState(() => {
    const salvo = localStorage.getItem('nexus_bot_config_v1');
    if (salvo) {
      try { return JSON.parse(salvo); } catch (e) {}
    }
    return BOT_CONFIG_PADRAO;
  });

  const [licencas, setLicencas] = useState(() => {
    const salvas = localStorage.getItem('nexus_licencas_v1');
    if (salvas) {
      try { return JSON.parse(salvas); } catch (e) {}
    }
    return LICENCAS_INICIAIS;
  });

  const [logs, setLogs] = useState(() => botConfig.logsIniciais || []);
  const [isReiniciando, setIsReiniciando] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexus_bot_config_v1', JSON.stringify(botConfig));
  }, [botConfig]);

  useEffect(() => {
    localStorage.setItem('nexus_licencas_v1', JSON.stringify(licencas));
  }, [licencas]);

  // Simulação de logs periódicos se o bot estiver online
  useEffect(() => {
    if (botConfig.status !== 'online') return;

    const interval = setInterval(() => {
      const hora = new Date().toLocaleTimeString('pt-BR');
      const eventos = [
        `[${hora}] [HEARTBEAT] Ping Discord Gateway: ${Math.floor(Math.random() * 10) + 18}ms. Conexão estável.`,
        `[${hora}] [STATUS] Monitor de memória: ${botConfig.usoRam} alocados. Sem vazamento.`,
        `[${hora}] [GUILD] Servidores conectados: 14 | Usuários alcançados: 2.840`
      ];
      const logAleatorio = eventos[Math.floor(Math.random() * eventos.length)];
      setLogs(prev => [...prev.slice(-40), logAleatorio]);
    }, 12000);

    return () => clearInterval(interval);
  }, [botConfig.status, botConfig.usoRam]);

  // Alternar Ligar / Desligar Bot
  const handleAlternarStatus = () => {
    const novoStatus = botConfig.status === 'online' ? 'offline' : 'online';
    const hora = new Date().toLocaleTimeString('pt-BR');

    setBotConfig(prev => ({ ...prev, status: novoStatus }));

    if (novoStatus === 'online') {
      setLogs(prev => [
        ...prev,
        `[${hora}] [KERNEL] Iniciando contêiner do bot...`,
        `[${hora}] [NODE] Executando node index.js`,
        `[${hora}] [SISTEMA] Bot conectado com sucesso!`
      ]);
    } else {
      setLogs(prev => [
        ...prev,
        `[${hora}] [KERNEL] Sinal SIGTERM enviado ao processo.`,
        `[${hora}] [SISTEMA] Bot desligado pelo painel.`
      ]);
    }
  };

  // Reiniciar Bot
  const handleReiniciar = () => {
    setIsReiniciando(true);
    const hora = new Date().toLocaleTimeString('pt-BR');

    setLogs(prev => [
      ...prev,
      `[${hora}] [SISTEMA] Reinicialização solicitada pelo usuário...`,
      `[${hora}] [KERNEL] Reiniciando processo Node.js...`
    ]);

    setTimeout(() => {
      setBotConfig(prev => ({ ...prev, status: 'online' }));
      setIsReiniciando(false);
      setLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString('pt-BR')}] [SISTEMA] Bot reiniciado com sucesso! Todos os serviços operacionais.`
      ]);
    }, 1500);
  };

  // Salvar Arquivo Editado
  const handleSalvarArquivo = (nomeArquivo, novoConteudo) => {
    setBotConfig(prev => ({
      ...prev,
      arquivos: prev.arquivos.map(a => a.nome === nomeArquivo ? { ...a, conteudo: novoConteudo } : a)
    }));

    const hora = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [
      ...prev,
      `[${hora}] [ARQUIVOS] Arquivo '${nomeArquivo}' atualizado no disco.`,
      `[${hora}] [HOT-RELOAD] Alterações aplicadas com sucesso.`
    ]);
  };

  // Ativar Licença no Painel
  const handleAtivarLicenca = (chave) => {
    const resultado = validarEAtivarLicenca({
      chave,
      discordUsuario: botConfig.discordVinculado,
      licencasAtuais: licencas
    });

    if (resultado.sucesso) {
      setLicencas(prev => prev.map(l => l.chave === resultado.licenca.chave ? resultado.licenca : l));
      setBotConfig(prev => ({
        ...prev,
        diasRestantes: 30,
        licencaAtiva: resultado.licenca
      }));

      const hora = new Date().toLocaleTimeString('pt-BR');
      setLogs(prev => [
        ...prev,
        `[${hora}] [LICENÇA] Chave ${chave} validada com sucesso!`,
        `[${hora}] [SEGURANÇA] Hospedagem travada no Discord ID: ${botConfig.discordVinculado.id}.`
      ]);
    }

    return resultado;
  };

  // Simular outra conta do Discord para testar a trava de segurança
  const handleTrocarUsuarioDiscord = () => {
    const usuarios = [
      {
        username: "astaabacate",
        tag: "#0001",
        id: "320058999",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&q=80"
      },
      {
        username: "pedro_gamer",
        tag: "#4492",
        id: "778899112233",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80"
      }
    ];

    const atual = botConfig.discordVinculado.id;
    const proximo = usuarios.find(u => u.id !== atual) || usuarios[0];

    setBotConfig(prev => ({
      ...prev,
      discordVinculado: proximo
    }));
  };

  // Criar Nova Chave pelo Painel do Dono
  const handleCriarNovaChave = () => {
    const novaChave = gerarNovaChaveLicenca();
    const novaLicenca = {
      id: `lic-${Date.now()}`,
      chave: novaChave,
      plano: "Host 30 Dias (512MB RAM)",
      status: "disponivel",
      discordIdTravado: null,
      usuarioDiscord: null,
      criadaEm: new Date().toISOString().slice(0, 10),
      expiraEm: null
    };

    setLicencas(prev => [novaLicenca, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Topo do Host */}
      <HostHeader
        botConfig={botConfig}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAlternarStatusBot={handleAlternarStatus}
        onReiniciarBot={handleReiniciar}
        isReiniciando={isReiniciando}
      />

      {/* Conteúdo Central */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 pb-16">
        {activeTab === 'console' && (
          <ConsoleTerminal
            botConfig={botConfig}
            logs={logs}
            onLimparLogs={() => setLogs([])}
            onAdicionarLog={(msg) => setLogs(prev => [...prev, msg])}
            onAlternarStatus={handleAlternarStatus}
            onReiniciar={handleReiniciar}
            isReiniciando={isReiniciando}
          />
        )}

        {activeTab === 'arquivos' && (
          <FileManager
            arquivos={botConfig.arquivos}
            onSalvarArquivo={handleSalvarArquivo}
          />
        )}

        {activeTab === 'licenca' && (
          <LicenseActivator
            botConfig={botConfig}
            licencas={licencas}
            onAtivarLicenca={handleAtivarLicenca}
            onTrocarUsuarioDiscord={handleTrocarUsuarioDiscord}
          />
        )}

        {activeTab === 'admin' && (
          <AdminLicenseGenerator
            licencas={licencas}
            onCriarNovaChave={handleCriarNovaChave}
          />
        )}

        {activeTab === 'discord' && (
          <DiscordTicketGuide />
        )}
      </main>
    </div>
  );
}
