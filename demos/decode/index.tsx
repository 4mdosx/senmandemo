'use client'

// Decode Demo 页面入口
import { Input } from '@/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
import { useDecode } from './hooks'
import { numberBase } from './utils'

export default function DecodeDemo() {
  const { input, inputType, targetType, results, inputHandler } = useDecode()

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Unicode code, Number Base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              type="text"
              autoFocus
              autoComplete="off"
              value={input}
              onChange={inputHandler}
              placeholder="Input text to decode..."
            />
          </div>

          <div className="space-y-2">
            <Label>Result</Label>
            <div className="space-y-1">
              {results.map((result, index) => (
                <div key={index} className="p-2 bg-muted rounded-md min-h-10">
                  {targetType === 'number'
                    ? numberBase(index) + result
                    : result}
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-bold capitalize">{inputType}</span>
            <span className="mx-2">→</span>
            <span className="font-bold capitalize">{targetType}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
