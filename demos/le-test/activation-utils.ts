import activationData from './activation.json'
import type { ActivationData, ActivationTag, RegionActivation } from './types'
import { ACTIVATION_TAGS } from './types'

const data = activationData as ActivationData

export const activations: RegionActivation[] = data.activations
export const activationTag = data.activationTag
export { ACTIVATION_TAGS }

const activationById = new Map(activations.map((a) => [a.id, a]))

export function getActivationById(id: string): RegionActivation | undefined {
  return activationById.get(id)
}

export function getActivationsByTag(tag: ActivationTag): RegionActivation[] {
  return activationTag[tag]
    .map((id) => activationById.get(id))
    .filter((a): a is RegionActivation => a !== undefined)
}
