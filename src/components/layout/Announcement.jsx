import { useEffect, useState } from 'react'

function cutoffString() {
  const now = new Date()
  const mid = new Date(now)
  mid.setHours(24, 0, 0, 0)
  let s = Math.floor((mid - now) / 1000)
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${h}:${m}:${ss}`
}

export default function Announcement() {
  const [cutoff, setCutoff] = useState(cutoffString())

  useEffect(() => {
    const id = setInterval(() => setCutoff(cutoffString()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative z-[60] bg-ink px-4 py-2 text-center text-[12.5px] tracking-[0.02em] text-[#F6E3D7]">
      Freshly baked today · Same-day delivery in 60+ cities ·{' '}
      <b className="text-pink-soft">
        Order within <span className="font-semibold tabular-nums text-gold">{cutoff}</span>
      </b>{' '}
      for midnight delivery
    </div>
  )
}
