import React, { useState } from 'react';
import { 
  Copy, Check, Download, Sparkles, Send, FileText, 
  Share2, MessageCircle, Video, Mail, RefreshCw, ChevronRight 
} from 'lucide-react';

export default function ContentFactory({ leads, selectedLeadId, onSelectLead, onGenerateSample, onOpenOutreach, isGenerating }) {
  const [activeAssetTab, setActiveAssetTab] = useState('newsletter');
  const [copiedKey, setCopiedKey] = useState(null);

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!selectedLead?.sampleKit) return;
    const kit = selectedLead.sampleKit;
    const md = `# Content Syndication Pack: ${selectedLead.showTitle}\n` +
      `Episode: ${selectedLead.latestEpisode}\n` +
      `Host: ${selectedLead.hostName}\n` +
      `Date Generated: ${new Date().toISOString().slice(0, 10)}\n\n` +
      `---\n\n` +
      `## 1. Substack / Email Newsletter\n` +
      `**Subject:** ${kit.newsletter?.subject}\n` +
      `**Preview Text:** ${kit.newsletter?.previewText}\n\n` +
      `${kit.newsletter?.content}\n\n` +
      `---\n\n` +
      `## 2. LinkedIn Thought Leadership Authority Posts\n\n` +
      kit.linkedInPosts?.map((p, i) => `### Post ${i+1}\n**Hook:** ${p.hook}\n\n${p.body}\n\n**CTA:** ${p.cta}\n`).join('\n---\n') +
      `\n\n---\n\n` +
      `## 3. X / Twitter Viral Nuggets\n\n` +
      kit.tweets?.map((t, i) => `${i+1}. ${t}\n`).join('\n') +
      `\n\n---\n\n` +
      `## 4. Short-Form Video Scripts (Reels / TikTok / Shorts)\n\n` +
      kit.videoShorts?.map((v, i) => `### Script ${i+1}\n**Hook:** ${v.hook}\n\n**Body:** ${v.body}\n\n**CTA:** ${v.cta}\n`).join('\n\n') +
      `\n\n---\n\n` +
      `## 5. Executive Show Notes\n${kit.executiveSummary}\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Syndicate-${selectedLead.showTitle.replace(/\s+/g, '-')}-Pack.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!selectedLead) {
    return <div className="p-8 text-center text-slate-400">Nenhum lead selecionado.</div>;
  }

  const kit = selectedLead.sampleKit;

  return (
    <div className="space-y-4">
      {/* Lead Selector Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full sm:w-auto">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Podcast Selecionado:
          </label>
          <select
            value={selectedLead.id}
            onChange={(e) => onSelectLead(e.target.value)}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>
                {l.showTitle} ({l.country}) {l.sampleKit ? '⚡ Amostra Pronta' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onGenerateSample(selectedLead.id)}
            disabled={isGenerating}
            className="flex-1 sm:flex-none py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{kit ? 'Regenerar Kit' : 'Gerar Kit com IA'}</span>
          </button>

          {kit && (
            <button
              onClick={handleDownloadMarkdown}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
              title="Baixar em Markdown"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xs:inline">Baixar .MD</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Asset Display */}
      {!kit ? (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <Sparkles className="w-10 h-10 mx-auto text-amber-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white">Nenhum pacote gerado para este podcast ainda</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Clique no botão abaixo para transformar o último episódio em um Kit Completo de 5 formatos em 3 segundos.
          </p>
          <button
            onClick={() => onGenerateSample(selectedLead.id)}
            disabled={isGenerating}
            className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            ⚡ Gerar Kit de Degustação Agora
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {/* Asset Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/70 overflow-x-auto no-scrollbar">
            {[
              { id: 'newsletter', label: '📬 Newsletter', icon: Mail },
              { id: 'linkedin', label: '💼 LinkedIn (3)', icon: Share2 },
              { id: 'twitter', label: '🐦 X / Tweets (5)', icon: MessageCircle },
              { id: 'shorts', label: '📱 Shorts Scripts', icon: Video },
              { id: 'summary', label: '📄 Show Notes', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAssetTab(tab.id)}
                  className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition ${
                    activeAssetTab === tab.id
                      ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Asset Content Area */}
          <div className="p-4 sm:p-5">
            {/* Newsletter View */}
            {activeAssetTab === 'newsletter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Pronta para Substack / Beehiiv / ConvertKit</span>
                    <h4 className="text-sm font-bold text-white">Assunto: {kit.newsletter?.subject}</h4>
                    <p className="text-xs text-slate-400">Preview: {kit.newsletter?.previewText}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${kit.newsletter?.subject}\n\n${kit.newsletter?.content}`, 'nl')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    {copiedKey === 'nl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'nl' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {kit.newsletter?.content}
                </div>
              </div>
            )}

            {/* LinkedIn View */}
            {activeAssetTab === 'linkedin' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  3 publicações de autoridade formatadas com quebras para leitura no celular e gancho de alto clique:
                </p>
                {kit.linkedInPosts?.map((post, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-[11px] font-bold text-blue-400">Post #{idx + 1} - Gancho & Autoridade</span>
                      <button
                        onClick={() => handleCopy(`${post.hook}\n\n${post.body}\n\n${post.cta}`, `li-${idx}`)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 border border-slate-700"
                      >
                        {copiedKey === `li-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === `li-${idx}` ? 'Copiado!' : 'Copiar Post'}</span>
                      </button>
                    </div>
                    <p className="text-xs font-bold text-white bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      🎯 Gancho: "{post.hook}"
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {post.body}
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold pt-1 border-t border-slate-800/60">
                      👉 CTA: {post.cta}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tweets View */}
            {activeAssetTab === 'twitter' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">5 pílulas curtas prontas para o X / Threads com alta taxa de engajamento:</p>
                {kit.tweets?.map((tweet, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {tweet}
                    </p>
                    <button
                      onClick={() => handleCopy(tweet, `tw-${idx}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex-shrink-0"
                      title="Copiar tweet"
                    >
                      {copiedKey === `tw-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Shorts Scripts */}
            {activeAssetTab === 'shorts' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Roteiros para vídeos verticais (Reels/Shorts/TikTok) com gatilhos de retenção:</p>
                {kit.videoShorts?.map((script, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                      <span className="text-[11px] font-bold text-pink-400">Vídeo #{idx + 1} (30 a 50 segundos)</span>
                      <button
                        onClick={() => handleCopy(`Hook: ${script.hook}\n\nBody: ${script.body}\n\nCTA: ${script.cta}`, `vid-${idx}`)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 border border-slate-700"
                      >
                        {copiedKey === `vid-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === `vid-${idx}` ? 'Copiado!' : 'Copiar Roteiro'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 font-medium">
                      ⏱️ 0 a 3s (Gancho Visual): {script.hook}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {script.body}
                    </p>
                    <div className="text-xs text-emerald-400 pt-1 font-semibold">
                      📢 Fechamento: {script.cta}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Show Notes */}
            {activeAssetTab === 'summary' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Resumo Executivo do Episódio</span>
                  <button
                    onClick={() => handleCopy(kit.executiveSummary, 'sum')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                  >
                    {copiedKey === 'sum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sum' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {kit.executiveSummary}
                </p>
              </div>
            )}
          </div>

          {/* Quick Pitch CTA Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 hidden xs:inline">
              Amostra pronta para fechar este criador
            </span>
            <button
              onClick={() => onOpenOutreach(selectedLead)}
              className="w-full xs:w-auto py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Preparar Disparo de Email / DM</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
