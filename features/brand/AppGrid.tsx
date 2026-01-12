'use client'

// 应用列表组件 - features 层，有业务语义
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { demos } from '@/demos/index'
import type { DemoConfig } from '@/platform/types'
import { Input } from '@/ui/input'

// 按日期生成随机种子，确保同一天推荐顺序一致
function getDateSeed(): number {
  const today = new Date()
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// 使用种子进行随机排序（Fisher-Yates shuffle）
function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  let random = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280 // 线性同余生成器
    const j = Math.floor((random / 233280) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 按 category 分类 demos
function groupDemosByCategory(demos: DemoConfig[]): Map<string, DemoConfig[]> {
  const grouped = new Map<string, DemoConfig[]>()

  demos.forEach((demo) => {
    const category = demo.category || 'Other'
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    grouped.get(category)!.push(demo)
  })

  return grouped
}

// 搜索过滤函数
function filterDemos(demos: DemoConfig[], searchQuery: string): DemoConfig[] {
  if (!searchQuery.trim()) {
    return demos
  }

  const query = searchQuery.toLowerCase().trim()

  return demos.filter((demo) => {
    // 按 demo name (title) 搜索
    const titleMatch = demo.title.toLowerCase().includes(query)

    // 按 tag (keywords) 搜索
    const keywordsMatch = demo.keywords?.some(keyword =>
      keyword.toLowerCase().includes(query)
    ) || false

    return titleMatch || keywordsMatch
  })
}

export function AppGrid() {
  const [searchQuery, setSearchQuery] = useState('')

  // 按日期随机排序所有 demos
  const seed = getDateSeed()
  const shuffledDemos = seededShuffle(demos, seed)

  // 根据搜索查询过滤 demos
  const filteredDemos = useMemo(() => {
    return filterDemos(shuffledDemos, searchQuery)
  }, [searchQuery, shuffledDemos])

  // 按 category 分类过滤后的 demos
  const groupedDemos = groupDemosByCategory(filteredDemos)

  return (
    <div className="space-y-4">
      {/* Search Bar - Neo-Swiss Style */}
      <div className="border-2 border-black bg-white p-6">
        <div className="space-y-4">
          <label htmlFor="search" className="text-sm font-bold uppercase tracking-wider text-black">
            Search Tools
          </label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-black rounded-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-0"
          />
          {searchQuery && (
            <div className="text-xs font-medium text-black opacity-60">
              Found {filteredDemos.length} {filteredDemos.length === 1 ? 'tool' : 'tools'}
            </div>
          )}
        </div>
      </div>

      {/* Categories Display - Neo-Swiss Style */}
      {groupedDemos.size === 0 ? (
        <div className="border-2 border-black bg-white p-12 text-center">
          <div className="text-xl font-bold text-black mb-2">No results found</div>
          <div className="text-sm text-black opacity-60">
            Try searching with different keywords
          </div>
        </div>
      ) : (
        Array.from(groupedDemos.entries()).map(([category, categoryDemos], categoryIndex) => {
          return (
            <div key={category} className="space-y-8">
              {/* Category Title - Neo-Swiss Style */}
              <div className="flex items-end gap-6 border-b-2 border-black pb-4">
                <div className="text-6xl md:text-8xl font-bold text-black opacity-10 leading-none select-none">
                  {String(categoryIndex + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 uppercase tracking-tight">
                    {category}
                  </h2>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-black opacity-60">
                    {categoryDemos.length} {categoryDemos.length === 1 ? 'TOOL' : 'TOOLS'}
                  </div>
                </div>
              </div>

              {/* Tools Grid - Neo-Swiss Style Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDemos.map((demo, index) => {
                  return (
                    <Link
                      href={demo.route}
                      key={demo.id}
                      className="group block bg-white border-2 border-black p-6 hover:bg-black hover:text-white transition-all duration-200"
                    >
                      <div className="space-y-4">
                        {/* Number Decoration */}
                        <div className="flex items-start justify-between">
                          <div className="text-4xl font-bold text-black group-hover:text-white opacity-20 leading-none select-none">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          {/* Arrow */}
                          <div className="text-black group-hover:text-white transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors leading-tight">
                          {demo.title}
                        </h3>

                        {/* Description */}
                        {demo.description && (
                          <p className="text-sm text-black group-hover:text-white opacity-70 transition-colors leading-relaxed line-clamp-2">
                            {demo.description}
                          </p>
                        )}

                        {/* Tags */}
                        {demo.keywords && demo.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {demo.keywords.slice(0, 3).map((keyword) => (
                              <span
                                key={keyword}
                                className="text-xs px-2 py-1 bg-black group-hover:bg-white text-white group-hover:text-black border border-black transition-colors"
                              >
                                {keyword}
                              </span>
                            ))}
                            {demo.keywords.length > 3 && (
                              <span className="text-xs px-2 py-1 text-black group-hover:text-white opacity-60">
                                +{demo.keywords.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
