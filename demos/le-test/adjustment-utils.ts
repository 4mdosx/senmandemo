import adjustmentData from './adjustment-issues.json'
import type { AdjustmentIssue, AdjustmentIssueData } from './adjustment-types'

const data = adjustmentData as AdjustmentIssueData

export const adjustmentIssues: AdjustmentIssue[] = data.issues
export const adjustmentTitle = data.title

export function getAdjustmentProblemById(id: string): string | undefined {
  return adjustmentIssues.find((issue) => issue.id === id)?.problem
}

export function pickRandomAdjustmentIssue(
  excludeId?: string,
): AdjustmentIssue {
  const pool =
    excludeId && adjustmentIssues.length > 1
      ? adjustmentIssues.filter((issue) => issue.id !== excludeId)
      : adjustmentIssues
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}
