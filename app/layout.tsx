import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { cn } from '../lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeetCode Grind Ultimate',
  description: 'Master technical interviews with curated problems from top companies',
  keywords: ['LeetCode', 'algorithms', 'data structures', 'interview prep', 'coding problems'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(
      "dark",
      inter.variable, 
      jetbrainsMono.variable, 
      sourceSerif.variable,
      "antialiased"
    )}>
      <body className={cn(
        "min-h-screen bg-background font-sans text-foreground",
        inter.className
      )}>
        {children}
      </body>
    </html>
  )
} 