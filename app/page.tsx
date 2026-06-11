'use client'

import { Fragment, useState, type CSSProperties, type ReactNode } from 'react'
import Link from 'next/link'
import { SlideEngine, useSlideContext } from '@/components/SlideEngine'
import { Slide } from '@/components/Slide'
import { AudioController } from '@/components/AudioController'
import { PdfDocument } from '@/components/pdf/PdfDocument'
import { STRINGS, type LangId } from '@/i18n/strings'
import { SCENES, type Rich } from '@/i18n/scenes'

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

/** Visual-only card config — human-readable text lives in i18n/scenes.ts (s2.cards/s2.details). */
const STUDENT_CARDS: {
  id: string; accent: string; glyph: string; pct: number; highlight?: boolean
}[] = [
  { id: 'stats', accent: '#22d3ee', glyph: 'σ', pct: 67 },
  { id: 'python', accent: '#b88d06', glyph: '>_', pct: 73 },
  { id: 'finance', accent: '#14b8a6', glyph: '$', pct: 38 },
  { id: 'esg', accent: '#1daa51', glyph: '◐', pct: 55 },
  { id: 'comp', accent: '#3b82f6', glyph: '§', pct: 49 },
  { id: 'ia', accent: '#a855f7', glyph: '*', pct: 0, highlight: true },
  { id: 'bi', accent: '#ec4899', glyph: '▦', pct: 22 },
  { id: 'ops', accent: '#fb923c', glyph: 'Op', pct: 41 },
]

type StudentCardId = (typeof STUDENT_CARDS)[number]['id']

/** Visual-only staff config — role/app labels live in i18n/scenes.ts (s11.staff, parallel array). */
const STAFF: { name: string; pct: number }[] = [
  { name: 'Ana Ribeiro', pct: 100 },
  { name: 'Bruno Castanho', pct: 85 },
  { name: 'Camila Duarte', pct: 100 },
  { name: 'Diego Marques', pct: 60 },
  { name: 'Elisa Andrade', pct: 72 },
  { name: 'Felipe Souza', pct: 32 },
]

/* ═══════════════════════════════════════════════════════════════════
   SMALL HELPERS
   ═══════════════════════════════════════════════════════════════════ */

/** Render rich-text segments from i18n/scenes.ts. */
function R({ parts }: { parts: Rich[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.code ? <code key={i}>{p.t}</code>
        : p.strong ? <strong key={i}>{p.t}</strong>
        : p.em ? <em key={i}>{p.t}</em>
        : p.ok ? <span key={i} className="pok">{p.t}</span>
        : <span key={i}>{p.t}</span>
      )}
    </>
  )
}

/** Inline CSS vars + animation for monospace typewriter (.tw class) */
function twStyle(text: string, delay: number, speed = 0.04): CSSProperties {
  const n = text.length
  const dur = Math.max(0.3, n * speed)
  return {
    '--tw-ch': `${n}ch`,
    animation: `aitType ${dur.toFixed(2)}s steps(${n}, end) ${delay.toFixed(2)}s both, aitTwCursor 0.53s step-end ${delay.toFixed(2)}s infinite`,
    animationPlayState: 'paused',
  } as CSSProperties
}

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

/** On-screen explanation aside (§6.4). Centered on vertical midline, fills >75% of 1/3 column. */
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
      {s.kicker && <span className="ait-explain-kicker">{s.kicker}</span>}
      {s.title && <h3 className="ait-explain-title">{s.title}</h3>}
      <span className="ait-explain-rule" aria-hidden="true" />
      {s.body && <p className="ait-explain-body">{s.body}</p>}
      {kpis.length > 0 && (
        <div className="ait-explain-kpis">
          {kpis.map(([v, k]) => (
            <div key={k} className="ait-explain-kpi">
              <span className="ait-explain-kpi-v">{v}</span>
              <span className="ait-explain-kpi-k">{k}</span>
            </div>
          ))}
        </div>
      )}
      <span className="ait-explain-idx" aria-hidden="true">{idx}</span>
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
          <p className="ait-op-q ait-op-q--1">{s.q1}</p>
          <p className="ait-op-q ait-op-q--2">{s.q2}</p>
          <p className="ait-op-q ait-op-q--3">{s.q3}</p>
          <p className="ait-op-q ait-op-q--4">{s.q4}</p>
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
  const sc = SCENES[lang].s1
  return (
    <Slide index={1}>
      <SceneFrame urlIndex={0}>
        <article className="ait-scene ait-scene--s1 a">
          <Topbar role="student" name={sc.topName} pillKind="cy" pillText={sc.pill} />
          <div className="ait-login">
            <div className="ait-login-card d1">
              <div className="ait-login-head">
                <span className="ait-login-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div className="ait-login-title">{sc.title}</div>
              </div>
              <div className="ait-field"><label className="ait-field-label">{sc.idLabel}</label><div className="ait-field-input">{sc.idValue}</div></div>
              <div className="ait-field">
                <label className="ait-field-label">{sc.smsLabel}</label>
                <div className="ait-field-input ait-field-input--typing">
                  <span className="ait-otp"><i>4</i><i>8</i><i>2</i><i>1</i><i>5</i><i className="ait-otp-cur">9</i></span>
                </div>
              </div>
              <button className="ait-login-btn" type="button">{sc.btn}</button>
              <div className="ait-sso-ring d2">
                <span className="ait-sso-node ait-sso-node--a">tutor</span>
                <span className="ait-sso-node ait-sso-node--b">stats</span>
                <span className="ait-sso-node ait-sso-node--c">python</span>
                <span className="ait-sso-node ait-sso-node--d">esg</span>
                <span className="ait-sso-line" />
              </div>
              <div className="ait-login-foot"><R parts={sc.foot} /></div>
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
  const sc = SCENES[lang].s2
  const card = STUDENT_CARDS.find((c) => c.id === selected) ?? STUDENT_CARDS[0]
  const detail = sc.details[selected]
  return (
    <Slide index={2}>
      <SceneFrame urlIndex={1}>
        <article className="ait-scene ait-scene--s2 a">
          <Topbar role="student" name={sc.topName} pillKind="cy" pillText={sc.pill} />
          <div className="ait-tabs d1">
            <span className="ait-tab ait-tab--on"><Icon name="book" /> {sc.tab1}</span>
            <span className="ait-tab"><Icon name="settings" /> {sc.tab2}</span>
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
                    <div className="ait-card-title">{sc.cards[c.id].title}</div>
                    <div className="ait-card-desc">{sc.cards[c.id].desc}</div>
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
              <div className="ait-track-preview-title">{sc.cards[selected].title}</div>
              <p className="ait-track-preview-copy">{detail.headline}</p>
              <div className="ait-track-preview-stats">
                {detail.metrics.map(([label, value]) => (
                  <div key={label} className="ait-track-stat">
                    <span>{label}</span><strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="ait-track-preview-block">
                <div className="ait-track-preview-label">{sc.outputsLabel}</div>
                <div className="ait-track-preview-chips">
                  {detail.outputs.map((item) => <span key={item} className="ait-track-chip">{item}</span>)}
                </div>
              </div>
              <div className="ait-track-preview-block">
                <div className="ait-track-preview-label">{sc.flowLabel}</div>
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
                {sc.foot}
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
  const sc = SCENES[lang].s3
  return (
    <Slide index={3}>
      <SceneFrame urlIndex={2}>
        <article className="ait-scene ait-scene--s3 a">
          <Topbar role="student" name={sc.topName} pillKind="pr" pillText={sc.pill} />
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
              <div className="ait-story-rec"><span className="ait-story-rec-dot" /> {sc.rec}</div>
            </div>
            <div className="ait-story-right">
              <div className="ait-story-h">
                <span className="ait-story-h-k">{sc.liveLabel}</span>
                <span className="ait-story-h-tag">{sc.tag}</span>
              </div>
              <div className="ait-story-transcript">
                {sc.transcript.map((seg, i) => (
                  <Fragment key={i}>
                    {i > 0 && ' '}
                    <span className={`st${seg.em ? ' st--em' : ''}`} style={{ '--tw-d': `${0.3 + i * 0.15}s` } as CSSProperties}>{seg.t}</span>
                  </Fragment>
                ))}
                ...<span className="st-cursor" />
              </div>
              <div className="ait-story-chips d2">
                {sc.chips.map((chip, i) => (
                  <span key={chip} className={`ait-story-chip ait-story-chip--c${i + 1}`}>{chip}</span>
                ))}
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
  const sc = SCENES[lang].s4
  return (
    <Slide index={4}>
      <SceneFrame urlIndex={3}>
        <article className="ait-scene ait-scene--s4 a">
          <Topbar role="student" name={sc.topName} pillKind="pr" pillText={sc.pill} />
          <div className="ait-script d1">
            <div className="ait-script-left">
              <div className="ait-script-h"><span className="ait-script-h-k">{sc.storyLabel}</span></div>
              <div className="ait-script-quote">
                <R parts={sc.quote} />
              </div>
            </div>
            <div className="ait-script-right">
              <div className="ait-script-h">
                <span className="ait-script-h-k">{sc.scriptLabel}</span>
                <span className="ait-script-h-stat"><span className="ait-script-h-dot" /> {sc.generating}</span>
              </div>
              <div className="ait-script-doc">
                {sc.lines.map((line, i) => (
                  <div key={line.k} className={`ait-script-line${line.ok ? ' ait-script-line--ok' : ''} tw-line`}
                    style={{ '--tw-d': `${0.4 + i * 0.5}s` } as CSSProperties}>
                    <span className="sk">{line.k}</span>
                    {line.flow ? (
                      <span className="sv">
                        {line.flow.map((step, j) => <span key={step} className="sf tw-line" style={{ '--tw-d': `${0.6 + i * 0.5 + j * 0.25}s` } as CSSProperties}>{step}</span>)}
                      </span>
                    ) : (
                      <span className="sv">
                        <span className="tw" style={twStyle(
                          (line.v || '') + (line.ok ? ' ✓' : ''),
                          0.6 + i * 0.5
                        )}>
                          {line.v}{line.ok && <> <span className="sok">✓</span></>}
                        </span>
                      </span>
                    )}
                  </div>
                ))}
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
  const sc = SCENES[lang].s5
  return (
    <Slide index={5}>
      <SceneFrame urlIndex={4}>
        <article className="ait-scene ait-scene--s5 a">
          <Topbar role="student" name={sc.topName} pillKind="pr" pillText={sc.pill} />
          <div className="ait-prompt d1">
            <div className="ait-prompt-h">
              <div>
                <div className="ait-prompt-h-t">{sc.headT}</div>
                <div className="ait-prompt-h-sub">{sc.headSub}</div>
              </div>
              <div className="ait-prompt-stats">
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">tokens</span><span className="ait-prompt-stat-v">{sc.tokens}</span></div>
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">model</span><span className="ait-prompt-stat-v ait-prompt-stat-v--cy">claude-sonnet-4-6</span></div>
                <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">temp</span><span className="ait-prompt-stat-v ait-prompt-stat-v--or">{sc.temp}</span></div>
              </div>
            </div>
            <div className="ait-prompt-doc d2">
              {sc.paragraphs.map((p, i) => (
                <p key={p.tag} className={`pp${p.ok ? ' pp--ok' : ''} tw-line`}
                  style={{ '--tw-d': `${0.5 + i * 0.45}s` } as CSSProperties}>
                  <span className="pp-tag">{p.tag}</span> <R parts={p.parts} />
                </p>
              ))}
              <span className="ait-cursor tw-line" style={{ '--tw-d': `${0.5 + sc.paragraphs.length * 0.45}s` } as CSSProperties} />
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
  const sc = SCENES[lang].s6
  const sliderV = ['--cy', '--pr', '--or']
  const sliderT = ['--a', '--b', '--c']
  return (
    <Slide index={6}>
      <SceneFrame urlIndex={5}>
        <article className="ait-scene ait-scene--s6 a">
          <Topbar role="student" name={sc.topName} pillKind="pr" pillText={sc.pill} />
          <div className="ait-sim2 d1">
            <div className="ait-sim2-chat">
              <div className="ait-sim2-chat-h">
                <span className="ait-sim2-chat-h-t">{sc.chatT}</span>
                <span className="ait-sim2-chat-h-score">{sc.scoreK} <span className="ait-sim2-score">{sc.scoreV}</span> / 10</span>
              </div>
              <div className="ait-sim2-msgs">
                {sc.msgs.map((m, i) => {
                  const isLast = i === sc.msgs.length - 1
                  const d = 0.3 + i * 1.0
                  return (
                    <div key={i} className={`ait-sim2-msg ait-sim2-msg--${m.agent ? 'agent' : 'lead'} tw-line`}
                      style={{ '--tw-d': `${d}s` } as CSSProperties}>
                      <span className="ait-sim2-msg-who">{m.agent ? sc.whoAgent : sc.whoLead}</span>
                      <span className="ait-sim2-msg-body">
                        <R parts={m.parts} />
                        <span className="sim-cursor" style={{
                          animation: isLast
                            ? `aitCursorBlink 0.7s steps(2) ${d.toFixed(2)}s infinite`
                            : `aitCursorBlink 0.7s steps(2) ${d.toFixed(2)}s infinite, aitCursorVanish 0.01s linear ${(d + 1.0).toFixed(2)}s forwards`,
                          animationPlayState: 'paused',
                        } as CSSProperties} />
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ait-sim2-side d6">
              <div className="ait-sim2-side-h">{sc.sideTitle}</div>
              {sc.sliders.map(([k, v], i) => (
                <div key={k} className="ait-sim2-slider">
                  <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">{k}</span><span className={`ait-sim2-slider-v ait-sim2-slider-v${sliderV[i]}`}>{v}</span></div>
                  <div className="ait-sim2-track"><div className={`ait-sim2-track-fill ait-sim2-track-fill${sliderT[i]}`} /><span className={`ait-sim2-thumb ait-sim2-thumb${sliderT[i]}`} /></div>
                </div>
              ))}
              <div className="ait-sim2-out">
                {sc.out.map(([k, v], i) => (
                  <div key={k} className="ait-sim2-out-row"><span className="ait-sim2-out-k">{k}</span><span className={`ait-sim2-out-v${i === 0 ? ' ait-sim2-out-v--gn' : ''}`}>{v}</span></div>
                ))}
              </div>
              <div className="ait-sim2-actions">
                <button className="ait-sim2-btn ait-sim2-btn--ghost" type="button">{sc.btnGhost}</button>
                <button className="ait-sim2-btn ait-sim2-btn--primary" type="button">{sc.btnPrimary}</button>
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

const TOOL_BLOCK_META = [
  { cls: 'i', svg: '<polyline points="22 12 16 12 14 15 10 9 8 12 2 12" />' },
  { cls: 'r', svg: '<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />' },
  { cls: 'l', svg: '<path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v10l7 4" />' },
  { cls: 'v', svg: '<polyline points="20 6 9 17 4 12" />' },
  { cls: 'o', svg: '<line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />' },
] as const

const TOOL_NODE_POS = [
  { cls: 'i', left: '5%', top: '32%' },
  { cls: 'r', left: '28%', top: '14%' },
  { cls: 'l', left: '50%', top: '32%' },
  { cls: 'v', left: '28%', top: '60%' },
  { cls: 'o', left: '74%', top: '42%' },
] as const

function SlideToolBuilder({ lang }: { lang: LangId }) {
  const sc = SCENES[lang].s7
  return (
    <Slide index={7}>
      <SceneFrame urlIndex={6}>
        <article className="ait-scene ait-scene--s7 a">
          <Topbar role="student" name={sc.topName} pillKind="cy" pillText={sc.pill} />
          <div className="ait-tool-wrap d1">
            <div className="ait-tool-side">
              <div className="ait-tool-side-h">{sc.blocksLabel}</div>
              {TOOL_BLOCK_META.map((b, i) => (
                <span key={b.cls} className={`ait-tool-block ait-tool-block--${b.cls}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: b.svg }} /> {sc.blocks[i]}
                </span>
              ))}
            </div>
            <div className="ait-tool-canvas">
              <div className="ait-tool-canvas-h">
                <span className="ait-tool-canvas-h-t">{sc.canvasT}</span>
                <span className="ait-tool-canvas-h-tag">{sc.canvasTag}</span>
              </div>
              <div className="ait-tool-flow">
                {TOOL_NODE_POS.map((n, i) => (
                  <div key={n.cls} className={`ait-node ait-node--${n.cls}`} style={{ left: n.left, top: n.top }}>
                    <span className="ait-node-k">{sc.nodes[i].k}</span>
                    <span className="ait-node-t">{sc.nodes[i].t}</span>
                  </div>
                ))}
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
                <span className="ait-tool-foot-k">{sc.footK}</span>
                <span className="ait-tool-foot-v">{sc.footV}</span>
                <span className="ait-tool-foot-tag">{sc.footTag}</span>
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
  const sc = SCENES[lang].s8
  return (
    <Slide index={8}>
      <SceneFrame urlIndex={7}>
        <article className="ait-scene ait-scene--s8 a">
          <Topbar role="student" name={sc.topName} pillKind="pr" pillText={sc.pill} />
          <div className="ait-lesson-view d1">
            <div className="ait-lesson-head">
              <div>
                <div className="ait-lesson-h-title">{sc.title}</div>
                <div className="ait-lesson-h-sub">{sc.sub}</div>
              </div>
              <div className="ait-tts-bar">
                <span className="ait-tts-btn ait-tts-btn--pulse" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <div className="ait-tts-wave" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
                </div>
                <span className="ait-tts-label"><span className="ait-tts-rec-dot" aria-hidden="true" /> {sc.reading}</span>
              </div>
            </div>
            <div className="ait-karaoke d2">
              {sc.karaoke.map((w, i) => (
                <Fragment key={i}>
                  {i > 0 && i !== 10 && ' '}
                  <span className={`k k${i + 1}`}>{w}</span>
                  {i === 9 && <span className="k-cite">{sc.cite}</span>}
                </Fragment>
              ))}
            </div>
            <div className="ait-depth-pills d3">
              {sc.pills.map((p, i) => (
                <span key={p} className={`ait-depth-pill ait-depth-pill--d${i + 1}`}>{p}</span>
              ))}
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
  const sc = SCENES[lang].s9
  return (
    <Slide index={9}>
      <SceneFrame urlIndex={8}>
        <article className="ait-scene ait-scene--s9 a">
          <Topbar role="student" name={sc.topName} pillKind="cy" pillText={sc.pill} />
          <div className="ait-ex d1">
            <div className="ait-ex-panel">
              <div className="ait-ex-h"><span className="ait-ex-h-tag">{sc.tag}</span><span className="ait-ex-h-t">{sc.t}</span></div>
              <div className="ait-ex-q">
                <R parts={sc.question} />
              </div>
              <div className="ait-ex-input">
                <span className="tw" style={twStyle(sc.answer, 0.5, 0.15)}>{sc.answer}</span>
              </div>
              <div className="ait-ex-actions">
                <button className="ait-ex-btn ait-ex-btn--primary" type="button">{sc.btnCheck}</button>
                <button className="ait-ex-btn ait-ex-btn--ghost" type="button">{sc.btnEasier}</button>
              </div>
            </div>
            <div className="ait-ex-result d2">
              <div className="ait-ex-console">
                <span className="ait-ex-console-h tw-line" style={{ '--tw-d': '1.0s' } as CSSProperties}><span className="ait-ex-console-dot" /> python · grader.py</span>
                <span className="ait-ex-console-l ait-ex-console-l--p tw-line" style={{ '--tw-d': '1.3s' } as CSSProperties}>&gt;&gt;&gt; grade(answer=9)</span>
                <span className="ait-ex-console-l tw-line" style={{ '--tw-d': '1.6s' } as CSSProperties}>Running tests...</span>
                <span className="ait-ex-console-l tw-line" style={{ '--tw-d': '1.9s' } as CSSProperties}>expected = 2 + 3 + 3 + 1 = 9</span>
                <span className="ait-ex-console-l tw-line" style={{ '--tw-d': '2.2s' } as CSSProperties}>Test 1: ✓ signature OK</span>
                <span className="ait-ex-console-l tw-line" style={{ '--tw-d': '2.5s' } as CSSProperties}>Test 2: ✓ numeric match</span>
                <span className="ait-ex-console-l tw-line" style={{ '--tw-d': '2.8s' } as CSSProperties}>Test 3: ✓ bounds (0–10)</span>
                <span className="ait-ex-console-l ait-ex-console-l--ok tw-line" style={{ '--tw-d': '3.1s' } as CSSProperties}>PASS · |error|=0 · 12ms</span>
              </div>
              <div className="ait-ex-result-h">
                <span className="ait-ex-result-check" aria-hidden="true">✓</span>
                <span className="ait-ex-result-t">{sc.resultT}</span>
                <span className="ait-ex-result-q">{sc.resultQ}</span>
              </div>
              <div className="ait-ex-result-tutor">{sc.tutor}</div>
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
  const sc = SCENES[lang].s10
  return (
    <Slide index={10}>
      <SceneFrame urlIndex={9}>
        <article className="ait-scene ait-scene--s10 a">
          <Topbar role="student" name={sc.topName} pillKind="gn" pillText={sc.pill} />
          <div className="ait-pub d1">
            <div className="ait-pub-confetti" aria-hidden="true">
              <i className="cf cf-1" /><i className="cf cf-2" /><i className="cf cf-3" />
              <i className="cf cf-4" /><i className="cf cf-5" /><i className="cf cf-6" />
              <i className="cf cf-7" /><i className="cf cf-8" /><i className="cf cf-9" />
            </div>
            <div className="ait-pub-card">
              <div className="ait-pub-badge"><span className="ait-pub-badge-check" aria-hidden="true">✓</span> {sc.badge}</div>
              <div className="ait-pub-app-head">
                <div className="ait-pub-app-ic" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 L 4 7 v 10 l 8 5 8 -5 V 7 z" />
                    <path d="M12 22 V 12" />
                    <path d="M4 7 L 12 12 L 20 7" />
                  </svg>
                </div>
                <div>
                  <div className="ait-pub-app-name">{sc.appName}</div>
                  <div className="ait-pub-app-org">{sc.appOrg}</div>
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
                <span className="ait-pub-url-copy">{sc.copy}</span>
              </div>
              <div className="ait-pub-desc">
                {sc.desc}
              </div>
              <div className="ait-pub-stats">
                <div className="ait-pub-stat"><span className="ait-pub-stat-v">23</span><span className="ait-pub-stat-k">{sc.statLabels[0]}</span></div>
                <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--gn">7</span><span className="ait-pub-stat-k">{sc.statLabels[1]}</span></div>
                <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--cy">91%</span><span className="ait-pub-stat-k">{sc.statLabels[2]}</span></div>
              </div>
              <div className="ait-pub-actions">
                <button className="ait-pub-btn ait-pub-btn--primary" type="button">{sc.btns[0]}</button>
                <button className="ait-pub-btn" type="button">{sc.btns[1]}</button>
                <button className="ait-pub-btn ait-pub-btn--ghost" type="button">{sc.btns[2]}</button>
              </div>
              <div className="ait-pub-foot"><R parts={sc.foot} /></div>
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
  const sc = SCENES[lang].s11
  return (
    <Slide index={11}>
      <SceneFrame urlIndex={10}>
        <article className="ait-scene ait-scene--s11 a">
          <Topbar role="corp" name={sc.topName} pillKind="or" pillText={sc.pill} />
          <div className="ait-rh-wrap d1">
            <div className="ait-rh-head">
              <div>
                <div className="ait-rh-h-t">{sc.headT}</div>
                <div className="ait-rh-h-sub">{sc.headSub}</div>
              </div>
              <div className="ait-rh-kpis">
                <div className="ait-kpi" style={{ ['--accent' as string]: '#22c55e' } as CSSProperties}>
                  <span className="ait-kpi-v">3</span><span className="ait-kpi-k">{sc.kpiLabels[0]}</span>
                </div>
                <div className="ait-kpi" style={{ ['--accent' as string]: '#22d3ee' } as CSSProperties}>
                  <span className="ait-kpi-v">79%</span><span className="ait-kpi-k">{sc.kpiLabels[1]}</span>
                </div>
                <div className="ait-kpi" style={{ ['--accent' as string]: '#a855f7' } as CSSProperties}>
                  <span className="ait-kpi-v">6</span><span className="ait-kpi-k">{sc.kpiLabels[2]}</span>
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
                    <span className="ait-staff-role">{sc.staff[i].role}</span>
                  </div>
                  <span className="ait-staff-app" title={sc.staff[i].app}>
                    <svg className="ait-staff-app-ic" width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="ait-staff-app-name">{sc.staff[i].app}</span>
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
        <Link className="ait-closing-pdf a d4" href={`/pdf?lang=${lang}`}>
          {lang === 'en' ? 'View document version' : 'Ver vers\u00E3o documento'} {'\u2192'}
        </Link>
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
