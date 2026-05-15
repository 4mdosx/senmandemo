export interface StartingPosition {
  posture: string
  upperBody: string
  torso: string
  lowerBody: string
}

export interface Exercise {
  id: string
  name: string
  starred: boolean
  targetMuscles: string[]
  benefits: string
  startingPosition: StartingPosition
  rangeOfMotion: string
  breathing: string
  keyPoints: string[]
  progression: string
  regression: [string, string]
}

export const MUSCLE_TAGS = ['肩手臂', '胸', '背', '下肢'] as const

export type MuscleTag = (typeof MUSCLE_TAGS)[number]

export type TargetMusclesTag = Record<MuscleTag, string[]>

export interface ExerciseData {
  targetMusclesTag: TargetMusclesTag
  exercises: Exercise[]
}

export interface StretchStartingPosition {
  sideNote?: string
  posture?: string
  upperBody?: string
  torso?: string
  lowerBody?: string
}

export interface StaticStretch {
  id: string
  name: string
  starred: boolean
  targetMuscle: string
  purpose: string
  startingPosition: StretchStartingPosition
  forceDirection: string
  intensityAndDuration: string
  precautions: string
}

export interface StretchData {
  stretches: StaticStretch[]
}

export interface FoamRollerStartingPosition {
  sideNote?: string
  posture?: string
  upperBody?: string
  lowerBody?: string
  movement?: string
}

export interface FoamRollerRelease {
  id: string
  name: string
  starred: boolean
  targetMuscle: string
  purpose: string
  startingPosition: FoamRollerStartingPosition
  difficultyProgression: string
  targetPopulation: string
}

export interface FoamRollerData {
  releases: FoamRollerRelease[]
}

export const ACTIVATION_TAGS = [
  '核心肌群',
  '肩袖肌群',
  '下斜方与前锯肌',
  '髋关节',
] as const

export type ActivationTag = (typeof ACTIVATION_TAGS)[number]

export type ActivationTagMap = Record<ActivationTag, string[]>

export interface RegionActivation {
  id: string
  name: string
  starred: boolean
  targetMuscle: string
  purpose: string
  startingPosition: FoamRollerStartingPosition
  difficultyProgression: string
  targetPopulation: string
  relatedIssues: string[]
}

export interface ActivationData {
  activationTag: ActivationTagMap
  activations: RegionActivation[]
}
