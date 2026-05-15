export interface AdjustmentSolution {
  label: string
  items: string[]
}

export interface AdjustmentIssue {
  id: string
  problem: string
  solutions: AdjustmentSolution[]
}

export interface AdjustmentIssueData {
  title: string
  issues: AdjustmentIssue[]
}
