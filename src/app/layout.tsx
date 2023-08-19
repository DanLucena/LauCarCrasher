import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';

const space = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lau car crasher',
  description: 'How much days without incidents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={space.className}>{children}</body>
    </html>
  )
}
