import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function verifyUser() {
      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Verification failed')
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [router])

  return { user, loading }
} 