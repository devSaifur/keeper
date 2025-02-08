import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import './globals.css'

import { Navbar } from '@/components/navbar'
import Providers from '@/components/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Keeper',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </Providers>
  )
}
