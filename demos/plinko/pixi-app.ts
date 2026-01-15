// Plinko Demo PixiJS 应用初始化和引擎核心逻辑
import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js'
import type { Ticker } from 'pixi.js'
import type { PlinkoEngine, PlinkoEngineOptions, Ball, Peg } from './types'
import { COLORS, PHYSICS, SIZES } from './styles'
import { createCircleTexture, createSoftBallTexture } from './textures'
import { gfxClear, gfxStrokeRect, gfxLine } from './graphics'

/**
 * 创建 PixiJS 应用实例
 */
export async function createPixiApp(
  host: HTMLDivElement
): Promise<{ app: Application; canvas: HTMLCanvasElement }> {
  const app = new Application()
  await app.init({
    resizeTo: host,
    background: 0xf8fafc, // iOS 浅色背景
    antialias: true,
    autoDensity: true,
    resolution: Math.min(2, globalThis.devicePixelRatio || 1),
  })
  return { app, canvas: app.canvas }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function createPlinkoEngine(opts: PlinkoEngineOptions): PlinkoEngine {
  const { app, multipliers, onStats } = opts

  const stage = app.stage
  const world = new PIXI.Container()
  const ballLayer = new PIXI.Container()
  const pegLayer = new PIXI.Container()
  const uiLayer = new PIXI.Container()
  const frameGfx = new PIXI.Graphics()
  const slotsGfx = new PIXI.Graphics()

  stage.addChild(world)

  // 先定义 width 和 height
  let width = Math.max(1, app.renderer?.width ?? 800)
  let height = Math.max(1, app.renderer?.height ?? 600)

  let speed = 1
  // 确保 ballLayer 在 pegLayer 之上，这样小球不会被钉子遮挡
  // 层级顺序：背景 -> 钉子 -> 小球 -> UI
  world.addChild(frameGfx, slotsGfx, pegLayer, ballLayer, uiLayer)

  // 确保所有层都是可见的
  ballLayer.visible = true
  ballLayer.alpha = 1
  ballLayer.renderable = true

  const {
    topMargin,
    bottomMargin,
    sideMargin,
    pegRadius,
    ballRadius,
    rows,
    spacing,
  } = SIZES

  const balls: Ball[] = []
  const pegs: Peg[] = []
  const dropTimeouts: NodeJS.Timeout[] = []

  const ballTexture = createSoftBallTexture(ballRadius, COLORS.ballPrimary)
  const pegTexture = createCircleTexture(app, pegRadius, COLORS.pegNormal)

  function rebuildBoard() {
    // Clear
    pegs.length = 0
    pegLayer.removeChildren()
    gfxClear(slotsGfx)
    gfxClear(frameGfx)

    // Frame - 浅色边框
    gfxStrokeRect(
      frameGfx,
      sideMargin,
      topMargin,
      width - sideMargin * 2,
      height - topMargin - bottomMargin,
      {
        width: 2,
        color: COLORS.frame,
        alpha: 0.6,
      }
    )

    // Pegs - 三角形排列，对齐到记分板
    const boardW = width - sideMargin * 2
    const startY = topMargin + 64
    const slots = multipliers.length
    const slotW = boardW / slots

    // 图钉水平间距等于槽宽，确保最后一行图钉与记分板对齐
    const pegSpacingX = slotW

    // 最后一行应该与记分板对齐，使用 slots 个图钉
    const lastRowCount = slots
    // 最后一行第一个图钉的位置（第一个槽的中心）
    const lastRowFirstPegX = sideMargin + slotW / 2

    for (let row = 0; row < rows; row++) {
      // 如果是最后一行，使用 slots 个图钉；否则使用 row + 1 个图钉
      const count = row === rows - 1 ? lastRowCount : row + 1

      // 计算当前行的图钉位置，形成三角形排列
      // 当前行的图钉应该相对于最后一行居中，形成三角形
      const currentRowWidth = (count - 1) * pegSpacingX
      const lastRowWidth = (lastRowCount - 1) * pegSpacingX
      const centerOffset = (lastRowWidth - currentRowWidth) / 2

      // 当前行第一个图钉的X位置（相对于最后一行居中）
      const firstPegX = lastRowFirstPegX + centerOffset
      const y = startY + row * spacing

      // 在当前行创建 count 个图钉，形成三角形排列
      for (let i = 0; i < count; i++) {
        const x = firstPegX + i * pegSpacingX
        pegs.push({ x, y })
      }
    }

    // Add pegs to the peg layer
    for (const p of pegs) {
      const s = new PIXI.Sprite(pegTexture)
      s.anchor.set(0.5)
      s.x = p.x
      s.y = p.y
      pegLayer.addChild(s)
    }

    // Add slots to the slots layer
    const slotsY = height - bottomMargin

    gfxLine(slotsGfx, sideMargin, slotsY, width - sideMargin, slotsY, {
      width: 2,
      color: COLORS.slotLine,
      alpha: 0.5,
    })

    for (let i = 0; i <= slots; i++) {
      const x = sideMargin + i * slotW
      gfxLine(slotsGfx, x, slotsY, x, height - topMargin, {
        width: 2,
        color: COLORS.slotLine,
        alpha: 0.4,
      })
    }

    // Add labels to the ui layer
    uiLayer.removeChildren()
    for (let i = 0; i < slots; i++) {
      const x = sideMargin + i * slotW + slotW / 2
      const label = new PIXI.Text({
        text: `x${multipliers[i]}`,
        style: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto',
          fontSize: 12,
          fill: COLORS.text,
          fontWeight: '700',
        },
      })
      label.anchor.set(0.5, 0)
      label.x = x
      label.y = slotsY + 10
      uiLayer.addChild(label)
    }
  }

  function dropSingleBall() {
    const boardW = width - sideMargin * 2
    const centerX = sideMargin + boardW / 2

    const s = new PIXI.Sprite(ballTexture)
    s.anchor.set(0.5)
    s.alpha = 1
    s.visible = true
    s.scale.set(1)
    s.tint = 0xffffff // white = no change to texture color

    const x = centerX + (Math.random() - 0.5) * 12
    const y = topMargin + 32
    s.x = x
    s.y = y

    ballLayer.addChild(s)

    balls.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 40,
      vy: (Math.random() - 0.5) * 20,
      sprite: s,
    })

    onStats({ ballsInFlight: balls.length })
  }

  function drop(count = 1, step = 0) {
    // 如果没有设置间隔时间，立即添加所有球
    if (step <= 0) {
      for (let i = 0; i < count; i++) {
        dropSingleBall()
      }
      return
    }

    // 逐个添加球，每个球之间间隔 step 毫秒
    for (let i = 0; i < count; i++) {
      const timeout = setTimeout(() => {
        dropSingleBall()
        // 从数组中移除已执行的定时器
        const index = dropTimeouts.indexOf(timeout)
        if (index > -1) {
          dropTimeouts.splice(index, 1)
        }
      }, i * step)
      dropTimeouts.push(timeout)
    }
  }

  function reset() {
    // 取消所有待执行的 drop 操作
    for (const timeout of dropTimeouts) {
      clearTimeout(timeout)
    }
    dropTimeouts.length = 0

    // 移除所有球
    for (const b of balls) ballLayer.removeChild(b.sprite)
    balls.length = 0
    onStats({ ballsInFlight: 0 })
  }

  const { gravity, restitution, airDamp } = PHYSICS
  // 固定时间步长，确保物理模拟的一致性（60fps = 16.67ms）
  const FIXED_DT = 1 / 60
  let accumulator = 0

  function tick(ticker: Ticker) {
    const frameTime = ticker.deltaTime
    accumulator += frameTime

    const maxSteps = 5 // 防止在低帧率时累积过多
    const left = sideMargin + ballRadius
    const right = width - sideMargin - ballRadius
    const floorY = height - bottomMargin - ballRadius

    let steps = 0
    while (accumulator >= FIXED_DT && steps < maxSteps) {
      accumulator -= FIXED_DT
      steps++

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i]

        // 应用重力加速度
        b.vy += gravity * FIXED_DT

        // 应用空气阻力（简单的速度衰减）
        b.vx *= airDamp
        b.vy *= airDamp

        // 使用更新后的速度更新位置
        b.x += b.vx * FIXED_DT * speed
        b.y += b.vy * FIXED_DT * speed

        // Walls - 边界碰撞检测（弹性反弹）
        if (b.x < left) {
          b.x = left
          b.vx = Math.abs(b.vx) * restitution
        } else if (b.x > right) {
          b.x = right
          b.vx = -Math.abs(b.vx) * restitution
        }

        // Peg collisions - 钉子碰撞检测（弹性反弹）
        for (const p of pegs) {
          const dx = b.x - p.x
          const dy = b.y - p.y
          const rr = ballRadius + pegRadius
          const d2 = dx * dx + dy * dy
          if (d2 >= rr * rr) continue

          const d = Math.sqrt(Math.max(1e-6, d2))
          const nx = dx / d
          const ny = dy / d
          const overlap = rr - d

          b.x += nx * overlap
          b.y += ny * overlap

          const vn = b.vx * nx + b.vy * ny
          if (vn < 0) {
            b.vx -= (1 + restitution) * vn * nx
            b.vy -= (1 + restitution) * vn * ny
          }
        }

        // Landing - 落地检测
        if (b.y >= floorY) {
          const slots = multipliers.length
          const boardW = width - sideMargin * 2
          const slotW = boardW / slots
          clamp(
            Math.floor((b.x - sideMargin) / slotW),
            0,
            slots - 1
          )
          onStats({ ballsInFlight: balls.length })

          ballLayer.removeChild(b.sprite)
          balls.splice(i, 1)
          onStats({ ballsInFlight: balls.length })
          continue
        }
      }
    }

    // 更新所有球的精灵位置（用于渲染）
    // 这里使用实际计算的位置，确保渲染与物理同步
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i]
      b.sprite.x = b.x
      b.sprite.y = b.y
    }
  }

  rebuildBoard()

  app.ticker.add(tick)

  return {
    drop,
    reset,
    setSpeed: (v) => {
      speed = clamp(v, 0.05, 5)
    },
    resize: (w, h) => {
      width = Math.max(1, w)
      height = Math.max(1, h)
      rebuildBoard()
      reset()
    },
    destroy: () => {
      // 取消所有待执行的 drop 操作
      for (const timeout of dropTimeouts) {
        clearTimeout(timeout)
      }
      dropTimeouts.length = 0

      app.ticker.destroy()
      reset()
      stage.removeChild(world)
      world.destroy({ children: true })
    },
  }
}
