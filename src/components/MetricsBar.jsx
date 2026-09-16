import React from 'react';

export default function MetricsBar({ leads, filterStatus, setFilterStatus }) {
  // Contagens do funil simplificado
  const contagens = {
    todos: leads.length,
    novo: leads.filter(l => l.status === 'novo').length,
    amostra_pronta: leads.filter(l => l.status === 'amostra_pronta').length,
    contatado: leads.filter(l => l.status === 'contatado').length,
    cliente_ativo: leads.filter(l => l.status === 'cliente_ativo').length
  };

  // Cálculo da renda mensal em Reais
  const clientesAtivos = leads.filter(l => l.status === 'cliente_ativo');
  const rendaMensalReais = clientesAtivos.reduce((total, l) => total + (l.valorMensal || 390), 0);

  const filtros = [
    { id: 'todos', label: 'Todos', count: contagens.todos },
    { id: 'novo', label: 'Novos', count: contagens.novo },
    { id: 'amostra_pronta', label: 'Com Amostra', count: contagens.amostra_pronta },
    { id: 'contatado', label: 'Mensagem Enviada', count: contagens.contatado },
    { id: 'cliente_ativo', label: 'Clientes Pagando', count: contagens.cliente_ativo }
  ];

  return (
    <div className="bg-[#0c0e14] border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Painel de Receita Líquida */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block">
              Sua Renda Mensal Recorrente (Pix/Stripe):
            </span>
            <span className="text-xl font-bold text-emerald-400 tracking-tight">
              R$ {rendaMensalReais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              <span className="text-xs font-normal text-slate-400 ml-1">/mês</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-medium text-slate-400 block">
              Clientes Ativos
            </span>
            <span className="text-sm font-semibold text-slate-200">
              {clientesAtivos.length} {clientesAtivos.length === 1 ? 'assinante' : 'assinantes'}
            </span>
          </div>
        </div>

        {/* Filtros em linha simples */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filtros.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterStatus(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 flex-shrink-0 active:scale-95 ${
                filterStatus === item.id
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
