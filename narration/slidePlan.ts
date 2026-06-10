/**
 * Slide plans for the tutor showcase deck.
 * Planning artifact — NOT imported by page.tsx at runtime.
 * Each entry documents the intent, visual beat, and explain focus per slide.
 */

export interface SlidePlan {
  index: number
  name: string
  beat: string
  visual: string
  explainFocus: string
}

export const SLIDE_PLANS: SlidePlan[] = [
  {
    index: 0,
    name: 'Opening',
    beat: 'hook — provocation questions',
    visual: 'Full-bleed wordmark ai.tutor with staggered provocative quotes',
    explainFocus: 'N/A — opening has no aside',
  },
  {
    index: 1,
    name: 'Login SSO',
    beat: 'entry point — one account, all apps',
    visual: 'Login card with CPF + OTP fields, SSO ring showing connected apps',
    explainFocus: 'Single sign-on via Identity Hub eliminates friction and duplicate registrations',
  },
  {
    index: 2,
    name: 'Dashboard',
    beat: 'overview — 8 knowledge tracks',
    visual: 'Card grid with 8 tracks, interactive selection reveals detail sidebar',
    explainFocus: 'Eight areas converge in one dashboard; highlight is the build-my-app track',
  },
  {
    index: 3,
    name: 'Storytelling',
    beat: 'step 1 — voice capture',
    visual: 'Microphone with pulsing halos, live transcript, keyword chips extracted',
    explainFocus: 'Voice-first approach lowers barrier; AI transcribes and extracts what matters',
  },
  {
    index: 4,
    name: 'Script',
    beat: 'step 2 — structured script from voice',
    visual: 'Split: original quote left, structured script document right',
    explainFocus: 'Story becomes agent name, tools, flow, guardrails — all reviewable',
  },
  {
    index: 5,
    name: 'Prompt',
    beat: 'step 3 — editable system prompt',
    visual: 'Full prompt document with token/model/temp stats, role/tone/tools/flow sections',
    explainFocus: 'Complete prompt with 1,247 tokens at temp 0.3; student reviews before publishing',
  },
  {
    index: 6,
    name: 'Simulation',
    beat: 'step 4 — test before publish',
    visual: 'Chat between simulated lead and agent, side panel with live controls and score',
    explainFocus: 'Live scoring at 8.7/10; approve or refine cycle prevents untested agents in production',
  },
  {
    index: 7,
    name: 'Tool Builder',
    beat: 'visual no-code flow',
    visual: 'Five connected nodes on canvas: input, CRM, Claude, Python score, output',
    explainFocus: 'Five blocks wired live; deploy-ready path generates real URL',
  },
  {
    index: 8,
    name: 'Karaoke',
    beat: 'training — guided reading',
    visual: 'Word-by-word karaoke with TTS wave, three depth level pills',
    explainFocus: 'Word-by-word TTS with three depth levels adapts to employee profile',
  },
  {
    index: 9,
    name: 'Exercise',
    beat: 'practice — Python verdict',
    visual: 'Exercise panel with input, Python console showing grader.py pass/fail in 12ms',
    explainFocus: 'grader.py delivers deterministic pass/fail; LLM never evaluates, only humanizes',
  },
  {
    index: 10,
    name: 'Published',
    beat: 'climax — app goes live',
    visual: 'Published card with confetti, real URL, live stats (23 conversations, 91% satisfaction)',
    explainFocus: 'Real URL with live metrics; employee walks out with a working tool',
  },
  {
    index: 11,
    name: 'RH Dashboard',
    beat: 'corporate view — per-employee progress',
    visual: 'Staff table with progress bars, KPIs (3 apps, 79% average, 6 stories)',
    explainFocus: 'Company tracks each person across published apps and individual performance',
  },
  {
    index: 12,
    name: 'Closing',
    beat: 'thank you + URL',
    visual: 'Centered thank-you with logo and presentation URL',
    explainFocus: 'N/A — closing has no aside',
  },
]
