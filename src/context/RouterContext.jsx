import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

function getLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(getLocation)

  useEffect(() => {
    function onPopState() {
      setLocation(getLocation())
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path, { replace = false } = {}) => {
    const nextUrl = new URL(path, window.location.origin)
    if (nextUrl.href === window.location.href) return
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', nextUrl)
    setLocation(getLocation())
  }, [])

  const value = useMemo(() => ({
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    navigate,
  }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const router = useContext(RouterContext)
  if (!router) throw new Error('useRouter must be used within <RouterProvider>')
  return router
}