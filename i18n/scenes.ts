/** Conteúdo de cena (UI dos mockups) dos slides 1–11 — 3 idiomas (§8.5). */
import type { LangId } from './strings'

/** Segmento rich-text: em = itálico, strong = negrito, code = mono, ok = verde. */
export type Rich = { t: string; em?: boolean; strong?: boolean; code?: boolean; ok?: boolean }

export interface CardText {
  title: string
  desc: string
}

export interface CardDetail {
  stage: string
  owner: string
  headline: string
  outputs: string[]
  flow: string[]
  metrics: [string, string][]
}

export interface SceneStrings {
  s1: {
    topName: string
    pill: string
    title: string
    idLabel: string
    idValue: string
    smsLabel: string
    btn: string
    foot: Rich[]
  }
  s2: {
    topName: string
    pill: string
    tab1: string
    tab2: string
    outputsLabel: string
    flowLabel: string
    foot: string
    cards: Record<string, CardText>
    details: Record<string, CardDetail>
  }
  s3: {
    topName: string
    pill: string
    rec: string
    liveLabel: string
    tag: string
    transcript: Rich[]
    chips: string[]
  }
  s4: {
    topName: string
    pill: string
    storyLabel: string
    quote: Rich[]
    scriptLabel: string
    generating: string
    lines: { k: string; v?: string; flow?: string[]; ok?: boolean }[]
  }
  s5: {
    topName: string
    pill: string
    headT: string
    headSub: string
    tokens: string
    temp: string
    paragraphs: { tag: string; parts: Rich[]; ok?: boolean }[]
  }
  s6: {
    topName: string
    pill: string
    chatT: string
    scoreK: string
    scoreV: string
    whoLead: string
    whoAgent: string
    msgs: { agent?: boolean; parts: Rich[] }[]
    sideTitle: string
    sliders: [string, string][]
    out: [string, string][]
    btnGhost: string
    btnPrimary: string
  }
  s7: {
    topName: string
    pill: string
    blocksLabel: string
    blocks: string[]
    canvasT: string
    canvasTag: string
    nodes: { k: string; t: string }[]
    footK: string
    footV: string
    footTag: string
  }
  s8: {
    topName: string
    pill: string
    title: string
    sub: string
    reading: string
    karaoke: string[]
    cite: string
    pills: string[]
  }
  s9: {
    topName: string
    pill: string
    tag: string
    t: string
    question: Rich[]
    answer: string
    btnCheck: string
    btnEasier: string
    resultT: string
    resultQ: string
    tutor: string
  }
  s10: {
    topName: string
    pill: string
    badge: string
    appName: string
    appOrg: string
    copy: string
    desc: string
    statLabels: string[]
    btns: string[]
    foot: Rich[]
  }
  s11: {
    topName: string
    pill: string
    headT: string
    headSub: string
    kpiLabels: string[]
    staff: { role: string; app: string }[]
  }
}

export const SCENES: Record<LangId, SceneStrings> = {
  'pt-BR': {
    s1: {
      topName: 'ai.tutor · Login Único',
      pill: 'learn.iconsai.ai',
      title: 'Entrar no ecossistema',
      idLabel: 'CPF',
      idValue: '123.456.789-00',
      smsLabel: 'Código SMS',
      btn: 'Entrar via Identity Hub',
      foot: [
        { t: 'Identity Hub · ' },
        { t: 'MagisaTech', strong: true },
        { t: ' · 1 conta, todos os apps' },
      ],
    },
    s2: {
      topName: 'ai.tutor · Minhas trilhas',
      pill: 'ana.ribeiro · MagisaTech',
      tab1: 'Áreas disponíveis',
      tab2: 'Minhas apps publicadas',
      outputsLabel: 'outputs esperados',
      flowLabel: 'microfluxo da trilha',
      foot: 'clique em outra área para simular a troca de contexto do aluno',
      cards: {
        stats: { title: 'Estatística', desc: '73 modelos com aulas interativas.' },
        python: { title: 'Python', desc: 'Notebooks e tutoriais.' },
        finance: { title: 'Finanças', desc: 'Modelos, projeções, análises.' },
        esg: { title: 'ESG', desc: 'Indicadores e sustentabilidade.' },
        comp: { title: 'Compliance', desc: 'LGPD, SOX, ISO.' },
        ia: { title: 'IA · Construir minha aplicação', desc: 'Conte sua história. A IA cria o app.' },
        bi: { title: 'BI', desc: 'Dashboards e exploração.' },
        ops: { title: 'Operações', desc: 'Processos e SOPs internos.' },
      },
      details: {
        stats: {
          stage: 'trilha ativa · laboratório quantitativo',
          owner: 'tutor ai.t',
          headline: 'modelos vivos → exercício → veredito Python',
          outputs: ['Distribuições interativas', 'Testes de hipótese guiados', 'Exercícios com gabarito Python'],
          flow: ['Escolhe o modelo', 'Vê a visualização', 'Resolve o exercício'],
          metrics: [['módulos', '12'], ['exercícios', '48'], ['retenção', '87%']],
        },
        python: {
          stage: 'trilha ativa · ambiente hands-on',
          owner: 'tutor ai.t',
          headline: 'notebook → execução real → feedback imediato',
          outputs: ['Notebooks executáveis', 'Tutoriais passo a passo', 'Correção automática'],
          flow: ['Lê o problema', 'Roda o código', 'Recebe o veredito'],
          metrics: [['testes', '156'], ['latência', '12ms']],
        },
        finance: {
          stage: 'trilha ativa · time financeiro',
          owner: 'tutor ai.t',
          headline: 'projeção → cenário → decisão fundamentada',
          outputs: ['Modelos de projeção', 'Análise de cenários', 'Valuation guiado'],
          flow: ['Monta a premissa', 'Roda o cenário', 'Compara resultados'],
          metrics: [['cenários', '9'], ['premissas', '24'], ['cobertura', '92%']],
        },
        esg: {
          stage: 'trilha ativa · sustentabilidade',
          owner: 'tutor ai.t',
          headline: 'indicador → meta → plano de ação',
          outputs: ['Painéis de indicadores', 'Metas auditáveis', 'Relatórios padronizados'],
          flow: ['Mede o indicador', 'Define a meta', 'Acompanha o plano'],
          metrics: [['indicadores', '31'], ['ações', '14'], ['engajamento', '76%']],
        },
        comp: {
          stage: 'trilha ativa · governança',
          owner: 'jurídico + risco',
          headline: 'norma → checklist → evidência de conformidade',
          outputs: ['Mapas LGPD', 'Checklists SOX', 'Trilhas de auditoria'],
          flow: ['Lê a norma', 'Aplica o checklist', 'Gera a evidência'],
          metrics: [['normas', '8'], ['artefatos', '52'], ['aderência', '94%']],
        },
        ia: {
          stage: 'trilha destaque · builder workspace',
          owner: 'você + ai.tutor',
          headline: 'história → script → prompt → simulação → app publicada',
          outputs: ['Agent personalizado', 'System prompt editável', 'App publicada com URL real'],
          flow: ['Conta a história', 'Revisa o script', 'Testa e publica'],
          metrics: [['passos', '4'], ['tempo médio', '18min'], ['conversão', '91%']],
        },
        bi: {
          stage: 'trilha ativa · analytics studio',
          owner: 'tutor ai.t',
          headline: 'dado bruto → dashboard → insight acionável',
          outputs: ['Dashboards interativos', 'Exploração guiada', 'Alertas de anomalia'],
          flow: ['Conecta o dado', 'Monta o painel', 'Lê o insight'],
          metrics: [['painéis', '17'], ['alertas', '6']],
        },
        ops: {
          stage: 'trilha ativa · time de processos',
          owner: 'tutor ai.t',
          headline: 'gargalo → SOP → simulação de melhoria',
          outputs: ['SOPs versionados', 'Mapas de processo', 'Simulações de fila'],
          flow: ['Mapeia o gargalo', 'Prioriza a ação', 'Roda a simulação'],
          metrics: [['processos', '23'], ['playbooks', '11'], ['gargalos', '4']],
        },
      },
    },
    s3: {
      topName: 'ai.tutor · Conte sua história',
      pill: 'passo 1 / 4 · gravando',
      rec: 'REC · 00:14',
      liveLabel: 'transcrição ao vivo',
      tag: 'claude-sonnet-4-6 · pt-BR',
      transcript: [
        { t: 'Eu' },
        { t: 'trabalho' },
        { t: 'com' },
        { t: 'vendas B2B', em: true },
        { t: 'no setor' },
        { t: 'industrial.', em: true },
        { t: 'Cada cliente' },
        { t: 'me faz' },
        { t: 'as mesmas' },
        { t: '5 perguntas', em: true },
        { t: 'no início do funil.' },
        { t: 'Queria' },
        { t: 'automatizar isso', em: true },
        { t: 'pra' },
        { t: 'qualificar leads', em: true },
        { t: 'mais rápido' },
      ],
      chips: ['vendas B2B', 'industrial', 'qualificação', 'leads', 'automação'],
    },
    s4: {
      topName: 'ai.tutor · Gerando script',
      pill: 'passo 2 / 4 · estruturando',
      storyLabel: 'sua história',
      quote: [
        { t: '“Eu trabalho com ' },
        { t: 'vendas B2B', em: true },
        { t: ' no setor ' },
        { t: 'industrial', em: true },
        { t: '. Cada cliente me faz as mesmas ' },
        { t: '5 perguntas', em: true },
        { t: ' no início do funil. Queria ' },
        { t: 'automatizar', em: true },
        { t: ' isso pra ' },
        { t: 'qualificar leads', em: true },
        { t: ' mais rápido.”' },
      ],
      scriptLabel: 'script estruturado',
      generating: 'Generating script...',
      lines: [
        { k: 'STORY', v: '→ Vendas B2B industrial' },
        { k: 'AGENT NAME', v: '→ Qualificador de Leads' },
        { k: 'TOOLS', v: '→ CRM lookup · CNPJ enrichment · Email' },
        { k: 'FLOW', flow: ['1. Saúda', '2. Pergunta pain points', '3. Calcula score', '4. Roteia'] },
        { k: 'GUARDRAILS', v: '→ Não promete prazo · Não cita preço' },
        { k: 'STATUS', v: '→ Script gerado', ok: true },
      ],
    },
    s5: {
      topName: 'ai.tutor · System prompt',
      pill: 'passo 3 / 4 · promptando',
      headT: 'System prompt do agent',
      headSub: 'Gerado a partir do script · revisável antes de publicar',
      tokens: '1.247',
      temp: '0.3',
      paragraphs: [
        {
          tag: '# ROLE',
          parts: [
            { t: 'Você é o ' },
            { t: 'Qualificador de Leads', strong: true },
            { t: ' da MagisaTech. Seu papel é conversar com leads industriais, entender o porte da empresa, a dor principal e o orçamento — e atribuir um ' },
            { t: 'score de 0–10', strong: true },
            { t: '.' },
          ],
        },
        {
          tag: '# TOM',
          parts: [
            { t: 'Formal mas direto. Sem jargão. Faz ' },
            { t: 'uma pergunta de cada vez', em: true },
            { t: '. Nunca promete prazo nem cita preço — isso vai pro time comercial humano.' },
          ],
        },
        {
          tag: '# TOOLS',
          parts: [
            { t: 'crm_lookup(', },
            { t: 'cnpj', code: true },
            { t: ') · cnpj_enrich(' },
            { t: 'cnpj', code: true },
            { t: ') · send_email(' },
            { t: 'lead', code: true },
            { t: ')' },
          ],
        },
        {
          tag: '# FLOW',
          parts: [
            { t: 'Sempre: 1) saúda, 2) pergunta o CNPJ, 3) enriquece via tool, 4) faz as 5 perguntas de qualificação, 5) calcula o score, 6) ' },
            { t: 'se score ≥ 7 marca reunião', strong: true },
            { t: ', senão envia material.' },
          ],
        },
        {
          tag: '# STATUS',
          parts: [
            { t: '✓ Prompt gerado', ok: true },
            { t: ' · revisão do usuário disponível.' },
          ],
          ok: true,
        },
      ],
    },
    s6: {
      topName: 'ai.tutor · Simulação',
      pill: 'passo 4 / 4 · testando antes de publicar',
      chatT: 'Simulação · lead NPC vs seu agent',
      scoreK: 'score:',
      scoreV: '8.7',
      whoLead: 'lead simulado',
      whoAgent: 'seu agent',
      msgs: [
        { parts: [{ t: 'Tenho uma indústria de embalagens, 80 funcionários em Joinville.' }] },
        { agent: true, parts: [{ t: 'Entendi. Vocês exportam ou só mercado interno? Qual o volume mensal?' }] },
        { parts: [{ t: '90% interno. Uns 1.200 pedidos/mês. A gente queria automatizar a triagem inicial.' }] },
        {
          agent: true,
          parts: [
            { t: 'Volume relevante. ' },
            { t: 'Qual a maior dor hoje:', em: true },
            { t: ' tempo de resposta, perda de pedido, ou qualificação?' },
          ],
        },
      ],
      sideTitle: 'controles ao vivo',
      sliders: [
        ['temperatura', '0.42'],
        ['persona', 'formal'],
        ['profundidade técnica', 'média'],
      ],
      out: [
        ['outcome', 'Qualificado'],
        ['próxima ação', 'marcar reunião'],
      ],
      btnGhost: 'Refinar',
      btnPrimary: 'Aprovar →',
    },
    s7: {
      topName: 'ai.tutor · Tool Builder',
      pill: 'no-code · fluxo visual',
      blocksLabel: 'Blocos',
      blocks: ['Input', 'CRM lookup', 'Claude', 'Score Python', 'Output'],
      canvasT: 'Fluxo: Qualificador de Leads',
      canvasTag: 'snap-to-grid · conexões ao vivo',
      nodes: [
        { k: 'INPUT', t: 'CNPJ + dor' },
        { k: 'TOOL', t: 'CRM lookup' },
        { k: 'LLM', t: 'claude-sonnet-4-6' },
        { k: 'PYTHON', t: 'score 0–10' },
        { k: 'OUTPUT', t: 'roteia comercial' },
      ],
      footK: 'DEPLOY READY',
      footV: '/apps/qualificador-leads-magisatech',
      footTag: 'válida pra empresa',
    },
    s8: {
      topName: 'modo treinamento · karaokê',
      pill: 'Tutor ai.t lendo em voz',
      title: 'Como ler bem um lead industrial',
      sub: 'karaokê word-by-word · gpt-4o-mini-tts',
      reading: 'Lendo em voz alta...',
      karaoke: [
        'Um lead industrial bom',
        'tem CNPJ ativo,',
        'CNAE coerente,',
        'sócios estáveis no QSA',
        'e dor mensurável.',
        'Se faltar um,',
        'o score cai',
        'e o agente',
        'pede mais contexto',
        'antes de rotear',
        '. Exemplo:',
        'embalagens com 80 funcionários é médio porte.',
      ],
      cite: 'Fonte 3, item 2.1',
      pills: ['Simples', 'Técnico', 'Exercício'],
    },
    s9: {
      topName: 'exercício · score do lead',
      pill: 'Veredito por Python',
      tag: 'Exercício',
      t: 'Calculando o score',
      question: [
        { t: 'Lead com ' },
        { t: 'CNPJ ativo', strong: true },
        { t: ' (+2), ' },
        { t: '80 funcionários', strong: true },
        { t: ' (+3), ' },
        { t: 'dor clara', strong: true },
        { t: ' (+3) e ' },
        { t: 'orçamento aprovado', strong: true },
        { t: ' (+1). Qual o score final?' },
      ],
      answer: '9',
      btnCheck: 'Conferir',
      btnEasier: 'Mais fácil',
      resultT: 'Correto · Score: 9.2/10',
      resultQ: 'Python · 12ms',
      tutor: 'Bom: você somou os pesos certos. Python entrega veredito; LLM só humaniza, não avalia.',
    },
    s10: {
      topName: 'ai.tutor · aplicação publicada',
      pill: 'ao vivo · em produção',
      badge: 'PUBLICADO',
      appName: 'Qualificador de Leads',
      appOrg: 'MagisaTech · Vendas B2B',
      copy: 'copiar',
      desc: 'Agente que conversa com leads industriais, enriquece o CNPJ, faz 5 perguntas de qualificação e roteia pro comercial humano se score ≥ 7.',
      statLabels: ['conversas hoje', 'leads qualificados', 'satisfação'],
      btns: ['Acessar app →', 'Compartilhar', 'Editar'],
      foot: [
        { t: 'Publicado em ' },
        { t: '2.3s', strong: true },
        { t: ' · v1 · standalone' },
      ],
    },
    s11: {
      topName: 'MagisaTech · RH',
      pill: '6 colaboradores · apps personalizadas',
      headT: 'Trilha Compliance LGPD · MagisaTech',
      headSub: 'cada colaborador sai com sua própria app de IA',
      kpiLabels: ['apps publicadas', 'média trilha', 'histórias gravadas'],
      staff: [
        { role: 'Gestora RH', app: 'Triagem de candidatos' },
        { role: 'Fiscal', app: 'Triagem de NF fiscal' },
        { role: 'Compras', app: 'Cotação automática' },
        { role: 'TI', app: 'Help-desk N1' },
        { role: 'Jurídico', app: 'Revisor de contratos' },
        { role: 'Op. fábrica', app: 'Checklist NR-12' },
      ],
    },
  },
  'pt-PT': {
    s1: {
      topName: 'ai.tutor · Início de Sessão Único',
      pill: 'learn.iconsai.ai',
      title: 'Entrar no ecossistema',
      idLabel: 'NIF',
      idValue: '123 456 789',
      smsLabel: 'Código SMS',
      btn: 'Entrar via Identity Hub',
      foot: [
        { t: 'Identity Hub · ' },
        { t: 'MagisaTech', strong: true },
        { t: ' · 1 conta, todas as apps' },
      ],
    },
    s2: {
      topName: 'ai.tutor · Os meus percursos',
      pill: 'ana.ribeiro · MagisaTech',
      tab1: 'Áreas disponíveis',
      tab2: 'As minhas apps publicadas',
      outputsLabel: 'outputs esperados',
      flowLabel: 'microfluxo do percurso',
      foot: 'clique noutra área para simular a troca de contexto do aluno',
      cards: {
        stats: { title: 'Estatística', desc: '73 modelos com aulas interativas.' },
        python: { title: 'Python', desc: 'Notebooks e tutoriais.' },
        finance: { title: 'Finanças', desc: 'Modelos, projeções, análises.' },
        esg: { title: 'ESG', desc: 'Indicadores e sustentabilidade.' },
        comp: { title: 'Compliance', desc: 'RGPD, SOX, ISO.' },
        ia: { title: 'IA · Construir a minha aplicação', desc: 'Conte a sua história. A IA cria a app.' },
        bi: { title: 'BI', desc: 'Dashboards e exploração.' },
        ops: { title: 'Operações', desc: 'Processos e SOPs internos.' },
      },
      details: {
        stats: {
          stage: 'percurso ativo · laboratório quantitativo',
          owner: 'tutor ai.t',
          headline: 'modelos vivos → exercício → veredicto Python',
          outputs: ['Distribuições interativas', 'Testes de hipótese guiados', 'Exercícios com gabarito Python'],
          flow: ['Escolhe o modelo', 'Vê a visualização', 'Resolve o exercício'],
          metrics: [['módulos', '12'], ['exercícios', '48'], ['retenção', '87%']],
        },
        python: {
          stage: 'percurso ativo · ambiente hands-on',
          owner: 'tutor ai.t',
          headline: 'notebook → execução real → feedback imediato',
          outputs: ['Notebooks executáveis', 'Tutoriais passo a passo', 'Correção automática'],
          flow: ['Lê o problema', 'Executa o código', 'Recebe o veredicto'],
          metrics: [['testes', '156'], ['latência', '12ms']],
        },
        finance: {
          stage: 'percurso ativo · equipa financeira',
          owner: 'tutor ai.t',
          headline: 'projeção → cenário → decisão fundamentada',
          outputs: ['Modelos de projeção', 'Análise de cenários', 'Valuation guiado'],
          flow: ['Monta a premissa', 'Executa o cenário', 'Compara resultados'],
          metrics: [['cenários', '9'], ['premissas', '24'], ['cobertura', '92%']],
        },
        esg: {
          stage: 'percurso ativo · sustentabilidade',
          owner: 'tutor ai.t',
          headline: 'indicador → meta → plano de ação',
          outputs: ['Painéis de indicadores', 'Metas auditáveis', 'Relatórios padronizados'],
          flow: ['Mede o indicador', 'Define a meta', 'Acompanha o plano'],
          metrics: [['indicadores', '31'], ['ações', '14'], ['envolvimento', '76%']],
        },
        comp: {
          stage: 'percurso ativo · governação',
          owner: 'jurídico + risco',
          headline: 'norma → checklist → evidência de conformidade',
          outputs: ['Mapas RGPD', 'Checklists SOX', 'Trilhas de auditoria'],
          flow: ['Lê a norma', 'Aplica o checklist', 'Gera a evidência'],
          metrics: [['normas', '8'], ['artefactos', '52'], ['aderência', '94%']],
        },
        ia: {
          stage: 'percurso destaque · builder workspace',
          owner: 'você + ai.tutor',
          headline: 'história → guião → prompt → simulação → app publicada',
          outputs: ['Agente personalizado', 'System prompt editável', 'App publicada com URL real'],
          flow: ['Conta a história', 'Revê o guião', 'Testa e publica'],
          metrics: [['passos', '4'], ['tempo médio', '18min'], ['conversão', '91%']],
        },
        bi: {
          stage: 'percurso ativo · analytics studio',
          owner: 'tutor ai.t',
          headline: 'dado bruto → dashboard → insight acionável',
          outputs: ['Dashboards interativos', 'Exploração guiada', 'Alertas de anomalia'],
          flow: ['Liga o dado', 'Monta o painel', 'Lê o insight'],
          metrics: [['painéis', '17'], ['alertas', '6']],
        },
        ops: {
          stage: 'percurso ativo · equipa de processos',
          owner: 'tutor ai.t',
          headline: 'estrangulamento → SOP → simulação de melhoria',
          outputs: ['SOPs versionados', 'Mapas de processo', 'Simulações de fila'],
          flow: ['Mapeia o estrangulamento', 'Prioriza a ação', 'Executa a simulação'],
          metrics: [['processos', '23'], ['playbooks', '11'], ['estrangulamentos', '4']],
        },
      },
    },
    s3: {
      topName: 'ai.tutor · Conte a sua história',
      pill: 'passo 1 / 4 · a gravar',
      rec: 'REC · 00:14',
      liveLabel: 'transcrição ao vivo',
      tag: 'claude-sonnet-4-6 · pt-PT',
      transcript: [
        { t: 'Eu' },
        { t: 'trabalho' },
        { t: 'com' },
        { t: 'vendas B2B', em: true },
        { t: 'no setor' },
        { t: 'industrial.', em: true },
        { t: 'Cada cliente' },
        { t: 'faz-me' },
        { t: 'as mesmas' },
        { t: '5 perguntas', em: true },
        { t: 'no início do funil.' },
        { t: 'Queria' },
        { t: 'automatizar isto', em: true },
        { t: 'para' },
        { t: 'qualificar leads', em: true },
        { t: 'mais depressa' },
      ],
      chips: ['vendas B2B', 'industrial', 'qualificação', 'leads', 'automação'],
    },
    s4: {
      topName: 'ai.tutor · A gerar guião',
      pill: 'passo 2 / 4 · a estruturar',
      storyLabel: 'a sua história',
      quote: [
        { t: '“Eu trabalho com ' },
        { t: 'vendas B2B', em: true },
        { t: ' no setor ' },
        { t: 'industrial', em: true },
        { t: '. Cada cliente faz-me as mesmas ' },
        { t: '5 perguntas', em: true },
        { t: ' no início do funil. Queria ' },
        { t: 'automatizar', em: true },
        { t: ' isto para ' },
        { t: 'qualificar leads', em: true },
        { t: ' mais depressa.”' },
      ],
      scriptLabel: 'guião estruturado',
      generating: 'Generating script...',
      lines: [
        { k: 'STORY', v: '→ Vendas B2B industrial' },
        { k: 'AGENT NAME', v: '→ Qualificador de Leads' },
        { k: 'TOOLS', v: '→ CRM lookup · NIPC enrichment · Email' },
        { k: 'FLOW', flow: ['1. Saúda', '2. Pergunta pain points', '3. Calcula a pontuação', '4. Encaminha'] },
        { k: 'GUARDRAILS', v: '→ Não promete prazo · Não cita preço' },
        { k: 'STATUS', v: '→ Guião gerado', ok: true },
      ],
    },
    s5: {
      topName: 'ai.tutor · System prompt',
      pill: 'passo 3 / 4 · a promptar',
      headT: 'System prompt do agente',
      headSub: 'Gerado a partir do guião · revisável antes de publicar',
      tokens: '1 247',
      temp: '0,3',
      paragraphs: [
        {
          tag: '# ROLE',
          parts: [
            { t: 'És o ' },
            { t: 'Qualificador de Leads', strong: true },
            { t: ' da MagisaTech. O teu papel é conversar com leads industriais, perceber a dimensão da empresa, a dor principal e o orçamento — e atribuir uma ' },
            { t: 'pontuação de 0–10', strong: true },
            { t: '.' },
          ],
        },
        {
          tag: '# TOM',
          parts: [
            { t: 'Formal mas direto. Sem jargão. Faz ' },
            { t: 'uma pergunta de cada vez', em: true },
            { t: '. Nunca promete prazo nem cita preço — isso vai para a equipa comercial humana.' },
          ],
        },
        {
          tag: '# TOOLS',
          parts: [
            { t: 'crm_lookup(', },
            { t: 'nipc', code: true },
            { t: ') · nipc_enrich(' },
            { t: 'nipc', code: true },
            { t: ') · send_email(' },
            { t: 'lead', code: true },
            { t: ')' },
          ],
        },
        {
          tag: '# FLOW',
          parts: [
            { t: 'Sempre: 1) saúda, 2) pergunta o NIPC, 3) enriquece via tool, 4) faz as 5 perguntas de qualificação, 5) calcula a pontuação, 6) ' },
            { t: 'se pontuação ≥ 7 marca reunião', strong: true },
            { t: ', senão envia material.' },
          ],
        },
        {
          tag: '# STATUS',
          parts: [
            { t: '✓ Prompt gerado', ok: true },
            { t: ' · revisão do utilizador disponível.' },
          ],
          ok: true,
        },
      ],
    },
    s6: {
      topName: 'ai.tutor · Simulação',
      pill: 'passo 4 / 4 · a testar antes de publicar',
      chatT: 'Simulação · lead NPC vs o seu agente',
      scoreK: 'pontuação:',
      scoreV: '8,7',
      whoLead: 'lead simulado',
      whoAgent: 'o seu agente',
      msgs: [
        { parts: [{ t: 'Tenho uma indústria de embalagens, 80 colaboradores em Aveiro.' }] },
        { agent: true, parts: [{ t: 'Entendo. Exportam ou só mercado interno? Qual é o volume mensal?' }] },
        { parts: [{ t: '90% interno. Cerca de 1 200 encomendas/mês. Queríamos automatizar a triagem inicial.' }] },
        {
          agent: true,
          parts: [
            { t: 'Volume relevante. ' },
            { t: 'Qual é a maior dor hoje:', em: true },
            { t: ' tempo de resposta, perda de encomenda, ou qualificação?' },
          ],
        },
      ],
      sideTitle: 'controlos ao vivo',
      sliders: [
        ['temperatura', '0,42'],
        ['persona', 'formal'],
        ['profundidade técnica', 'média'],
      ],
      out: [
        ['resultado', 'Qualificado'],
        ['próxima ação', 'marcar reunião'],
      ],
      btnGhost: 'Refinar',
      btnPrimary: 'Aprovar →',
    },
    s7: {
      topName: 'ai.tutor · Tool Builder',
      pill: 'no-code · fluxo visual',
      blocksLabel: 'Blocos',
      blocks: ['Input', 'CRM lookup', 'Claude', 'Score Python', 'Output'],
      canvasT: 'Fluxo: Qualificador de Leads',
      canvasTag: 'snap-to-grid · ligações ao vivo',
      nodes: [
        { k: 'INPUT', t: 'NIPC + dor' },
        { k: 'TOOL', t: 'CRM lookup' },
        { k: 'LLM', t: 'claude-sonnet-4-6' },
        { k: 'PYTHON', t: 'pontuação 0–10' },
        { k: 'OUTPUT', t: 'encaminha comercial' },
      ],
      footK: 'DEPLOY READY',
      footV: '/apps/qualificador-leads-magisatech',
      footTag: 'válida para a empresa',
    },
    s8: {
      topName: 'modo formação · karaoke',
      pill: 'Tutor ai.t a ler em voz',
      title: 'Como ler bem um lead industrial',
      sub: 'karaoke word-by-word · gpt-4o-mini-tts',
      reading: 'A ler em voz alta...',
      karaoke: [
        'Um lead industrial bom',
        'tem NIPC ativo,',
        'CAE coerente,',
        'sócios estáveis',
        'e dor mensurável.',
        'Se faltar um,',
        'a pontuação cai',
        'e o agente',
        'pede mais contexto',
        'antes de encaminhar',
        '. Exemplo:',
        'embalagens com 80 colaboradores é média dimensão.',
      ],
      cite: 'Fonte 3, item 2.1',
      pills: ['Simples', 'Técnico', 'Exercício'],
    },
    s9: {
      topName: 'exercício · pontuação do lead',
      pill: 'Veredicto por Python',
      tag: 'Exercício',
      t: 'A calcular a pontuação',
      question: [
        { t: 'Lead com ' },
        { t: 'NIF ativo', strong: true },
        { t: ' (+2), ' },
        { t: '80 colaboradores', strong: true },
        { t: ' (+3), ' },
        { t: 'dor clara', strong: true },
        { t: ' (+3) e ' },
        { t: 'orçamento aprovado', strong: true },
        { t: ' (+1). Qual é a pontuação final?' },
      ],
      answer: '9',
      btnCheck: 'Verificar',
      btnEasier: 'Mais fácil',
      resultT: 'Correto · Pontuação: 9,2/10',
      resultQ: 'Python · 12ms',
      tutor: 'Bom: somaste os pesos certos. Python entrega o veredicto; o LLM só humaniza, não avalia.',
    },
    s10: {
      topName: 'ai.tutor · aplicação publicada',
      pill: 'ao vivo · em produção',
      badge: 'PUBLICADA',
      appName: 'Qualificador de Leads',
      appOrg: 'MagisaTech · Vendas B2B',
      copy: 'copiar',
      desc: 'Agente que conversa com leads industriais, enriquece o NIPC, faz 5 perguntas de qualificação e encaminha para o comercial humano se a pontuação ≥ 7.',
      statLabels: ['conversas hoje', 'leads qualificados', 'satisfação'],
      btns: ['Aceder à app →', 'Partilhar', 'Editar'],
      foot: [
        { t: 'Publicada em ' },
        { t: '2,3s', strong: true },
        { t: ' · v1 · standalone' },
      ],
    },
    s11: {
      topName: 'MagisaTech · RH',
      pill: '6 colaboradores · apps personalizadas',
      headT: 'Percurso Compliance RGPD · MagisaTech',
      headSub: 'cada colaborador sai com a sua própria app de IA',
      kpiLabels: ['apps publicadas', 'média do percurso', 'histórias gravadas'],
      staff: [
        { role: 'Gestora de RH', app: 'Triagem de candidatos' },
        { role: 'Faturação', app: 'Triagem de faturas' },
        { role: 'Compras', app: 'Cotação automática' },
        { role: 'TI', app: 'Help-desk N1' },
        { role: 'Jurídico', app: 'Revisor de contratos' },
        { role: 'Op. fábrica', app: 'Checklist de segurança' },
      ],
    },
  },
  en: {
    s1: {
      topName: 'ai.tutor · Single Sign-On',
      pill: 'learn.iconsai.ai',
      title: 'Sign in to the ecosystem',
      idLabel: 'SSN',
      idValue: '123-45-6789',
      smsLabel: 'SMS code',
      btn: 'Sign in via Identity Hub',
      foot: [
        { t: 'Identity Hub · ' },
        { t: 'MagisaTech', strong: true },
        { t: ' · one account, every app' },
      ],
    },
    s2: {
      topName: 'ai.tutor · My tracks',
      pill: 'ana.ribeiro · MagisaTech',
      tab1: 'Available areas',
      tab2: 'My published apps',
      outputsLabel: 'expected outputs',
      flowLabel: 'track microflow',
      foot: 'click another area to simulate the student context switch',
      cards: {
        stats: { title: 'Statistics', desc: '73 models with interactive lessons.' },
        python: { title: 'Python', desc: 'Notebooks and tutorials.' },
        finance: { title: 'Finance', desc: 'Models, projections, analysis.' },
        esg: { title: 'ESG', desc: 'Indicators and sustainability.' },
        comp: { title: 'Compliance', desc: 'Privacy, SOX, ISO.' },
        ia: { title: 'AI · Build my own application', desc: 'Tell your story. The AI builds the app.' },
        bi: { title: 'BI', desc: 'Dashboards and exploration.' },
        ops: { title: 'Operations', desc: 'Processes and internal SOPs.' },
      },
      details: {
        stats: {
          stage: 'active track · quantitative lab',
          owner: 'tutor ai.t',
          headline: 'live models → exercise → Python verdict',
          outputs: ['Interactive distributions', 'Guided hypothesis tests', 'Exercises with Python answer keys'],
          flow: ['Pick a model', 'Watch the visualization', 'Solve the exercise'],
          metrics: [['modules', '12'], ['exercises', '48'], ['retention', '87%']],
        },
        python: {
          stage: 'active track · hands-on environment',
          owner: 'tutor ai.t',
          headline: 'notebook → real execution → instant feedback',
          outputs: ['Executable notebooks', 'Step-by-step tutorials', 'Automatic grading'],
          flow: ['Read the problem', 'Run the code', 'Get the verdict'],
          metrics: [['tests', '156'], ['latency', '12ms']],
        },
        finance: {
          stage: 'active track · finance squad',
          owner: 'tutor ai.t',
          headline: 'projection → scenario → grounded decision',
          outputs: ['Projection models', 'Scenario analysis', 'Guided valuation'],
          flow: ['Set the assumption', 'Run the scenario', 'Compare results'],
          metrics: [['scenarios', '9'], ['assumptions', '24'], ['coverage', '92%']],
        },
        esg: {
          stage: 'active track · sustainability',
          owner: 'tutor ai.t',
          headline: 'indicator → target → action plan',
          outputs: ['Indicator panels', 'Auditable targets', 'Standardized reports'],
          flow: ['Measure the indicator', 'Set the target', 'Track the plan'],
          metrics: [['indicators', '31'], ['actions', '14'], ['engagement', '76%']],
        },
        comp: {
          stage: 'active track · governance',
          owner: 'legal + risk',
          headline: 'standard → checklist → compliance evidence',
          outputs: ['Privacy maps', 'SOX checklists', 'Audit trails'],
          flow: ['Read the standard', 'Apply the checklist', 'Produce the evidence'],
          metrics: [['standards', '8'], ['artifacts', '52'], ['adherence', '94%']],
        },
        ia: {
          stage: 'featured track · builder workspace',
          owner: 'you + ai.tutor',
          headline: 'story → script → prompt → simulation → published app',
          outputs: ['Personalized agent', 'Editable system prompt', 'Published app with a real URL'],
          flow: ['Tell the story', 'Review the script', 'Test and publish'],
          metrics: [['steps', '4'], ['avg time', '18min'], ['conversion', '91%']],
        },
        bi: {
          stage: 'active track · analytics studio',
          owner: 'tutor ai.t',
          headline: 'raw data → dashboard → actionable insight',
          outputs: ['Interactive dashboards', 'Guided exploration', 'Anomaly alerts'],
          flow: ['Connect the data', 'Build the panel', 'Read the insight'],
          metrics: [['panels', '17'], ['alerts', '6']],
        },
        ops: {
          stage: 'active track · process team',
          owner: 'tutor ai.t',
          headline: 'bottleneck → SOP → improvement simulation',
          outputs: ['Versioned SOPs', 'Process maps', 'Queue simulations'],
          flow: ['Map the bottleneck', 'Prioritize the action', 'Run the simulation'],
          metrics: [['processes', '23'], ['playbooks', '11'], ['bottlenecks', '4']],
        },
      },
    },
    s3: {
      topName: 'ai.tutor · Tell your story',
      pill: 'step 1 / 4 · recording',
      rec: 'REC · 00:14',
      liveLabel: 'live transcription',
      tag: 'claude-sonnet-4-6 · en-US',
      transcript: [
        { t: 'I' },
        { t: 'work' },
        { t: 'in' },
        { t: 'B2B sales', em: true },
        { t: 'in the' },
        { t: 'industrial sector.', em: true },
        { t: 'Every client' },
        { t: 'asks me' },
        { t: 'the same' },
        { t: '5 questions', em: true },
        { t: 'at the top of the funnel.' },
        { t: 'I wanted to' },
        { t: 'automate this', em: true },
        { t: 'to' },
        { t: 'qualify leads', em: true },
        { t: 'faster' },
      ],
      chips: ['B2B sales', 'industrial', 'qualification', 'leads', 'automation'],
    },
    s4: {
      topName: 'ai.tutor · Generating script',
      pill: 'step 2 / 4 · structuring',
      storyLabel: 'your story',
      quote: [
        { t: '“I work in ' },
        { t: 'B2B sales', em: true },
        { t: ' in the ' },
        { t: 'industrial sector', em: true },
        { t: '. Every client asks me the same ' },
        { t: '5 questions', em: true },
        { t: ' at the top of the funnel. I wanted to ' },
        { t: 'automate', em: true },
        { t: ' this to ' },
        { t: 'qualify leads', em: true },
        { t: ' faster.”' },
      ],
      scriptLabel: 'structured script',
      generating: 'Generating script...',
      lines: [
        { k: 'STORY', v: '→ Industrial B2B sales' },
        { k: 'AGENT NAME', v: '→ Lead Qualifier' },
        { k: 'TOOLS', v: '→ CRM lookup · EIN enrichment · Email' },
        { k: 'FLOW', flow: ['1. Greets', '2. Asks pain points', '3. Computes score', '4. Routes'] },
        { k: 'GUARDRAILS', v: '→ Never promises timelines · Never quotes price' },
        { k: 'STATUS', v: '→ Script generated', ok: true },
      ],
    },
    s5: {
      topName: 'ai.tutor · System prompt',
      pill: 'step 3 / 4 · prompting',
      headT: 'Agent system prompt',
      headSub: 'Generated from the script · reviewable before publishing',
      tokens: '1,247',
      temp: '0.3',
      paragraphs: [
        {
          tag: '# ROLE',
          parts: [
            { t: 'You are the ' },
            { t: 'Lead Qualifier', strong: true },
            { t: ' at MagisaTech. Your job is to talk to industrial leads, understand company size, the main pain and the budget — and assign a ' },
            { t: '0–10 score', strong: true },
            { t: '.' },
          ],
        },
        {
          tag: '# TONE',
          parts: [
            { t: 'Formal but direct. No jargon. Ask ' },
            { t: 'one question at a time', em: true },
            { t: '. Never promise timelines or quote price — that goes to the human sales team.' },
          ],
        },
        {
          tag: '# TOOLS',
          parts: [
            { t: 'crm_lookup(', },
            { t: 'ein', code: true },
            { t: ') · ein_enrich(' },
            { t: 'ein', code: true },
            { t: ') · send_email(' },
            { t: 'lead', code: true },
            { t: ')' },
          ],
        },
        {
          tag: '# FLOW',
          parts: [
            { t: 'Always: 1) greet, 2) ask for the EIN, 3) enrich via tool, 4) ask the 5 qualification questions, 5) compute the score, 6) ' },
            { t: 'if score ≥ 7 book a meeting', strong: true },
            { t: ', otherwise send material.' },
          ],
        },
        {
          tag: '# STATUS',
          parts: [
            { t: '✓ Prompt generated', ok: true },
            { t: ' · user review unlocked.' },
          ],
          ok: true,
        },
      ],
    },
    s6: {
      topName: 'ai.tutor · Simulation',
      pill: 'step 4 / 4 · testing before publishing',
      chatT: 'Simulation · NPC lead vs your agent',
      scoreK: 'score:',
      scoreV: '8.7',
      whoLead: 'simulated lead',
      whoAgent: 'your agent',
      msgs: [
        { parts: [{ t: 'I run a packaging plant, 80 employees in Akron, Ohio.' }] },
        { agent: true, parts: [{ t: 'Got it. Do you export or domestic only? What is your monthly volume?' }] },
        { parts: [{ t: '90% domestic. About 1,200 orders a month. We wanted to automate the initial triage.' }] },
        {
          agent: true,
          parts: [
            { t: 'Meaningful volume. ' },
            { t: 'What hurts most today:', em: true },
            { t: ' response time, lost orders, or qualification?' },
          ],
        },
      ],
      sideTitle: 'live controls',
      sliders: [
        ['temperature', '0.42'],
        ['persona', 'formal'],
        ['technical depth', 'medium'],
      ],
      out: [
        ['outcome', 'Qualified'],
        ['next action', 'book a meeting'],
      ],
      btnGhost: 'Refine',
      btnPrimary: 'Approve →',
    },
    s7: {
      topName: 'ai.tutor · Tool Builder',
      pill: 'no-code · visual flow',
      blocksLabel: 'Blocks',
      blocks: ['Input', 'CRM lookup', 'Claude', 'Python score', 'Output'],
      canvasT: 'Flow: Lead Qualifier',
      canvasTag: 'snap-to-grid · live connections',
      nodes: [
        { k: 'INPUT', t: 'EIN + pain' },
        { k: 'TOOL', t: 'CRM lookup' },
        { k: 'LLM', t: 'claude-sonnet-4-6' },
        { k: 'PYTHON', t: 'score 0–10' },
        { k: 'OUTPUT', t: 'routes to sales' },
      ],
      footK: 'DEPLOY READY',
      footV: '/apps/qualificador-leads-magisatech',
      footTag: 'valid for the company',
    },
    s8: {
      topName: 'training mode · karaoke',
      pill: 'Tutor ai.t reading aloud',
      title: 'How to read an industrial lead well',
      sub: 'word-by-word karaoke · gpt-4o-mini-tts',
      reading: 'Reading aloud...',
      karaoke: [
        'A good industrial lead',
        'has an active EIN,',
        'a coherent NAICS code,',
        'stable ownership',
        'and a measurable pain.',
        'If one is missing,',
        'the score drops',
        'and the agent',
        'asks for more context',
        'before routing',
        '. Example:',
        'packaging with 80 employees is mid-size.',
      ],
      cite: 'Source 3, item 2.1',
      pills: ['Simple', 'Technical', 'Exercise'],
    },
    s9: {
      topName: 'exercise · lead score',
      pill: 'Python verdict',
      tag: 'Exercise',
      t: 'Computing the score',
      question: [
        { t: 'Lead with an active ' },
        { t: 'EIN', strong: true },
        { t: ' (+2), ' },
        { t: '80 employees', strong: true },
        { t: ' (+3), a ' },
        { t: 'clear pain', strong: true },
        { t: ' (+3) and ' },
        { t: 'approved budget', strong: true },
        { t: ' (+1). What is the final score?' },
      ],
      answer: '9',
      btnCheck: 'Check',
      btnEasier: 'Easier',
      resultT: 'Correct · Score: 9.2/10',
      resultQ: 'Python · 12ms',
      tutor: 'Nice: you added the right weights. Python delivers the verdict; the LLM only humanizes, it does not grade.',
    },
    s10: {
      topName: 'ai.tutor · app published',
      pill: 'live · in production',
      badge: 'PUBLISHED',
      appName: 'Lead Qualifier',
      appOrg: 'MagisaTech · B2B Sales',
      copy: 'copy',
      desc: 'An agent that talks to industrial leads, enriches the EIN, asks 5 qualification questions and routes to a human salesperson if the score is ≥ 7.',
      statLabels: ['conversations today', 'qualified leads', 'satisfaction'],
      btns: ['Open app →', 'Share', 'Edit'],
      foot: [
        { t: 'Published in ' },
        { t: '2.3s', strong: true },
        { t: ' · v1 · standalone' },
      ],
    },
    s11: {
      topName: 'MagisaTech · HR',
      pill: '6 employees · personalized apps',
      headT: 'Privacy Compliance Track · MagisaTech',
      headSub: 'every employee walks out with their own AI app',
      kpiLabels: ['published apps', 'track average', 'stories recorded'],
      staff: [
        { role: 'HR Manager', app: 'Candidate screening' },
        { role: 'Tax', app: 'Invoice triage' },
        { role: 'Procurement', app: 'Automated quoting' },
        { role: 'IT', app: 'Tier-1 help desk' },
        { role: 'Legal', app: 'Contract reviewer' },
        { role: 'Plant ops', app: 'OSHA checklist' },
      ],
    },
  },
}
