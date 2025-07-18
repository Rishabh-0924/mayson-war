import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mayson',
  description: 'Welcome to Mayson — Your trusted brand for quality products',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shield.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
