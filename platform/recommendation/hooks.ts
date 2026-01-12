'use client'

// 推荐 hooks - 平台功能，不属于任何 Demo
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getRecommendList } from './services'
import { handleQueryError, shouldRetry } from '@/services/interceptors'

export function useRecommendList() {
  const query = useQuery({
    queryKey: ['recommend'],
    queryFn: getRecommendList,
    staleTime: 10 * 60 * 1000, // 10分钟
    retry: shouldRetry,
  })

  // React Query v5 使用 useEffect 处理错误
  useEffect(() => {
    if (query.error) {
      handleQueryError(query.error)
    }
  }, [query.error])

  return query
}
