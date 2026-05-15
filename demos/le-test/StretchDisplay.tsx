import type { StaticStretch, StretchStartingPosition } from './types'

const STARTING_POSITION_LABELS: {
  key: keyof StretchStartingPosition
  label: string
}[] = [
  { key: 'sideNote', label: '示例' },
  { key: 'posture', label: '姿态' },
  { key: 'upperBody', label: '上肢' },
  { key: 'torso', label: '躯干' },
  { key: 'lowerBody', label: '下肢' },
]

function StartingPositionBlock({ position }: { position: StretchStartingPosition }) {
  const entries = STARTING_POSITION_LABELS.filter(({ key }) => position[key])

  if (entries.length === 0) return null

  return (
    <div>
      <p className="font-semibold text-muted-foreground mb-2">起始位置</p>
      <ul className="space-y-1 pl-4 list-disc text-sm leading-relaxed">
        {entries.map(({ key, label }) => (
          <li key={key}>
            <span className="font-medium">{label}：</span>
            {position[key]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function StretchCard({ stretch }: { stretch: StaticStretch }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        <span className="font-semibold text-muted-foreground">目标肌群：</span>
        {stretch.targetMuscle}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">锻炼目的：</span>
        {stretch.purpose}
      </p>

      <StartingPositionBlock position={stretch.startingPosition} />

      <p>
        <span className="font-semibold text-muted-foreground">发力方向：</span>
        {stretch.forceDirection}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">拉伸强度与时间：</span>
        <span className="whitespace-pre-line">{stretch.intensityAndDuration}</span>
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">注意事项：</span>
        {stretch.precautions}
      </p>
    </div>
  )
}

export function StretchTitleBlock({
  stretch,
  prompt,
}: {
  stretch: StaticStretch
  prompt: string
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">静态拉伸</p>
      <h2 className="text-2xl font-bold">
        {stretch.name}
        {stretch.starred && (
          <span className="ml-1 text-amber-500" aria-label="重点动作">
            ★
          </span>
        )}
      </h2>
      <p className="mt-4 text-sm font-medium">{prompt}</p>
    </div>
  )
}
