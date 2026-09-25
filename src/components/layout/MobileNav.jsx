import { useStore } from '../../context/StoreContext.jsx'
import Icon from '../ui/Icon.jsx'

export default function MobileNav() {
  const { view, goHome, goShop, openSearch, openWishlist, openCart, wishlist, cart } = useStore()
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const items = [
    { key: 'home', label: 'Home', onClick: goHome, active: view === 'home', icon: <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /></> },
    { key: 'shop', label: 'Categories', onClick: () => goShop(), active: view === 'shop', icon: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></> },
    { key: 'search', label: 'Search', onClick: openSearch, icon: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> },
    { key: 'wishlist', label: 'Wishlist', onClick: openWishlist, badge: wishlist.size, icon: <path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" /> },
    { key: 'cart', label: 'Cart', onClick: openCart, badge: cartCount, icon: <><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.4 11h10.4L21 8H7" /></> },
  ]

  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-[46] block border-t border-line bg-white px-1 pb-[calc(6px+env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-6px_24px_rgba(90,48,40,.08)] sm:hidden">
      <ul className="flex justify-around">
        {items.map((it) => (
          <li key={it.key}>
            <a onClick={it.onClick} className={`relative flex flex-col items-center gap-[3px] px-2.5 py-1 text-[10.5px] font-semibold ${it.active ? 'text-pink' : 'text-muted'}`}>
              <Icon className="h-5 w-5">{it.icon}</Icon>
              {it.label}
              {it.badge > 0 && (
                <span className="absolute right-1 top-0 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-pink text-[9px] font-bold text-white">{it.badge}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
