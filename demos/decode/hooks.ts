'use client'

// Decode Demo 私有逻辑 hooks
import { useState } from 'react'
import { checkInputType, guessTransformType, transform } from './utils'

export function useDecode() {
  const [input, setInput] = useState('')
  const [inputType, setInputType] = useState('string')
  const [targetType, setTargetType] = useState('string')

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    setInput(value)
    const newInputType = checkInputType(value)
    setInputType(newInputType)
    setTargetType(guessTransformType(newInputType))
  }

  const results = transform(input, inputType, targetType)

  return {
    input,
    inputType,
    targetType,
    results,
    inputHandler,
  }
}
