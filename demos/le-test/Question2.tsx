'use client'

import { useCallback } from 'react'
import { getExamLayoutProps } from './exam-layout-props'
import type { ExamQuestionProps } from './questions-meta'
import { pickRandomAdjustmentIssue } from './adjustment-utils'
import type { AdjustmentIssue } from './adjustment-types'
import { useAutoDraw } from './useAutoDraw'
import QuestionLayout from './QuestionLayout'

function IssueAnswer({ issue }: { issue: AdjustmentIssue }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      {issue.solutions.map((solution) => (
        <div key={solution.label}>
          <p className="font-semibold text-muted-foreground mb-2">
            {solution.label}
          </p>
          <ul className="space-y-1 pl-4 list-disc">
            {solution.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function IssueTitle({ issue }: { issue: AdjustmentIssue }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">问题</p>
      <h2 className="text-2xl font-bold">{issue.problem}</h2>
      <p className="mt-4 text-sm font-medium">
        请说出该问题的调整思路与具体解决方案
      </p>
    </div>
  )
}

export default function Question2(props: ExamQuestionProps = {}) {
  const layout = getExamLayoutProps(props)
  const pick = useCallback(
    (excludeId?: string) => pickRandomAdjustmentIssue(excludeId),
    [],
  )
  const { current, revealed, reveal, redraw } = useAutoDraw(pick, (i) => i.id, {
    initialRevealed: layout.autoReveal,
  })

  if (!current) return null

  return (
    <QuestionLayout
      hint="已随机抽取一个常见问题，请先自答，再查看参考答案"
      title={<IssueTitle issue={current} />}
      answer={<IssueAnswer issue={current} />}
      revealed={revealed}
      onReveal={reveal}
      onRedraw={redraw}
      {...layout}
    />
  )
}
