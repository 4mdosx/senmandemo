// Demo 注册表 - 所有 Demo 的配置集中管理
// 首页推荐 & 路由都从 config 生成

import { alphabetDemoConfig } from './alphabet/config'
import { decodeDemoConfig } from './decode/config'
import { plinkoDemoConfig } from './plinko/config'
import { weekDemoConfig } from './week/config'
import type { DemoConfig } from '@/platform/types'

// 注册所有 Demo
export const demos: DemoConfig[] = [
  alphabetDemoConfig,
  decodeDemoConfig,
  plinkoDemoConfig,
  weekDemoConfig,
  // 后续添加更多 demo 配置
]

// 根据 ID 获取 Demo 配置
export function getDemoConfig(id: string): DemoConfig | undefined {
  return demos.find((demo) => demo.id === id)
}

// 根据路由获取 Demo 配置
export function getDemoConfigByRoute(route: string): DemoConfig | undefined {
  return demos.find((demo) => demo.route === route)
}
