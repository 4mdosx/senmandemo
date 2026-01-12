'use client'

// Demo 加载器 - 客户端组件，负责加载
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Heart, Home } from 'lucide-react'
import { getDemoConfig } from '@/demos'
import AlphabetDemo from '@/demos/alphabet'
import DecodeDemo from '@/demos/decode'
import WeekDemo from '@/demos/week'

// Demo 组件映射
const demoComponents: Record<string, React.ComponentType> = {
  alphabet: AlphabetDemo,
  decode: DecodeDemo,
  week: WeekDemo,
}

interface DemoLoaderProps {
  demoId: string
}

// 彩带礼花动画组件
function ConfettiAnimation({ trigger, centerX, centerY }: { trigger: boolean; centerX: number; centerY: number }) {
  const [confetti, setConfetti] = useState<Array<{
    id: number
    angle: number
    distance: number
    delay: number
    duration: number
    color: string
    initialRotation: number
    size: number
    gravityX: number
  }>>([])

  useEffect(() => {
    if (!trigger) return

    // 使用 requestAnimationFrame 延迟设置状态，避免同步更新
    const rafId = requestAnimationFrame(() => {
      // 创建多个彩带元素，从中心向四周爆炸
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#FFB6C1', '#87CEEB', '#FFD700', '#FF1493', '#00CED1', '#FF69B4']
      const confettiCount = 80 // 增加彩带数量，让效果更丰富
      const newConfetti = Array.from({ length: confettiCount }, (_, i) => {
        // 使用极坐标系统：角度和距离，让彩带均匀向四周散开
        const baseAngle = (Math.PI * 2 * i) / confettiCount
        const angle = baseAngle + (Math.random() - 0.5) * 0.4 // 均匀分布 + 随机偏移
        const distance = 150 + Math.random() * 400 // 爆炸距离，范围更大
        return {
          id: i,
          angle,
          distance,
          delay: Math.random() * 0.15,
          duration: 1.0 + Math.random() * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          initialRotation: Math.random() * 360,
          size: 2 + Math.random() * 3, // 随机大小，变化更大
          gravityX: (Math.random() - 0.5) * 80, // 重力导致的横向偏移
        }
      })
      setConfetti(newConfetti)
    })

    // 动画结束后清除（等待最长的动画完成）
    const timer = setTimeout(() => {
      setConfetti([])
    }, 3000)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [trigger])

  if (confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((item) => {
        // 计算目标位置（极坐标转笛卡尔坐标，使用像素值）
        const endX = Math.cos(item.angle) * item.distance
        const endY = -Math.sin(item.angle) * item.distance - 50 // 向上偏移并考虑重力
        
        return (
          <div
            key={item.id}
            className="absolute opacity-90"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              width: `${item.size}px`,
              height: `${item.size * 5}px`,
              backgroundColor: item.color,
              transform: `translate(-50%, -50%) rotate(${item.initialRotation}deg)`,
              transformOrigin: 'center center',
              animation: `confetti-burst ${item.duration}s ease-out ${item.delay}s forwards`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              '--rotation': `${item.initialRotation + 720}deg`,
              '--gravity-x': `${item.gravityX}px`,
            } as React.CSSProperties & {
              '--end-x': string
              '--end-y': string
              '--rotation': string
              '--gravity-x': string
            }}
          />
        )
      })}
    </div>
  )
}

export default function DemoLoader({ demoId }: DemoLoaderProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiCenter, setConfettiCenter] = useState({ x: 0, y: 0 })
  const likeButtonRef = useRef<HTMLButtonElement>(null)
  const demoConfig = getDemoConfig(demoId)

  if (!demoConfig) {
    return null
  }

  const DemoComponent = demoComponents[demoId]

  if (!DemoComponent) {
    return <div className="flex items-center justify-center min-h-screen">Demo not found</div>
  }

  const handleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    // 只在点赞时触发彩带动画
    if (newLikedState && likeButtonRef.current) {
      // 获取按钮的位置（相对于视口）
      const rect = likeButtonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      setConfettiCenter({ x: centerX, y: centerY })
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 彩带动画 */}
      <ConfettiAnimation 
        trigger={showConfetti} 
        centerX={confettiCenter.x} 
        centerY={confettiCenter.y} 
      />

      <div className="flex-1">
        <DemoComponent />
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-4 md:py-6">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* 点赞按钮 */}
            <button
              ref={likeButtonRef}
              onClick={handleLike}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-2 md:py-3
                border-2 border-black
                font-bold text-sm md:text-base
                transition-all duration-200
                relative overflow-hidden
                ${isLiked
                  ? 'bg-black text-white hover:bg-white hover:text-black'
                  : 'bg-white text-black hover:bg-black hover:text-white'
                }
              `}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''} transition-transform duration-300 ${isLiked ? 'scale-110' : ''}`}
                strokeWidth={2}
              />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            {/* 返回首页按钮 */}
            <Link
              href="/"
              className="
                flex items-center gap-2 px-4 md:px-6 py-2 md:py-3
                border-2 border-black bg-white text-black
                font-bold text-sm md:text-base
                hover:bg-black hover:text-white
                transition-all duration-200
              "
              aria-label="Back to Home"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
