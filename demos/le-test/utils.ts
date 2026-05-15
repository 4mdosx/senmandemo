import exerciseData from './exercises.json'
import type { Exercise, ExerciseData, MuscleTag } from './types'
import { MUSCLE_TAGS } from './types'

const data = exerciseData as ExerciseData

export const exercises: Exercise[] = data.exercises
export const targetMusclesTag = data.targetMusclesTag
export { MUSCLE_TAGS }

const exerciseById = new Map(exercises.map((e) => [e.id, e]))

export function getExerciseById(id: string): Exercise | undefined {
  return exerciseById.get(id)
}

export function getExercisesByTag(tag: MuscleTag): Exercise[] {
  return targetMusclesTag[tag]
    .map((id) => exerciseById.get(id))
    .filter((e): e is Exercise => e !== undefined)
}

export function pickRandomExercise(
  options?: { excludeId?: string; tag?: MuscleTag },
): Exercise {
  const { excludeId, tag } = options ?? {}
  const base = tag ? getExercisesByTag(tag) : exercises
  const pool =
    excludeId && base.length > 1
      ? base.filter((e) => e.id !== excludeId)
      : base
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}
