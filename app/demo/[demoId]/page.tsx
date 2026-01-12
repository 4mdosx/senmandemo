// 统一的 Demo 入口页面
import { notFound } from 'next/navigation'
import { getDemoConfig } from '@/demos'
import DemoLoader from './DemoLoader'

interface DemoPageProps {
  params: Promise<{ demoId: string }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { demoId } = await params
  const demoConfig = getDemoConfig(demoId)

  if (!demoConfig) {
    notFound()
  }

  return <DemoLoader demoId={demoId} />
}

// 生成静态参数（可选，用于 SSG）
export async function generateStaticParams() {
  const { demos } = await import('@/demos')
  return demos.map((demo) => ({
    demoId: demo.id,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: DemoPageProps) {
  const { demoId } = await params
  const demoConfig = getDemoConfig(demoId)

  if (!demoConfig) {
    return {
      title: 'Demo Not Found',
    }
  }

  return {
    title: demoConfig.title,
    description: demoConfig.description,
  }
}
