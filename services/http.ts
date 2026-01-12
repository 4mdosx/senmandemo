// HTTP 封装层 - 通信基础设施
// 只解决请求一致性、鉴权、错误、环境差异
// 不解决业务逻辑、页面状态、数据拼装

import {
  HttpError,
  BusinessError,
  NetworkError,
  TimeoutError,
} from '@/types/errors'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// Token 管理（简单实现，后续可接入 auth store）
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

function getAuthHeader(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 请求参数序列化（GET）
function buildQuery(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

// 统一请求函数
type RequestOptions = {
  params?: Record<string, any>
  signal?: AbortSignal
  headers?: Record<string, string>
}

async function request<T>(
  url: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10秒超时

  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  }

  const fullUrl = options.params
    ? `${url}?${buildQuery(options.params)}`
    : url

  try {
    const response = await fetch(BASE_URL + fullUrl, {
      ...options,
      headers,
      signal: options.signal ?? controller.signal,
    })

    if (!response.ok) {
      // HTTP 错误处理 - 只分类和抛出，不处理业务逻辑
      throw new HttpError(response.status, `HTTP ${response.status}`)
    }

    const res = await response.json()

    // 响应统一解包（假设后端返回 { code, data, message } 结构）
    if (res.code !== undefined && res.code !== 0) {
      // 业务错误 - 只分类和抛出
      throw new BusinessError(res.code, res.message || 'API Error', res.data)
    }

    // 如果后端直接返回数据，或者 code=0 时返回 data
    return (res.data !== undefined ? res.data : res) as T
  } catch (error) {
    // 如果已经是标准错误类型，直接抛出
    if (
      error instanceof HttpError ||
      error instanceof BusinessError ||
      error instanceof NetworkError ||
      error instanceof TimeoutError
    ) {
      throw error
    }

    // AbortError 表示超时或取消
    if (error instanceof Error && error.name === 'AbortError') {
      // 判断是超时还是手动取消
      if (controller.signal.aborted) {
        throw new TimeoutError('Request timeout')
      }
      throw new NetworkError('Request cancelled')
    }

    // 其他网络错误
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network connection failed')
    }

    // 未知错误
    throw new NetworkError(
      error instanceof Error ? error.message : 'Unknown network error'
    )
  } finally {
    clearTimeout(timeout)
  }
}

// HTTP 方法封装
export const http = {
  get: <T>(url: string, params?: Record<string, any>, signal?: AbortSignal) =>
    request<T>(url, { method: 'GET', params, signal }),

  post: <T>(url: string, body?: any, signal?: AbortSignal) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      signal,
    }),

  put: <T>(url: string, body?: any, signal?: AbortSignal) =>
    request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      signal,
    }),

  delete: <T>(url: string, signal?: AbortSignal) =>
    request<T>(url, { method: 'DELETE', signal }),
}
