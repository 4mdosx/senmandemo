'use client'

// Week Demo 页面入口
import './week.css'
import { getWeek, getDayOfYear } from 'date-fns'

export default function WeekDemo() {
  const today = new Date()
  const week = getWeek(today)
  const day = getDayOfYear(today)
  const allWeeks = 52

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 md:p-8 week-app">
      <section className="card">
        <h1>
          Today Is:
          <br />
          <span className="text-2xl md:text-4xl font-bold my-2">
            Week {week}
          </span>
          <br />
          Day {day}
        </h1>
        <div className="progress-bar mt-4 md:mt-6">
          {Array.from({ length: allWeeks }).map((_, index) => (
            <div
              key={index}
              className={`progress-bar-item ${index < week ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
