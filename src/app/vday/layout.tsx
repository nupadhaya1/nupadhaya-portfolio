import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Lora } from 'next/font/google'

import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  title: 'Will You Be My Valentine?',
  description: 'A very important question for a very special person.',
}

export const viewport: Viewport = {
  themeColor: '#F9A8C9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${lora.variable}`}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  )
}
