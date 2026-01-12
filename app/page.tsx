import { AppGrid } from '@/features/brand/AppGrid'
import { BrutalDemoWindow } from '@/features/brand/BrutalDemoWindow'
import { Code, Palette, Zap, Users, Globe, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools & Mini Games | 4mdosx.dev - Web Design & Development Studio',
  description: 'Explore interactive tools and mini games. Zero friction, instant access. Web design and development studio crafting modern digital experiences with React, Next.js, and TypeScript.',
  keywords: [
    'web development',
    'mini games',
    'interactive tools',
    'web design',
    'UI/UX design',
    'web studio',
    'digital experiences',
    '4mdosx.dev',
  ],
  authors: [{ name: '4mdosx.dev' }],
  creator: '4mdosx.dev',
  publisher: '4mdosx.dev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://4mdosx.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tools & Mini Games | 4mdosx.dev',
    description: 'Explore interactive tools and mini games. Zero friction, instant access. Web design and development studio.',
    url: 'https://4mdosx.dev',
    siteName: '4mdosx.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools & Mini Games | 4mdosx.dev',
    description: 'Explore interactive tools and mini games. Zero friction, instant access.',
    creator: '@4mdosx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Neo-Swiss Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Hero Section - Neo-Swiss Style */}
      <div className="relative bg-white border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-12 xl:px-16">
          {/* Grid Container - 12 columns */}
          <div className="grid grid-cols-12 gap-4 md:gap-10 py-2 md:py-8 lg:py-16">
            {/* 移动端：介绍部分先显示，桌面端：在右侧 */}
            <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
              <div className="h-full flex flex-col">
                {/* Decorative Number */}
                <div className="mb-4 md:mb-8">
                  <h1 className="text-[80px] md:text-[120px] lg:text-[180px] xl:text-[240px] font-bold leading-none text-black opacity-5 select-none">
                    4mdosx.dev
                  </h1>
                </div>

                {/* Title */}
                <div className="mb-4 md:mb-6">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-[0.95] tracking-tight mb-4 md:mb-6">
                    Tools & Mini Games
                  </h1>
                </div>

                {/* Description */}
                {/* Stats Grid - Neo-Swiss Style */}
                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-8">
                  <div className="border-2 border-black bg-black text-white p-4 md:p-6 hover:bg-white hover:text-black transition-all duration-200 group">
                    <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-80 group-hover:opacity-100">INSTANT ACCESS</div>
                    <div className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-1">Zero Friction</div>
                    <div className="text-xs opacity-70 group-hover:opacity-90">Click & Play • No Registration</div>
                  </div>
                </div>

                {/* Vertical Line and Category Label */}
                <div className="mt-auto pt-4 md:pt-8 border-t-2 border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-px h-8 md:h-12 bg-black"></div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                        * Explore the modern interaction of the browser
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 移动端：Demo Window 后显示，桌面端：在左侧 */}
            <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 h-full flex flex-col min-h-[calc(100vh-1rem)] md:min-h-0">
              <BrutalDemoWindow />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Neo-Swiss Grid */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Section Label */}
          <div className="col-span-12 lg:col-span-2 lg:mb-0">
            <div className="sticky top-8">
              <div className="border-t-2 border-black pt-2">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-black mb-1">
                  TOOLS
                </div>
                <div className="text-xs font-light text-black opacity-60">
                  Browse by Category
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content Grid */}
          <div className="col-span-12 lg:col-span-10">
            <AppGrid />
          </div>
        </div>
      </div>

      {/* Studio Capabilities Section */}
      <section className="relative bg-white border-t-2 border-black border-b-2">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="col-span-12 lg:col-span-10">
              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-[0.95] tracking-tight">
                  Design & Development
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-black opacity-70 max-w-2xl leading-relaxed">
                  Craft digital experiences through modern web technologies,
                  thoughtful design, and innovative solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Code className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">Web Development</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                React, Next.js, TypeScript. Modern frameworks for scalable,
                performant applications.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Palette className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">UI/UX Design</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                Clean interfaces, intuitive interactions. User-centered design
                that converts.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Zap className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">Performance</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                Optimized code, fast load times. Every millisecond matters
                for user experience.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Users className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">Consulting</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                Technical guidance, architecture design. Strategic advice for
                your next project.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Globe className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">Full-Stack</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                End-to-end solutions. From concept to deployment, we handle
                every layer.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-6 md:p-8 hover:bg-black transition-all duration-200 group">
              <div className="mb-4">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 stroke-2 text-black group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-200">Innovation</h3>
              <p className="text-sm md:text-base text-black opacity-70 group-hover:text-white group-hover:opacity-90 leading-relaxed transition-all duration-200">
                Cutting-edge technologies, creative solutions. Pushing boundaries
                of what&apos;s possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-8 md:mb-12">
            <div className="col-span-1 md:col-span-4">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">4mdosx.dev</h3>
                <p className="text-sm text-black opacity-60 leading-relaxed">
                  Web Design & Dev
                  <br />
                  Crafting digital experiences
                </p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4">
              <div className="border-t-2 border-black pt-4">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-black mb-4">
                  SERVICES
                </div>
                <ul className="space-y-2 text-sm text-black opacity-70">
                  <li>Web Development</li>
                  <li>Mini Games</li>
                  <li>UI/UX Design</li>
                  <li>Consulting</li>
                  <li>Full-Stack Solutions</li>
                </ul>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4">
              <div className="border-t-2 border-black pt-4">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-black mb-4">
                  CONTACT
                </div>
                <ul className="space-y-2 text-sm text-black opacity-70">
                  <li>
                    <a href="mailto:4md.lain@gmail.com" className="hover:opacity-100 transition-opacity">
                      4md.lain@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-black pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xs text-black opacity-60">
                © {new Date().getFullYear()} 4mdosx.dev. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
