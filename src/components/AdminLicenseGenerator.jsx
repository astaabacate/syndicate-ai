import React, { useState } from 'react';
import { Plus, Copy, Check, ShieldCheck, UserCheck, Key, Lock } from 'lucide-react';

export default function AdminLicenseGenerator({
  licencas,
  onCriarNovaChave
}) {
  const [chaveCopiada, setChaveCopiada] = useState(null);

  const handleCopiarChave = (chave) => {
    navigator.clipboard.writeText(chave);
    setChaveCopiada(chave);
    setTimeout(() => setChaveCopiada(null), 2000);
  };

  const licencasAtivadas = licencas.filter(l => l.status === 'ativada');
  const licencasDisponiveis = licencas.filter(l => l.status === 'disponivel');

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Topo do Painel de Administração */}
      <div className="bg-[#10121a] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Acesso Exclusivo do Dono do Host
            </span>
            <h2 className="text-base font-bold text-white mt-1">
              Gerador de Licenças & Gestão de Clientes
            </h2>
            <p className="text-xs text-slate-400">
              Gere chaves de 30 dias para enviar aos clientes que pagarem no Ticket do Discord.
            </p>
          </div>

          <button
            onClick={onCriarNovaChave}
            className="py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Gerar Nova Key</span>
          </button>
        </div>

        {/* Resumo de Licenças */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Licenças Ativas no Discord:</span>
            <span className="text-lg font-bold text-emerald-400">{licencasAtivadas.length} clientes</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Keys Disponíveis para Venda:</span>
            <span className="text-lg font-bold text-slate-200">{licencasDisponiveis.length} chaves</span>
          </div>
        </div>
      </div>

      {/* Lista de Chaves Geradas */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Chaves no Banco de Dados ({licencas.length})
        </h3>

        <div className="space-y-2">
          {licencas.map((lic) => {
            const isAtivada = lic.status === 'ativada';

            return (
              <div
                key={lic.id}
                className="bg-[#10121a] border border-slate-800/80 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white tracking-wider">
                      {lic.chave}
                    </span>
                    {isAtivada ? (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-500/20">
                        <Lock className="w-3 h-3" />
                        Travada no Discord
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                        Disponível para Venda
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {isAtivada ? (
                      <span>
                        Usuário: <strong className="text-slate-200">@{lic.usuarioDiscord}</strong> (ID: {lic.discordIdTravado}) • Expira em: {lic.expiraEm}
                      </span>
                    ) : (
                      <span>Pronta para enviar no Pix. Criada em: {lic.criadaEm}</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopiarChave(lic.chave)}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1 border border-slate-700 transition active:scale-95"
                  >
                    {chaveCopiada === lic.chave ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{chaveCopiada === lic.chave ? 'Copiada!' : 'Copiar Chave'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
