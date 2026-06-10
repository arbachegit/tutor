'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useSlideContext } from './SlideEngine'

const UPCAP = 1.0   // §6.5: NEVER amplify — scale only REDUCES
const FLOOR = 0.15

export default function SlideFrame({ index, children }: { index: number; children: ReactNode }) {
  const { currentSlide, seenSlides } = useSlideContext()
  const stageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(1)
  const [scale, setScale] = useState(1)
  const readyRef = useRef(false)
  const [ready, setReady] = useState(false)
  const measuringRef = useRef(false)

  const fit = useCallback(() => {
    if (measuringRef.current) return
    const stage = stageRef.current, content = contentRef.current
    if (!stage || !content) return
    const cs = getComputedStyle(stage)
    const availW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    const availH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)

    // §6.18: height:auto trick to measure real content height
    measuringRef.current = true
    content.style.height = 'auto'
    content.style.alignSelf = 'flex-start'
    const natW = content.scrollWidth
    const natH = content.scrollHeight
    content.style.alignSelf = ''
    content.style.height = ''
    measuringRef.current = false

    if (natW <= 0 || natH <= 0 || availW <= 0 || availH <= 0) return
    const scaleW = natW > availW ? availW / natW : 1
    const scaleH = natH > availH ? availH / natH : 1
    const next = Math.max(FLOOR, Math.min(UPCAP, Math.min(scaleW, scaleH)))
    if (Math.abs(next - scaleRef.current) > 0.004) { scaleRef.current = next; setScale(next) }
    if (!readyRef.current) { readyRef.current = true; setReady(true) }
  }, [])

  useLayoutEffect(() => { fit() }, [fit])
  useEffect(() => {
    fit()
    const ro = new ResizeObserver(() => { if (!measuringRef.current) fit() })
    if (contentRef.current) ro.observe(contentRef.current)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', fit)
    ;(document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready.then(() => fit())
    const safety = setTimeout(() => { if (!readyRef.current) { readyRef.current = true; setReady(true) } }, 400)
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); clearTimeout(safety) }
  }, [fit])
  useEffect(() => {
    if (currentSlide === index) {
      const t1 = setTimeout(fit, 60), t2 = setTimeout(fit, 300)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [currentSlide, index, fit])

  return (
    <section className="slide" data-active={currentSlide === index} data-seen={seenSlides.has(index)} data-index={index}>
      <div className="slide-band">
        <div ref={stageRef} className="slide-stage">
          <div ref={contentRef} className="slide-content"
            style={{ transform: scale < 1 ? `scale(${scale})` : undefined,
                     visibility: ready ? undefined : 'hidden',
                     opacity: ready ? 1 : 0, transition: 'opacity 0.18s ease' }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

// Named export alias for backward compat with existing imports
export { SlideFrame as Slide }
