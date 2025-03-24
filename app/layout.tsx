import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cherry Lips showbar',
  description: 'Ексклюзивний Нічний клуб, Стриптиз клуб та Кабаре в Ужгороді',
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon_io/site.webmanifest'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-28">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
