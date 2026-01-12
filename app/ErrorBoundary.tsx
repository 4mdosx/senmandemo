'use client'

// Error Boundary - 捕获 React 运行时异常，防止整个应用崩溃
import React from 'react'
import { Button } from '@/ui/button'
import { reportError } from '@/services/errorReporter'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary 组件
 * 捕获子组件树中的 JavaScript 错误，记录这些错误，并显示降级 UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 上报错误到监控系统
    reportError(error, {
      componentStack: errorInfo.componentStack || undefined,
      context: {
        errorBoundary: true,
      },
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    // 可选：重新加载页面
    // window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // 如果有自定义 fallback，使用它
      if (this.props.fallback) {
        const Fallback = this.props.fallback
        return (
          <Fallback
            error={this.state.error!}
            reset={this.handleReset}
          />
        )
      }

      // 默认降级 UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-bold">出错了</h1>
            <p className="text-muted-foreground">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                Retry
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="default"
              >
                Reload
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development Mode)
                </summary>
                <pre className="mt-2 p-4 bg-muted rounded-md text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
