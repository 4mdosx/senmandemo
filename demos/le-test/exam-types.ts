import type { QuestionNumber } from './questions-meta'

export interface QuestionTiming {
  number: QuestionNumber
  title: string
  durationMs: number
}
