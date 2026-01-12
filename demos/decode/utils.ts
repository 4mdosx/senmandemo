// Decode Demo 工具函数

export function checkInputType(input: string): string {
  if (input.includes('\\u')) {
    return 'unicode'
  }
  if (input.startsWith('Ob')) {
    return 'number: binary'
  }
  if (input.startsWith('0x')) {
    return 'number: hex'
  }
  if (input.startsWith('0')) {
    return 'number: octal'
  }
  if (input.match(/^[0-9]+$/)) {
    return 'number: decimal'
  }

  if (input.startsWith('#') && (input.length === 7 || input.length === 4)) {
    return 'color:hex'
  }

  return 'string'
}

export function guessTransformType(newInputType: string): string {
  if (newInputType === 'unicode') {
    return 'string'
  }
  if (newInputType.startsWith('number:')) {
    return 'number'
  }
  if (newInputType.startsWith('color:')) {
    return 'color'
  }

  return 'unicode'
}

export function numberBase(index: number): string {
  switch (index) {
    case 0:
      return 'binary: '
    case 1:
      return 'octal: '
    case 2:
      return 'hex: '
    case 3:
      return 'decimal: '
    default:
      return 'decimal: '
  }
}

export function transform(input: string, inputType: string, targetType: string): string[] {
  if (inputType === 'string' && targetType === 'unicode') {
    return [
      input
        .split('')
        .map(
          (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
        )
        .join(''),
    ]
  }
  if (inputType === 'unicode' && targetType === 'string') {
    return [
      input.split('\\u').filter(Boolean).map((code) => String.fromCharCode(parseInt(code, 16))).join(''),
    ]
  }

  if (targetType === 'number') {
    let num = NaN
    if (inputType.endsWith(':binary')) {
      num = Number.parseInt(input.slice(2), 2)
    } else if (inputType.endsWith(':hex')) {
      num = Number.parseInt(input.slice(2), 16)
    } else if (inputType.endsWith(':octal')) {
      num = Number.parseInt(input.slice(2), 8)
    } else {
      num = Number.parseInt(input, 10)
    }
    return [
      num.toString(2),
      num.toString(8),
      num.toString(16),
      num.toString(10),
    ] as string[]
  }

  // TODO: color transform
  return [input]
}
