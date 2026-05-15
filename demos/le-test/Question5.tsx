'use client'

import { useCallback } from 'react'
import { getExamLayoutProps } from './exam-layout-props'
import type { ExamQuestionProps } from './questions-meta'
import { pickRandomStretch } from './stretch-utils'
import { useAutoDraw } from './useAutoDraw'
import QuestionLayout from './QuestionLayout'
import { StretchCard, StretchTitleBlock } from './StretchDisplay'

export default function Question5(props: ExamQuestionProps = {}) {
  const layout = getExamLayoutProps(props)
  const pick = useCallback(
    (excludeId?: string) => pickRandomStretch({ excludeId }),
    [],
  )
  const { current, revealed, reveal, redraw } = useAutoDraw(pick, (s) => s.id, {
    initialRevealed: layout.autoReveal,
  })

  if (!current) return null

  return (
    <QuestionLayout
      hint="已随机抽取一个静态拉伸动作，请先自答，再查看参考答案"
      title={
        <StretchTitleBlock
          stretch={current}
          prompt="请说出该静态拉伸的锻炼目的、起始位置、发力方向、拉伸强度与时间、读秒、注意事项及调整目的"
        />
      }
      answer={<StretchCard stretch={current} />}
      revealed={revealed}
      onReveal={reveal}
      onRedraw={redraw}
      {...layout}
    />
  )
}
