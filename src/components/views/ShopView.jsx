import { useStore } from '../../context/StoreContext.jsx'
import { ADDONS, FLAVOURS, fmt } from '../../data/products.js'
import ProductGrid from '../product/ProductGrid.jsx'
import Icon from '../ui/Icon.jsx'

const PRICE_OPTS = [
  ['lo', 'Under ₹599'],
  ['mid', '₹600 – ₹899'],
  ['hi', 'Premium ₹900+'],
]

function SortSelect({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer rounded-full border-[1.5px] border-line bg-white px-4 py-[9px] text-[13px] font-semibold text-choc outline-none ${className}`}
    >
      <option value="pop">Sort: Popular</option>
      <option value="lo">Price: Low to High</option>
      <option value="hi">Price: High to Low</option>
      <option value="rate">Top Rated</option>
      <option value="new">Newest</option>
    </select>
  )
}

export default function ShopView() {
  const { shopState, setSort, toggleF, toggleP, resetFilters, filteredProducts, goHome, city, toast, addGiftToCart, openGift } = useStore()

  const catName = shopState.cat ? shopState.cat.charAt(0).toUpperCase() + shopState.cat.slice(1) : 'All Cakes'
  const title = shopState.q ? `Results for "${shopState.q}"` : catName === 'Gifts' ? 'Gifts & Hampers' : catName
  const isGifts = shopState.cat === 'gifts'
  const list = filteredProducts

  return (
    <div>
      <div className="border-b border-line bg-white py-[26px]">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <div className="mb-2.5 text-[12.5px] text-muted-2">
            <a onClick={goHome} className="cursor-pointer hover:text-pink">Home</a> / <span>{title}</span>
          </div>
          <h2 className="text-[26px] sm:text-[30px] lg:text-[36px]">{title}</h2>
          <p className="mt-1.5 max-w-[640px] text-[14.5px] text-muted">
            Handcrafted in small batches with premium ingredients, delivered fresh in {city || 'your city'}. Filter by flavour, price and more to find your perfect match.
          </p>
        </div>
      </div>

      <div className="sticky top-[var(--header-h)] z-30 mx-auto flex w-[92%] max-w-[1240px] gap-2.5 bg-cream py-3 md:hidden">
        <button
          onClick={() => toast('Filters: use the sort & category chips below on mobile', 'err')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-[1.5px] border-line bg-white px-[18px] py-[9px] text-[13.5px] font-semibold text-choc transition-colors hover:border-pink hover:text-pink"
        >
          <Icon className="h-4 w-4"><path d="M4 6h16M7 12h10M10 18h4" /></Icon> Filters
        </button>
        <SortSelect value={shopState.sort} onChange={setSort} className="flex-1" />
      </div>

      <div className={`mx-auto w-[92%] max-w-[1240px] gap-9 py-9 pb-[70px] ${isGifts ? '' : 'grid md:grid-cols-[250px_1fr]'}`}>
        {!isGifts && (
          <aside className="hidden md:block">
            <div className="border-b border-line py-[18px]">
              <h4 className="mb-[13px] font-body text-[13.5px] font-bold">Category</h4>
              {FLAVOURS.slice(0, 8).map(([n, , c]) => (
                <label key={n} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13.5px] text-muted-3">
                  <input type="checkbox" checked={shopState.flavours.has(c)} onChange={() => toggleF(c)} className="h-4 w-4 accent-pink" /> {n}
                </label>
              ))}
            </div>
            <div className="border-b border-line py-[18px]">
              <h4 className="mb-[13px] font-body text-[13.5px] font-bold">Price</h4>
              {PRICE_OPTS.map(([v, l]) => (
                <label key={v} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13.5px] text-muted-3">
                  <input type="checkbox" checked={shopState.price.includes(v)} onChange={() => toggleP(v)} className="h-4 w-4 accent-pink" /> {l}
                </label>
              ))}
            </div>
            <div className="border-b border-line py-[18px]">
              <h4 className="mb-[13px] font-body text-[13.5px] font-bold">Rating</h4>
              <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13.5px] text-muted-3">
                <input type="checkbox" onChange={() => toast('Showing 4.5★ and above')} className="h-4 w-4 accent-pink" /> 4.5★ &amp; above
              </label>
            </div>
            <button onClick={resetFilters} className="mt-[18px] w-full rounded-full border-[1.5px] border-line bg-white px-[18px] py-2.5 text-[13.5px] font-semibold text-choc transition-colors hover:border-pink hover:text-pink">
              Clear all filters
            </button>
          </aside>
        )}

        <div>
          <div className="mb-6 hidden flex-wrap items-center gap-3.5 md:flex">
            <span className="text-[13.5px] text-muted">{isGifts ? `${ADDONS.length} gifts` : `${list.length} products`}</span>
            {!isGifts && <SortSelect value={shopState.sort} onChange={setSort} className="ml-auto" />}
          </div>

          {isGifts ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ADDONS.map((a) => (
                <article key={a.id} onClick={() => openGift(a.id)} className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-lg2 border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg2">
                  <div className="relative aspect-square overflow-hidden bg-cream-2 p-3">
                    <img src={a.img} alt={a.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.05]" />
                    <span className="absolute left-3 top-3 rounded-full bg-pink px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-white">GIFT</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-[7px] p-4 pb-[18px]">
                    <span className="text-[11px] font-bold uppercase tracking-[.08em] text-pink">gifting</span>
                    <h3 className="min-h-[42px] font-display text-[17.5px] font-semibold leading-tight">{a.name}</h3>
                    <div className="text-[12.5px] text-muted"><span className="tracking-wider text-gold">★★★★★</span> 4.7 · 120 reviews</div>
                    <div className="mt-auto flex items-baseline gap-2.5 pt-1"><span className="text-[19px] font-bold">{fmt(a.price)}</span><span className="text-[12px] text-muted">including all taxes</span></div>
                    <button onClick={() => addGiftToCart(a.id)} aria-label={`Add ${a.name} to cart`} className="mt-2.5 flex w-full items-center justify-center gap-[7px] rounded-xl bg-pink-ghost py-[11px] text-[13.5px] font-bold text-pink transition-colors hover:bg-pink hover:text-white">
                      <Icon className="h-[15px] w-[15px]"><path d="M12 5v14M5 12h14" /></Icon> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <ProductGrid products={list} />
          )}
        </div>
      </div>
    </div>
  )
}
