import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { fmt, stars } from '../../data/products.js'
import Icon from '../ui/Icon.jsx'

export default function ProductCard({ product: p }) {
  const { wishlist, toggleWish, openPDP, openQV, quickAdd } = useStore()
  const [added, setAdded] = useState(false)
  const wished = wishlist.has(p.id)
  const disc = Math.round((1 - p.price / p.mrp) * 100)

  function handleAdd(e) {
    e.stopPropagation()
    quickAdd(p.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article onClick={() => openPDP(p.id)} className="group flex cursor-pointer flex-col overflow-hidden rounded-lg2 border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg2">
      <div className="relative aspect-square cursor-pointer overflow-hidden bg-cream-2" onClick={() => openPDP(p.id)}>
        <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
        <div className="absolute left-3 top-3 z-[2] flex flex-col gap-1.5">
          {p.badges.includes('best') && <span className="w-max rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-gold">BESTSELLER</span>}
          {p.badges.includes('new') && <span className="w-max rounded-full bg-pink px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-white">NEW</span>}
          {p.badges.includes('egg') && <span className="w-max rounded-full bg-[#E9F7EE] px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-green">EGGLESS</span>}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleWish(p.id) }}
          aria-label="Add to wishlist"
          className={`absolute right-3 top-3 z-[2] grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm2 transition-all duration-200 hover:text-pink ${
            wished ? 'text-pink opacity-100' : 'translate-y-0 text-choc opacity-100 sm:-translate-y-1.5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100'
          }`}
        >
          <Icon className={`h-[17px] w-[17px] ${wished ? 'fill-pink' : ''}`}>
            <path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" />
          </Icon>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); openQV(p.id) }}
          className="absolute inset-x-3 bottom-3 z-[2] translate-y-[140%] rounded-xl bg-ink/90 py-2.5 text-center text-[12.5px] font-semibold text-white backdrop-blur-sm transition-transform duration-300 hover:bg-ink group-hover:translate-y-0"
        >
          Quick View
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-[7px] p-4 pb-[18px]">
        <span className="text-[11px] font-bold uppercase tracking-[.08em] text-pink">{p.cat}</span>
        <h3 onClick={() => openPDP(p.id)} className="cursor-pointer font-display text-[17.5px] font-semibold leading-tight hover:text-pink">
          {p.name}
        </h3>
        <div className="flex items-center gap-[7px] text-[12.5px] text-muted">
          <span className="tracking-wider text-gold">{stars(p.rating)}</span> {p.rating} · {p.reviews} reviews
        </div>
        <div className="mt-auto flex items-baseline gap-2.5 pt-1">
          <span className="text-[19px] font-bold">{fmt(p.price)}</span>
          <span className="text-[13px] text-muted-2 line-through">{fmt(p.mrp)}</span>
          <span className="text-[11.5px] font-bold text-green">{disc}% OFF</span>
        </div>
        <button
          onClick={handleAdd}
          className={`mt-2.5 flex w-full items-center justify-center gap-[7px] rounded-xl py-[11px] text-[13.5px] font-bold transition-colors duration-200 ${
            added ? 'bg-[#E9F7EE] text-green' : 'bg-pink-ghost text-pink hover:bg-pink hover:text-white'
          }`}
        >
          <Icon className="h-[15px] w-[15px]">{added ? <path d="M4 12l6 6L20 6" /> : <path d="M12 5v14M5 12h14" />}</Icon>
          {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
