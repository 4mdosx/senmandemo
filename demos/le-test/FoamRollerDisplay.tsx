import type { FoamRollerMethod, FoamRollerRelease } from './types'

const METHOD_LABELS: {
  key: keyof FoamRollerMethod
  label: string
}[] = [
  { key: 'posture', label: '姿态' },
  { key: 'foamRollerPosition', label: '泡沫轴位置' },
  { key: 'movement', label: '运动' },
]

function MethodBlock({ method }: { method: FoamRollerMethod }) {
  const entries = METHOD_LABELS.filter(({ key }) => method[key])

  if (entries.length === 0) return null

  return (
    <div>
      <p className="font-semibold text-muted-foreground mb-2">方式方法</p>
      <ul className="space-y-1 pl-4 list-disc text-sm leading-relaxed">
        {entries.map(({ key, label }) => (
          <li key={key}>
            <span className="font-medium">{label}：</span>
            {method[key]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FoamRollerCard({ release }: { release: FoamRollerRelease }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        <span className="font-semibold text-muted-foreground">目标肌肉：</span>
        {release.targetMuscle}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">锻炼目的：</span>
        {release.purpose}
      </p>

      <MethodBlock method={release.method} />

      <p>
        <span className="font-semibold text-muted-foreground">读秒：</span>
        {release.durationSeconds}S
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">难度改善：</span>
        {release.difficultyProgression}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">注意事项：</span>
        {release.precautions}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">调整问题：</span>
        {release.adjustmentIssues}
      </p>
    </div>
  )
}

export function FoamRollerTitleBlock({
  release,
  prompt,
}: {
  release: FoamRollerRelease
  prompt: string
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">泡沫轴松解</p>
      <h2 className="text-2xl font-bold">
        {release.name}
        {release.starred && (
          <span className="ml-1 text-amber-500" aria-label="重点动作">
            ★
          </span>
        )}
      </h2>
      <p className="mt-4 text-sm font-medium">{prompt}</p>
    </div>
  )
}
