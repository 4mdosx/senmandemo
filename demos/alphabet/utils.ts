// Alphabet Demo 工具函数

export const IPAS = {
  a: '/ʔaː/',
  ä: '/ʔɛː/',
  b: '/beː/',
  c: '/t͡seː/',
  d: '/deː/',
  e: '/ʔeː/',
  f: '/ʔɛf/',
  g: '/ɡeː/',
  h: '/haː/',
  i: '/ʔiː/',
  j: '/ʤeː/',
  k: '/kaː/',
  l: '/ʔɛl/',
  m: '/ʔɛm/',
  n: '/ʔɛn/',
  o: '/ʔoː/',
  ö: '/ʔøː/',
  p: '/peː/',
  q: '/keː/',
  r: '/ʔɛʁ/',
  s: '/ʔɛs/',
  ß: '/ɛsˈt͡sɛt/',
  t: '/teː/',
  u: '/ʔuː/',
  ü: '/ʔyː/',
  v: '/faʊ̯/',
  w: '/veː/',
  x: '/ʔɪks/',
  y: '/ˈʔʏpsilɔn/',
  z: '/t͡sɛt/',
} as const

export const code = {
  a: 'anton',
  ä: 'ärger',
  b: 'berta',
  c: 'cäsar',
  d: 'dora',
  e: 'emil',
  f: 'friedrich',
  g: 'gustav',
  h: 'heinrich',
  i: 'ida',
  j: 'julius',
  k: 'kaufmann',
  l: 'ludwig',
  m: 'martha',
  n: 'nordpol',
  o: 'otto',
  ö: 'ökonom',
  p: 'paula',
  q: 'quelle',
  r: 'richard',
  s: 'scharfes',
  t: 'theodor',
  u: 'ulrich',
  ü: 'übermut',
  v: 'viktor',
  w: 'wilhelm',
  x: 'xanthippe',
  y: 'ypsilon',
  z: 'zacharias',
  sch: 'schule',
  ß: 'groß',
} as const

export function toRomanNumber(number: number): string {
  const roman = [
    'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I',
  ]
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let result = ''
  for (let i = 0; i < roman.length; i++) {
    while (number >= values[i]) {
      number -= values[i]
      result += roman[i]
    }
  }
  return result
}

export async function speak(content: string): Promise<void> {
  if (!window.speechSynthesis) return
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(content)
    utterance.voice = window.speechSynthesis.getVoices().find((voice) => voice.lang.startsWith('de')) ?? null
    utterance.lang = 'de'
    utterance.onend = () => {
      setTimeout(() => {
        resolve()
      }, 200)
    }
    window.speechSynthesis.speak(utterance)
  })
}

export const standardLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
export const specialLetters = ['ä', 'ö', 'ü', 'ß']
export const allLetters = [...standardLetters, ...specialLetters]
