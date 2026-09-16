import React, { useState } from 'react';
import { Search, Plus, Sparkles } from 'lucide-react';
import { NICHOS } from '../data/mockLeads';

export default function LeadHunter({ onAddLead, leads }) {
  const [nichoSelecionado, setNichoSelecionado] = useState('todos');
  const [buscando, setBuscando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Formulário manual
  const [canal, setCanal] = useState('');
  const [apresentador, setApresentador] = useState('');
  const [email, setEmail] = useState('');
  const [whats, setWhats] = useState('');
  const [episodio, setEpisodio] = useState('');
  const [resumo, setResumo] = useState('');

  const handleBuscarNovos = () => {
    setBuscando(true);
    setTimeout(() => {
      onAddLead({
        id: `lead-${Date.now()}`,
        nomeCanal: `Canal de Negócios #${leads.length + 1}`,
        apresentador: "Marcelo Oliveira",
        convidado: "Especialista em Vendas",
        nicho: "Tecnologia & Startups",
        pais: "BR",
        idioma: "pt",
        plataforma: "YouTube / Spotify",
        contatoEmail: `contato@negocios${leads.length + 1}.com.br`,
        contatoWhats: "5511999997777",
        seguidores: "24 mil inscritos",
        ultimoEpisodio: "Como triplicar a conversão sem gastar mais em anúncios",
        duracaoEpisodio: "38 minutos",
        status: "novo",
        oportunidade: "Episódio recente de alta densidade sem nenhum resumo escrito no LinkedIn ou email.",
        valorMensal: 390,
        resumoConversa: "Marcelo discute como empresas B2B aumentam faturamento usando amostras de valor gratuitas.",
        kitConteudo: null,
        historico: ["Encontrado automaticamente pela IA."]
      });
      setBuscando(false);
    }, 800);
  };

  const handleSalvarManual = (e) => {
    e.preventDefault();
    if (!canal || (!email && !whats)) return;

    onAddLead({
      id: `lead-${Date.now()}`,
      nomeCanal: canal,
      apresentador: apresentador || "Apresentador",
      convidado: "Convidado",
      nicho: "Negócios & Gestão",
      pais: "BR",
      idioma: "pt",
      plataforma: "YouTube",
      contatoEmail: email,
      contatoWhats: whats,
      seguidores: "10k+ inscritos",
      ultimoEpisodio: episodio || "Episódio Recente",
      duracaoEpisodio: "30 minutos",
      status: "novo",
      oportunidade: "Canal adicionado por você. Pronto para gerar amostra gratuita.",
      valorMensal: 390,
      resumoConversa: resumo || `Discussão sobre ${episodio}`,
      kitConteudo: null,
      historico: ["Adicionado manualmente pelo celular."]
    });

    setCanal('');
    setApresentador('');
    setEmail('');
    setWhats('');
    setEpisodio('');
    setResumo('');
    setMostrarFormulario(false);
  };

  return (
    <div className="space-y-4">
      {/* Bloco de Busca */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Buscar Criadores e Podcasts
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Descubra canais que gravam toda semana e não têm equipe para escrever posts e newsletters.
          </p>
        </div>

        {/* Categoria */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
            Filtrar por Nicho:
          </label>
          <select
            value={nichoSelecionado}
            onChange={(e) => setNichoSelecionado(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {NICHOS.map(n => (
              <option key={n.id} value={n.id}>{n.nome}</option>
            ))}
          </select>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={handleBuscarNovos}
            disabled={buscando}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
          >
            {buscando ? (
              <span>Rastreando canais no YouTube...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Buscar Novos Criadores com IA</span>
              </>
            )}
          </button>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Colar Canal que Achei no Celular</span>
          </button>
        </div>
      </div>

      {/* Formulário para colar canal do YouTube */}
      {mostrarFormulario && (
        <form onSubmit={handleSalvarManual} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Adicionar Canal Encontrado
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Nome do Canal / Podcast:</label>
              <input
                type="text"
                required
                placeholder="Ex: Podcast Gestão & Lucro"
                value={canal}
                onChange={e => setCanal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Nome do Apresentador:</label>
              <input
                type="text"
                placeholder="Ex: Carlos Eduardo"
                value={apresentador}
                onChange={e => setApresentador(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Email de Contato (se tiver):</label>
              <input
                type="email"
                placeholder="Ex: contato@canal.com.br"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">WhatsApp de Contato (se tiver):</label>
              <input
                type="text"
                placeholder="Ex: 5511999998888"
                value={whats}
                onChange={e => setWhats(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Título do Último Vídeo:</label>
            <input
              type="text"
              placeholder="Ex: Como aumentamos as vendas em 50% este mês"
              value={episodio}
              onChange={e => setEpisodio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Resumo ou Pontos da Conversa:</label>
            <textarea
              rows={2}
              placeholder="Cole a descrição do vídeo ou os tópicos discutidos..."
              value={resumo}
              onChange={e => setResumo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Salvar Criador
            </button>
            <button
              type="button"
              onClick={() => setMostrarFormulario(false)}
              className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
