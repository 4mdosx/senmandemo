// 错误类型定义 - 统一异常类型

/**
 * 网络错误 - 网络连接失败
 */
export class NetworkError extends Error {
  constructor(message = 'Network error') {
    super(message)
    this.name = 'NetworkError'
    // 保持原型链
    Object.setPrototypeOf(this, NetworkError.prototype)
  }
}

/**
 * 超时错误 - 请求超时
 */
export class TimeoutError extends Error {
  constructor(message = 'Request timeout') {
    super(message)
    this.name = 'TimeoutError'
    Object.setPrototypeOf(this, TimeoutError.prototype)
  }
}

/**
 * HTTP 错误 - HTTP 状态码异常
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    message?: string
  ) {
    super(message || `HTTP ${status}`)
    this.name = 'HttpError'
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

/**
 * 业务错误 - 后端返回的业务异常（code ≠ 0）
 */
export class BusinessError extends Error {
  constructor(
    public code: number,
    message: string,
    public data?: any
  ) {
    super(message)
    this.name = 'BusinessError'
    Object.setPrototypeOf(this, BusinessError.prototype)
  }
}

/**
 * 所有错误类型的联合类型
 */
export type AppError =
  | HttpError
  | BusinessError
  | NetworkError
  | TimeoutError

/**
 * 错误类型守卫函数
 */
export function isHttpError(err: unknown): err is HttpError {
  return err instanceof HttpError
}

export function isBusinessError(err: unknown): err is BusinessError {
  return err instanceof BusinessError
}

export function isNetworkError(err: unknown): err is NetworkError {
  return err instanceof NetworkError
}

export function isTimeoutError(err: unknown): err is TimeoutError {
  return err instanceof TimeoutError
}

/**
 * 判断是否为应用错误
 */
export function isAppError(err: unknown): err is AppError {
  return (
    isHttpError(err) ||
    isBusinessError(err) ||
    isNetworkError(err) ||
    isTimeoutError(err)
  )
}
