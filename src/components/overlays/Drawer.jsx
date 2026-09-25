import { useEffect, useState } from 'react'

export default function Drawer({ onClose, children, widthClass = 'w-full max-w-[440px]' }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in bg-black/45" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-y-0 right-0 flex ${widthClass} flex-col bg-white shadow-lg2 transition-transform duration-300 ease-out ${shown ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {children}
      </div>
    </div>
  )
}
