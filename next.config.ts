import type { NextConfig } from 'next'
import  { execSync } from 'child_process'

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GIT_COMMIT: execSync('git rev-parse --short HEAD')
      .toString()
      .trim(),
  },
}

export default nextConfig
