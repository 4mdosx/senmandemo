// Plinko Demo 类型定义
import type { Application, Sprite } from 'pixi.js'

export type PlinkoResult = {
  slotIndex: number
  multiplier: number
}

export type PlinkoStats = {
  ballsInFlight: number
}

export type PlinkoEngine = {
  drop: (count?: number, step?: number) => void
  reset: () => void
  setSpeed: (v: number) => void
  resize: (w: number, h: number) => void
  destroy: () => void
}

export type Ball = {
  x: number
  y: number
  vx: number
  vy: number
  sprite: Sprite
}

export type Peg = {
  x: number
  y: number
}

export type PlinkoEngineOptions = {
  app: Application
  multipliers: number[]
  onResult: (r: PlinkoResult) => void
  onStats: (s: PlinkoStats) => void
}
