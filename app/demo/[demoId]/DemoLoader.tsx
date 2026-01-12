'use client'

// Demo 加载器 - 客户端组件，负责加载
import { getDemoConfig } from '@/demos'
import AlphabetDemo from '@/demos/alphabet'
import DecodeDemo from '@/demos/decode'
import WeekDemo from '@/demos/week'

// Demo 组件映射
const demoComponents: Record<string, React.ComponentType> = {
  alphabet: AlphabetDemo,
  decode: DecodeDemo,
  week: WeekDemo,
}

interface DemoLoaderProps {
  demoId: string
}

export default function DemoLoader({ demoId }: DemoLoaderProps) {
  const demoConfig = getDemoConfig(demoId)

  if (!demoConfig) {
    return null
  }

  const DemoComponent = demoComponents[demoId]

  if (!DemoComponent) {
    return <div className="flex items-center justify-center min-h-screen">Demo not found</div>
  }

  return <DemoComponent />
}
