import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import MetricsBar from './components/MetricsBar';
import PipelineView from './components/PipelineView';
import LeadHunter from './components/LeadHunter';
import ContentFactory from './components/ContentFactory';
import DeliveryCenter from './components/DeliveryCenter';
import OutreachModal from './components/OutreachModal';
import ResponseProcessorModal from './components/ResponseProcessorModal';
import ZeroCostGuideModal from './components/ZeroCostGuideModal';
import { CRIADORES_INICIAIS } from './data/mockLeads';
import { generateContentKit } from './services/aiRepurposer';

export default function App() {
  const [leads, setLeads] = useState(() => {
    const salvo = localStorage.getItem('syndicate_leads_v2');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao carregar dados salvos", e);
      }
    }
    return CRIADORES_INICIAIS;
  });

  const [activeTab, setActiveTab] = useState('pipeline');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedLeadId, setSelectedLeadId] = useState(CRIADORES_INICIAIS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  // Modais
  const [outreachModalLead, setOutreachModalLead] = useState(null);
  const [responseModalLead, setResponseModalLead] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('syndicate_leads_v2', JSON.stringify(leads));
  }, [leads]);

  // Ação de 1 toque: Gerar Amostra Gratuita com IA
  const handleGenerateSample = async (id) => {
    const alvo = leads.find(l => l.id === id);
    if (!alvo) return;

    setIsGenerating(true);
    setSelectedLeadId(id);

    try {
      const kit = await generateContentKit({ lead: alvo });
      setLeads(prev => prev.map(lead => {
        if (lead.id === id) {
          return {
            ...lead,
            status: lead.status === 'cliente_ativo' ? 'cliente_ativo' : 'amostra_pronta',
            kitConteudo: kit,
            historico: [
              ...lead.historico,
              `Amostra gratuita gerada com sucesso às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`
            ]
          };
        }
        return lead;
      }));
    } catch (err) {
      console.error("Erro ao gerar amostra:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Marcar como mensagem enviada
  const handleMarkContacted = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'contatado',
          historico: [
            ...lead.historico,
            `Mensagem com amostra enviada ao apresentador.`
          ]
        };
      }
      return lead;
    }));
  };

  // Fechar venda (Cliente pagou a assinatura mensal)
  const handleMarkWon = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'cliente_ativo',
          historico: [
            ...lead.historico,
            `Pagamento mensal confirmado! Novo cliente ativo da carteira.`
          ]
        };
      }
      return lead;
    }));

    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Adicionar novo criador
  const handleAddLead = (novoLead) => {
    setLeads(prev => [novoLead, ...prev]);
    setSelectedLeadId(novoLead.id);
  };

  // Entrega semanal para cliente pagante
  const handleGenerateWeeklyDelivery = async (clientId, { ultimoEpisodio, resumoConversa }) => {
    const alvo = leads.find(l => l.id === clientId);
    if (!alvo) return;

    const leadAtualizado = {
      ...alvo,
      ultimoEpisodio,
      resumoConversa
    };

    const kit = await generateContentKit({ lead: leadAtualizado });

    setLeads(prev => prev.map(lead => {
      if (lead.id === clientId) {
        return {
          ...lead,
          ultimoEpisodio,
          resumoConversa,
          kitConteudo: kit,
          historico: [
            ...lead.historico,
            `Pacote semanal gerado para "${ultimoEpisodio}".`
          ]
        };
      }
      return lead;
    }));
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Barra Superior Limpa */}
      <Header
        onOpenGuide={() => setShowGuideModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Painel Financeiro & Filtro */}
      <MetricsBar
        leads={leads}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Área Central Operacional */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-5 pb-24">
        {activeTab === 'pipeline' && (
          <PipelineView
            leads={leads}
            filterStatus={filterStatus}
            onGenerateSample={handleGenerateSample}
            onOpenOutreach={(lead) => setOutreachModalLead(lead)}
            onOpenResponseModal={(lead) => setResponseModalLead(lead)}
            onOpenDelivery={(lead) => {
              setSelectedLeadId(lead.id);
              setActiveTab('delivery');
            }}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'hunter' && (
          <LeadHunter
            leads={leads}
            onAddLead={handleAddLead}
          />
        )}

        {activeTab === 'factory' && (
          <ContentFactory
            leads={leads}
            selectedLeadId={selectedLeadId}
            onSelectLead={setSelectedLeadId}
            onGenerateSample={handleGenerateSample}
            onOpenOutreach={(lead) => setOutreachModalLead(lead)}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'delivery' && (
          <DeliveryCenter
            leads={leads}
            onGenerateWeeklyDelivery={handleGenerateWeeklyDelivery}
          />
        )}
      </main>

      {/* Modais de Ação */}
      {outreachModalLead && (
        <OutreachModal
          lead={outreachModalLead}
          onClose={() => setOutreachModalLead(null)}
          onMarkContacted={handleMarkContacted}
        />
      )}

      {responseModalLead && (
        <ResponseProcessorModal
          lead={responseModalLead}
          onClose={() => setResponseModalLead(null)}
          onMarkWon={handleMarkWon}
        />
      )}

      {showGuideModal && (
        <ZeroCostGuideModal
          onClose={() => setShowGuideModal(false)}
        />
      )}

      {/* Barra Flutuante Móvel no Rodapé (Perfeita para uso com 1 mão) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-sm w-[90%] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-xl flex items-center justify-between gap-1 text-[11px] sm:hidden">
        {[
          { id: 'pipeline', label: 'Vendas' },
          { id: 'hunter', label: 'Buscar' },
          { id: 'factory', label: 'Amostras' },
          { id: 'delivery', label: 'Clientes' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-xl font-medium transition ${
              activeTab === tab.id ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
