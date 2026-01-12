'use client'

// Auth hooks - 平台统一管理登录状态
// Demo 只需要使用 useAuth()，不需要关心 token 和登录细节

import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from './services'
import { shouldRetry } from '@/services/interceptors'

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5分钟
    retry: shouldRetry,
    // Auth 错误不在这里处理，由全局拦截器处理
  })

  return {
    user: user || null,
    isLogin: !!user,
    isLoading,
    error,
  }
}
