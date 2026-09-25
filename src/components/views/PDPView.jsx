import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { PRODUCTS, ADDONS, SIZES, SLOTS, fmt, stars } from '../../data/products.js'
import { cakeSVG } from '../../data/svg.js'
import ProductGrid from '../product/ProductGrid.jsx'
import Icon from '../ui/Icon.jsx'

const ACC_ITEMS = (city) => [
  ['Highlights', 'Eggless option available · Serves 4–6 per 0.5 kg · FSSAI certified atelier · Custom message included'],
  ['Ingredients & Allergens', 'Refined flour, butter, Belgian couverture, fresh cream, free-range eggs (eggless uses flax gel). Contains: gluten, dairy, nuts (traces).'],
  ['Storage & Shelf Life', 'Refrigerate at 2–6°C. Best consumed within 48 hours. Bring to room temperature 20 min before serving.'],
  ['Delivery Information', `Live in ${city || 'your city'} — slots from 60-minute express to midnight. Cake travels in an insulated, tamper-proof box. Breakage? Instant replacement or refund.`],
  ['FAQs', 'Can I change the message after ordering? Yes, up to 4 hours before delivery. Is same-day really same-day? Yes, for orders before 8 PM in metro cities.'],
]

const REVIEW_BREAKDOWN = [[5, 72], [4, 18], [3, 6], [2, 2], [1, 2]]

function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="mt-[26px] border-t border-line">
      {items.map(([t, d], i) => (
        <div key={t} className="border-b border-line">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between py-[17px] text-left text-[14.5px] font-bold">
            {t}
            <Icon className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></Icon>
          </button>
          <div className={`acc-panel-grid ${open === i ? 'open' : ''}`}>
            <div><p className="pb-[18px] text-[13.5px] leading-[1.7] text-muted-3">{d}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PDPView() {
  const { currentPDP, pdpOpt, pdpUnit, pdpAddToCart, pdpBuyNow, wishlist, toggleWish, goHome, goShop, city, openLocation } = useStore()
  const [mainImgIdx, setMainImgIdx] = useState(0)

  if (!currentPDP) return null
  const c = currentPDP
  const p = c.p
  const disc = Math.round((1 - p.price / p.mrp) * 100)
  const unit = pdpUnit(c)
  const wished = wishlist.has(p.id)

  const thumbs = [p.img, p.img2, cakeSVG({ ...p.pal, drip: '#E85D75' }, p.variant)]
  const related = PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4)

  return (
    <div className="mx-auto w-[92%] max-w-[1240px] py-[30px] pb-[70px]">
      <div className="mb-2.5 text-[12.5px] text-muted-2">
        <a onClick={goHome} className="cursor-pointer hover:text-pink">Home</a> / <a onClick={() => goShop(p.cat)} className="cursor-pointer hover:text-pink">{p.cat}</a> / <b className="text-choc">{p.name}</b>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="relative aspect-square cursor-zoom-in overflow-hidden rounded-lg2 bg-cream-2">
            <img src={thumbs[mainImgIdx]} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-125" />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {p.badges.includes('best') && <span className="w-max rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-gold">BESTSELLER</span>}
              {p.badges.includes('new') && <span className="w-max rounded-full bg-pink px-2.5 py-1 text-[10.5px] font-bold tracking-[.04em] text-white">NEW</span>}
            </div>
          </div>
          <div className="mt-3.5 flex gap-3">
            {thumbs.map((src, i) => (
              <img key={i} src={src} onClick={() => setMainImgIdx(i)} alt={`view ${i + 1}`} className={`h-[76px] w-[76px] cursor-pointer rounded-2xl border-2 object-cover transition-colors ${mainImgIdx === i ? 'border-pink' : 'border-transparent'}`} />
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-[.08em] text-pink">{p.cat}</span>
          <h1 className="my-2.5 text-[26px] sm:text-[32px] lg:text-[38px]">{p.name}</h1>
          <div className="flex items-center gap-[7px] text-[13.5px] text-muted"><span className="tracking-wider text-gold">{stars(p.rating)}</span> {p.rating} · {p.reviews} reviews</div>
          <div className="my-[22px] flex items-baseline gap-2.5">
            <span className="text-[29px] font-bold">{fmt(unit)}</span>
            <span className="text-muted-2 line-through">{fmt(p.mrp + SIZES[c.size].a)}</span>
            <span className="text-[13px] font-bold text-green">{disc}% OFF</span>
          </div>
          <p className="text-[14.5px] leading-[1.7] text-muted-3">{p.desc}</p>

          <OptLabel>Select Size</OptLabel>
          <ChipRow>
            {SIZES.map((s, i) => (
              <Chip key={s.l} active={i === c.size} onClick={() => pdpOpt('size', i)}>
                {s.l}{s.a ? <small className="ml-1">+{fmt(s.a)}</small> : <small className="ml-1">· base</small>}
              </Chip>
            ))}
          </ChipRow>

          <OptLabel>Flavour</OptLabel>
          <ChipRow>
            {p.flavours.map((f, i) => <Chip key={f} active={i === c.flav} onClick={() => pdpOpt('flav', i)}>{f}</Chip>)}
          </ChipRow>

          <OptLabel>Options</OptLabel>
          <ChipRow>
            <Chip active={c.eggless} onClick={() => pdpOpt('egg', !c.eggless)}>Eggless {c.eggless ? '✓' : ''}</Chip>
            <Chip active={c.photo} onClick={() => pdpOpt('photo', !c.photo)}>Photo print +₹99</Chip>
          </ChipRow>

          <OptLabel>Personal message on cake (free)</OptLabel>
          <input
            value={c.msg}
            onChange={(e) => pdpOpt('msg', e.target.value)}
            maxLength={40}
            placeholder='e.g. "Happy 25th, Aarav!"'
            className="w-full rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-pink"
          />

          <OptLabel>
            Delivery{' '}
            {city ? (
              <>to <b className="text-pink">{city}</b></>
            ) : (
              <a onClick={openLocation} className="cursor-pointer normal-case tracking-normal text-pink">— set location</a>
            )}
          </OptLabel>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {SLOTS.map((s, i) => (
              <button
                key={s.n}
                onClick={() => pdpOpt('slot', i)}
                className={`rounded-xl border-[1.5px] px-1.5 py-[11px] text-center text-xs font-semibold transition-colors ${i === c.slot ? 'border-pink bg-pink-ghost text-pink' : 'border-line bg-white text-choc'}`}
              >
                <b className="block text-[12.5px]">{s.n}</b>
                <span className={`text-[10.5px] ${i === c.slot ? 'text-pink' : 'text-muted'}`}>{s.t}{s.fee ? ` · +${fmt(s.fee)}` : ' · FREE'}</span>
              </button>
            ))}
          </div>

          <OptLabel>Make it extra special</OptLabel>
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-2">
            {ADDONS.slice(0, 6).map((a) => (
              <button
                key={a.id}
                onClick={() => pdpOpt('addon', a.id)}
                className={`min-w-[110px] rounded-xl border-[1.5px] px-1.5 py-[11px] text-center text-xs font-semibold transition-colors ${c.addons.has(a.id) ? 'border-pink bg-pink-ghost text-pink' : 'border-line bg-white text-choc'}`}
              >
                <b className="block text-xs">{a.name}</b>
                <span className={`text-[10.5px] ${c.addons.has(a.id) ? 'text-pink' : 'text-muted'}`}>+{fmt(a.price)}</span>
              </button>
            ))}
          </div>

          <div className="mt-[26px] flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-full border-[1.5px] border-line bg-white">
              <button onClick={() => pdpOpt('qty', -1)} aria-label="decrease" className="h-11 w-10 text-lg text-choc hover:text-pink">−</button>
              <b className="w-10 text-center">{c.qty}</b>
              <button onClick={() => pdpOpt('qty', 1)} aria-label="increase" className="h-11 w-10 text-lg text-choc hover:text-pink">+</button>
            </div>
            <button onClick={pdpAddToCart} className="min-w-[170px] flex-1 rounded-full bg-pink px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] transition-all hover:-translate-y-0.5 hover:bg-pink-deep">
              Add to Cart · {fmt(unit * c.qty)}
            </button>
            <button onClick={pdpBuyNow} className="min-w-[140px] flex-1 rounded-full bg-ink px-[26px] py-[13px] text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md2">
              Buy Now
            </button>
            <button onClick={() => toggleWish(p.id)} aria-label="wishlist" className="rounded-full border-[1.5px] border-line bg-white px-[18px] py-[13px] hover:border-pink">
              <Icon className={`h-[18px] w-[18px] ${wished ? 'fill-pink text-pink' : ''}`}><path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" /></Icon>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-5 text-[12.5px] text-muted">
            <span>✓ Freshly baked today</span><span>✓ Free knife &amp; candles</span><span>✓ 100% happiness guarantee</span>
          </div>

          <Accordion items={ACC_ITEMS(city)} />
        </div>
      </div>

      {/* Ratings & reviews */}
      <div className="pt-16">
        <div className="mb-[34px]">
          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Ratings &amp; reviews</h2>
          <p className="mt-1.5 text-[15px] text-muted">What {p.reviews} customers said</p>
        </div>
        <div className="mb-[30px] grid grid-cols-1 gap-10 sm:grid-cols-[200px_1fr]">
          <div className="text-center">
            <div className="font-display text-[56px] font-bold">{p.rating}</div>
            <div className="text-lg tracking-wider text-gold">{stars(p.rating)}</div>
            <div className="mt-1.5 text-[12.5px] text-muted">{p.reviews} verified reviews</div>
          </div>
          <div>
            {REVIEW_BREAKDOWN.map(([s, pc]) => (
              <div key={s} className="mb-2.5 flex items-center gap-3 text-[12.5px]">
                <span className="w-[30px]">{s}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream-2"><div className="h-full rounded-full bg-gold" style={{ width: `${pc}%` }} /></div>
                <span className="w-[34px] text-muted">{pc}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="pt-16">
        <div className="mb-[34px]"><h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">You may also like</h2></div>
        <ProductGrid products={related} />
      </div>
    </div>
  )
}

function OptLabel({ children }) {
  return <div className="mb-[9px] mt-5 text-xs font-bold uppercase tracking-[.06em] text-muted">{children}</div>
}
function ChipRow({ children }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}
function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-[1.5px] px-[17px] py-[9px] text-[13px] font-semibold transition-all ${
        active ? 'border-pink bg-pink text-white shadow-[0_6px_16px_rgba(232,93,117,.3)]' : 'border-line bg-white text-choc hover:border-pink'
      }`}
    >
      {children}
    </button>
  )
}
