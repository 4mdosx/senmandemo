// 推荐服务 - 获取首页推荐列表
import { http } from '@/services/http'
import type { RecommendItem } from '../types'
import { demos } from '@/demos'

export async function getRecommendList(): Promise<RecommendItem[]> {
  // 如果后端有推荐接口，调用后端
  try {
    const result = await http.get<RecommendItem[]>('/recommend')
    if (result && result.length > 0) {
      return result
    }
  } catch {
    // 降级：从 demo registry 获取
  }

  // 降级：从 demo registry 获取所有 demo 作为推荐
  return demos.map((demo) => ({
    id: demo.id,
    title: demo.title,
    description: demo.description,
    route: demo.route,
    category: demo.category,
    keywords: demo.keywords,
    icon: demo.icon,
  }))
}
