import foamRollerData from './foam-roller.json'
import type { FoamRollerData, FoamRollerRelease } from './types'

const data = foamRollerData as FoamRollerData

export const foamRollerReleases: FoamRollerRelease[] = data.releases

const releaseById = new Map(foamRollerReleases.map((r) => [r.id, r]))

export function getFoamRollerReleaseById(
  id: string,
): FoamRollerRelease | undefined {
  return releaseById.get(id)
}

export function pickRandomFoamRollerRelease(options?: {
  excludeId?: string
}): FoamRollerRelease {
  const { excludeId } = options ?? {}
  const pool =
    excludeId && foamRollerReleases.length > 1
      ? foamRollerReleases.filter((r) => r.id !== excludeId)
      : foamRollerReleases
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}
