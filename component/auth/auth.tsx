'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const Auth = ({ children }: { children: ReactNode }) => {
  const route = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include',
        })

        if (!response.ok) throw new Error('Invalid User')
        else {
          const res = await response.json()
          sessionStorage.setItem('userId', (res as any)?.data?.id)
          sessionStorage.setItem('role', (res as any)?.data?.role)
          console.log(res, 'patload data')
        }
      } catch (error) {
        if (!pathName.startsWith('/auth')) route.push('/auth/login')
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}

export default Auth
