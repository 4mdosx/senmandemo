export const TOTAL_QUESTIONS = 6

export const EXAM_DURATION_MS = 8 * 60 * 1000

export const QUESTIONS = [
  {
    number: 1,
    title: '动作抽题',
    description: '随机抽取一个动作，展示全部考核要点',
    ready: true,
  },
  {
    number: 2,
    title: '问题调整',
    description: '如何调整训练中的常见问题',
    ready: true,
  },
  {
    number: 3,
    title: '进退阶',
    description: '随机动作，回答进阶与退阶',
    ready: true,
  },
  {
    number: 4,
    title: '动作演示',
    description: '随机动作，学员现场演示并参照要点',
    ready: true,
  },
  {
    number: 5,
    title: '静态拉伸',
    description: '随机抽取一个静态拉伸动作，展示全部考核要点',
    ready: true,
  },
  {
    number: 6,
    title: '泡沫轴松解',
    description: '随机抽取一个泡沫轴松解动作，展示全部考核要点',
    ready: true,
  },
] as const

export type QuestionNumber = 1 | 2 | 3 | 4 | 5 | 6

export type ExamMode = 'simple' | 'normal'

export interface ExamQuestionProps {
  examMode?: ExamMode
  onNext?: () => void
  isLast?: boolean
}
