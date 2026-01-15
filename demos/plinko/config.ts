// Demo 配置
import type { DemoConfig } from '@/platform/types'

export const plinkoDemoConfig: DemoConfig = {
  id: 'plinko',
  title: 'Plinko (PixiJS)',
  description: 'A Plinko mini game rendered with PixiJS, controlled by React.',
  route: '/demo/plinko',
  requireLogin: false,
  category: 'mini games',
  keywords: ['plinko', 'pixijs', 'physics'],
}
