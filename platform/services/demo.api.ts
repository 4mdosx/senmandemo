// Demo 共用接口 - 放在 platform/services
// Demo 使用这些接口，而不是直接调用 http

import { http } from '@/services/http'

export interface DemoData {
  id: string
  title: string
  description: string
  content?: any
}

export async function fetchDemoData(id: string): Promise<DemoData> {
  return http.get<DemoData>(`/demo/${id}`)
}

export async function fetchDemoList(): Promise<DemoData[]> {
  return http.get<DemoData[]>('/demo/list')
}
