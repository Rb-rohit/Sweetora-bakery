import { useStore } from '../../context/StoreContext.jsx'
import { fmt } from '../../data/products.js'
import Modal from './Modal.jsx'
import Icon from '../ui/Icon.jsx'

const STAGES = ['Order Placed', 'Confirmed', 'Baking', 'Packed', 'Out for Delivery', 'Delivered']

export default function TrackModal() {
  const { orders, closeAll } = useStore()
  const order = orders[0]
  if (!order) return null

  return (
    <Modal onClose={closeAll} widthClass="w-full max-w-[480px]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="text-lg">Track Order</h3>
        <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6 flex items-center gap-3.5 rounded-md2 border border-line p-4">
          <img src={order.items[0]?.img} alt="" className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <b>#{order.id}</b>
            <div className="mt-[3px] text-[12.5px] text-muted">{order.date} · {order.slot}</div>
            <div className="mt-[3px] text-[13px] font-bold">{fmt(order.total)}</div>
          </div>
        </div>

        <div className="relative pl-7">
          <div className="absolute bottom-3 left-[9px] top-3 w-[2px] bg-line" />
          {STAGES.map((s, i) => {
            const done = i <= order.status
            return (
              <div key={s} className="relative mb-6 last:mb-0">
                <span className={`absolute -left-7 grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] font-bold ${done ? 'bg-green text-white' : 'bg-cream-2 text-muted-2'}`}>
                  {done ? '✓' : ''}
                </span>
                <b className={`text-[13.5px] ${done ? 'text-ink' : 'text-muted-2'}`}>{s}</b>
                {i === order.status && <div className="mt-0.5 text-[12px] text-muted">In progress</div>}
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
