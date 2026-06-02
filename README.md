# tutor

Página showcase do **Icons.ai · ai.tutor** — tutor educacional que opera dentro do Login Único.

- **Stack:** Next.js 15 + React 19 + TypeScript strict
- **basePath:** `/tutor` (rota final `icon.iconsai.ai/tutor`)
- **Porta dev:** `3104`
- **Accent:** `#a855f7` (roxo)
- **Continue CTA:** `https://learn.iconsai.ai/login` (produto em produção)

## Desenvolvimento

```bash
npm install
npm run dev
# http://localhost:3104/tutor
```

## Deploy

1. `npm run build`
2. `rsync .next/standalone/ .next/static/ public/ root@<droplet>:/opt/tutor/app/ --delete`
3. systemd unit `tutor.service` + Caddy `icon.iconsai.ai/tutor/*` → `127.0.0.1:3104/tutor/*`

## Cenas (5)

1. "O tutor que aprende com você"
2. "Aulas que se ajustam" — depth adaptativa
3. Dialog overlay — "RAG · ABNT · KARAOKÊ · TTS NATIVO"
4. Browser gallery — biblioteca de aulas
5. Deck + certificado export

CanopyIntro é compartilhado entre 6 showcases.
