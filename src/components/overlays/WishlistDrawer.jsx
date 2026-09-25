import { useStore } from '../../context/StoreContext.jsx'
import { PRODUCTS, fmt } from '../../data/products.js'
import Drawer from './Drawer.jsx'
import Icon from '../ui/Icon.jsx'

export default function WishlistDrawer() {
  const { wishlist, toggleWish, closeAll, openPDP, quickAdd, goShop } = useStore()
  const items = PRODUCTS.filter((p) => wishlist.has(p.id))

  return (
    <Drawer onClose={closeAll}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h3 className="text-lg">Wishlist {items.length > 0 && <span className="text-pink">({items.length})</span>}</h3>
        <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-5 grid h-[110px] w-[110px] place-items-center rounded-full bg-pink-ghost text-pink">
              <Icon className="h-11 w-11"><path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" /></Icon>
            </div>
            <h3 className="mb-2 text-xl">Your wishlist is empty</h3>
            <p className="mb-5 text-sm text-muted">Tap the heart on any cake to save it here.</p>
            <button onClick={() => { closeAll(); goShop() }} className="rounded-full bg-pink px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)]">
              Shop Cakes
            </button>
          </div>
        ) : (
          items.map((p) => (
            <div key={p.id} className="mb-4 flex gap-3.5 border-b border-line pb-4">
              <img src={p.img} alt={p.name} onClick={() => openPDP(p.id)} className="h-[76px] w-[76px] shrink-0 cursor-pointer rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <b onClick={() => openPDP(p.id)} className="block cursor-pointer text-sm hover:text-pink">{p.name}</b>
                <div className="mt-[3px] text-[13px] font-bold">{fmt(p.price)}</div>
                <div className="mt-2.5 flex items-center gap-3">
                  <button onClick={() => quickAdd(p.id)} className="rounded-full bg-pink-ghost px-3.5 py-[7px] text-[12px] font-bold text-pink hover:bg-pink hover:text-white">Add to Cart</button>
                  <button onClick={() => toggleWish(p.id)} aria-label="Remove" className="ml-auto text-muted hover:text-pink">
                    <Icon className="h-[17px] w-[17px]"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M7 7l1 13h8l1-13" /></Icon>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Drawer>
  )
}
