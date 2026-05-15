'use client'

import { useCallback } from 'react'
import { getExamLayoutProps } from './exam-layout-props'
import type { ExamQuestionProps } from './questions-meta'
import { pickRandomFoamRollerRelease } from './foam-roller-utils'
import { useAutoDraw } from './useAutoDraw'
import QuestionLayout from './QuestionLayout'
import { FoamRollerCard, FoamRollerTitleBlock } from './FoamRollerDisplay'

export default function Question6(props: ExamQuestionProps = {}) {
  const layout = getExamLayoutProps(props)
  const pick = useCallback(
    (excludeId?: string) => pickRandomFoamRollerRelease({ excludeId }),
    [],
  )
  const { current, revealed, reveal, redraw } = useAutoDraw(pick, (r) => r.id, {
    initialRevealed: layout.autoReveal,
  })

  if (!current) return null

  return (
    <QuestionLayout
      hint="已随机抽取一个泡沫轴松解动作，请先自答，再查看参考答案"
      title={
        <FoamRollerTitleBlock
          release={current}
          prompt="请说出该泡沫轴松解的目标肌群、锻炼目的、起始位置、运动方式、难度改善及针对人群"
        />
      }
      answer={<FoamRollerCard release={current} />}
      revealed={revealed}
      onReveal={reveal}
      onRedraw={redraw}
      {...layout}
    />
  )
}
