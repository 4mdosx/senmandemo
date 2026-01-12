'use client'

// Alphabet Demo 私有逻辑 hooks
import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

class Sound {
  private sound: Howl | null = null

  private initialize() {
    if (!this.sound) {
      this.sound = new Howl({
        src: ['/sounds/German_alphabet.ogg'],
        sprite: {
          a: [0, 1000],
          b: [1000, 1000],
          c: [2000, 1000],
          d: [3000, 1000],
          e: [4000, 1000],
          f: [5000, 1000],
          g: [6000, 1000],
          h: [7000, 1000],
          i: [8000, 1000],
          j: [9000, 1000],
          k: [10000, 1000],
          l: [11000, 1000],
          m: [12000, 1000],
          n: [13000, 1000],
          o: [14000, 1000],
          p: [15000, 1000],
          q: [16000, 1000],
          r: [17000, 1000],
          s: [18000, 1000],
          t: [19000, 1000],
          u: [20000, 1000],
          v: [21000, 1000],
          w: [22000, 1000],
          x: [23000, 1000],
          y: [24000, 1000],
          z: [25000, 1000],
          sch: [26000, 1000],
          ß: [27000, 1000],
        },
      })
    }
  }

  play(script: string) {
    // 延迟初始化，只在用户交互时创建 AudioContext
    this.initialize()
    return new Promise((resolve) => {
      this.sound?.play(script)
      setTimeout(() => {
        resolve(null)
      }, 1000)
    })
  }
}

export function useAlphabetSound() {
  const queue = useRef<string[]>([])
  const [current, setCurrent] = useState<string | null>(null)
  const sound = useRef<Sound | null>(null)

  // 延迟初始化 Sound，避免在组件挂载时创建 AudioContext
  if (!sound.current) {
    sound.current = new Sound()
  }

  useEffect(() => {
    if (current) {
      sound.current?.play(current).then(() => {
        if (queue.current.length > 0) {
          setCurrent(queue.current[0])
          queue.current = queue.current.slice(1)
        } else {
          setCurrent(null)
        }
      })
    }
  }, [current])

  function play(letters: string[]) {
    queue.current = letters
    setCurrent(null)
    setCurrent(queue.current[0])
    queue.current = queue.current.slice(1)
  }

  function clear() {
    queue.current = []
    setCurrent(null)
  }

  return {
    current,
    play,
    clear,
    hasQueue: queue.current.length > 0,
  }
}
