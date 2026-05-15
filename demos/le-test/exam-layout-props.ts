import type { ExamQuestionProps } from './questions-meta'

export function getExamLayoutProps(props: ExamQuestionProps) {
  if (!props.examMode) {
    return {
      examMode: false as const,
      autoReveal: false,
      onNext: undefined,
      isLast: false,
    }
  }
  return {
    examMode: true as const,
    autoReveal: props.examMode === 'simple',
    onNext: props.onNext,
    isLast: props.isLast ?? false,
  }
}
