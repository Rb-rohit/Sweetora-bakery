import { useStore } from '../../context/StoreContext.jsx'
import { COUPONS, fmt } from '../../data/products.js'

export default function CouponsList() {
  const { toast } = useStore()
  return (
    <>
      {COUPONS.map((c) => (
        <div key={c.code} className="mb-3.5 flex items-center gap-[18px] rounded-md2 border-[1.5px] border-dashed border-pink bg-white p-5">
          <div>
            <div className="font-display text-xl font-bold tracking-[.04em] text-pink">{c.code}</div>
            <p className="mt-1 text-[12.5px] text-muted">{c.desc} · Min order {fmt(c.min)}{c.max ? ` · Max savings ${fmt(c.max)}` : ''}</p>
          </div>
          <button
            onClick={() => { navigator.clipboard?.writeText(c.code); toast(`${c.code} copied — apply in cart`) }}
            className="ml-auto whitespace-nowrap rounded-full border-[1.5px] border-pink px-5 py-2.5 text-[13px] font-bold text-pink hover:bg-pink hover:text-white"
          >
            Copy
          </button>
        </div>
      ))}
      <div className="mb-3.5 flex items-center gap-[18px] rounded-md2 border-[1.5px] border-dashed border-line bg-white p-5 opacity-60">
        <div>
          <div className="font-display text-xl font-bold tracking-[.04em] text-muted-2">FESTIVE25</div>
          <p className="mt-1 text-[12.5px] text-muted">Expired on 15 Sep 2026</p>
        </div>
        <button disabled className="ml-auto whitespace-nowrap rounded-full border-[1.5px] border-line px-5 py-2.5 text-[13px] font-bold text-muted-2">Expired</button>
      </div>
    </>
  )
}
