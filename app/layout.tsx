import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Encurtador de URL',
  description: 'Encurte suas URLs de forma simples e rápida'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  )
}
