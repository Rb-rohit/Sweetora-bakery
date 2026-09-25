import { useStore } from '../../context/StoreContext.jsx'
import { fmt } from '../../data/products.js'

export default function StickyCTA() {
  const { view, currentPDP, pdpUnit, pdpAddToCart } = useStore()
  if (view !== 'pdp' || !currentPDP) return null

  const total = pdpUnit(currentPDP) * currentPDP.qty

  return (
    <div className="fixed inset-x-0 bottom-0 z-[44] flex gap-2.5 bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(90,48,40,.12)] sm:hidden">
      <div className="flex-1">
        <small className="text-[11px] text-muted">Total</small>
        <div className="text-lg font-extrabold">{fmt(total)}</div>
      </div>
      <button onClick={pdpAddToCart} className="flex-[1.4] rounded-full bg-pink px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)]">
        Add to Cart
      </button>
    </div>
  )
}
