// 全局异常拦截器 - 统一处理系统级异常行为
// 处理 401、403、5xx、网络异常等系统级错误

import {
  HttpError,
  NetworkError,
  TimeoutError,
  isHttpError,
  isNetworkError,
  isTimeoutError,
} from '@/types/errors'

/**
 * 退出登录
 */
function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}

/**
 * 跳转到登录页
 */
function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

/**
 * Toast 提示（简单实现，后续可接入 toast 库）
 */
function toast(type: 'error' | 'success' | 'info', message: string) {
  if (typeof window === 'undefined') return

  // 这里可以接入 toast 库，如 react-hot-toast, sonner 等
  console.log(`[${type.toUpperCase()}]`, message)

  // 简单实现：使用 alert（生产环境应替换为 toast 组件）
  if (type === 'error') {
    // alert(message) // 开发阶段可以注释掉，避免干扰
  }
}

/**
 * 处理全局错误
 * 根据错误类型执行相应的系统级行为
 */
export function handleGlobalError(err: unknown) {
  // HTTP 错误处理
  if (isHttpError(err)) {
    switch (err.status) {
      case 401:
        // 未授权，退出登录并跳转
        logout()
        redirectToLogin()
        toast('error', '登录已过期，请重新登录')
        return

      case 403:
        // 权限不足
        toast('error', '权限不足')
        return

      case 404:
        // 资源不存在
        toast('error', '请求的资源不存在')
        return

      case 500:
      case 502:
      case 503:
      case 504:
        // 服务器错误
        toast('error', '服务器错误，请稍后重试')
        return

      default:
        // 其他 HTTP 错误
        toast('error', `请求失败: ${err.message}`)
        return
    }
  }

  // 网络错误
  if (isNetworkError(err)) {
    toast('error', '网络连接失败，请检查网络')
    return
  }

  // 超时错误
  if (isTimeoutError(err)) {
    toast('error', '请求超时，请稍后重试')
    return
  }

  // 未知错误
  console.error('Unknown error:', err)
  toast('error', '发生未知错误')
}

/**
 * React Query 错误处理
 * 可以在 React Query 的全局配置中使用
 */
export function handleQueryError(error: unknown) {
  handleGlobalError(error)
}

/**
 * 判断错误是否应该重试
 * 用于 React Query 的 retry 配置
 */
export function shouldRetry(failureCount: number, error: unknown): boolean {
  // 不重试 401/403（认证/授权错误）
  if (isHttpError(error) && [401, 403].includes(error.status)) {
    return false
  }

  // 不重试业务错误
  if (error instanceof Error && error.name === 'BusinessError') {
    return false
  }

  // 其他错误最多重试 3 次
  return failureCount < 3
}
