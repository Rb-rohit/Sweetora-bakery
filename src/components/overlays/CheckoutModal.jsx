import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { CITIES, SLOTS, fmt } from '../../data/products.js'
import Modal from './Modal.jsx'
import Icon from '../ui/Icon.jsx'

const STEPS = ['Address', 'Delivery', 'Payment', 'Done']

function StepDots({ step }) {
  return (
    <div className="flex items-center justify-center gap-1.5 border-b border-line px-6 py-4">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <span
            className={`grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold ${
              i + 1 < step ? 'bg-green text-white' : i + 1 === step ? 'bg-pink text-white' : 'bg-cream-2 text-muted-2'
            }`}
          >
            {i + 1 < step ? '✓' : i + 1}
          </span>
          {i < STEPS.length - 1 && <span className={`h-[2px] w-6 sm:w-10 ${i + 1 < step ? 'bg-green' : 'bg-line'}`} />}
        </div>
      ))}
    </div>
  )
}

function AddressStep() {
  const { coNext } = useStore()
  const [f, setF] = useState({ name: '', phone: '', line: '', city: '', pin: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  return (
    <div className="px-6 py-6">
      <Field label="Full name" value={f.name} onChange={set('name')} placeholder="Aarav Sharma" />
      <Field label="Mobile number" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="98765 43210" inputMode="numeric" />
      <Field label="Full address" value={f.line} onChange={set('line')} placeholder="Flat / House no., Street, Landmark" />
      <div className="grid grid-cols-2 gap-3.5">
        <div className="mb-4">
          <label className="mb-[7px] block text-[12.5px] font-bold text-choc">City</label>
          <select value={f.city} onChange={set('city')} className="w-full rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-pink">
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Pincode" value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="400053" inputMode="numeric" />
      </div>
      <button onClick={() => coNext(f)} className="w-full rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
        Continue to Delivery
      </button>
    </div>
  )
}

function DeliveryStep() {
  const { coState, coSet, coNext, coBack } = useStore()
  return (
    <div className="px-6 py-6">
      <div className="mb-1.5 text-xs font-bold uppercase tracking-[.06em] text-muted">Delivery date</div>
      <div className="mb-5 flex gap-2.5">
        {['today', 'tomorrow'].map((d) => (
          <button
            key={d}
            onClick={() => coSet({ date: d })}
            className={`flex-1 rounded-xl border-[1.5px] py-3 text-[13.5px] font-semibold capitalize ${coState.date === d ? 'border-pink bg-pink-ghost text-pink' : 'border-line text-choc'}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mb-1.5 text-xs font-bold uppercase tracking-[.06em] text-muted">Delivery slot</div>
      <div className="mb-6 grid grid-cols-2 gap-2.5">
        {SLOTS.map((s, i) => (
          <button
            key={s.n}
            onClick={() => coSet({ slot: i })}
            className={`rounded-xl border-[1.5px] px-2 py-[11px] text-center text-xs font-semibold ${i === coState.slot ? 'border-pink bg-pink-ghost text-pink' : 'border-line text-choc'}`}
          >
            <b className="block text-[12.5px]">{s.n}</b>
            <span className={`text-[10.5px] ${i === coState.slot ? 'text-pink' : 'text-muted'}`}>{s.t}{s.fee ? ` · +${fmt(s.fee)}` : ' · FREE'}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={coBack} className="rounded-full border-[1.5px] border-line px-6 py-[13px] text-[15px] font-semibold text-choc">Back</button>
        <button onClick={() => coNext()} className="flex-1 rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
          Continue to Payment
        </button>
      </div>
    </div>
  )
}

const PAY_METHODS = [
  ['upi', 'UPI'],
  ['card', 'Card'],
  ['cod', 'Cash on Delivery'],
]

function PaymentStep() {
  const { coState, coSet, coNext, coBack, cartTotals } = useStore()
  const [upi, setUpi] = useState('')
  const [card, setCard] = useState('')
  const t = cartTotals
  const payTotal = t.sub - t.disc + Math.round(t.sub * 0.05) + (SLOTS[coState.slot]?.fee || 0)

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex gap-2">
        {PAY_METHODS.map(([k, l]) => (
          <button
            key={k}
            onClick={() => coSet({ pay: k })}
            className={`flex-1 rounded-xl border-[1.5px] py-2.5 text-[12.5px] font-bold ${coState.pay === k ? 'border-pink bg-pink-ghost text-pink' : 'border-line text-choc'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {coState.pay === 'upi' && <Field label="UPI ID" value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@okbank" />}
      {coState.pay === 'card' && (
        <Field
          label="Card number"
          value={card}
          onChange={(e) => setCard(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
        />
      )}
      {coState.pay === 'cod' && <p className="mb-4 rounded-xl bg-cream-2 px-3.5 py-3 text-[13px] text-muted-3">Pay in cash when your order is delivered. A small COD fee may apply.</p>}

      <div className="mb-5 mt-2 rounded-xl bg-cream-2 px-4 py-3.5 text-[13px]">
        <div className="flex justify-between text-muted-3"><span>Subtotal</span><span>{fmt(t.sub)}</span></div>
        {t.disc > 0 && <div className="flex justify-between text-green"><span>Discount</span><span>−{fmt(t.disc)}</span></div>}
        <div className="flex justify-between text-muted-3"><span>Delivery + tax</span><span>{fmt(Math.round(t.sub * 0.05) + (SLOTS[coState.slot]?.fee || 0))}</span></div>
        <div className="mt-1.5 flex justify-between border-t border-line pt-1.5 text-base font-extrabold"><span>Total</span><span>{fmt(payTotal)}</span></div>
      </div>

      <div className="flex gap-3">
        <button onClick={coBack} className="rounded-full border-[1.5px] border-line px-6 py-[13px] text-[15px] font-semibold text-choc">Back</button>
        <button onClick={() => coNext({ upi, card })} className="flex-1 rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
          Pay {fmt(payTotal)}
        </button>
      </div>
    </div>
  )
}

function DoneStep() {
  const { coState, closeAll, goHome, openTrack } = useStore()
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-[#EAF4EC] text-green">
        <Icon className="h-9 w-9"><path d="M4 12l6 6L20 6" /></Icon>
      </div>
      <h3 className="mb-2 text-2xl">Order placed!</h3>
      <p className="mb-1 text-[13.5px] text-muted">Order <b className="text-choc">#{coState.oid}</b> · {fmt(coState.total)}</p>
      <p className="mb-6 text-[13.5px] text-muted">We'll text you updates as your treat is baked, packed and delivered.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => { closeAll(); openTrack() }} className="flex-1 rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
          Track Order
        </button>
        <button onClick={() => { closeAll(); goHome() }} className="flex-1 rounded-full border-[1.5px] border-line py-[13px] text-[15px] font-semibold text-choc">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="mb-[7px] block text-[12.5px] font-bold text-choc">{label}</label>
      <input {...props} className="w-full rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-pink" />
    </div>
  )
}

export default function CheckoutModal() {
  const { coState, closeAll } = useStore()

  return (
    <Modal onClose={closeAll} widthClass="w-full max-w-[480px]">
      {coState.step < 4 && (
        <div className="flex items-center justify-between px-6 pt-4">
          <h3 className="text-lg">Checkout</h3>
          <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
            <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
          </button>
        </div>
      )}
      <StepDots step={coState.step} />
      {coState.step === 1 && <AddressStep />}
      {coState.step === 2 && <DeliveryStep />}
      {coState.step === 3 && <PaymentStep />}
      {coState.step === 4 && <DoneStep />}
    </Modal>
  )
}
