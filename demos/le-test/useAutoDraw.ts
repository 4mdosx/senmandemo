'use client'

import { useCallback, useEffect, useState } from 'react'

export function useAutoDraw<T>(
  pick: (excludeKey?: string) => T,
  getKey: (item: T) => string,
  options?: { initialRevealed?: boolean },
) {
  const [current, setCurrent] = useState<T | null>(null)
  const [revealed, setRevealed] = useState(options?.initialRevealed ?? false)

  const initialRevealed = options?.initialRevealed ?? false

  const redraw = useCallback(() => {
    setRevealed(initialRevealed)
    setCurrent((prev) => pick(prev ? getKey(prev) : undefined))
  }, [pick, getKey, initialRevealed])

  useEffect(() => {
    setRevealed(initialRevealed)
    setCurrent(pick())
  }, [pick, initialRevealed])

  return {
    current,
    revealed,
    reveal: () => setRevealed(true),
    redraw,
  }
}
