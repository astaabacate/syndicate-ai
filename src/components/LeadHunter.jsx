import React, { useState } from 'react';
import { Search, Plus, Sparkles, Play, Check, Globe, Filter, ExternalLink } from 'lucide-react';
import { NICHE_OPTIONS, COUNTRY_OPTIONS } from '../data/mockLeads';

export default function LeadHunter({ onAddLead, leads }) {
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Manual lead form
  const [manualShow, setManualShow] = useState('');
  const [manualHost, setManualHost] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualEpisode, setManualEpisode] = useState('');
  const [manualCountry, setManualCountry] = useState('US');
  const [manualSummary, setManualSummary] = useState('');

  // Preset fresh discovery pool
  const FRESH_DISCOVERY_POOL = [
    {
      showTitle: "The AI Operations Blueprint",
      hostName: "Kieran Patel",
      guestName: "Samira Vance (COO, FlowScale)",
      niche: "IA & Automação B2B",
      country: "US",
      language: "en",
      platform: "YouTube / Spotify",
      publicEmail: "kieran@aiopsblueprint.com",
      channelUrl: "https://youtube.com/@aiopsblueprint",
      subscribers: "38.2K",
      latestEpisode: "Replacing a 5-Person Ops Team with 3 Autonomous AI Workflows",
      episodeDuration: "36 min",
      gapIdentified: "Publishes high-tier case studies weekly, but has zero Substack newsletter or LinkedIn breakdown posts. High executive reach.",
      potentialMRR: 199,
      transcriptSummary: "Kieran and Samira outline how FlowScale replaced manual client intake, contract drafting, and invoice follow-ups using autonomous AI webhooks, saving 60 hours per month. Great tactical lessons."
    },
    {
      showTitle: "Agência Sem Fronteiras",
      hostName: "Rodrigo Barcellos",
      guestName: "Renan Costa (Founder, GrowthLab)",
      niche: "Agências & Consultoria",
      country: "BR",
      language: "pt",
      platform: "YouTube / Spotify",
      publicEmail: "contato@agenciasemfronteiras.com.br",
      channelUrl: "https://youtube.com/@agenciasemfronteiras",
      subscribers: "29.7K",
      latestEpisode: "Como fechar clientes nos EUA e Europa morando no Brasil",
      episodeDuration: "44 min",
      gapIdentified: "Audiência de fundadores de agências buscando receita em dólar. O host grava 1 episódio por semana mas não alimenta seu perfil no LinkedIn.",
      potentialMRR: 199, // ~R$ 1.090
      transcriptSummary: "Rodrigo e Renan discutem a disparidade cambial (ganhar em dólar gastando em reais), a estratégia do Trojan Horse (entregar valor antes de pedir reunião) e como agências brasileiras podem prestar serviços remotos para pequenas empresas americanas sem sotaque perfeito."
    },
    {
      showTitle: "Early Stage Syndicate",
      hostName: "Chloe Sterling",
      guestName: "Solo Ep",
      niche: "Finanças & VC",
      country: "UK",
      language: "en",
      platform: "Spotify / Apple Podcasts",
      publicEmail: "chloe@earlystagesyndicate.co.uk",
      channelUrl: "https://earlystagesyndicate.co.uk",
      subscribers: "22.5K",
      latestEpisode: "Why Angel Investors Are Backing Micro-B2B Services in 2026",
      episodeDuration: "31 min",
      gapIdentified: "Venture audience with massive buying power. High-value insights locked inside 30-minute audio files without written distribution.",
      potentialMRR: 249,
      transcriptSummary: "Chloe explains why angel investors in London are pivoting from speculative pre-revenue consumer apps to cash-flow positive micro-B2B services with AI automation."
    }
  ];

  const handleRunDiscovery = () => {
    setIsSearching(true);
    setTimeout(() => {
      // Find leads from pool not already in list
      const existingTitles = leads.map(l => l.showTitle.toLowerCase());
      const available = FRESH_DISCOVERY_POOL.filter(p => !existingTitles.includes(p.showTitle.toLowerCase()));

      if (available.length > 0) {
        const candidate = available[0];
        onAddLead({
          ...candidate,
          id: `lead-${Date.now()}`,
          status: 'new',
          qualificationScore: 92,
          lastUpdated: new Date().toISOString().slice(0, 10),
          history: [{ date: new Date().toLocaleString(), action: "Lead descoberto pelo Caçador de Oportunidades" }]
        });
      } else {
        // Generate another fresh one
        onAddLead({
          id: `lead-${Date.now()}`,
          showTitle: `B2B Growth Lab #${leads.length + 1}`,
          hostName: "Alex Mercer",
          guestName: "Growth Leader",
          niche: "B2B SaaS & Tech",
          country: selectedCountry === 'all' ? 'US' : selectedCountry,
          language: selectedCountry === 'BR' ? 'pt' : 'en',
          platform: "YouTube / Spotify",
          publicEmail: `alex@b2bgrowthlab${leads.length + 1}.io`,
          channelUrl: "https://youtube.com",
          subscribers: "31.2K",
          latestEpisode: "Product-Led Inbound: The 2026 Conversion Framework",
          episodeDuration: "38 min",
          gapIdentified: "Consistent weekly podcast with no Substack newsletter or LinkedIn thought leadership repurposing.",
          potentialMRR: 199,
          status: 'new',
          qualificationScore: 90,
          transcriptSummary: "Deep dive on how modern B2B SaaS companies convert freemium users using automated educational email sequences.",
          lastUpdated: new Date().toISOString().slice(0, 10),
          history: [{ date: new Date().toLocaleString(), action: "Lead descoberto pelo Caçador de Oportunidades" }]
        });
      }
      setIsSearching(false);
    }, 1200);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualShow || !manualEmail) return;

    onAddLead({
      id: `lead-${Date.now()}`,
      showTitle: manualShow,
      hostName: manualHost || "Host",
      guestName: "Guest",
      niche: selectedNiche === 'all' ? 'B2B Podcasting' : selectedNiche,
      country: manualCountry,
      language: manualCountry === 'BR' ? 'pt' : 'en',
      platform: "YouTube / RSS",
      publicEmail: manualEmail,
      channelUrl: "https://youtube.com",
      subscribers: "15.0K+",
      latestEpisode: manualEpisode || "Latest Episode",
      episodeDuration: "30 min",
      gapIdentified: "Podcast ativo com forte oportunidade de distribuição multi-canal (Newsletter + LinkedIn + X).",
      potentialMRR: 149,
      status: 'new',
      qualificationScore: 88,
      transcriptSummary: manualSummary || `Episode insights on ${manualEpisode}`,
      lastUpdated: new Date().toISOString().slice(0, 10),
      history: [{ date: new Date().toLocaleString(), action: "Adicionado manualmente pelo operador" }]
    });

    setManualShow('');
    setManualHost('');
    setManualEmail('');
    setManualEpisode('');
    setManualSummary('');
    setShowManualForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Caçador de Podcasts & Canais B2B</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Descubra criadores e programas com alto orçamento e sem equipe de redação/repurposing
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Nicho do Programa:</label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {NICHE_OPTIONS.map(n => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">País / Mercado:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {COUNTRY_OPTIONS.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 1-Click Search Button */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={handleRunDiscovery}
            disabled={isSearching}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Rastreando Podcasts no YouTube & Spotify...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>🔍 Buscar Novos Podcasts com IA (1 Toque)</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Colar Canal do Celular</span>
          </button>
        </div>
      </div>

      {/* Manual Insertion Drawer */}
      {showManualForm && (
        <form onSubmit={handleManualSubmit} className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Adicionar Podcast Encontrado no Celular
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Nome do Podcast / Canal:</label>
              <input
                type="text"
                required
                placeholder="Ex: The SaaS Founder Show"
                value={manualShow}
                onChange={e => setManualShow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Nome do Host / Apresentador:</label>
              <input
                type="text"
                placeholder="Ex: Dan Martell ou João Silva"
                value={manualHost}
                onChange={e => setManualHost(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Email Público de Contato:</label>
              <input
                type="email"
                required
                placeholder="Ex: contact@podcastshow.com"
                value={manualEmail}
                onChange={e => setManualEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Título do Último Episódio:</label>
              <input
                type="text"
                placeholder="Ex: How we scaled to $1M ARR with zero ads"
                value={manualEpisode}
                onChange={e => setManualEpisode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs block mb-1">Resumo Rápido ou Tópicos do Episódio:</label>
            <textarea
              rows={2}
              placeholder="Cole os pontos principais, descrição do YouTube ou resumo da conversa..."
              value={manualSummary}
              onChange={e => setManualSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Salvar & Enviar para o Funil
            </button>
            <button
              type="button"
              onClick={() => setShowManualForm(false)}
              className="px-4 py-2.5 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
