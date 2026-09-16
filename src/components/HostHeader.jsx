import React from 'react';
import { Terminal, FolderCode, Key, ShieldCheck, MessageSquare, Power, RotateCw } from 'lucide-react';

export default function HostHeader({
  botConfig,
  activeTab,
  setActiveTab,
  onAlternarStatusBot,
  onReiniciarBot,
  isReiniciando
}) {
  const isOnline = botConfig.status === 'online';

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Marca & Status do Host */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm sm:text-base text-white tracking-tight leading-none">
                NEXUS<span className="text-emerald-400">HOST</span>
              </h1>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                v2.4
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                {isReiniciando ? 'Reiniciando...' : isOnline ? 'Bot Online 24/7' : 'Bot Offline'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-emerald-400 font-medium">
                {botConfig.diasRestantes} dias restantes
              </span>
            </div>
          </div>
        </div>

        {/* Perfil Discord & Controles Rápidos */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Avatar Discord */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <img
              src={botConfig.discordVinculado.avatar}
              alt="Avatar Discord"
              className="w-5 h-5 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="text-left leading-none">
              <span className="text-xs font-bold text-white block">
                {botConfig.discordVinculado.username}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">
                ID: {botConfig.discordVinculado.id}
              </span>
            </div>
          </div>

          {/* Botão Power / Reiniciar */}
          <div className="flex items-center gap-1">
            <button
              onClick={onAlternarStatusBot}
              className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 active:scale-95 ${
                isOnline
                  ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
              }`}
              title={isOnline ? "Desligar Bot" : "Iniciar Bot"}
            >
              <Power className="w-4 h-4" />
            </button>

            <button
              onClick={onReiniciarBot}
              disabled={isReiniciando}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition active:scale-95"
              title="Reiniciar Bot"
            >
              <RotateCw className={`w-4 h-4 ${isReiniciando ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Abas */}
      <div className="max-w-4xl mx-auto mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'console', label: '📟 Console / Logs', icon: Terminal },
          { id: 'arquivos', label: '📁 Arquivos & Token', icon: FolderCode },
          { id: 'licenca', label: '🔑 Ativar Licença', icon: Key },
          { id: 'admin', label: '👑 Painel do Dono (Gerar Keys)', icon: ShieldCheck },
          { id: 'discord', label: '💬 Configurar no Discord', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
