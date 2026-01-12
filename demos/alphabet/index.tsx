'use client'

// Alphabet Demo 页面入口
import { Card, CardContent } from '@/ui/card'
import { useAlphabetSound } from './hooks'
import { IPAS, code, toRomanNumber, allLetters, speak } from './utils'

export default function AlphabetDemo() {
  const { current, play, clear, hasQueue } = useAlphabetSound()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold">
            German Letters
          </h1>
          <div className="flex items-center justify-end gap-2">
            {hasQueue ? (
              <button
                onClick={() => clear()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Stop
              </button>
            ) : null}
            <button
              onClick={() => play(allLetters)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={current !== null}
            >
              Play All
            </button>
          </div>
        </div>
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allLetters.map((letter, index) => (
              <Card
                onClick={() => play([letter])}
                key={letter}
                className={`overflow-hidden border border-border/50 shadow-sm cursor-pointer transition-colors ${
                  current === letter
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : ''
                }`}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center relative">
                  <div className="text-4xl font-light mb-2 mt-2">
                    {letter === 'ß' ? 'ẞ' : letter.toUpperCase()}
                    {letter}
                  </div>
                  <div className="text-xs text-muted-foreground absolute top-2 left-2">
                    {index < 26 ? toRomanNumber(index + 1) : ''}
                    {letter === 'ß'
                      ? 'Eszett'
                      : letter === 'ä'
                      ? 'A-umlaut'
                      : letter === 'ö'
                      ? 'O-umlaut'
                      : letter === 'ü'
                      ? 'U-umlaut'
                      : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {IPAS[letter as keyof typeof IPAS]}
                  </div>
                  <div
                    className="text-md mt-2 text-muted-foreground capitalize"
                    onClick={(e) => {
                      e.stopPropagation()
                      speak(code[letter as keyof typeof code])
                    }}
                  >
                    {code[letter as keyof typeof code]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <h2>About the German Alphabet</h2>
          <p>
            The German alphabet consists of the twenty-six letters of the ISO
            basic Latin alphabet plus four special characters: ä, ö, ü, and ß.
          </p>
          <p>
            The three umlauted vowels (ä, ö, ü) can be written as
            &quot;ae&quot;, &quot;oe&quot;, and &quot;ue&quot; respectively when
            the umlauts are not available. The letter ß (called Eszett or
            scharfes S) can be written as &quot;ss&quot;.
          </p>
          <p>
            In the German phonetic alphabet, these special characters have
            distinct pronunciations that are important for proper German speech.
          </p>
        </div>
      </div>
    </div>
  )
}
