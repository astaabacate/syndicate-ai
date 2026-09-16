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
import { INITIAL_LEADS } from './data/mockLeads';
import { generateContentKit } from './services/aiRepurposer';

export default function App() {
  // Persistence via localStorage
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('syndicate_leads_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved leads", e);
      }
    }
    return INITIAL_LEADS;
  });

  const [activeTab, setActiveTab] = useState('pipeline');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currency, setCurrency] = useState('USD');
  const [selectedLeadId, setSelectedLeadId] = useState(INITIAL_LEADS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  // Modals
  const [outreachModalLead, setOutreachModalLead] = useState(null);
  const [responseModalLead, setResponseModalLead] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('syndicate_leads_v1', JSON.stringify(leads));
  }, [leads]);

  // Lead qualification action (1 click)
  const handleQualifyLead = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'qualified',
          qualificationScore: Math.floor(Math.random() * 10) + 90,
          history: [
            ...lead.history,
            { date: new Date().toLocaleString(), action: "Qualificado automaticamente pela IA" }
          ]
        };
      }
      return lead;
    }));
  };

  // Content generation action (1 click)
  const handleGenerateSample = async (id) => {
    const targetLead = leads.find(l => l.id === id);
    if (!targetLead) return;

    setIsGenerating(true);
    setSelectedLeadId(id);

    try {
      const kit = await generateContentKit({ lead: targetLead });
      setLeads(prev => prev.map(lead => {
        if (lead.id === id) {
          return {
            ...lead,
            status: lead.status === 'won' ? 'won' : 'sample_ready',
            sampleKit: kit,
            history: [
              ...lead.history,
              { date: new Date().toLocaleString(), action: "Kit de Amostra Multi-Canal gerado pela IA" }
            ]
          };
        }
        return lead;
      }));
    } catch (err) {
      console.error("Error generating kit:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Outreach marked contacted
  const handleMarkContacted = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'contacted',
          history: [
            ...lead.history,
            { date: new Date().toLocaleString(), action: "Abordagem com amostra enviada ao host" }
          ]
        };
      }
      return lead;
    }));
  };

  // Advance to negotiating
  const handleAdvanceToNegotiating = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'negotiating',
          history: [
            ...lead.history,
            { date: new Date().toLocaleString(), action: "Objeção tratada e proposta de assinatura enviada" }
          ]
        };
      }
      return lead;
    }));
  };

  // Mark deal as won (Client paid!)
  const handleMarkWon = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status: 'won',
          history: [
            ...lead.history,
            { date: new Date().toLocaleString(), action: "Pagamento confirmado via Stripe! Novo cliente ativo" }
          ]
        };
      }
      return lead;
    }));

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Add fresh lead
  const handleAddLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
  };

  // Weekly delivery generation for paying client
  const handleGenerateWeeklyDelivery = async (clientId, { latestEpisode, transcriptSummary }) => {
    const target = leads.find(l => l.id === clientId);
    if (!target) return;

    const updatedLead = {
      ...target,
      latestEpisode,
      transcriptSummary
    };

    const kit = await generateContentKit({ lead: updatedLead });

    setLeads(prev => prev.map(lead => {
      if (lead.id === clientId) {
        return {
          ...lead,
          latestEpisode,
          transcriptSummary,
          sampleKit: kit,
          history: [
            ...lead.history,
            { date: new Date().toLocaleString(), action: `Pacote semanal gerado para "${latestEpisode}"` }
          ]
        };
      }
      return lead;
    }));
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30">
      {/* Top Bar Navigation */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        onOpenGuide={() => setShowGuideModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Funnel Metrics Bar ("Botão de Dinheiro") */}
      <MetricsBar
        leads={leads}
        currency={currency}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 pb-20">
        {activeTab === 'pipeline' && (
          <PipelineView
            leads={leads}
            filterStatus={filterStatus}
            onQualifyLead={handleQualifyLead}
            onGenerateSample={handleGenerateSample}
            onOpenOutreach={(lead) => setOutreachModalLead(lead)}
            onOpenResponseModal={(lead) => setResponseModalLead(lead)}
            onOpenDelivery={(lead) => {
              setSelectedLeadId(lead.id);
              setActiveTab('delivery');
            }}
            currency={currency}
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
            currency={currency}
          />
        )}
      </main>

      {/* Outreach Modal */}
      {outreachModalLead && (
        <OutreachModal
          lead={outreachModalLead}
          onClose={() => setOutreachModalLead(null)}
          onMarkContacted={handleMarkContacted}
        />
      )}

      {/* Response Classifier Modal */}
      {responseModalLead && (
        <ResponseProcessorModal
          lead={responseModalLead}
          onClose={() => setResponseModalLead(null)}
          onAdvanceToNegotiating={handleAdvanceToNegotiating}
          onMarkWon={handleMarkWon}
        />
      )}

      {/* Zero Cost Guide Modal */}
      {showGuideModal && (
        <ZeroCostGuideModal
          onClose={() => setShowGuideModal(false)}
        />
      )}

      {/* Mobile Floating Quick Action Dock */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-md w-[92%] bg-slate-900/95 backdrop-blur-lg border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-1 text-[11px] sm:hidden">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex flex-col items-center justify-center ${
            activeTab === 'pipeline' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
          }`}
        >
          <span>🎯 Funil</span>
        </button>
        <button
          onClick={() => setActiveTab('hunter')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex flex-col items-center justify-center ${
            activeTab === 'hunter' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
          }`}
        >
          <span>🔍 Buscar</span>
        </button>
        <button
          onClick={() => setActiveTab('factory')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex flex-col items-center justify-center ${
            activeTab === 'factory' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
          }`}
        >
          <span>⚡ Fábrica</span>
        </button>
        <button
          onClick={() => setActiveTab('delivery')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition flex flex-col items-center justify-center ${
            activeTab === 'delivery' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
          }`}
        >
          <span>📦 Entregar</span>
        </button>
      </div>
    </div>
  );
}
