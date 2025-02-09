'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Toaster } from '@/components/ui/toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors />
    </NextThemesProvider>
  )
}
