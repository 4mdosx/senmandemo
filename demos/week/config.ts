// Demo 配置
import type { DemoConfig } from '@/platform/types'

export const weekDemoConfig: DemoConfig = {
  id: 'week',
  title: 'Week & Day Counter',
  description: 'This week is what week and day of the year',
  route: '/demo/week',
  requireLogin: false,
  category: 'tools',
  keywords: ['week', 'day', 'calendar', 'date'],
}
