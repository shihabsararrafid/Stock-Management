// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation'
import Auth from '../auth/auth'
import { Header } from '../header/HeaderMenu'
import BottomNavigation from '../header/bottomNavigation'

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <>
      {!pathname.startsWith('/auth') && <Header />}
      <div className="container relative mx-auto  min-h-screen">
        <main>
          <Auth>{children}</Auth>
        </main>
      </div>
      {!pathname.startsWith('/auth') && <BottomNavigation />}

      {/* {children} */}
    </>
  )
}
