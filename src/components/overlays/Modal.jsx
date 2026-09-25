import { useEffect, useState } from 'react'

export default function Modal({ onClose, children, widthClass = 'w-full max-w-[440px]' }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="fixed inset-0 z-[70] grid animate-fade-in place-items-center bg-black/45 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[90vh] overflow-y-auto rounded-lg2 bg-white shadow-lg2 transition-all duration-300 ease-out ${widthClass} ${shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}
