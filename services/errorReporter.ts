// 错误上报服务 - 上报错误到监控系统

/**
 * 上报错误到监控系统
 * 生产环境可以接入 Sentry、LogRocket 等监控服务
 */
export function reportError(
  error: Error,
  errorInfo?: {
    componentStack?: string
    context?: Record<string, any>
  }
) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...errorInfo,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
  }

  if (process.env.NODE_ENV === 'production') {
    // 生产环境：上报到监控系统
    // 示例：Sentry
    // Sentry.captureException(error, {
    //   extra: errorInfo,
    //   tags: {
    //     component: errorInfo?.context?.component,
    //   },
    // })

    // 示例：自定义上报接口
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData),
    // }).catch(() => {
    //   // 静默失败，避免上报错误时再次出错
    // })
  } else {
    // 开发环境：输出到控制台
    console.error('Error reported:', errorData)
  }
}

/**
 * 上报业务错误
 * 用于上报业务逻辑中的错误
 */
export function reportBusinessError(
  error: Error,
  context?: Record<string, any>
) {
  reportError(error, {
    context: {
      ...context,
      type: 'business',
    },
  })
}

/**
 * 上报网络错误
 */
export function reportNetworkError(
  error: Error,
  context?: Record<string, any>
) {
  reportError(error, {
    context: {
      ...context,
      type: 'network',
    },
  })
}
