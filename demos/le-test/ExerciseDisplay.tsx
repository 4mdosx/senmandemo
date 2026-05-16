import type { Exercise, StartingPosition } from './types'

const STARTING_POSITION_LABELS: {
  key: keyof StartingPosition
  label: string
}[] = [
  { key: 'posture', label: '姿态' },
  { key: 'upperBody', label: '上肢' },
  { key: 'torso', label: '躯干' },
  { key: 'lowerBody', label: '下肢' },
]

function StartingPositionBlock({ position }: { position: StartingPosition }) {
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

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        <span className="font-semibold text-muted-foreground">目标肌群：</span>
        {exercise.targetMuscles.join('、')}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">收益：</span>
        {'提高肌肉的力量和耐力' + (exercise.benefits ? '、' + exercise.benefits : '')}
      </p>

      <StartingPositionBlock position={exercise.startingPosition} />

      <p>
        <span className="font-semibold text-muted-foreground">运动幅度：</span>
        {exercise.rangeOfMotion}
      </p>

      <p>
        <span className="font-semibold text-muted-foreground">呼吸：</span>
        {exercise.breathing}
      </p>

      <div>
        <p className="font-semibold text-muted-foreground mb-2">要点</p>
        <ul className="space-y-1 pl-4 list-disc">
          {exercise.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      {(exercise.progression || exercise.regression.some(Boolean)) && (
        <div className="space-y-2 text-muted-foreground">
          {exercise.progression && (
            <p>
              <span className="font-semibold">进阶：</span>
              {exercise.progression}
            </p>
          )}
          <p>
            <span className="font-semibold">退阶：</span>
            {exercise.regression.join('、')}
          </p>
        </div>
      )}
    </div>
  )
}

export function ExerciseTitleBlock({
  exercise,
  prompt,
}: {
  exercise: Exercise
  prompt: string
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">动作</p>
      <h2 className="text-2xl font-bold">
        {exercise.name}
        {exercise.starred && (
          <span className="ml-1 text-amber-500" aria-label="重点动作">
            ★
          </span>
        )}
      </h2>
      <p className="mt-4 text-sm font-medium">{prompt}</p>
    </div>
  )
}
