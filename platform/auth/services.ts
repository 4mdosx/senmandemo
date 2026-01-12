// Auth 服务 - 调用 API 获取用户信息
import { http } from '@/services/http'
import type { User } from './types'

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await http.get<User>('/user/me')
    return user
  } catch (error) {
    // 未登录或 token 过期
    return null
  }
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const result = await http.post<{ token: string; user: User }>('/auth/login', {
    email,
    password,
  })

  // 保存 token
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', result.token)
  }

  return result
}

export async function logout(): Promise<void> {
  try {
    await http.post('/auth/logout')
  } finally {
    // 清除 token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }
}
