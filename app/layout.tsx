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
  metadataBase: new URL('https://www.cherrylips.com.ua'),
  openGraph: {
    title: 'Cherry Lips showbar',
    description: 'Ексклюзивний Нічний клуб, Стриптиз клуб та Кабаре в Ужгороді',
    url: 'https://www.cherrylips.com.ua',
    siteName: 'Cherry Lips showbar',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cherry Lips showbar Logo',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cherry Lips showbar',
    description: 'Ексклюзивний Нічний клуб, Стриптиз клуб та Кабаре в Ужгороді',
    images: ['/logo.png'],
  },
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
