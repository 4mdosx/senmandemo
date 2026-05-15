'use client'

import { useEffect, useState } from 'react'
import { formatDuration } from './format-duration'
import { EXAM_DURATION_MS, QUESTIONS, TOTAL_QUESTIONS } from './questions-meta'
import type { QuestionNumber } from './questions-meta'

interface MockExamProgressProps {
  remainingMs: number
  currentQuestion: QuestionNumber
  questionTimes: number[]
  questionStartedAt: number
}

const SEGMENT_TARGET_MS = EXAM_DURATION_MS / TOTAL_QUESTIONS

export default function MockExamProgress({
  remainingMs,
  currentQuestion,
  questionTimes,
  questionStartedAt,
}: MockExamProgressProps) {
  const [currentElapsed, setCurrentElapsed] = useState(0)

  useEffect(() => {
    const tick = () => setCurrentElapsed(Date.now() - questionStartedAt)
    tick()
    const id = window.setInterval(tick, 200)
    return () => window.clearInterval(id)
  }, [questionStartedAt])

  const countdownPercent = Math.max(
    0,
    Math.min(100, (remainingMs / EXAM_DURATION_MS) * 100),
  )
  const isUrgent = remainingMs <= 60_000

  const segmentDurations = QUESTIONS.map((_, index) => {
    if (index < questionTimes.length) return questionTimes[index]!
    if (index === questionTimes.length) return currentElapsed
    return 0
  })

  return (
    <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
      <div>
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="font-medium">考试倒计时</span>
          <span
            className={`tabular-nums font-bold ${isUrgent ? 'text-red-600' : 'text-foreground'}`}
          >
            {formatDuration(remainingMs)}
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isUrgent ? 'bg-red-500' : 'bg-black'
            }`}
            style={{ width: `${countdownPercent}%` }}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">分段计时</p>
        <div className="flex gap-1">
          {QUESTIONS.map((q, index) => {
            const durationMs = segmentDurations[index] ?? 0
            const isCurrent = q.number === currentQuestion
            const isDone = index < questionTimes.length
            const fillPercent = Math.min(
              100,
              (durationMs / SEGMENT_TARGET_MS) * 100,
            )

            return (
              <div key={q.number} className="min-w-0 flex-1">
                <div
                  className={`h-2 overflow-hidden rounded-sm bg-muted ${
                    isCurrent ? 'ring-2 ring-black ring-offset-1' : ''
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-200 ${
                      isDone
                        ? 'bg-black/70'
                        : isCurrent
                          ? 'bg-black'
                          : 'bg-transparent'
                    }`}
                    style={{
                      width: isDone || isCurrent ? `${fillPercent}%` : '0%',
                    }}
                  />
                </div>
                <p
                  className={`mt-1 truncate text-center text-[10px] leading-tight ${
                    isCurrent ? 'font-bold' : 'text-muted-foreground'
                  }`}
                >
                  Q{q.number}
                </p>
                {(isDone || isCurrent) && (
                  <p className="text-center text-[10px] tabular-nums text-muted-foreground">
                    {formatDuration(durationMs)}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
