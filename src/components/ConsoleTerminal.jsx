import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Square, RotateCw, Trash2, Cpu, HardDrive, Wifi } from 'lucide-react';

export default function ConsoleTerminal({
  botConfig,
  logs,
  onLimparLogs,
  onAdicionarLog,
  onAlternarStatus,
  onReiniciar,
  isReiniciando
}) {
  const [comando, setComando] = useState('');
  const terminalEndRef = useRef(null);

  const isOnline = botConfig.status === 'online';

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleEnviarComando = (e) => {
    e.preventDefault();
    if (!comando.trim()) return;

    const cmd = comando.trim();
    onAdicionarLog(`$ ${cmd}`);

    if (cmd === 'clear' || cmd === 'cls') {
      onLimparLogs();
      setComando('');
      return;
    }

    if (cmd === '!ping') {
      onAdicionarLog(`[WEBSOCKET] Resposta de ping: 22ms. Heartbeat perfeito.`);
    } else if (cmd === 'node -v') {
      onAdicionarLog(`v20.14.0 (Node.js LTS)`);
    } else if (cmd === 'status') {
      onAdicionarLog(`[INFO] Bot: ${botConfig.nomeBot} | Status: ${botConfig.status} | RAM: ${botConfig.usoRam}`);
    } else if (cmd === 'restart') {
      onReiniciar();
    } else {
      onAdicionarLog(`[CONSOLE] Comando '${cmd}' executado com sucesso.`);
    }

    setComando('');
  };

  return (
    <div className="space-y-3.5">
      {/* Barra de Métricas de Hardware */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs">
        <div className="bg-[#10121a] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Memória RAM</span>
              <span className="font-bold text-white text-xs sm:text-sm">{botConfig.usoRam} / {botConfig.limiteRam}</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">28% usado</span>
        </div>

        <div className="bg-[#10121a] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Uso de CPU</span>
              <span className="font-bold text-white text-xs sm:text-sm">{botConfig.usoCpu}</span>
            </div>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono hidden sm:inline">Normal</span>
        </div>

        <div className="bg-[#10121a] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-purple-400" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Ping Discord</span>
              <span className="font-bold text-white text-xs sm:text-sm">24ms</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">99.9% Uptime</span>
        </div>
      </div>

      {/* Caixa do Terminal */}
      <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono">
        {/* Barra Superior do Terminal */}
        <div className="bg-[#12141c] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 text-[11px] ml-2">terminal@nexus-host: ~/bot</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onLimparLogs}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Limpar logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Linhas de Logs */}
        <div className="p-4 h-80 sm:h-96 overflow-y-auto text-xs space-y-1.5 leading-relaxed selection:bg-emerald-500/30">
          {logs.map((log, index) => {
            let corTexto = "text-slate-300";
            if (log.includes("[SISTEMA]") || log.includes("[NODE]")) corTexto = "text-emerald-400";
            if (log.includes("[WEBSOCKET]") || log.includes("[INFO]")) corTexto = "text-cyan-400";
            if (log.includes("[ERRO]") || log.includes("Error")) corTexto = "text-red-400";
            if (log.startsWith("$")) corTexto = "text-yellow-300 font-bold";

            return (
              <div key={index} className={`${corTexto} break-all font-mono`}>
                {log}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input de Comando Interativo */}
        <form onSubmit={handleEnviarComando} className="border-t border-slate-800/80 bg-[#0e1017] p-2.5 flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-xs pl-2">$</span>
          <input
            type="text"
            placeholder="Digite um comando (ex: !ping, status, restart)..."
            value={comando}
            onChange={e => setComando(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            Executar
          </button>
        </form>
      </div>

      {/* Controles de Ação Abaixo do Terminal */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#10121a] border border-slate-800/80 rounded-xl text-xs">
        <span className="text-slate-400">
          Status: <strong className={isOnline ? "text-emerald-400" : "text-red-400"}>{isOnline ? "Online (Rodando)" : "Parado"}</strong>
        </span>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <button
              onClick={onAlternarStatus}
              className="py-1.5 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold border border-red-500/30 transition active:scale-95"
            >
              Parar Bot
            </button>
          ) : (
            <button
              onClick={onAlternarStatus}
              className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition active:scale-95"
            >
              Iniciar Bot
            </button>
          )}

          <button
            onClick={onReiniciar}
            disabled={isReiniciando}
            className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition active:scale-95"
          >
            {isReiniciando ? "Reiniciando..." : "Reiniciar"}
          </button>
        </div>
      </div>
    </div>
  );
}
