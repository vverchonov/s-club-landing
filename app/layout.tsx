import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { TranslationProvider } from '../lib/context/TranslationContext'

const inter = Inter({ subsets: ['latin'] })

// Default metadata (fallback)
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17459709954"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17459709954');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <TranslationProvider>
          <Navigation />
          <main className="pt-28">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </TranslationProvider>
      </body>
    </html>
  )
}
