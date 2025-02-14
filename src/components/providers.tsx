'use client'

import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  )
}
