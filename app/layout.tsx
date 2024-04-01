import Auth from '@/component/auth/auth'
// import HeaderMenu from '@/component/header/HeaderMenu'
import { Header } from '@/component/header/HeaderMenu'
import { Providers } from '@/component/provider/Provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StockMate',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="container mx-auto">
            <main>
              <Auth>{children}</Auth>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
