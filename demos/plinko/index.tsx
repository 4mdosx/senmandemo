'use client'

// Plinko Demo 主组件
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PlinkoResult, PlinkoEngine } from './types'
import { createPixiApp, createPlinkoEngine } from './pixi-app'

export default function PlinkoDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<PlinkoEngine | null>(null)

  const [ready, setReady] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [ballsInFlight, setBallsInFlight] = useState(0)
  const [lastResult, setLastResult] = useState<PlinkoResult | null>(null)

  const multipliers = useMemo(() => [0.5, 1, 2, 3, 5, 3, 2, 1, 0.5], [])

  useEffect(() => {
    let disposed = false
    let cleanup: null | (() => void) = null

    ;(async () => {
      const host = stageRef.current
      if (!host) return

      if (disposed) return

      const { app, canvas } = await createPixiApp(host)
      if (disposed) {
        app.destroy(true)
        return
      }

      // Replace any previous canvas
      host.replaceChildren(canvas)

      const engine = createPlinkoEngine({
        app,
        multipliers,
        onResult: (r) => setLastResult(r),
        onStats: (s) => setBallsInFlight(s.ballsInFlight),
      })

      engine.setSpeed(speed)

      engineRef.current = engine
      setReady(true)

      const ro = new ResizeObserver(() => {
        const w = host.clientWidth
        const h = host.clientHeight
        engine.resize(w, h)
      })
      ro.observe(host)

      cleanup = () => {
        ro.disconnect()
        engine.destroy()
        app.destroy(true)
        engineRef.current = null
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    engineRef.current?.setSpeed(speed)
  }, [speed])

  return (
    <main className="min-h-full p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        <section className="col-span-12 lg:col-span-8 border-2 border-black bg-white relative overflow-hidden min-h-[60vh]">
          <div ref={stageRef} className="absolute inset-0" />
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-black bg-white px-4 py-2 font-bold text-sm">
                Loading PixiJS…
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <div className="border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider">
              Balls: {ballsInFlight}
            </div>
            {lastResult && (
              <div className="border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider">
                Slot {lastResult.slotIndex + 1} • x{lastResult.multiplier}
              </div>
            )}
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 border-2 border-black bg-white p-4 md:p-6">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                PLINKO
              </div>
              <div className="text-xs text-black/70 mt-1">
                Drop balls into the slots.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="border-2 border-black bg-white px-4 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors"
                onClick={() => engineRef.current?.drop(1)}
              >
                Drop
              </button>
              <button
                className="border-2 border-black bg-white px-4 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors"
                onClick={() => engineRef.current?.drop(10)}
              >
                Drop x10
              </button>
              <button
                className="border-2 border-black bg-white px-4 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors"
                onClick={() => engineRef.current?.reset()}
              >
                Reset
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black">
                Speed ({speed.toFixed(2)}x)
              </label>
              <input
                className="w-full accent-black"
                type="range"
                min={0.25}
                max={2.5}
                step={0.05}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="border-t-2 border-black pt-4">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-black mb-2">
                Slots
              </div>
              <div className="flex flex-wrap gap-2">
                {multipliers.map((m, i) => (
                  <div
                    key={i}
                    className="border-2 border-black bg-white px-2 py-1 text-xs font-bold"
                  >
                    {i + 1}: x{m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
