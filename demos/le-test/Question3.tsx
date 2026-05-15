'use client'

import { useCallback } from 'react'
import { getExamLayoutProps } from './exam-layout-props'
import type { ExamQuestionProps } from './questions-meta'
import { pickRandomExercise } from './utils'
import type { Exercise } from './types'
import { useAutoDraw } from './useAutoDraw'
import QuestionLayout from './QuestionLayout'

function ProgressionAnswer({ exercise }: { exercise: Exercise }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>
        <span className="font-semibold text-muted-foreground">进阶：</span>
        {exercise.progression || '—'}
      </p>
      <p>
        <span className="font-semibold text-muted-foreground">退阶：</span>
        {exercise.regression.filter(Boolean).join('、') || '—'}
      </p>
    </div>
  )
}

function ProgressionTitle({ exercise }: { exercise: Exercise }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">动作</p>
      <h2 className="text-2xl font-bold">
        {exercise.name}
        {exercise.starred && (
          <span className="ml-1 text-amber-500" aria-label="重点动作">
            ★
          </span>
        )}
      </h2>
      <p className="mt-4 text-sm font-medium">
        请回答：该动作的<strong>进阶</strong>（1 个）与<strong>退阶</strong>
        （2 个）分别是什么？
      </p>
    </div>
  )
}

export default function Question3(props: ExamQuestionProps = {}) {
  const layout = getExamLayoutProps(props)
  const pick = useCallback(
    (excludeId?: string) => pickRandomExercise({ excludeId }),
    [],
  )
  const { current, revealed, reveal, redraw } = useAutoDraw(pick, (e) => e.id, {
    initialRevealed: layout.autoReveal,
  })

  if (!current) return null

  return (
    <QuestionLayout
      hint="已随机抽取一个动作，请先自答进退阶，再查看参考答案"
      title={<ProgressionTitle exercise={current} />}
      answer={<ProgressionAnswer exercise={current} />}
      revealed={revealed}
      onReveal={reveal}
      onRedraw={redraw}
      {...layout}
    />
  )
}
