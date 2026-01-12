// 用户相关接口
import { http } from '@/services/http'
import type { User } from '../types'

export async function getUserProfile(userId: string): Promise<User> {
  return http.get<User>(`/user/${userId}`)
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
  return http.put<User>(`/user/${userId}`, data)
}
