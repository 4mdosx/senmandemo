// Plinko Demo Graphics 辅助函数

import type { Graphics } from 'pixi.js'

/**
 * 清除 Graphics 对象
 */
export function gfxClear(g: Graphics) {
  g.clear()
}

/**
 * 绘制描边矩形
 */
export function gfxStrokeRect(
  g: Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  stroke: { width: number; color: number; alpha?: number }
) {
  g.rect(x, y, w, h).stroke(stroke)
}

/**
 * 绘制线条
 */
export function gfxLine(
  g: Graphics,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke: { width: number; color: number; alpha?: number }
) {
  g.moveTo(x1, y1).lineTo(x2, y2).stroke(stroke)
}

/**
 * 绘制填充圆形
 */
export function gfxFilledCircle(
  g: Graphics,
  x: number,
  y: number,
  r: number,
  color: number
) {
  g.circle(x, y, r).fill({ color })
}
