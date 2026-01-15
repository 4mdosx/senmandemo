// Plinko Demo 纹理创建工具
import { gfxFilledCircle } from './graphics'
import type { Application, Texture } from 'pixi.js'
import  * as PIXI from 'pixi.js'

/**
 * 创建带径向渐变的小球纹理
 * 使用径向渐变，中心高饱和，边缘透明
 */
export function createSoftBallTexture(
  radius: number,
  color: number | string
): Texture {
  // 使用更合理的 canvas 大小：radius * 2 + padding
  // 这样 anchor 0.5 时，sprite 的实际大小就是 radius * 2
  const padding = 4 // 给一些 padding 避免边缘被裁剪
  const size = radius * 2 + padding * 2
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2d context not available')
  }

  // 创建径向渐变
  const centerX = size / 2
  const centerY = size / 2
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.3, // 内圈 - 更小，让中心更亮
    centerX,
    centerY,
    radius * 1.0 // 外圈 - 使用实际半径
  )

  // 颜色转换
  const colorStr =
    typeof color === 'string'
      ? color
      : `#${color.toString(16).padStart(6, '0')}`

  // 添加颜色停止点，确保中心是实心的
  gradient.addColorStop(0, colorStr)
  gradient.addColorStop(0.6, colorStr + 'DD') // 60% 位置还是主色，带透明度
  gradient.addColorStop(1, 'rgba(255,255,255,0)') // 边缘透明

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = PIXI.Texture.from(canvas)
  console.log('Radial gradient texture created, canvas size:', size, 'texture size:', texture?.width, texture?.height)
  return texture
}

/**
 * 创建简单的圆形纹理（用于钉子和简单元素）
 */
export function createCircleTexture(
  app: Application,
  radius: number,
  color: number
): Texture {
  const g = new PIXI.Graphics()
  gfxFilledCircle(g, radius, radius, radius, color)

  return app.renderer.generateTexture(g)
}
