import stretchData from './stretches.json'
import type { StaticStretch, StretchData } from './types'

const data = stretchData as StretchData

export const stretches: StaticStretch[] = data.stretches

const stretchById = new Map(stretches.map((s) => [s.id, s]))

export function getStretchById(id: string): StaticStretch | undefined {
  return stretchById.get(id)
}

export function pickRandomStretch(options?: {
  excludeId?: string
}): StaticStretch {
  const { excludeId } = options ?? {}
  const pool =
    excludeId && stretches.length > 1
      ? stretches.filter((s) => s.id !== excludeId)
      : stretches
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}
