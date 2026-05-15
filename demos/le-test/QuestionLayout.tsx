'use client'

import { Button } from '@/ui/button'

interface QuestionLayoutProps {
  hint: string
  title: React.ReactNode
  /** 作答时始终展示的内容（如动作要点） */
  visibleContent?: React.ReactNode
  answer: React.ReactNode
  revealed: boolean
  onReveal: () => void
  onRedraw: () => void
  revealLabel?: string
  /** 模拟考：隐藏再抽一题，显示下一题 */
  examMode?: boolean
  onNext?: () => void
  isLast?: boolean
  autoReveal?: boolean
}

export default function QuestionLayout({
  hint,
  title,
  visibleContent,
  answer,
  revealed,
  onReveal,
  onRedraw,
  revealLabel = '查看答案',
  examMode = false,
  onNext,
  isLast = false,
  autoReveal = false,
}: QuestionLayoutProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{hint}</p>

      <div className="rounded-lg border bg-muted/30 p-4 md:p-6 space-y-6">
        {title}

        {visibleContent}

        {!revealed && !autoReveal ? (
          <Button
            variant="outline"
            onClick={onReveal}
            className="w-full sm:w-auto"
          >
            {revealLabel}
          </Button>
        ) : (
          <div className="border-t pt-4">{answer}</div>
        )}
      </div>

      {examMode ? (
        onNext && (
          <Button onClick={onNext} className="w-full sm:w-auto" size="lg">
            {isLast ? '完成考试，查看结算' : '下一题'}
          </Button>
        )
      ) : (
        <Button onClick={onRedraw} className="w-full sm:w-auto" size="lg">
          再抽一题
        </Button>
      )}
    </div>
  )
}
