// Plinko Demo 样式常量

// 背景色
export const COLORS = {
  background: 0xf8fafc, // #F8FAFC - iOS 系白
  backgroundAlt: 0xf5f7fa, // #F5F7FA - 冷浅灰
  backgroundWarm: 0xfafaf9, // #FAFAF9 - 微暖白

  // 小球颜色 - 高饱和但柔和
  ballPrimary: 0x38bdf8, // #38BDF8 - 电蓝
  ballSecondary: 0x22d3ee, // #22D3EE - 青色
  ballAccent: 0xa855f7, // #A855F7 - 紫色
  ballCoral: 0xfb7185, // #FB7185 - 珊瑚

  // 钉子颜色
  pegNormal: 0xcbd5e1, // #CBD5E1 - slate-300 浅灰
  pegHighlight: 0x38bdf8, // 电蓝描边

  // 尾迹颜色
  trailColor: 0x38bdf8, // 电蓝尾迹

  // UI 元素
  frame: 0xe2e8f0, // 边框浅灰
  slotLine: 0xcbd5e1, // 槽位线
  text: 0x1e293b, // 深灰文字
} as const

// 物理参数
export const PHYSICS = {
  gravity: 20, // m/s^2
  restitution: 0.85, // 弹性系数
  airDamp: 0.999, // 空气阻力
} as const

// 尺寸参数
export const SIZES = {
  topMargin: 24,
  bottomMargin: 80,
  sideMargin: 24,
  pegRadius: 6,
  ballRadius: 10,
  rows: 9,
  spacing: 52,
} as const
