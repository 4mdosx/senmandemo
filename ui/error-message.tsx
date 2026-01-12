'use client'

// 错误消息展示组件 - UI 层只负责展示错误状态
import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from './card'

interface ErrorMessageProps {
  /**
   * 错误消息
   */
  message?: string
  /**
   * 错误标题（可选）
   */
  title?: string
  /**
   * 是否显示重试按钮
   */
  showRetry?: boolean
  /**
   * 重试回调
   */
  onRetry?: () => void
  /**
   * 自定义样式类名
   */
  className?: string
}

/**
 * 错误消息组件
 * UI 层只负责展示，不处理错误逻辑
 */
export function ErrorMessage({
  message = '发生了错误',
  title = '错误',
  showRetry = false,
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            重试
          </button>
        )}
      </CardContent>
    </Card>
  )
}
