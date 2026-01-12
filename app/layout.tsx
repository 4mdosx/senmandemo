import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from './ErrorBoundary'

export const metadata: Metadata = {
  title: 'Web App Demo',
  description: 'A demo of a web app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
