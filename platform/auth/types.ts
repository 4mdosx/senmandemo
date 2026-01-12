// Auth 相关类型
export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLogin: boolean
  isLoading: boolean
}
