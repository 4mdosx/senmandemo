// Demo 配置
import type { DemoConfig } from '@/platform/types'

export const decodeDemoConfig: DemoConfig = {
  id: 'decode',
  title: 'Unicode & Number Base Decoder',
  description: 'Decode Unicode codes and convert number bases',
  route: '/demo/decode',
  requireLogin: false,
  category: 'tools',
  keywords: ['unicode', 'decode', 'number', 'base', 'converter'],
}
