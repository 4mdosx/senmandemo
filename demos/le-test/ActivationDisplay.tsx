import { getAdjustmentProblemById } from './adjustment-utils'
import type { FoamRollerStartingPosition, RegionActivation } from './types'

const STARTING_POSITION_LABELS: {
  key: keyof FoamRollerStartingPosition
  label: string
}[] = [
  { key: 'sideNote', label: '示例' },
  { key: 'posture', label: '姿态' },
  { key: 'upperBody', label: '上肢' },
  { key: 'lowerBody', label: '下肢' },
  { key: 'movement', label: '运动' },
]

function StartingPositionBlock({
  position,
}: {
  position: FoamRollerStartingPosition
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

export function ActivationCard({ activation }: { activation: RegionActivation }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        <span className="font-semibold text-muted-foreground">目标肌群：</span>
        {activation.targetMuscle}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">锻炼目的：</span>
        {activation.purpose}
      </p>

      <StartingPositionBlock position={activation.startingPosition} />

      <p>
        <span className="font-semibold text-muted-foreground">难度改善：</span>
        {activation.difficultyProgression}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">针对人群：</span>
        {activation.targetPopulation}
      </p>

      {activation.relatedIssues.length > 0 && (
        <p>
          <span className="font-semibold text-muted-foreground">关联问题：</span>
          {activation.relatedIssues
            .map((id) => getAdjustmentProblemById(id) ?? id)
            .join('、')}
        </p>
      )}
    </div>
  )
}

export function ActivationTitleBlock({
  activation,
  prompt,
}: {
  activation: RegionActivation
  prompt: string
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">区域激活</p>
      <h2 className="text-2xl font-bold">
        {activation.name}
        {activation.starred && (
          <span className="ml-1 text-amber-500" aria-label="重点动作">
            ★
          </span>
        )}
      </h2>
      <p className="mt-4 text-sm font-medium">{prompt}</p>
    </div>
  )
}
