import 'vite'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: {
      includedRoutes?: () => string[] | Promise<string[]>
    }
  }
}