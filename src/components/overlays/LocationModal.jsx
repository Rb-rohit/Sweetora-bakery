import { useMemo, useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { CITIES } from '../../data/products.js'
import Modal from './Modal.jsx'
import Icon from '../ui/Icon.jsx'

export default function LocationModal() {
  const { closeAll, setCityValue, detectCity, city } = useStore()
  const [q, setQ] = useState('')
  const list = useMemo(() => CITIES.filter((c) => c.toLowerCase().includes(q.trim().toLowerCase())), [q])

  return (
    <Modal onClose={closeAll} widthClass="w-full max-w-[460px]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="text-lg">Select your city</h3>
        <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>
      <div className="px-6 py-5">
        <div className="mb-4 flex items-center gap-2.5 rounded-full border-[1.5px] border-line px-4 py-2.5">
          <Icon className="h-4 w-4 text-muted-2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search city" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <button
          onClick={detectCity}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-pink bg-pink-ghost py-3 text-[13.5px] font-bold text-pink"
        >
          <Icon className="h-4 w-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>
          Detect my location
        </button>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {list.map((c) => (
            <button
              key={c}
              onClick={() => setCityValue(c)}
              className={`rounded-xl border-[1.5px] px-3 py-2.5 text-[13px] font-semibold transition-colors ${c === city ? 'border-pink bg-pink-ghost text-pink' : 'border-line text-choc hover:border-pink hover:text-pink'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}
