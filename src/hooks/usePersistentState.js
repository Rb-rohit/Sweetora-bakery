import { useEffect, useState } from 'react'

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem('sw_' + key)
    return raw != null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem('sw_' + key, JSON.stringify(value))
  } catch {
    /* storage unavailable — fail silently, same as the original */
  }
}

/** Persistent state backed by localStorage under the `sw_` namespace. */
export function usePersistentState(key, initial) {
  const [state, setState] = useState(() => readStorage(key, initial))
  useEffect(() => {
    writeStorage(key, state)
  }, [key, state])
  return [state, setState]
}
