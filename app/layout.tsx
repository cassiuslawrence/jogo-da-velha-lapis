import type { Metadata, Viewport } from 'next'
import { Caveat } from 'next/font/google'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '600', '700'],
})

export const viewport: Viewport = {
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Jogo da Velha',
  description: 'Jogo da Velha com estilo lápis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${caveat.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
