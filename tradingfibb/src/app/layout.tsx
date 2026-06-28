import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TradingFibb — Zerodha Authorized Person | Agartala, Tripura',
  description: "Tripura's first Zerodha Authorized Person. Open your free Demat account in Agartala with 7+ years of trading expertise. Personal support in Hindi & Bangla.",
  keywords: 'Zerodha Agartala, Zerodha Tripura, Zerodha Northeast India, demat account Agartala, TradingFibb, stock market Tripura',
  openGraph: {
    title: 'TradingFibb — Zerodha Authorized Person | Agartala',
    description: "Tripura's first Zerodha Authorized Person. Free Demat account with personal support.",
    url: 'https://tradingfibb.com',
    siteName: 'TradingFibb',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
