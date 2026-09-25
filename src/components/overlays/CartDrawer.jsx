import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { fmt } from '../../data/products.js'
import Drawer from './Drawer.jsx'
import Icon from '../ui/Icon.jsx'

export default function CartDrawer() {
  const { cart, chQty, rmItem, applyCoupon, coupon, cartTotals, closeAll, openCheckout, goShop } = useStore()
  const [code, setCode] = useState('')
  const t = cartTotals

  return (
    <Drawer onClose={closeAll}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h3 className="text-lg">Your Cart {cart.length > 0 && <span className="text-pink">({cart.reduce((s, c) => s + c.qty, 0)})</span>}</h3>
        <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-5 grid h-[110px] w-[110px] place-items-center rounded-full bg-pink-ghost text-pink">
              <Icon className="h-11 w-11"><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.4 11h10.4L21 8H7" /></Icon>
            </div>
            <h3 className="mb-2 text-xl">Your cart is empty</h3>
            <p className="mb-5 text-sm text-muted">Add something sweet to get started.</p>
            <button onClick={() => { closeAll(); goShop() }} className="rounded-full bg-pink px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)]">
              Shop Cakes
            </button>
          </div>
        ) : (
          cart.map((c) => (
            <div key={c.key} className="mb-4 flex gap-3.5 border-b border-line pb-4">
              <img src={c.img} alt={c.name} className="h-[76px] w-[76px] shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <b className="block text-sm">{c.name}</b>
                <div className="mt-[3px] text-[12px] text-muted">
                  {c.size} · {c.flav}
                  {c.eggless ? ' · Eggless' : ''}
                  {c.photo ? ' · Photo print' : ''}
                  {c.addons.length ? ` · +${c.addons.length} add-on${c.addons.length > 1 ? 's' : ''}` : ''}
                </div>
                {c.msg && <div className="mt-[3px] truncate text-[12px] italic text-muted-2">&ldquo;{c.msg}&rdquo;</div>}
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button onClick={() => chQty(c.key, -1)} className="h-8 w-8 text-choc hover:text-pink">−</button>
                    <b className="w-7 text-center text-[13px]">{c.qty}</b>
                    <button onClick={() => chQty(c.key, 1)} className="h-8 w-8 text-choc hover:text-pink">+</button>
                  </div>
                  <button onClick={() => rmItem(c.key)} aria-label="Remove" className="ml-auto text-muted hover:text-pink">
                    <Icon className="h-[17px] w-[17px]"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M7 7l1 13h8l1-13" /></Icon>
                  </button>
                </div>
              </div>
              <b className="shrink-0 text-sm">{fmt(c.unit * c.qty)}</b>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t border-line px-5 py-4">
          <div className="mb-3.5 flex gap-2">
            <input
              value={coupon || code}
              disabled={!!coupon}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-xl border-[1.5px] border-line bg-white px-3.5 py-2.5 text-sm uppercase outline-none focus:border-pink disabled:bg-cream-2"
            />
            <button
              onClick={() => applyCoupon(code)}
              className={`rounded-xl px-4 py-2.5 text-[13px] font-bold ${coupon ? 'bg-cream-2 text-pink' : 'bg-ink text-white'}`}
            >
              {coupon ? 'Remove' : 'Apply'}
            </button>
          </div>
          {t.cErr && <p className="mb-2.5 text-[12.5px] text-[#B3382E]">{t.cErr}</p>}

          <Row label="Subtotal" value={fmt(t.sub)} />
          {t.disc > 0 && <Row label={`Discount (${coupon})`} value={`−${fmt(t.disc)}`} valueClass="text-green" />}
          <Row label="Delivery fee" value={t.slotFee ? fmt(t.slotFee) : 'FREE'} />
          <Row label="Taxes (5%)" value={fmt(t.tax)} />
          <div className="my-2.5 border-t border-line" />
          <Row label="Grand Total" value={fmt(t.total)} bold />

          <button onClick={openCheckout} className="mt-3.5 w-full rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] transition-all hover:-translate-y-0.5 hover:bg-pink-deep">
            Proceed to Checkout · {fmt(t.total)}
          </button>
        </div>
      )}
    </Drawer>
  )
}

function Row({ label, value, bold, valueClass = '' }) {
  return (
    <div className={`mb-2 flex justify-between text-[13.5px] ${bold ? 'text-base font-extrabold' : 'text-muted-3'}`}>
      <span>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}
