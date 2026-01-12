// Demo 配置 - 插件元信息
import type { DemoConfig } from '@/platform/types'

export const alphabetDemoConfig: DemoConfig = {
  id: 'alphabet',
  title: 'German Alphabet',
  description: 'The German alphabet with interactive IPA pronunciation tool',
  route: '/demo/alphabet',
  requireLogin: false,
  category: 'de 🇩🇪',
  keywords: ['German', 'alphabet', 'pronunciation', 'IPA', 'language learning'],
}
