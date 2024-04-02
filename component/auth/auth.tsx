'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const Auth = ({ children }: { children: ReactNode }) => {
  const route = useRouter()
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Invalid User')
      } catch (error) {
        route.push('/auth/login')
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}

export default Auth
