'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/ui/button'
import { formatDuration } from './format-duration'
import type { QuestionTiming } from './exam-types'
import MockExamProgress from './MockExamProgress'
import Question1 from './Question1'
import Question2 from './Question2'
import Question3 from './Question3'
import Question4 from './Question4'
import Question5 from './Question5'
import Question6 from './Question6'
import {
  EXAM_DURATION_MS,
  QUESTIONS,
  TOTAL_QUESTIONS,
  type ExamMode,
  type QuestionNumber,
} from './questions-meta'

type Phase = 'setup' | 'exam' | 'results'

function ModeOption({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border-2 p-4 text-left transition-colors ${
        selected
          ? 'border-black bg-black text-white'
          : 'border-black/20 bg-white hover:border-black'
      }`}
    >
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm opacity-80">{description}</p>
    </button>
  )
}

function ExamSetup({
  mode,
  onModeChange,
  onStart,
  onBack,
}: {
  mode: ExamMode
  onModeChange: (mode: ExamMode) => void
  onStart: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Button>

      <div>
        <h2 className="text-xl font-bold">模拟考</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          连续完成第 1–6 题，总时长 {formatDuration(EXAM_DURATION_MS)}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">选择模式</p>
        <ModeOption
          selected={mode === 'simple'}
          onSelect={() => onModeChange('simple')}
          title="简单模式"
          description="进入每题后直接展示参考答案，适合复习"
        />
        <ModeOption
          selected={mode === 'normal'}
          onSelect={() => onModeChange('normal')}
          title="普通模式"
          description="需手动点击查看答案，更接近真实考核"
        />
      </div>

      <Button onClick={onStart} className="w-full" size="lg">
        开始考试
      </Button>
    </div>
  )
}

function ExamResults({
  results,
  totalMs,
  onBack,
}: {
  results: QuestionTiming[]
  totalMs: number
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">考试结算</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          总用时 {formatDuration(totalMs)}
        </p>
      </div>

      <ul className="space-y-3">
        {results.map((item) => (
          <li
            key={item.number}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-bold">
                第 {item.number} 题 · {item.title}
              </p>
            </div>
            <p className="shrink-0 tabular-nums text-lg font-bold">
              {formatDuration(item.durationMs)}
            </p>
          </li>
        ))}
      </ul>

      <Button onClick={onBack} className="w-full" size="lg">
        返回首页
      </Button>
    </div>
  )
}

function ExamQuestion({
  number,
  examProps,
}: {
  number: QuestionNumber
  examProps: { examMode: ExamMode; onNext: () => void; isLast: boolean }
}) {
  switch (number) {
    case 1:
      return <Question1 key={number} {...examProps} />
    case 2:
      return <Question2 key={number} {...examProps} />
    case 3:
      return <Question3 key={number} {...examProps} />
    case 4:
      return <Question4 key={number} {...examProps} />
    case 5:
      return <Question5 key={number} {...examProps} />
    case 6:
      return <Question6 key={number} {...examProps} />
    default:
      return null
  }
}

export default function MockExamScreen({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = useState<ExamMode>('normal')
  const [currentQuestion, setCurrentQuestion] = useState<QuestionNumber>(1)
  const [examEndsAt, setExamEndsAt] = useState(0)
  const [remainingMs, setRemainingMs] = useState(EXAM_DURATION_MS)
  const [questionStartedAt, setQuestionStartedAt] = useState(0)
  const [questionTimes, setQuestionTimes] = useState<number[]>([])
  const [results, setResults] = useState<QuestionTiming[]>([])

  useEffect(() => {
    if (phase !== 'exam' || examEndsAt === 0) return
    const tick = () => setRemainingMs(Math.max(0, examEndsAt - Date.now()))
    tick()
    const id = window.setInterval(tick, 200)
    return () => window.clearInterval(id)
  }, [phase, examEndsAt])

  const startExam = () => {
    const now = Date.now()
    setPhase('exam')
    setCurrentQuestion(1)
    setExamEndsAt(now + EXAM_DURATION_MS)
    setRemainingMs(EXAM_DURATION_MS)
    setQuestionStartedAt(now)
    setQuestionTimes([])
    setResults([])
  }

  const handleNext = useCallback(() => {
    const now = Date.now()
    const elapsed = now - questionStartedAt
    const newTimes = [...questionTimes, elapsed]

    if (currentQuestion === 6) {
      setResults(
        QUESTIONS.map((q, i) => ({
          number: q.number as QuestionNumber,
          title: q.title,
          durationMs: newTimes[i] ?? 0,
        })),
      )
      setQuestionTimes(newTimes)
      setPhase('results')
      return
    }

    setQuestionTimes(newTimes)
    setCurrentQuestion((currentQuestion + 1) as QuestionNumber)
    setQuestionStartedAt(now)
  }, [currentQuestion, questionStartedAt, questionTimes])

  const examProps = {
    examMode: mode,
    onNext: handleNext,
    isLast: currentQuestion === 6,
  }

  const meta = QUESTIONS[currentQuestion - 1]
  const totalMs = results.reduce((sum, r) => sum + r.durationMs, 0)

  if (phase === 'setup') {
    return (
      <ExamSetup
        mode={mode}
        onModeChange={setMode}
        onStart={startExam}
        onBack={onBack}
      />
    )
  }

  if (phase === 'results') {
    return <ExamResults results={results} totalMs={totalMs} onBack={onBack} />
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        退出模拟考
      </Button>

      <MockExamProgress
        remainingMs={remainingMs}
        currentQuestion={currentQuestion}
        questionTimes={questionTimes}
        questionStartedAt={questionStartedAt}
      />

      <div>
        <p className="text-sm text-muted-foreground">
          第 {currentQuestion} / {TOTAL_QUESTIONS} 题 ·{' '}
          {mode === 'simple' ? '简单模式' : '普通模式'}
        </p>
        <h2 className="mt-1 text-xl font-bold">{meta.title}</h2>
      </div>

      <ExamQuestion number={currentQuestion} examProps={examProps} />
    </div>
  )
}
