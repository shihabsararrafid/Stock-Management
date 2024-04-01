import Auth from '@/component/auth/auth'
import HeaderMenu from '@/component/header/HeaderMenu'
import { Providers } from '@/component/provider/Provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GizanTech',
  description:
    'GizanTech - Your Partner for Cutting-Edge Software and Hardware Solutions. Join us in shaping the future of technology!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <HeaderMenu />
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
