import type { StaticStretch, StretchStartingPosition } from './types'

const STARTING_POSITION_LABELS: {
  key: keyof StretchStartingPosition
  label: string
}[] = [
  { key: 'posture', label: '姿态' },
  { key: 'upperBody', label: '上肢' },
  { key: 'torso', label: '躯干' },
  { key: 'lowerBody', label: '下肢' },
]

function StartingPositionBlock({
  position,
}: {
  position: StretchStartingPosition
}) {
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
        {stretch.intensityAndDuration}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">读秒：</span>
        {stretch.durationSeconds}S
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">注意事项：</span>
        {stretch.precautions}
      </p>

      {stretch.adjustmentPurpose && (
        <p>
          <span className="font-semibold text-muted-foreground">调整目的：</span>
          {stretch.adjustmentPurpose}
        </p>
      )}
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
