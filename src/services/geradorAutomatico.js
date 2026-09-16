/**
 * Gerador Automático de Produtos Digitais Reais
 * Gera o produto COMPLETO (não prompts), a página de vendas e os textos de divulgação.
 */

export function gerarProdutoCompleto({ tema, preco = 27 }) {
  const tituloFormatado = `Guia Prático: Como Dominar ${tema} Passo a Passo`;
  
  const conteudo = `# GUIA PRÁTICO DEFINITIVO: ${tema.toUpperCase()}

## INTRODUÇÃO
Este material foi estruturado para ser direto, prático e focado em execução imediata.
Se você atua ou quer ter resultados rápidos com ${tema}, os 4 pilares a seguir vão economizar meses de erros caros.

---

## PILAR 1: O FUNDAMENTO QUE 90% IGNORA
A maioria das pessoas falha em ${tema} porque tenta pular direto para as técnicas avançadas sem ter o básico alinhado.
- Defina claramente o seu objetivo principal antes de começar;
- Elimine etapas desnecessárias que só consomem tempo e não trazem retorno;
- Foque na métrica que realmente importa: tempo economizado e resultado financeiro no bolso.

---

## PILAR 2: MÉTODO PRÁTICO DE EXECUÇÃO EM 3 PASSOS
Passo 1: Organização e Preparação
Separe 30 minutos no início da semana para planejar todas as ações prioritárias. Não comece o dia sem saber exatamente qual é a primeira tarefa que você precisa entregar.

Passo 2: Execução Sem Distrações
Use blocos de foco de 45 minutos. Elimine notificações de redes sociais enquanto estiver produzindo.

Passo 3: Revisão e Ajuste
Analise no fim de cada semana o que funcionou e o que gerou retrabalho. Corte sem piedade o que não gerou resultado.

---

## PILAR 3: OS 3 ERROS MAIS COMUNS QUE VOCÊ DEVE EVITAR
1. Querer fazer tudo manualmente sem usar automações simples;
2. Cobrar barato demais achando que preço baixo atrai clientes melhores (preço baixo atrai clientes exigentes e sem orçamento);
3. Não ter um processo padronizado de atendimento e entrega.

---

## PILAR 4: CHECKLIST FINAL DE APLICAÇÃO RÁPIDA
[ ] Defina sua rotina de 15 minutos diários de acompanhamento.
[ ] Padronize suas respostas frequentes para não perder tempo redigitando.
[ ] Monitore os resultados semanalmente.

---
Fim do Guia. Aplique o Pilar 2 ainda hoje para colher os primeiros resultados.`;

  const copy = {
    tituloPagina: `Guia Prático: O Passo a Passo Definitivo para ${tema}`,
    descricao: `O manual direto ao ponto para dominar ${tema} sem perder tempo com teorias complicadas.`,
    topicos: [
      `Método passo a passo testado e direto ao ponto`,
      `Os 3 erros clássicos que você nunca deve cometer`,
      `Checklist rápido de aplicação imediata`,
      `Formato simples e prático para ler no celular`
    ],
    garantia: "Garantia incondicional de 7 dias com devolução total do dinheiro se você não gostar."
  };

  const divulgacao = [
    {
      local: `Grupos e fóruns sobre ${tema}`,
      mensagem: `Pessoal, reuni em um documento prático os 4 pilares essenciais que mais funcionam para ${tema}. Quem quiser conferir, está disponível aqui: [SEU_LINK_KIWIFY]`
    }
  ];

  return {
    id: `prod-${Date.now()}`,
    titulo: tituloFormatado,
    subtitulo: `Manual completo e direto ao ponto para ter resultados rápidos com ${tema}.`,
    nicho: tema,
    preco: Number(preco),
    status: "ativo",
    vendasReais: 0,
    conteudoCompleto: conteudo,
    copyVendas: copy,
    ondeDivulgar: divulgacao
  };
}
