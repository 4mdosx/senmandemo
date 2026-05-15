'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { ActivationCard } from './ActivationDisplay'
import { ExerciseCard } from './ExerciseDisplay'
import { FoamRollerCard } from './FoamRollerDisplay'
import { StretchCard } from './StretchDisplay'
import {
  activations,
  ACTIVATION_TAGS,
  getActivationsByTag,
} from './activation-utils'
import { foamRollerReleases } from './foam-roller-utils'
import { stretches } from './stretch-utils'
import { exercises, getExercisesByTag, MUSCLE_TAGS } from './utils'
import type { ActivationTag, Exercise, MuscleTag } from './types'
import type { FoamRollerRelease, RegionActivation, StaticStretch } from './types'

const LIBRARY_TABS = [
  { id: 'training', label: '训练动作' },
  { id: 'foam-roller', label: '筋膜松解' },
  { id: 'activation', label: '区域激活' },
  { id: 'stretch', label: '自主伸展' },
] as const

type LibraryTab = (typeof LIBRARY_TABS)[number]['id']

function StarBadge({ starred }: { starred: boolean }) {
  if (!starred) return null
  return (
    <span className="ml-1 text-amber-500" aria-label="重点动作">
      ★
    </span>
  )
}

function LibraryCard({
  title,
  starred,
  children,
}: {
  title: string
  starred: boolean
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {title}
          <StarBadge starred={starred} />
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function TrainingTab() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        共 {exercises.length} 个动作，按目标肌群分组
      </p>
      {MUSCLE_TAGS.map((tag) => (
        <TrainingTagSection key={tag} tag={tag} />
      ))}
    </div>
  )
}

function TrainingTagSection({ tag }: { tag: MuscleTag }) {
  const tagExercises = getExercisesByTag(tag)

  return (
    <section className="space-y-3">
      <h3 className="text-base font-bold">{tag}</h3>
      <ul className="space-y-3">
        {tagExercises.map((exercise) => (
          <li key={exercise.id}>
            <TrainingItem exercise={exercise} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function TrainingItem({ exercise }: { exercise: Exercise }) {
  return (
    <LibraryCard title={exercise.name} starred={exercise.starred}>
      <ExerciseCard exercise={exercise} />
    </LibraryCard>
  )
}

function FoamRollerTab() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        共 {foamRollerReleases.length} 个筋膜松解动作
      </p>
      <ul className="space-y-3">
        {foamRollerReleases.map((release) => (
          <li key={release.id}>
            <FoamRollerItem release={release} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FoamRollerItem({ release }: { release: FoamRollerRelease }) {
  return (
    <LibraryCard title={release.name} starred={release.starred}>
      <FoamRollerCard release={release} />
    </LibraryCard>
  )
}

function ActivationTab() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        共 {activations.length} 个区域激活动作，按肌群分组
      </p>
      {ACTIVATION_TAGS.map((tag) => (
        <ActivationTagSection key={tag} tag={tag} />
      ))}
    </div>
  )
}

function ActivationTagSection({ tag }: { tag: ActivationTag }) {
  const tagActivations = getActivationsByTag(tag)

  return (
    <section className="space-y-3">
      <h3 className="text-base font-bold">{tag}</h3>
      <ul className="space-y-3">
        {tagActivations.map((activation) => (
          <li key={activation.id}>
            <ActivationItem activation={activation} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ActivationItem({ activation }: { activation: RegionActivation }) {
  return (
    <LibraryCard title={activation.name} starred={activation.starred}>
      <ActivationCard activation={activation} />
    </LibraryCard>
  )
}

function StretchTab() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        共 {stretches.length} 个自主伸展动作
      </p>
      <ul className="space-y-3">
        {stretches.map((stretch) => (
          <li key={stretch.id}>
            <StretchItem stretch={stretch} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function StretchItem({ stretch }: { stretch: StaticStretch }) {
  return (
    <LibraryCard title={stretch.name} starred={stretch.starred}>
      <StretchCard stretch={stretch} />
    </LibraryCard>
  )
}

export default function ExerciseLibrary() {
  const [tab, setTab] = useState<LibraryTab>('training')

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="动作库分类"
        className="flex flex-wrap gap-2"
      >
        {LIBRARY_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === id
                ? 'border-black bg-black text-white'
                : 'border-black/20 bg-white hover:border-black'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'training' && <TrainingTab />}
        {tab === 'foam-roller' && <FoamRollerTab />}
        {tab === 'activation' && <ActivationTab />}
        {tab === 'stretch' && <StretchTab />}
      </div>
    </div>
  )
}
