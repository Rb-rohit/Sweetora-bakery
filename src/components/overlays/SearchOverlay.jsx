import { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { PRODUCTS, FLAVOURS, QCATS, fmt } from '../../data/products.js'
import Icon from '../ui/Icon.jsx'

const TRENDING = ['Bento cake', 'Red velvet', 'Midnight delivery', 'Photo cake', 'Anniversary', 'Eggless']

export default function SearchOverlay() {
  const { closeAll, doSearch, recentSearches, openPDP } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const q = query.trim().toLowerCase()

  const flavourMatches = useMemo(() => (q ? FLAVOURS.filter(([n]) => n.toLowerCase().includes(q)).slice(0, 6) : []), [q])
  const results = useMemo(
    () => (q ? PRODUCTS.filter((p) => (p.name + ' ' + p.cat + ' ' + p.flavours.join(' ')).toLowerCase().includes(q)).slice(0, 8) : []),
    [q],
  )

  function handleSearch(text) {
    setQuery(text)
    doSearch(text)
  }

  return (
    <div className="fixed inset-0 z-[80] flex animate-fade-in flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-8">
        <Icon className="h-5 w-5 shrink-0 text-muted-2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && query.trim() && handleSearch(query.trim())}
          placeholder="Search cakes, gifts, flavours…"
          className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-2"
        />
        <button onClick={closeAll} aria-label="Close search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>

      <div className="mx-auto w-full max-w-[720px] flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {q ? (
          <>
            {flavourMatches.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {flavourMatches.map(([n, , cat]) => (
                  <button key={n} onClick={() => handleSearch(n.toLowerCase())} className="rounded-full border-[1.5px] border-line px-4 py-2 text-[13px] font-semibold text-choc hover:border-pink hover:text-pink">
                    {n}
                  </button>
                ))}
              </div>
            )}
            {results.length > 0 ? (
              <div>
                {results.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => { closeAll(); openPDP(p.id) }}
                    className="flex cursor-pointer items-center gap-3.5 border-b border-line py-3 hover:bg-cream-2"
                  >
                    <img src={p.img} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <b className="block truncate text-sm">{p.name}</b>
                      <span className="text-[12px] text-muted">{p.cat}</span>
                    </div>
                    <b className="shrink-0 text-sm">{fmt(p.price)}</b>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo; — try a different term.</p>
            )}
          </>
        ) : (
          <>
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <h4 className="mb-3 text-[12.5px] font-bold uppercase tracking-[.06em] text-muted">Recent searches</h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button key={s} onClick={() => handleSearch(s)} className="rounded-full border-[1.5px] border-line px-4 py-2 text-[13px] font-semibold text-choc hover:border-pink hover:text-pink">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-8">
              <h4 className="mb-3 text-[12.5px] font-bold uppercase tracking-[.06em] text-muted">Trending searches</h4>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((s) => (
                  <button key={s} onClick={() => handleSearch(s.toLowerCase())} className="flex items-center gap-1.5 rounded-full bg-pink-ghost px-4 py-2 text-[13px] font-semibold text-pink">
                    <Icon className="h-3.5 w-3.5"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></Icon> {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-[12.5px] font-bold uppercase tracking-[.06em] text-muted">Popular categories</h4>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {QCATS.slice(0, 8).map(([n, c]) => (
                  <button key={n} onClick={() => handleSearch(n.toLowerCase())} className="rounded-xl border border-line px-3 py-3 text-center text-[12.5px] font-semibold text-choc hover:border-pink hover:text-pink">
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
