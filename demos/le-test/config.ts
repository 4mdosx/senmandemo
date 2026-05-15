import type { DemoConfig } from '@/platform/types'

export const leTestDemoConfig: DemoConfig = {
  id: 'le-test',
  title: '模拟考试',
  description: '随机抽取一个动作进行模拟考核',
  route: '/demo/le-test',
  requireLogin: false,
  category: 'tools',
  keywords: ['fitness', 'exam', 'exercise', 'training'],
}
