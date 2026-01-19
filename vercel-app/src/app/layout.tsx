import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TOPSIS Web Service',
  description: 'Multi-Criteria Decision Analysis Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  )
}