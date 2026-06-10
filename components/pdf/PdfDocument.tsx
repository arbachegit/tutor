'use client'

import type { LangId } from '@/i18n/strings'

const SECTIONS: Record<LangId, {
  docType: string
  coverTag: string
  s1: { t: string; p: string }
  s2: { t: string; p: string }
  s3: { t: string; p: string }
  s4: { t: string; p: string }
  s5: { t: string; p: string }
  s6: { t: string; p: string }
  closing: { thanks: string; available: string }
}> = {
  'pt-BR': {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'Construtor de apps de IA por voz',
    s1: {
      t: 'Login unico e Dashboard',
      p: 'O ai.tutor opera sobre o Identity Hub da iconsai: CPF + SMS OTP via Infobip, sem senha, sem cadastro duplicado. O dashboard apresenta oito areas de conhecimento com progresso individual. O destaque e a trilha "IA: construir minha aplicacao", onde cada colaborador conta sua historia de trabalho e sai com um app de IA publicado.',
    },
    s2: {
      t: 'Storytelling por voz e Script IA',
      p: 'O colaborador grava um relato natural sobre seu trabalho e o problema que quer resolver. A IA transcreve em tempo real com Claude Sonnet 4.6 e extrai palavras-chave. Do audio nasce um script estruturado: nome do agente, ferramentas, fluxo de conversa e guardrails. Tudo visivel para revisao antes de avancar.',
    },
    s3: {
      t: 'System Prompt e Simulacao',
      p: 'O script gera um system prompt completo (modelo Claude Sonnet 4.6, temperatura 0.3). O aluno pode editar antes de publicar. A simulacao coloca o agente contra um lead simulado pela IA, com score ao vivo e controles de temperatura, persona e profundidade tecnica.',
    },
    s4: {
      t: 'Tool Builder e Deploy',
      p: 'O fluxo visual mostra cinco blocos no-code: input, CRM lookup, Claude, score Python e output. Cada conexao aparece ao vivo. O deploy gera uma URL real em apps.iconsai.ai, pronta para uso pela empresa.',
    },
    s5: {
      t: 'Treinamento e Exercicios',
      p: 'Modo karaoke word-by-word com TTS da OpenAI: cada palavra acende no ritmo da leitura. Tres niveis de profundidade (simples, tecnico, exercicio). Exercicios com veredito por Python: o grader.py roda os testes e devolve pass/fail com tempo de execucao.',
    },
    s6: {
      t: 'Publicacao e Visao RH',
      p: 'O climax: a aplicacao e publicada com URL real, metricas de uso (conversas, leads qualificados, satisfacao) e versao. A visao RH mostra a trilha completa da empresa com progresso por colaborador e apps publicadas.',
    },
    closing: {
      thanks: 'Obrigado.',
      available: 'Apresentacao disponivel em',
    },
  },
  'pt-PT': {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'Construtor de apps de IA por voz',
    s1: {
      t: 'Login unico e Dashboard',
      p: 'O ai.tutor opera sobre o Identity Hub da iconsai: CPF + SMS OTP via Infobip, sem palavra-passe, sem registo duplicado. O dashboard apresenta oito areas de conhecimento com progresso individual. O destaque e a trilha "IA: construir a minha aplicacao", onde cada colaborador conta a sua historia de trabalho e sai com uma app de IA publicada.',
    },
    s2: {
      t: 'Storytelling por voz e Script IA',
      p: 'O colaborador grava um relato natural sobre o seu trabalho e o problema que pretende resolver. A IA transcreve em tempo real com Claude Sonnet 4.6 e extrai palavras-chave. Do audio nasce um guiao estruturado: nome do agente, ferramentas, fluxo de conversa e guardrails. Tudo visivel para revisao antes de avancar.',
    },
    s3: {
      t: 'System Prompt e Simulacao',
      p: 'O guiao gera um system prompt completo (modelo Claude Sonnet 4.6, temperatura 0.3). O aluno pode editar antes de publicar. A simulacao coloca o agente contra um lead simulado pela IA, com score ao vivo e controlos de temperatura, persona e profundidade tecnica.',
    },
    s4: {
      t: 'Tool Builder e Deploy',
      p: 'O fluxo visual mostra cinco blocos no-code: input, CRM lookup, Claude, score Python e output. Cada ligacao aparece ao vivo. O deploy gera um URL real em apps.iconsai.ai, pronto para utilizacao pela empresa.',
    },
    s5: {
      t: 'Formacao e Exercicios',
      p: 'Modo karaoke word-by-word com TTS da OpenAI: cada palavra acende ao ritmo da leitura. Tres niveis de profundidade (simples, tecnico, exercicio). Exercicios com veredito por Python: o grader.py executa os testes e devolve pass/fail com tempo de execucao.',
    },
    s6: {
      t: 'Publicacao e Visao RH',
      p: 'O climax: a aplicacao e publicada com URL real, metricas de utilizacao (conversas, leads qualificados, satisfacao) e versao. A visao RH mostra a trilha completa da empresa com progresso por colaborador e apps publicadas.',
    },
    closing: {
      thanks: 'Obrigado.',
      available: 'Apresentacao disponivel em',
    },
  },
  en: {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'AI app builder by voice',
    s1: {
      t: 'Single Sign-On and Dashboard',
      p: 'ai.tutor runs on the iconsai Identity Hub: CPF + SMS OTP via Infobip, no password, no duplicate registration. The dashboard shows eight knowledge areas with individual progress. The highlight is the "AI: build my application" track, where each employee tells their work story and walks out with a published AI app.',
    },
    s2: {
      t: 'Voice Storytelling and AI Script',
      p: 'The employee records a natural account of their work and the problem they want to solve. The AI transcribes in real time with Claude Sonnet 4.6 and extracts keywords. From the audio, a structured script is born: agent name, tools, conversation flow, and guardrails. Everything visible for review before moving on.',
    },
    s3: {
      t: 'System Prompt and Simulation',
      p: 'The script generates a complete system prompt (Claude Sonnet 4.6, temperature 0.3). The student can edit before publishing. The simulation pits the agent against an AI-simulated lead, with live scoring and controls for temperature, persona, and technical depth.',
    },
    s4: {
      t: 'Tool Builder and Deploy',
      p: 'The visual flow shows five no-code blocks: input, CRM lookup, Claude, Python score, and output. Each connection appears live. Deployment generates a real URL at apps.iconsai.ai, ready for use by the company.',
    },
    s5: {
      t: 'Training and Exercises',
      p: 'Karaoke mode with word-by-word TTS from OpenAI: each word lights up in reading rhythm. Three depth levels (simple, technical, exercise). Exercises with Python verdicts: grader.py runs the tests and returns pass/fail with execution time.',
    },
    s6: {
      t: 'Publishing and HR View',
      p: 'The climax: the application is published with a real URL, usage metrics (conversations, qualified leads, satisfaction), and version. The HR view shows the complete company track with per-employee progress and published apps.',
    },
    closing: {
      thanks: 'Thank you.',
      available: 'Presentation available at',
    },
  },
}

export function PdfDocument({ lang }: { lang: LangId }) {
  const s = SECTIONS[lang]
  const sections = [s.s1, s.s2, s.s3, s.s4, s.s5, s.s6]

  return (
    <div className="pdf-doc">
      {/* Cover page */}
      <div className="pdf-page pdf-cover">
        <div className="pdf-cover-inner">
          <span className="pdf-cover-type">{s.docType}</span>
          <h1 className="pdf-cover-title">
            <span className="pdf-cover-i">i</span>
            <span className="pdf-cover-cons">cons</span>
            <span className="pdf-cover-ai">.ai</span>
          </h1>
          <h2 className="pdf-cover-product">ai.tutor</h2>
          <p className="pdf-cover-tag">{s.coverTag}</p>
          <p className="pdf-cover-url">iconsai.ai/tutor</p>
        </div>
      </div>

      {/* Body pages */}
      {sections.map((sec, i) => (
        <div key={i} className="pdf-page pdf-body">
          <div className="pdf-head">
            <span className="pdf-head-brand">
              <span style={{ color: '#f97316' }}>i</span>cons<span style={{ color: '#ef4444' }}>.ai</span>
              {' '}<span style={{ opacity: 0.4 }}>·</span>{' '}tutor
            </span>
            <span className="pdf-head-num">{String(i + 2).padStart(2, '0')}</span>
          </div>
          <h2 className="pdf-section-title">{sec.t}</h2>
          <p className="pdf-section-body">{sec.p}</p>
        </div>
      ))}

      {/* Closing page */}
      <div className="pdf-page pdf-closing">
        <div className="pdf-closing-inner">
          <h2 className="pdf-closing-thanks">{s.closing.thanks}</h2>
          <p className="pdf-closing-brand">
            <span style={{ color: '#f97316' }}>i</span>
            <span>cons</span>
            <span style={{ color: '#ef4444' }}>.ai</span>
          </p>
          <p className="pdf-closing-avail">{s.closing.available}</p>
          <p className="pdf-closing-url">iconsai.ai/tutor</p>
          <p className="pdf-closing-legal">&copy; 2026 IconsAI &middot; Kendall Square &middot; CIC &middot; Cambridge, MA &middot; MIT &middot; Harvard</p>
        </div>
      </div>
    </div>
  )
}
