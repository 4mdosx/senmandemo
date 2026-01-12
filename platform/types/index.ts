// 平台级类型定义

export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
}

export interface DemoConfig {
  id: string
  title: string
  description: string
  route: string
  requireLogin: boolean
  category?: string
  keywords?: string[]
  icon?: string
}

export interface RecommendItem {
  id: string
  title: string
  description: string
  route: string
  category?: string
  keywords?: string[]
  icon?: string
}
