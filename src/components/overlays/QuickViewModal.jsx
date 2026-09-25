import { useStore } from '../../context/StoreContext.jsx'
import { SIZES, fmt, stars } from '../../data/products.js'
import Modal from './Modal.jsx'
import Icon from '../ui/Icon.jsx'

export default function QuickViewModal() {
  const { qvState, qvOpt, qvAdd, closeAll, openPDP } = useStore()
  if (!qvState) return null
  const { p, size, flav, qty } = qvState
  const unit = p.price + SIZES[size].a

  return (
    <Modal onClose={closeAll} widthClass="w-full max-w-[720px]">
      <div className="relative grid grid-cols-1 sm:grid-cols-2">
        <button onClick={closeAll} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
        <img src={p.img} alt={p.name} className="aspect-square w-full object-cover sm:aspect-auto sm:h-full" />
        <div className="p-6">
          <span className="text-[11px] font-bold uppercase tracking-[.08em] text-pink">{p.cat}</span>
          <h3 className="my-1.5 text-xl">{p.name}</h3>
          <div className="mb-3.5 flex items-center gap-[7px] text-[12.5px] text-muted"><span className="tracking-wider text-gold">{stars(p.rating)}</span> {p.rating} · {p.reviews} reviews</div>
          <div className="mb-4 text-2xl font-bold">{fmt(unit)}</div>

          <div className="mb-1.5 text-xs font-bold uppercase tracking-[.06em] text-muted">Size</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {SIZES.map((s, i) => (
              <button
                key={s.l}
                onClick={() => qvOpt('size', i)}
                className={`rounded-full border-[1.5px] px-4 py-2 text-[12.5px] font-semibold ${i === size ? 'border-pink bg-pink text-white' : 'border-line text-choc hover:border-pink'}`}
              >
                {s.l}
              </button>
            ))}
          </div>

          <div className="mb-1.5 text-xs font-bold uppercase tracking-[.06em] text-muted">Flavour</div>
          <div className="mb-5 flex flex-wrap gap-2">
            {p.flavours.map((f, i) => (
              <button
                key={f}
                onClick={() => qvOpt('flav', i)}
                className={`rounded-full border-[1.5px] px-4 py-2 text-[12.5px] font-semibold ${i === flav ? 'border-pink bg-pink text-white' : 'border-line text-choc hover:border-pink'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-full border-[1.5px] border-line">
              <button onClick={() => qvOpt('qty', -1)} className="h-11 w-10 text-lg text-choc hover:text-pink">−</button>
              <b className="w-10 text-center">{qty}</b>
              <button onClick={() => qvOpt('qty', 1)} className="h-11 w-10 text-lg text-choc hover:text-pink">+</button>
            </div>
            <button onClick={qvAdd} className="min-w-[160px] flex-1 rounded-full bg-pink px-[22px] py-[13px] text-[14.5px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
              Add to Cart · {fmt(unit * qty)}
            </button>
          </div>
          <button type="button" onClick={() => openPDP(p.id)} className="mt-3.5 inline-block cursor-pointer text-left text-[13px] font-semibold text-pink hover:underline">
            View full details →
          </button>
        </div>
      </div>
    </Modal>
  )
}
