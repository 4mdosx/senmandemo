'use client'

import { useCallback } from 'react'
import { getExamLayoutProps } from './exam-layout-props'
import type { ExamQuestionProps } from './questions-meta'
import { pickRandomExercise } from './utils'
import { useAutoDraw } from './useAutoDraw'
import QuestionLayout from './QuestionLayout'
import { ExerciseCard, ExerciseTitleBlock } from './ExerciseDisplay'

export default function Question1(props: ExamQuestionProps = {}) {
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
      hint="已随机抽取一个动作，请先自答，再查看参考答案"
      title={
        <ExerciseTitleBlock
          exercise={current}
          prompt="请说出该动作的目标肌群、收益、运动幅度、呼吸、要点及进退阶"
        />
      }
      answer={<ExerciseCard exercise={current} />}
      revealed={revealed}
      onReveal={reveal}
      onRedraw={redraw}
      {...layout}
    />
  )
}
