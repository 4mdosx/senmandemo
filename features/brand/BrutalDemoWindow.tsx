'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { demos } from '@/demos'
import type { DemoConfig } from '@/platform/types'
import { ArrowRight } from 'lucide-react'
import AlphabetDemo from '@/demos/alphabet'
import DecodeDemo from '@/demos/decode'
import PlinkoDemo from '@/demos/plinko'
import WeekDemo from '@/demos/week'

// Demo 组件映射
const demoComponents: Record<string, React.ComponentType> = {
  alphabet: AlphabetDemo,
  decode: DecodeDemo,
  plinko: PlinkoDemo,
  week: WeekDemo,
}

export function BrutalDemoWindow() {
  // Initialize with null to avoid hydration mismatch - will be set in useEffect
  const [randomDemo, setRandomDemo] = useState<DemoConfig | null>(null)
  const [mounted, setMounted] = useState(false)
  const [rotation, setRotation] = useState(0) // Start with 0 to avoid hydration mismatch
  const [key, setKey] = useState(0) // 用于强制重新渲染

  // 随机选择 demo 的函数
  const selectRandomDemo = () => {
    if (demos.length === 0) return

    // 如果有多个 demo，确保选择不同的 demo
    if (randomDemo) {
      // 过滤掉当前的 demo
      const availableDemos = demos.filter(demo => demo.id !== randomDemo.id)
      if (availableDemos.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableDemos.length)
        setRandomDemo(availableDemos[randomIndex])
        setKey(prev => prev + 1)
        setRotation((Math.random() - 0.5) * 6)
      }
    } else {
      // 如果没有当前 demo，随机选择一个
      const randomIndex = Math.floor(Math.random() * demos.length)
      setRandomDemo(demos[randomIndex])
      setKey(prev => prev + 1)
      setRotation((Math.random() - 0.5) * 6)
    }
  }

  useEffect(() => {
    // Set random values only on client side to avoid hydration mismatch
    if (demos.length > 0 && !randomDemo) {
      const randomIndex = Math.floor(Math.random() * demos.length)
      setRandomDemo(demos[randomIndex])
      setRotation((Math.random() - 0.5) * 6)
    }
    
    setTimeout(() => {
      setMounted(true)
    }, 100)
  }, [randomDemo])

  if (!randomDemo) return null

  const DemoComponent = demoComponents[randomDemo.id]

  return (
    <div
      className="relative h-full max-h-[calc(100vh-1rem)] md:max-h-[80vh] flex flex-col"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? `rotate(${rotation}deg) scale(1)` : 'rotate(0deg) scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* 野兽风格窗口 */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] md:hover:shadow-[12px_12px_0_0_#000] hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-200 flex flex-col h-full overflow-hidden">
        {/* 窗口标题栏 */}
        <div className="border-b-4 border-black bg-black text-white px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white"></div>
            <div className="w-3 h-3 bg-white"></div>
            <div className="w-3 h-3 bg-white"></div>
          </div>
          <div className="text-xs font-black uppercase tracking-wider">{randomDemo.title.toUpperCase()}</div>
          <button
            onClick={selectRandomDemo}
            className="border-2 border-white bg-white text-black px-3 py-1 text-xs font-black uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-black hover:text-white hover:border-white hover:shadow-[2px_2px_0_0_#fff] active:scale-95"
          >
            RANDOM
          </button>
        </div>

        {/* Demo 内容区域 */}
        <div className="flex-1 overflow-hidden bg-white relative">
          {DemoComponent ? (
            <div key={key} className="p-2 md:p-4 h-full *:max-w-none *:mx-0 [&_.container]:max-w-none [&_.container]:mx-0 [&_.container]:px-0 [&_main]:min-h-full [&_main]:min-h-0 [&_main]:h-full">
              <DemoComponent />
            </div>
          ) : (
            <div className="p-4 md:p-6 flex flex-col items-center justify-center h-full">
              <p className="text-black opacity-70 mb-4">{randomDemo.description}</p>
              <Link
                href={randomDemo.route}
                className="group inline-flex items-center gap-2 border-4 border-black bg-white text-black px-6 py-3 font-black uppercase text-sm hover:bg-black hover:text-white hover:shadow-[4px_4px_0_0_#000] transition-all duration-200"
              >
                <span>TRY IT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          {/* 右下角 Open It 按钮 */}
          <Link
            href={randomDemo.route}
            className="absolute bottom-2 right-2 md:bottom-4 md:right-4 group inline-flex items-center gap-2 border-4 border-black bg-white text-black px-4 py-2 md:px-6 md:py-3 font-black uppercase text-xs md:text-sm hover:bg-black hover:text-white hover:shadow-[4px_4px_0_0_#000] transition-all duration-200 z-10"
          >
            <span>Open It</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 装饰性边框元素 */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-black border-2 border-black"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-black"></div>
      </div>

      {/* 随机位置的小装饰 */}
      <div
        className="absolute -z-10 w-8 h-8 bg-black opacity-20"
        style={{
          top: '10%',
          right: '-10px',
          transform: 'rotate(45deg)',
        }}
      ></div>
    </div>
  )
}
