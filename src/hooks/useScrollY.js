import { useEffect, useState } from 'react'

export function useScrollY() {
  const [y, setY] = useState(() => (typeof window !== 'undefined' ? window.scrollY : 0))
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}
