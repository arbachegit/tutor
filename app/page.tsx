'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { SlideEngine, useSlideContext } from '@/components/SlideEngine'
import { Slide } from '@/components/Slide'
import { AudioController } from '@/components/AudioController'
import { PdfDocument } from '@/components/pdf/PdfDocument'
import { STRINGS, type LangId } from '@/i18n/strings'

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS / DATA
   ═══════════════════════════════════════════════════════════════════ */

const TOTAL_SLIDES = 13

const URLS: { host: string; path: string }[] = [
  { host: 'learn.iconsai.ai', path: '/login' },
  { host: 'learn.iconsai.ai', path: '/dashboard' },
  { host: 'learn.iconsai.ai', path: '/build/story' },
  { host: 'learn.iconsai.ai', path: '/build/script' },
  { host: 'learn.iconsai.ai', path: '/build/prompt' },
  { host: 'learn.iconsai.ai', path: '/build/simulate' },
  { host: 'learn.iconsai.ai', path: '/build/flow' },
  { host: 'learn.iconsai.ai', path: '/training/lead-reading' },
  { host: 'learn.iconsai.ai', path: '/training/lead-reading/exercise' },
  { host: 'apps.iconsai.ai', path: '/qualificador-leads-magisatech' },
  { host: 'learn.iconsai.ai', path: '/company/magisatech/lgpd' },
]

const STUDENT_CARDS: {
  id: string; title: string; desc: string; accent: string; glyph: string; pct: number; highlight?: boolean
}[] = [
  { id: 'stats', title: 'Estatística', desc: '73 modelos com aulas interativas.', accent: '#22d3ee', glyph: 'σ', pct: 67 },
  { id: 'python', title: 'Python', desc: 'Notebooks e tutoriais.', accent: '#b88d06', glyph: '>_', pct: 73 },
  { id: 'finance', title: 'Finanças', desc: 'Modelos, projeções, análise.', accent: '#14b8a6', glyph: '$', pct: 38 },
  { id: 'esg', title: 'ESG', desc: 'Indicadores e sustentabilidade.', accent: '#1daa51', glyph: '◐', pct: 55 },
  { id: 'comp', title: 'Compliance', desc: 'LGPD, SOX, ISO.', accent: '#3b82f6', glyph: '§', pct: 49 },
  { id: 'ia', title: 'IA · Construir minha aplicação', desc: 'Conte sua história. A IA cria a app.', accent: '#a855f7', glyph: '*', pct: 0, highlight: true },
  { id: 'bi', title: 'BI', desc: 'Dashboards e exploração.', accent: '#ec4899', glyph: '▦', pct: 22 },
  { id: 'ops', title: 'Operações', desc: 'Processos e SOPs internas.', accent: '#fb923c', glyph: 'Op', pct: 41 },
]

type StudentCardId = (typeof STUDENT_CARDS)[number]['id']

const STUDENT_CARD_DETAILS: Record<StudentCardId, {
  stage: string; owner: string; headline: string
  outputs: string[]; flow: string[]; metrics: [string, string][]
}> = {
  stats: {
    stage: 'trilha ativa · estatística', owner: 'laboratório quantitativo',
    headline: 'Modelos guiados, variáveis explicadas e exercícios graduais com feedback automático.',
    outputs: ['aulas interativas', 'simulações', 'datasets'],
    flow: ['Escolhe modelo', 'Assiste visualização', 'Resolve exercício'],
    metrics: [['módulos', '73'], ['exercícios', '214'], ['retenção', '82%']],
  },
  python: {
    stage: 'trilha ativa · python', owner: 'ambiente prático',
    headline: 'Notebooks curtos com inputs reais, validação por teste e comparação entre solução humana e agent.',
    outputs: ['notebooks', 'grader', 'snippets'],
    flow: ['Lê problema', 'Executa código', 'Recebe veredito'],
    metrics: [['notebooks', '18'], ['tests', '96'], ['latência', '14ms']],
  },
  finance: {
    stage: 'trilha ativa · finanças', owner: 'squad financeiro',
    headline: 'Projeções, cenários e agentes que explicam impacto de caixa para usuário não técnico.',
    outputs: ['cenários', 'dashboards', 'planos'],
    flow: ['Seleciona cenário', 'Ajusta premissas', 'Publica visão executiva'],
    metrics: [['cenários', '12'], ['premissas', '48'], ['cobertura', '91%']],
  },
  esg: {
    stage: 'trilha ativa · esg', owner: 'governança',
    headline: 'Indicadores ambientais e sociais cruzados com storytelling para apresentação a conselho.',
    outputs: ['indicadores', 'narrativas', 'planos de ação'],
    flow: ['Importa indicador', 'Analisa risco', 'Compartilha plano'],
    metrics: [['indicadores', '64'], ['ações', '23'], ['engajamento', '76%']],
  },
  comp: {
    stage: 'trilha ativa · compliance', owner: 'jurídico + risco',
    headline: 'Trilhas de LGPD, SOX e ISO com evidência versionada e app final por colaborador.',
    outputs: ['checklists', 'políticas', 'apps internas'],
    flow: ['Escolhe norma', 'Conta processo', 'Publica agente'],
    metrics: [['normas', '9'], ['artefatos', '38'], ['aderência', '88%']],
  },
  ia: {
    stage: 'trilha ativa · construir minha aplicação', owner: 'builder workspace',
    headline: 'Fluxo completo de história → script → prompt → simulação → app publicada, sem sair da plataforma.',
    outputs: ['script', 'prompt', 'app publicada'],
    flow: ['Conta a história', 'Refina o agent', 'Publica o app'],
    metrics: [['passos', '4'], ['tempo médio', '7 min'], ['conversão', '63%']],
  },
  bi: {
    stage: 'trilha ativa · BI', owner: 'analytics studio',
    headline: 'Dashboards navegáveis com explicação em linguagem natural para cada insight crítico.',
    outputs: ['dashboards', 'insights', 'alertas'],
    flow: ['Escolhe base', 'Explora insight', 'Compartilha painel'],
    metrics: [['dashboards', '11'], ['insights', '57'], ['alertas', '19']],
  },
  ops: {
    stage: 'trilha ativa · operações', owner: 'time de processos',
    headline: 'SOPs, fluxos e simulações de gargalo para times de fábrica, logística e atendimento.',
    outputs: ['SOPs', 'playbooks', 'simulações'],
    flow: ['Mapeia gargalo', 'Prioriza ação', 'Roda simulação'],
    metrics: [['processos', '31'], ['playbooks', '17'], ['gargalos', '8']],
  },
}

const STAFF: { name: string; role: string; pct: number; app: string }[] = [
  { name: 'Ana Ribeiro', role: 'Gestor RH', pct: 100, app: 'Triagem de candidatos' },
  { name: 'Bruno Castanho', role: 'Fiscal', pct: 85, app: 'Triagem de NF fiscal' },
  { name: 'Camila Duarte', role: 'Compras', pct: 100, app: 'Cotação automática' },
  { name: 'Diego Marques', role: 'TI', pct: 60, app: 'Help-desk N1' },
  { name: 'Elisa Andrade', role: 'Jurídico', pct: 72, app: 'Revisor de contratos' },
  { name: 'Felipe Souza', role: 'Op. fábrica', pct: 32, app: 'Checklist NR-12' },
]

/* ═══════════════════════════════════════════════════════════════════
   SMALL HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function Topbar({ role, name, pillText, pillKind }: {
  role: 'student' | 'corp'; name: string; pillText: string
  pillKind: 'cy' | 'or' | 'gn' | 'pr'
}) {
  const pillClass = pillKind === 'or' ? 'ait-pill--corp'
    : pillKind === 'gn' ? 'ait-pill--gn'
    : pillKind === 'pr' ? 'ait-pill--pr' : ''
  const markClass = role === 'corp' ? 'ait-brand-mark--corp' : ''
  return (
    <div className="ait-topbar">
      <div className="ait-brand">
        <span className={`ait-brand-mark ${markClass}`}>{role === 'corp' ? 'RH' : 'i.ai'}</span>
        <span className="ait-brand-sep" />
        <span className="ait-brand-name" dangerouslySetInnerHTML={{ __html: name }} />
      </div>
      <span className={`ait-pill ${pillClass}`} dangerouslySetInnerHTML={{ __html: pillText }} />
    </div>
  )
}

function MiniChrome({ host, path }: { host: string; path: string }) {
  return (
    <div className="ait-chrome ait-chrome--mini">
      <div className="ait-chrome-dots"><span /><span /><span /></div>
      <div className="ait-url-wrap">
        <div className="u-scene is-visible">
          <svg className="u-lock" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="u-host">{host}</span>
          <span className="u-path">{path}</span>
        </div>
      </div>
    </div>
  )
}

function Icon({ name }: { name: 'book' | 'settings' }) {
  if (name === 'book') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/** Wrap each scene in MiniChrome + Topbar. */
function SceneFrame({ urlIndex, children }: { urlIndex: number; children: ReactNode }) {
  const url = URLS[urlIndex]
  return (
    <div className="ait-cinema">
      <MiniChrome host={url.host} path={url.path} />
      <div className="ait-stage-area">{children}</div>
    </div>
  )
}

/** On-screen explanation aside (§6.4). 3-zone vertical layout: top (kicker+title), mid (body), bot (KPIs or slide index). */
function ExplainAside({ slideKey, lang, slideIndex }: { slideKey: string; lang: LangId; slideIndex: number }) {
  const s = STRINGS[lang][slideKey]
  if (!s) return null
  const kpis: [string, string][] = []
  for (let i = 1; i <= 4; i++) {
    const v = s[`kpi${i}v`], k = s[`kpi${i}k`]
    if (v && k) kpis.push([v, k])
  }
  const idx = String(slideIndex).padStart(2, '0')
  return (
    <aside className="ait-explain a d2">
      <div className="ait-explain-top">
        {s.kicker && <span className="ait-explain-kicker">{s.kicker}</span>}
        {s.title && <h3 className="ait-explain-title">{s.title}</h3>}
      </div>
      <div className="ait-explain-mid">
        {s.body && <p className="ait-explain-body">{s.body}</p>}
      </div>
      <div className="ait-explain-bot">
        {kpis.length > 0 ? (
          <div className="ait-explain-kpis">
            {kpis.map(([v, k]) => (
              <div key={k} className="ait-explain-kpi">
                <span className="ait-explain-kpi-v">{v}</span>
                <span className="ait-explain-kpi-k">{k}</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className="ait-explain-rule" aria-hidden="true" />
            <span className="ait-explain-idx" aria-hidden="true">{idx}</span>
          </>
        )}
      </div>
    </aside>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CHROME — canonical components rendered inside SlideEngine context
   ═══════════════════════════════════════════════════════════════════ */

function Chrome({ lang, setLang }: { lang: LangId; setLang: (l: LangId) => void }) {
  const { currentSlide, totalSlides, goTo } = useSlideContext()
  const s = STRINGS[lang]

  const nn = String(currentSlide + 1).padStart(2, '0')
  const tt = String(totalSlides).padStart(2, '0')
  const progressWidth = totalSlides > 1
    ? `${(currentSlide / (totalSlides - 1)) * 100}%`
    : '0%'

  return (
    <>
      {/* Logo top-left */}
      <a className="logo-fixed" href="https://iconsai.ai" target="_blank" rel="noopener noreferrer">
        <span className="logo-i">i</span>
        <span className="logo-cons">cons</span>
        <span className="logo-ai">.ai</span>
      </a>

      {/* Header center — project name */}
      <header className="slide-head">
        <span className="slide-head__kicker">{s.chrome?.kicker ?? 'SHOWCASE'}</span>
        <span className="slide-head__name">{s.chrome?.name ?? 'tutor'}</span>
      </header>

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: progressWidth }} />

      {/* Nav arrows — both in bottom-left */}
      <div className="slide-nav">
        <button
          className="slide-nav__btn"
          aria-label="Slide anterior"
          disabled={currentSlide === 0}
          onClick={() => goTo(currentSlide - 1)}
        >
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          className="slide-nav__btn"
          aria-label="Próximo slide"
          disabled={currentSlide === totalSlides - 1}
          onClick={() => goTo(currentSlide + 1)}
        >
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Counter — bottom-right */}
      <div className="slide-counter">
        <span>{nn}</span> / {tt}
      </div>

      {/* Footer center — brand mark */}
      <footer className="slide-foot">
        <a className="logo-foot" href="https://iconsai.ai" target="_blank" rel="noopener noreferrer">
          <span className="logo-i">i</span>
          <span className="logo-cons">cons</span>
          <span className="logo-ai">.ai</span>
        </a>
        <span className="slide-foot__legal">
          {s.chrome?.legal?.replace(/\*/g, '\u00B7') ?? '© 2026 IconsAI · Kendall Square · CIC · Cambridge, MA · MIT · Harvard'}
        </span>
      </footer>

      {/* Audio dock — top-right */}
      <AudioController lang={lang} setLang={setLang} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 0 — Opening
   ═══════════════════════════════════════════════════════════════════ */

function SlideOpening({ lang }: { lang: LangId }) {
  const s = STRINGS[lang].s0 ?? {}
  return (
    <Slide index={0}>
      <section className="ait-opening" aria-label="Opening">
        <div className="ait-op-kicker a d1">
          <span className="ait-op-dot" /> {s.kicker ?? 'AI.TUTOR'}
        </div>
        <h1 className="ait-op-wordmark a d2">ai.tutor</h1>
        <div className="ait-op-quotes a d3" aria-hidden="true">
          <p className="ait-op-q ait-op-q--1">
            <span className="tw">{s.q1}</span>
          </p>
          <p className="ait-op-q ait-op-q--2">
            <span className="tw">{s.q2}</span>
          </p>
          <p className="ait-op-q ait-op-q--3">
            <span className="tw">{s.q3}</span>
          </p>
          <p className="ait-op-q ait-op-q--4">
            <span className="tw">{s.q4}</span>
          </p>
        </div>
        <div className="ait-op-closer a d7" aria-hidden="true">
          <p>
            {s.closer}<br />
            <strong>{s.closerStrong}</strong>
          </p>
        </div>
      </section>
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 1 — Login SSO
   ═══════════════════════════════════════════════════════════════════ */

function SlideLogin({ lang }: { lang: LangId }) {
  return (
    <Slide index={1}>
      <SceneFrame urlIndex={0}>
        <article className="ait-scene ait-scene--s1 a">
          <Topbar role="student" name="ai.tutor · Login Único" pillKind="cy" pillText="learn.iconsai.ai" />
          <div className="ait-login">
            <div className="ait-login-card d1">
              <div className="ait-login-head">
                <span className="ait-login-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div className="ait-login-title">Entrar no ecossistema</div>
              </div>
              <div className="ait-field"><label className="ait-field-label">CPF</label><div className="ait-field-input">123.456.789-00</div></div>
              <div className="ait-field">
                <label className="ait-field-label">Código SMS</label>
                <div className="ait-field-input ait-field-input--typing">
                  <span className="ait-otp"><i>4</i><i>8</i><i>2</i><i>1</i><i>5</i><i className="ait-otp-cur">9</i></span>
                </div>
              </div>
              <button className="ait-login-btn" type="button">Entrar via Identity Hub</button>
              <div className="ait-sso-ring d2">
                <span className="ait-sso-node ait-sso-node--a">tutor</span>
                <span className="ait-sso-node ait-sso-node--b">stats</span>
                <span className="ait-sso-node ait-sso-node--c">python</span>
                <span className="ait-sso-node ait-sso-node--d">esg</span>
                <span className="ait-sso-line" />
              </div>
              <div className="ait-login-foot">Identity Hub · <strong>MagisaTech</strong> · 1 conta, todos os apps</div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s1" lang={lang} slideIndex={1} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 2 — Dashboard 8 areas
   ═══════════════════════════════════════════════════════════════════ */

function SlideDashboard({ lang }: { lang: LangId }) {
  const [selected, setSelected] = useState<StudentCardId>('ia')
  const card = STUDENT_CARDS.find((c) => c.id === selected) ?? STUDENT_CARDS[0]
  const detail = STUDENT_CARD_DETAILS[selected]
  return (
    <Slide index={2}>
      <SceneFrame urlIndex={1}>
        <article className="ait-scene ait-scene--s2 a">
          <Topbar role="student" name="ai.tutor · Minhas trilhas" pillKind="cy" pillText="ana.ribeiro · MagisaTech" />
          <div className="ait-tabs d1">
            <span className="ait-tab ait-tab--on"><Icon name="book" /> Áreas disponíveis</span>
            <span className="ait-tab"><Icon name="settings" /> Minhas apps publicadas</span>
          </div>
          <div className="ait-cards-shell d2">
            <div className="ait-cards ait-cards-grid">
              {STUDENT_CARDS.map((c) => {
                const isSelected = c.id === selected
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`ait-card ait-card-button ${c.highlight ? 'ait-card--hl' : ''}${isSelected ? ' ait-card--selected' : ''}`}
                    style={{ ['--accent' as string]: c.accent, ['--pct' as string]: `${c.pct}%` } as CSSProperties}
                    onClick={() => setSelected(c.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="ait-card-glow" />
                    <div className="ait-card-ic" aria-hidden="true">{c.glyph}</div>
                    <div className="ait-card-title">{c.title}</div>
                    <div className="ait-card-desc">{c.desc}</div>
                    <div className="ait-card-foot">
                      <div className="ait-bar"><div className="ait-bar-fill" /></div>
                      <span className="ait-card-pct">{c.pct}%</span>
                    </div>
                    {c.highlight && <div className="ait-card-cursor" aria-hidden="true" />}
                  </button>
                )
              })}
            </div>
            <aside className="ait-track-preview" style={{ ['--accent' as string]: card.accent } as CSSProperties}>
              <div className="ait-track-preview-head">
                <span className="ait-track-preview-kicker">{detail.stage}</span>
                <span className="ait-track-preview-owner">{detail.owner}</span>
              </div>
              <div className="ait-track-preview-title">{card.title}</div>
              <p className="ait-track-preview-copy">{detail.headline}</p>
              <div className="ait-track-preview-stats">
                {detail.metrics.map(([label, value]) => (
                  <div key={label} className="ait-track-stat">
                    <span>{label}</span><strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="ait-track-preview-block">
                <div className="ait-track-preview-label">outputs esperados</div>
                <div className="ait-track-preview-chips">
                  {detail.outputs.map((item) => <span key={item} className="ait-track-chip">{item}</span>)}
                </div>
              </div>
              <div className="ait-track-preview-block">
                <div className="ait-track-preview-label">microfluxo da trilha</div>
                <div className="ait-track-flow">
                  {detail.flow.map((item, idx) => (
                    <div key={item} className="ait-track-flow-row">
                      <span className="ait-track-flow-step">{idx + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ait-track-preview-foot">
                <span className="ait-track-preview-live-dot" />
                clique em outra área para simular a troca de contexto do aluno
              </div>
            </aside>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s2" lang={lang} slideIndex={2} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 3 — Storytelling voice
   ═══════════════════════════════════════════════════════════════════ */

function SlideStory({ lang }: { lang: LangId }) {
  return (
    <Slide index={3}>
      <SceneFrame urlIndex={2}>
        <article className="ait-scene ait-scene--s3 a">
          <Topbar role="student" name="ai.tutor · Conte sua história" pillKind="pr" pillText="passo 1 / 4 · gravando" />
          <div className="ait-story d1">
            <div className="ait-story-left">
              <div className="ait-story-mic-wrap">
                <div className="ait-story-mic-halo" />
                <div className="ait-story-mic-halo ait-story-mic-halo--2" />
                <div className="ait-story-mic-halo ait-story-mic-halo--3" />
                <div className="ait-story-mic">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
              </div>
              <div className="ait-story-wave" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => <i key={i} />)}
              </div>
              <div className="ait-story-rec"><span className="ait-story-rec-dot" /> REC · 00:14</div>
            </div>
            <div className="ait-story-right">
              <div className="ait-story-h">
                <span className="ait-story-h-k">transcrição ao vivo</span>
                <span className="ait-story-h-tag">claude-sonnet-4-6 · pt-BR</span>
              </div>
              <div className="ait-story-transcript">
                <span className="st w1">Eu</span>{' '}<span className="st w2">trabalho</span>{' '}<span className="st w3">com</span>{' '}
                <span className="st w4 st--em">vendas B2B</span>{' '}<span className="st w5">no setor</span>{' '}
                <span className="st w6 st--em">industrial</span>.{' '}<span className="st w7">Cada cliente</span>{' '}
                <span className="st w8">me faz</span>{' '}<span className="st w9">as mesmas</span>{' '}
                <span className="st w10 st--em">5 perguntas</span>{' '}<span className="st w11">no início do funil.</span>{' '}
                <span className="st w12">Queria</span>{' '}<span className="st w13 st--em">automatizar isso</span>{' '}
                <span className="st w14">pra</span>{' '}<span className="st w15 st--em">qualificar leads</span>{' '}
                <span className="st w16">mais rápido</span>...<span className="st-cursor" />
              </div>
              <div className="ait-story-chips d2">
                <span className="ait-story-chip ait-story-chip--c1">vendas B2B</span>
                <span className="ait-story-chip ait-story-chip--c2">industrial</span>
                <span className="ait-story-chip ait-story-chip--c3">qualificação</span>
                <span className="ait-story-chip ait-story-chip--c4">leads</span>
                <span className="ait-story-chip ait-story-chip--c5">automação</span>
              </div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s3" lang={lang} slideIndex={3} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 4 — Script generation
   ═══════════════════════════════════════════════════════════════════ */

function SlideScript({ lang }: { lang: LangId }) {
  return (
    <Slide index={4}>
      <SceneFrame urlIndex={3}>
        <article className="ait-scene ait-scene--s4 a">
          <Topbar role="student" name="ai.tutor · Gerando script" pillKind="pr" pillText="passo 2 / 4 · estruturando" />
          <div className="ait-script d1">
            <div className="ait-script-left">
              <div className="ait-script-h"><span className="ait-script-h-k">sua história</span></div>
              <div className="ait-script-quote">
                &ldquo;Eu trabalho com <em>vendas B2B</em> no setor <em>industrial</em>. Cada cliente me faz as mesmas <em>5 perguntas</em> no início do funil. Queria <em>automatizar</em> isso pra <em>qualificar leads</em> mais rápido...&rdquo;
              </div>
            </div>
            <div className="ait-script-right">
              <div className="ait-script-h">
                <span className="ait-script-h-k">script estruturado</span>
                <span className="ait-script-h-stat"><span className="ait-script-h-dot" /> Generating script...</span>
              </div>
              <div className="ait-script-doc">
                <div className="ait-script-line d2"><span className="sk">STORY</span><span className="sv">→ Vendas B2B industrial</span></div>
                <div className="ait-script-line d3"><span className="sk">AGENT NAME</span><span className="sv">→ Qualificador de Leads</span></div>
                <div className="ait-script-line d4"><span className="sk">TOOLS</span><span className="sv">→ CRM lookup · CNPJ enrichment · Email</span></div>
                <div className="ait-script-line d5">
                  <span className="sk">FLOW</span>
                  <span className="sv">
                    <span className="sf">1. Saúda</span><span className="sf">2. Pergunta pain points</span>
                    <span className="sf">3. Calcula score</span><span className="sf">4. Roteia</span>
                  </span>
                </div>
                <div className="ait-script-line d6"><span className="sk">GUARDRAILS</span><span className="sv">→ Não promete prazo · Não cita preço</span></div>
                <div className="ait-script-line ait-script-line--ok d7"><span className="sk">STATUS</span><span className="sv">→ Script gerado <span className="sok">✓</span></span></div>
              </div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s4" lang={lang} slideIndex={4} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 5 — Prompt generation
   ═══════════════════════════════════════════════════════════════════ */

function SlidePrompt({ lang }: { lang: LangId }) {
  return (
    <Slide index={5}>
      <SceneFrame urlIndex={4}>
        <article className="ait-scene ait-scene--s5 a">
          <Topbar role="student" name="ai.tutor · System prompt" pillKind="pr" pillText="passo 3 / 4 · promptando" />
          <div className="ait-prompt d1">
            <div className="ait-prompt-h">
              <div>
                <div className="ait-prompt-h-t">System prompt do agent</div>
                <div className="ait-prompt-h-sub">Gerado a partir do script · revisável antes de publicar</div>
              </div>
              <div className="ait-prompt-stats">
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">tokens</span><span className="ait-prompt-stat-v">1.247</span></div>
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">model</span><span className="ait-prompt-stat-v ait-prompt-stat-v--cy">claude-sonnet-4-6</span></div>
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">temp</span><span className="ait-prompt-stat-v ait-prompt-stat-v--or">0.3</span></div>
              </div>
            </div>
            <div className="ait-prompt-doc d2">
              <p className="pp"><span className="pp-tag">/* role */</span> Você é <em>Qualificador de Leads</em> da MagisaTech, especialista em vendas B2B industriais. Seu trabalho é conversar com leads, entender porte da empresa, dor e orçamento, e atribuir score 0–10.</p>
              <p className="pp"><span className="pp-tag">/* tone */</span> Formal mas direto. Sem jargões. Faz uma pergunta por vez. Não promete prazo. Não cita preço — isso vai pra equipe comercial humana.</p>
              <p className="pp"><span className="pp-tag">/* tools */</span> Tem acesso a: <code>crm.lookup(cnpj)</code>, <code>cnpj.enrich(cnpj)</code>, <code>email.send(to, body)</code>.</p>
              <p className="pp"><span className="pp-tag">/* flow */</span> Sempre: 1) saudação, 2) pergunta CNPJ, 3) enriquece, 4) pergunta dor, 5) calcula score, 6) se score ≥ 7 marca reunião, senão envia material.</p>
              <p className="pp pp--ok"><span className="pp-tag">/* status */</span> <span className="pok">✓ Prompt gerado</span> · revisão do usuário liberada.</p>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s5" lang={lang} slideIndex={5} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 6 — Simulation live
   ═══════════════════════════════════════════════════════════════════ */

function SlideSimulation({ lang }: { lang: LangId }) {
  return (
    <Slide index={6}>
      <SceneFrame urlIndex={5}>
        <article className="ait-scene ait-scene--s6 a">
          <Topbar role="student" name="ai.tutor · Simulação" pillKind="pr" pillText="passo 4 / 4 · testando antes de publicar" />
          <div className="ait-sim2 d1">
            <div className="ait-sim2-chat">
              <div className="ait-sim2-chat-h">
                <span className="ait-sim2-chat-h-t">Simulação · lead NPC vs seu agent</span>
                <span className="ait-sim2-chat-h-score">score: <span className="ait-sim2-score">8.7</span> / 10</span>
              </div>
              <div className="ait-sim2-msgs">
                <div className="ait-sim2-msg ait-sim2-msg--lead d2">
                  <span className="ait-sim2-msg-who">lead simulado</span>
                  <span className="ait-sim2-msg-body">Tenho uma indústria de embalagens, 80 funcionários em Guarulhos.</span>
                </div>
                <div className="ait-sim2-msg ait-sim2-msg--agent d3">
                  <span className="ait-sim2-msg-who">seu agent</span>
                  <span className="ait-sim2-msg-body">Entendo. Vocês exportam ou só mercado interno? Qual o volume mensal?</span>
                </div>
                <div className="ait-sim2-msg ait-sim2-msg--lead d4">
                  <span className="ait-sim2-msg-who">lead simulado</span>
                  <span className="ait-sim2-msg-body">90% interno. Cerca de 1.200 pedidos/mês. Queríamos automatizar a triagem inicial.</span>
                </div>
                <div className="ait-sim2-msg ait-sim2-msg--agent d5">
                  <span className="ait-sim2-msg-who">seu agent</span>
                  <span className="ait-sim2-msg-body">Volume relevante. <em>Qual a maior dor hoje:</em> tempo de resposta, perda de pedido, ou qualificação?</span>
                </div>
              </div>
            </div>
            <div className="ait-sim2-side d6">
              <div className="ait-sim2-side-h">controles ao vivo</div>
              <div className="ait-sim2-slider">
                <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">temperatura</span><span className="ait-sim2-slider-v ait-sim2-slider-v--cy">0.42</span></div>
                <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--a" /><span className="ait-sim2-thumb ait-sim2-thumb--a" /></div>
              </div>
              <div className="ait-sim2-slider">
                <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">persona</span><span className="ait-sim2-slider-v ait-sim2-slider-v--pr">formal</span></div>
                <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--b" /><span className="ait-sim2-thumb ait-sim2-thumb--b" /></div>
              </div>
              <div className="ait-sim2-slider">
                <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">profundidade técnica</span><span className="ait-sim2-slider-v ait-sim2-slider-v--or">média</span></div>
                <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--c" /><span className="ait-sim2-thumb ait-sim2-thumb--c" /></div>
              </div>
              <div className="ait-sim2-out">
                <div className="ait-sim2-out-row"><span className="ait-sim2-out-k">outcome</span><span className="ait-sim2-out-v ait-sim2-out-v--gn">Qualificado</span></div>
                <div className="ait-sim2-out-row"><span className="ait-sim2-out-k">próxima ação</span><span className="ait-sim2-out-v">marcar reunião</span></div>
              </div>
              <div className="ait-sim2-actions">
                <button className="ait-sim2-btn ait-sim2-btn--ghost" type="button">Refinar</button>
                <button className="ait-sim2-btn ait-sim2-btn--primary" type="button">Aprovar →</button>
              </div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s6" lang={lang} slideIndex={6} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 7 — Tool Builder
   ═══════════════════════════════════════════════════════════════════ */

function SlideToolBuilder({ lang }: { lang: LangId }) {
  return (
    <Slide index={7}>
      <SceneFrame urlIndex={6}>
        <article className="ait-scene ait-scene--s7 a">
          <Topbar role="student" name="ai.tutor · Tool builder" pillKind="cy" pillText="no-code · drag-drop" />
          <div className="ait-tool-wrap d1">
            <div className="ait-tool-side">
              <div className="ait-tool-side-h">Blocos</div>
              <span className="ait-tool-block ait-tool-block--i">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12" /></svg> Input
              </span>
              <span className="ait-tool-block ait-tool-block--r">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> CRM lookup
              </span>
              <span className="ait-tool-block ait-tool-block--l">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v10l7 4" /></svg> Claude
              </span>
              <span className="ait-tool-block ait-tool-block--v">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Score Python
              </span>
              <span className="ait-tool-block ait-tool-block--o">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Output
              </span>
            </div>
            <div className="ait-tool-canvas">
              <div className="ait-tool-canvas-h">
                <span className="ait-tool-canvas-h-t">Fluxo: Qualificador de Leads</span>
                <span className="ait-tool-canvas-h-tag">snap-to-grid · conexões ao vivo</span>
              </div>
              <div className="ait-tool-flow">
                <div className="ait-node ait-node--i" style={{ left: '5%', top: '32%' }}><span className="ait-node-k">input</span><span className="ait-node-t">CNPJ + dor</span></div>
                <div className="ait-node ait-node--r" style={{ left: '28%', top: '14%' }}><span className="ait-node-k">tool</span><span className="ait-node-t">CRM lookup</span></div>
                <div className="ait-node ait-node--l" style={{ left: '50%', top: '32%' }}><span className="ait-node-k">llm</span><span className="ait-node-t">claude-sonnet-4-6</span></div>
                <div className="ait-node ait-node--v" style={{ left: '28%', top: '60%' }}><span className="ait-node-k">python</span><span className="ait-node-t">score 0–10</span></div>
                <div className="ait-node ait-node--o" style={{ left: '74%', top: '42%' }}><span className="ait-node-k">output</span><span className="ait-node-t">roteia comercial</span></div>
                <svg className="ait-tool-svg" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="lk1" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="#22d3ee" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <path className="ait-tool-link l1" d="M 110 175 C 240 90, 290 90, 320 90" stroke="url(#lk1)" strokeWidth="2" fill="none" />
                  <path className="ait-tool-link l2" d="M 460 110 C 530 110, 540 160, 540 175" stroke="url(#lk1)" strokeWidth="2" fill="none" />
                  <path className="ait-tool-link l3" d="M 110 190 C 200 260, 240 280, 290 290" stroke="url(#lk1)" strokeWidth="2" fill="none" />
                  <path className="ait-tool-link l4" d="M 430 290 C 480 260, 520 220, 540 200" stroke="url(#lk1)" strokeWidth="2" fill="none" />
                  <path className="ait-tool-link l5" d="M 660 195 C 700 200, 720 215, 760 220" stroke="url(#lk1)" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="ait-tool-foot d2">
                <span className="ait-tool-foot-k">deploy ready</span>
                <span className="ait-tool-foot-v">/apps/qualificador-leads-magisatech</span>
                <span className="ait-tool-foot-tag">válida pra empresa</span>
              </div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s7" lang={lang} slideIndex={7} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 8 — Karaoke + depth
   ═══════════════════════════════════════════════════════════════════ */

function SlideKaraoke({ lang }: { lang: LangId }) {
  return (
    <Slide index={8}>
      <SceneFrame urlIndex={7}>
        <article className="ait-scene ait-scene--s8 a">
          <Topbar role="student" name="modo treinamento · karaokê" pillKind="pr" pillText="Tutor ai.t lendo em voz" />
          <div className="ait-lesson-view d1">
            <div className="ait-lesson-head">
              <div>
                <div className="ait-lesson-h-title">Como ler bem um lead industrial</div>
                <div className="ait-lesson-h-sub">karaokê word-by-word · gpt-4o-mini-tts</div>
              </div>
              <div className="ait-tts-bar">
                <span className="ait-tts-btn ait-tts-btn--pulse" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <div className="ait-tts-wave" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
                </div>
                <span className="ait-tts-label"><span className="ait-tts-rec-dot" aria-hidden="true" /> Lendo em voz alta...</span>
              </div>
            </div>
            <div className="ait-karaoke d2">
              <span className="k k1">Um lead industrial bom</span>{' '}
              <span className="k k2">tem CNPJ ativo,</span>{' '}
              <span className="k k3">CNAE coerente,</span>{' '}
              <span className="k k4">QSA estável</span>{' '}
              <span className="k k5">e dor mensurável.</span>{' '}
              <span className="k k6">Se faltar um,</span>{' '}
              <span className="k k7">o score cai</span>{' '}
              <span className="k k8">e o agent</span>{' '}
              <span className="k k9">pede mais contexto</span>{' '}
              <span className="k k10">antes de roteirizar</span>
              <span className="k-cite">Fonte 3, item 2.1</span>
              <span className="k k11">. Exemplo:</span>{' '}
              <span className="k k12">embalagem com 80 func é médio porte.</span>
            </div>
            <div className="ait-depth-pills d3">
              <span className="ait-depth-pill ait-depth-pill--d1">Simples</span>
              <span className="ait-depth-pill ait-depth-pill--d2">Técnico</span>
              <span className="ait-depth-pill ait-depth-pill--d3">Exercício</span>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s8" lang={lang} slideIndex={8} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 9 — Exercise Python
   ═══════════════════════════════════════════════════════════════════ */

function SlideExercise({ lang }: { lang: LangId }) {
  return (
    <Slide index={9}>
      <SceneFrame urlIndex={8}>
        <article className="ait-scene ait-scene--s9 a">
          <Topbar role="student" name="exercício · score do lead" pillKind="cy" pillText="Veredito por Python" />
          <div className="ait-ex d1">
            <div className="ait-ex-panel">
              <div className="ait-ex-h"><span className="ait-ex-h-tag">Exercício</span><span className="ait-ex-h-t">Calculando o score</span></div>
              <div className="ait-ex-q">
                Lead com <strong>CNPJ ativo</strong> (+2), <strong>80 func</strong> (+3), <strong>dor clara</strong> (+3) e <strong>orçamento aprovado</strong> (+1). Qual o score final?
              </div>
              <div className="ait-ex-input">9<span className="ait-cursor" /></div>
              <div className="ait-ex-actions">
                <button className="ait-ex-btn ait-ex-btn--primary" type="button">Conferir</button>
                <button className="ait-ex-btn ait-ex-btn--ghost" type="button">Mais fácil</button>
              </div>
            </div>
            <div className="ait-ex-result d2">
              <div className="ait-ex-console">
                <span className="ait-ex-console-h"><span className="ait-ex-console-dot" /> python · grader.py</span>
                <span className="ait-ex-console-l ait-ex-console-l--p">&gt;&gt;&gt; grade(answer=9)</span>
                <span className="ait-ex-console-l">Running tests...</span>
                <span className="ait-ex-console-l">expected = 2 + 3 + 3 + 1 = 9</span>
                <span className="ait-ex-console-l">Test 1: ✓ signature OK</span>
                <span className="ait-ex-console-l">Test 2: ✓ numeric match</span>
                <span className="ait-ex-console-l">Test 3: ✓ bounds (0–10)</span>
                <span className="ait-ex-console-l ait-ex-console-l--ok">PASS · |error|=0 · 12ms</span>
              </div>
              <div className="ait-ex-result-h">
                <span className="ait-ex-result-check" aria-hidden="true">✓</span>
                <span className="ait-ex-result-t">Correto · Score: 9.2/10</span>
                <span className="ait-ex-result-q">Python · 12ms</span>
              </div>
              <div className="ait-ex-result-tutor">Bom: você somou os pesos certos. Python entrega veredito; LLM só humaniza, não avalia.</div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s9" lang={lang} slideIndex={9} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 10 — Published app
   ═══════════════════════════════════════════════════════════════════ */

function SlidePublished({ lang }: { lang: LangId }) {
  return (
    <Slide index={10}>
      <SceneFrame urlIndex={9}>
        <article className="ait-scene ait-scene--s10 a">
          <Topbar role="student" name="ai.tutor · aplicação publicada" pillKind="gn" pillText="ao vivo · em produção" />
          <div className="ait-pub d1">
            <div className="ait-pub-confetti" aria-hidden="true">
              <i className="cf cf-1" /><i className="cf cf-2" /><i className="cf cf-3" />
              <i className="cf cf-4" /><i className="cf cf-5" /><i className="cf cf-6" />
              <i className="cf cf-7" /><i className="cf cf-8" /><i className="cf cf-9" />
            </div>
            <div className="ait-pub-card">
              <div className="ait-pub-badge"><span className="ait-pub-badge-check" aria-hidden="true">✓</span> PUBLICADO</div>
              <div className="ait-pub-app-head">
                <div className="ait-pub-app-ic" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 L 4 7 v 10 l 8 5 8 -5 V 7 z" />
                    <path d="M12 22 V 12" />
                    <path d="M4 7 L 12 12 L 20 7" />
                  </svg>
                </div>
                <div>
                  <div className="ait-pub-app-name">Qualificador de Leads</div>
                  <div className="ait-pub-app-org">MagisaTech · Vendas B2B</div>
                </div>
              </div>
              <div className="ait-pub-url">
                <svg className="ait-pub-url-lock" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="ait-pub-url-host">apps.iconsai.ai</span>
                <span className="ait-pub-url-path">/qualificador-leads-magisatech</span>
                <span className="ait-pub-url-copy">copiar</span>
              </div>
              <div className="ait-pub-desc">
                Agent que conversa com leads industriais, enriquece CNPJ, faz 5 perguntas de qualificação e roteia pra comercial humano se score ≥ 7.
              </div>
              <div className="ait-pub-stats">
                <div className="ait-pub-stat"><span className="ait-pub-stat-v">23</span><span className="ait-pub-stat-k">conversas hoje</span></div>
                <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--gn">7</span><span className="ait-pub-stat-k">leads qualificados</span></div>
                <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--cy">91%</span><span className="ait-pub-stat-k">satisfação</span></div>
              </div>
              <div className="ait-pub-actions">
                <button className="ait-pub-btn ait-pub-btn--primary" type="button">Acessar app →</button>
                <button className="ait-pub-btn" type="button">Compartilhar</button>
                <button className="ait-pub-btn ait-pub-btn--ghost" type="button">Editar</button>
              </div>
              <div className="ait-pub-foot">Publicado em <strong>2.3s</strong> · v1 · standalone</div>
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s10" lang={lang} slideIndex={10} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 11 — RH Dashboard
   ═══════════════════════════════════════════════════════════════════ */

function SlideRH({ lang }: { lang: LangId }) {
  return (
    <Slide index={11}>
      <SceneFrame urlIndex={10}>
        <article className="ait-scene ait-scene--s11 a">
          <Topbar role="corp" name="MagisaTech · RH" pillKind="or" pillText="6 colaboradores · apps personalizadas" />
          <div className="ait-rh-wrap d1">
            <div className="ait-rh-head">
              <div>
                <div className="ait-rh-h-t">Trilha Compliance LGPD · MagisaTech</div>
                <div className="ait-rh-h-sub">cada colaborador sai com sua própria app de IA</div>
              </div>
              <div className="ait-rh-kpis">
                <div className="ait-kpi" style={{ ['--accent' as string]: '#22c55e' } as CSSProperties}>
                  <span className="ait-kpi-v">3</span><span className="ait-kpi-k">apps publicadas</span>
                </div>
                <div className="ait-kpi" style={{ ['--accent' as string]: '#22d3ee' } as CSSProperties}>
                  <span className="ait-kpi-v">79%</span><span className="ait-kpi-k">média trilha</span>
                </div>
                <div className="ait-kpi" style={{ ['--accent' as string]: '#a855f7' } as CSSProperties}>
                  <span className="ait-kpi-v">6</span><span className="ait-kpi-k">histórias gravadas</span>
                </div>
              </div>
            </div>
            <div className="ait-rh-staff d2">
              {STAFF.map((p, i) => (
                <div key={p.name} className="ait-staff-row"
                  style={{
                    ['--accent' as string]: p.pct >= 100 ? '#22c55e' : p.pct >= 70 ? '#22d3ee' : p.pct >= 40 ? '#fb923c' : '#ef4444',
                    ['--pct' as string]: `${p.pct}%`,
                    ['--idx' as string]: i,
                  } as CSSProperties}>
                  <span className="ait-staff-av" aria-hidden="true">{p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
                  <div className="ait-staff-id">
                    <span className="ait-staff-name">{p.name}</span>
                    <span className="ait-staff-role">{p.role}</span>
                  </div>
                  <span className="ait-staff-app" title={p.app}>
                    <svg className="ait-staff-app-ic" width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="ait-staff-app-name">{p.app}</span>
                  </span>
                  <div className="ait-staff-bar"><div className="ait-staff-bar-fill" /></div>
                  <span className="ait-staff-pct">{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </SceneFrame>
      <ExplainAside slideKey="s11" lang={lang} slideIndex={11} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE 12 — Closing (canon SS6.12)
   ═══════════════════════════════════════════════════════════════════ */

function SlideClosing({ lang }: { lang: LangId }) {
  const s = STRINGS[lang].s12 ?? {}
  return (
    <Slide index={12}>
      <div className="ait-closing">
        <h2 className="ait-closing-title a d1">{s.title ?? 'Obrigado.'}</h2>
        <div className="a d2">
          <span className="logo-foot" style={{ fontSize: '1.4rem' }}>
            <span className="logo-i">i</span>
            <span className="logo-cons">cons</span>
            <span className="logo-ai">.ai</span>
          </span>
        </div>
        <span className="ait-closing-url a d3">{s.url ?? 'iconsai.ai/tutor'}</span>
      </div>
    </Slide>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE — assembles SlideEngine + Chrome + 13 Slides
   ═══════════════════════════════════════════════════════════════════ */

export default function ShowcasePage() {
  const [lang, setLang] = useState<LangId>('pt-BR')

  return (
    <>
      <SlideEngine totalSlides={TOTAL_SLIDES}>
        <Chrome lang={lang} setLang={setLang} />

        <SlideOpening lang={lang} />
        <SlideLogin lang={lang} />
        <SlideDashboard lang={lang} />
        <SlideStory lang={lang} />
        <SlideScript lang={lang} />
        <SlidePrompt lang={lang} />
        <SlideSimulation lang={lang} />
        <SlideToolBuilder lang={lang} />
        <SlideKaraoke lang={lang} />
        <SlideExercise lang={lang} />
        <SlidePublished lang={lang} />
        <SlideRH lang={lang} />
        <SlideClosing lang={lang} />
      </SlideEngine>
      <PdfDocument lang={lang} />
    </>
  )
}
