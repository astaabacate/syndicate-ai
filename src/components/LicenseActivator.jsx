import React, { useState } from 'react';
import { Key, ShieldCheck, AlertCircle, CheckCircle2, UserCheck, RefreshCw } from 'lucide-react';

export default function LicenseActivator({
  botConfig,
  licencas,
  onAtivarLicenca,
  onTrocarUsuarioDiscord
}) {
  const [chaveDigitada, setChaveDigitada] = useState('');
  const [mensagemStatus, setMensagemStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chaveDigitada.trim()) return;

    const res = onAtivarLicenca(chaveDigitada.trim());
    setMensagemStatus(res);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Status da Conta do Discord Conectada */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Conta do Discord Vinculada
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
            OAuth2 Autenticado
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={botConfig.discordVinculado.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
            />
            <div>
              <div className="font-bold text-white text-sm">
                {botConfig.discordVinculado.username}
                <span className="text-slate-500">{botConfig.discordVinculado.tag}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Discord ID: <strong className="text-slate-200">{botConfig.discordVinculado.id}</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onTrocarUsuarioDiscord}
            className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 border border-slate-700/80 rounded-lg px-2 py-1 bg-slate-900"
            title="Simular outra conta do Discord para testar a trava"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Simular Outra Conta</span>
          </button>
        </div>
      </div>

      {/* Formulário de Ativação da Chave */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div>
          <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Ativar Chave de Hospedagem (30 Dias)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Ao ativar, a licença fica <strong>permanentemente vinculada ao seu ID do Discord</strong>. Ninguém mais conseguirá usar a mesma chave em outra conta.
          </p>
        </div>

        {mensagemStatus && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              mensagemStatus.sucesso
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            {mensagemStatus.sucesso ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{mensagemStatus.mensagem}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Cole sua Chave de Licença (Comprada no Ticket do Discord):
            </label>
            <input
              type="text"
              required
              placeholder="Ex: NEXUS-88A2-9F1C-44B0"
              value={chaveDigitada}
              onChange={e => setChaveDigitada(e.target.value.toUpperCase())}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-mono tracking-widest uppercase focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
          >
            Validar & Ativar Hospedagem por 30 Dias
          </button>
        </form>

        {/* Detalhes da Licença Ativa */}
        {botConfig.licencaAtiva && (
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Licença Atual:</span>
              <span className="font-mono text-emerald-400 font-bold">{botConfig.licencaAtiva.chave}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Vinculada ao ID: {botConfig.licencaAtiva.discordIdTravado}</span>
              <span>Expira em: {botConfig.licencaAtiva.dataExpiracao}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
