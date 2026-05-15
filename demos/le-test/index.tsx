'use client'

import { useState } from 'react'
import { ArrowLeft, BookOpen, ClipboardList, Layers } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import ExerciseLibrary from './ExerciseLibrary'
import MockExamScreen from './MockExamScreen'
import Question1 from './Question1'
import Question2 from './Question2'
import Question3 from './Question3'
import Question4 from './Question4'
import Question5 from './Question5'
import Question6 from './Question6'
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  type QuestionNumber,
} from './questions-meta'

type Screen = QuestionNumber | 'library' | 'mock-exam' | 'practice'

function HomeCard({
  icon,
  title,
  description,
  onClick,
  variant = 'default',
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  variant?: 'primary' | 'default' | 'muted'
}) {
  const styles = {
    primary:
      'border-black bg-black text-white hover:bg-black/90',
    default:
      'border-black bg-white hover:bg-black hover:text-white',
    muted:
      'border-black/30 bg-muted/20 hover:border-black hover:bg-black hover:text-white',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border-2 p-4 text-left transition-colors ${styles[variant]}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 opacity-80">{icon}</span>
        <div>
          <p className="font-bold">{title}</p>
          <p className="mt-1 text-sm opacity-80">{description}</p>
        </div>
      </div>
    </button>
  )
}

function EntryPage({
  onOpenMockExam,
  onOpenLibrary,
  onOpenPractice,
}: {
  onOpenMockExam: () => void
  onOpenLibrary: () => void
  onOpenPractice: () => void
}) {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          模拟考
        </h2>
        <HomeCard
          variant="primary"
          icon={<ClipboardList className="h-5 w-5" />}
          title="模拟考"
          description="8 分钟连续完成 6 道题，支持简单/普通模式，分段计时"
          onClick={onOpenMockExam}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          动作库
        </h2>
        <HomeCard
          variant="muted"
          icon={<BookOpen className="h-5 w-5" />}
          title="动作库"
          description="训练动作、筋膜松解、区域激活、自主伸展"
          onClick={onOpenLibrary}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          单项练习
        </h2>
        <HomeCard
          variant="default"
          icon={<Layers className="h-5 w-5" />}
          title="单项练习"
          description={`${TOTAL_QUESTIONS} 道题目可单独进入，随机抽题练习`}
          onClick={onOpenPractice}
        />
      </section>
    </div>
  )
}

function PracticeListScreen({
  onSelect,
  onBack,
}: {
  onSelect: (n: QuestionNumber) => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Button>

      <div>
        <h2 className="text-xl font-bold">单项练习</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          共 {TOTAL_QUESTIONS} 道题，选择一题开始练习
        </p>
      </div>

      <ul className="space-y-3">
        {QUESTIONS.map((q) => (
          <li key={q.number}>
            <button
              type="button"
              onClick={() => onSelect(q.number as QuestionNumber)}
              className="w-full rounded-lg border-2 border-black bg-white p-4 text-left transition-colors hover:bg-black hover:text-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">
                    第 {q.number} 题 · {q.title}
                  </p>
                  <p className="mt-1 text-sm opacity-80">{q.description}</p>
                </div>
                {!q.ready && (
                  <span className="shrink-0 rounded border border-current px-2 py-0.5 text-xs font-medium">
                    待开放
                  </span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LibraryScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Button>
      <div>
        <h2 className="text-xl font-bold">动作库</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          全部考核动作，按分类浏览
        </p>
      </div>
      <ExerciseLibrary />
    </div>
  )
}

function QuestionScreen({
  number,
  onBack,
}: {
  number: QuestionNumber
  onBack: () => void
}) {
  const meta = QUESTIONS[number - 1]

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        返回题目列表
      </Button>

      <div>
        <p className="text-sm text-muted-foreground">
          单项练习 · 第 {number} / {TOTAL_QUESTIONS} 题
        </p>
        <h2 className="mt-1 text-xl font-bold">{meta.title}</h2>
      </div>

      {number === 1 && <Question1 key={number} />}
      {number === 2 && <Question2 key={number} />}
      {number === 3 && <Question3 key={number} />}
      {number === 4 && <Question4 key={number} />}
      {number === 5 && <Question5 key={number} />}
      {number === 6 && <Question6 key={number} />}
    </div>
  )
}

export default function LeTestDemo() {
  const [screen, setScreen] = useState<Screen | null>(null)

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">健身教练考核</CardTitle>
          {screen === null && (
            <p className="text-sm text-muted-foreground">
              模拟考 · 动作库 · 单项练习
            </p>
          )}
        </CardHeader>
        <CardContent>
          {screen === null ? (
            <EntryPage
              onOpenMockExam={() => setScreen('mock-exam')}
              onOpenLibrary={() => setScreen('library')}
              onOpenPractice={() => setScreen('practice')}
            />
          ) : screen === 'mock-exam' ? (
            <MockExamScreen onBack={() => setScreen(null)} />
          ) : screen === 'library' ? (
            <LibraryScreen onBack={() => setScreen(null)} />
          ) : screen === 'practice' ? (
            <PracticeListScreen
              onSelect={setScreen}
              onBack={() => setScreen(null)}
            />
          ) : (
            <QuestionScreen
              number={screen}
              onBack={() => setScreen('practice')}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
