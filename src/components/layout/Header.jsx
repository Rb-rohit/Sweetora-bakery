import { useStore } from '../../context/StoreContext.jsx'
import { useScrollY } from '../../hooks/useScrollY.js'
import Icon from '../ui/Icon.jsx'

const CATS = [
  ['Cakes', ''],
  ['Birthday', 'birthday'],
  ['Anniversary', 'anniversary'],
  ['Desserts', 'desserts'],
  ['Gifts', 'gifts'],
  ['Combos', ''],
  ['Occasions', ''],
  ['Trending', ''],
]

function HeaderAction({ onClick, label, badge, bump, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative flex flex-col items-center gap-[3px] rounded-xl px-3 py-1.5 text-[11px] font-semibold text-choc transition-colors duration-200 hover:bg-pink-ghost hover:text-pink"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
      {badge > 0 && (
        <span
          key={bump}
          className="absolute right-1 top-0 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-white animate-[heartPop_.32s_cubic-bezier(.3,1.6,.5,1)]"
        >
          {badge}
        </span>
      )}
    </button>
  )
}

export default function Header() {
  const { city, openLocation, openSearch, openAuth, openProfile, openWishlist, openCart, goHome, goShop, user, wishlist, cart, cartBump, toast, openTrack, view, shopState } = useStore()
  const scrollY = useScrollY()
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  return (
    <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-300 ${scrollY > 10 ? 'shadow-md2' : ''}`}>
      <div className="mx-auto w-[92%] max-w-[1240px]">
        {/* Utility row */}
        <div className="hidden items-center justify-between border-b border-line py-[7px] text-[12.5px] text-choc md:flex">
          <div>Delivering happiness across India</div>
          <div className="flex items-center gap-[22px]">
            <a href="#" onClick={(e) => { e.preventDefault(); toast('Help center coming right up') }} className="hover:text-pink">Help</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openTrack() }} className="hover:text-pink">Track Order</a>
            <span onClick={openLocation} className="cursor-pointer font-semibold text-pink">
              📍 {city || 'Select City'}
            </span>
          </div>
        </div>

        {/* Main bar */}
        <div className="flex items-center gap-4 py-3.5 md:gap-7">
          <a onClick={goHome} aria-label="SWEETORA home" className="flex shrink-0 cursor-pointer items-center gap-2.5">
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-pink to-pink-soft shadow-[0_6px_16px_rgba(232,93,117,.35)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
                <path d="M4 20h16M5 20v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M7 15V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6" stroke="#fff" strokeWidth="1.8" />
                <path d="M12 8V5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="4" r="1.4" fill="#fff" />
                <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="font-display text-[21px] font-bold tracking-[0.02em] sm:text-[26px]">
              SWEET<span className="text-pink">ORA</span>
            </div>
          </a>

          <div className="hidden max-w-[560px] flex-1 md:block">
            <div
              onClick={openSearch}
              role="search"
              aria-label="Search products"
              className="flex cursor-text items-center gap-2.5 rounded-full border-[1.5px] border-line bg-white px-5 py-[11px] transition-all duration-200 hover:border-pink hover:shadow-[0_6px_20px_rgba(232,93,117,.12)]"
            >
              <Icon className="h-[17px] w-[17px] text-muted-2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
              <input type="text" placeholder="Search cakes, gifts, flavours…" readOnly aria-label="Search" className="flex-1 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-muted-2" />
              <span className="rounded-md border border-line px-[7px] py-0.5 text-[11px] text-muted-2">⌘K</span>
            </div>
          </div>

          <nav className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
            <HeaderAction onClick={openLocation} label={city || 'Location'}>
              <Icon><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>
            </HeaderAction>
            <HeaderAction onClick={user ? openProfile : openAuth} label={user ? user.name.split(' ')[0] : 'Account'}>
              <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></Icon>
            </HeaderAction>
            <HeaderAction onClick={openWishlist} label="Wishlist" badge={wishlist.size}>
              <Icon><path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" /></Icon>
            </HeaderAction>
            <HeaderAction onClick={openCart} label="Cart" badge={cartCount} bump={cartBump}>
              <Icon><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.4 11h10.4L21 8H7" /></Icon>
            </HeaderAction>
          </nav>
        </div>

        {/* Category nav */}
        <nav aria-label="Categories" className="hidden border-t border-line md:block">
          <ul className="no-scrollbar flex gap-1 overflow-x-auto">
            {CATS.map(([n, c]) => {
              const active = view === 'shop' ? shopState.cat === c && (c !== '' || n === 'Cakes') : n === 'Cakes'
              return (
                <li key={n}>
                  <a
                    onClick={() => goShop(c)}
                    className={`relative block cursor-pointer whitespace-nowrap px-[15px] py-3 text-[13.5px] font-semibold transition-colors ${active ? 'text-pink' : 'text-choc hover:text-pink'}`}
                  >
                    {n}
                    {n === 'Combos' && <span className="ml-[5px] rounded-md bg-pink-ghost px-[5px] py-[2px] align-[2px] text-[9.5px] font-bold text-pink">NEW</span>}
                    <span className={`absolute inset-x-[15px] bottom-1.5 h-[2px] rounded-full bg-pink transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
