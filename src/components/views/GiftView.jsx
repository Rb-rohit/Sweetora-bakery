import { useStore } from '../../context/StoreContext.jsx'
import { fmt } from '../../data/products.js'
import Icon from '../ui/Icon.jsx'

export default function GiftView() {
  const { currentGift, goHome, goShop, addGiftToCart } = useStore()

  if (!currentGift) return null

  return (
    <div className="mx-auto w-[92%] max-w-[1240px] py-[30px] pb-[70px]">
      <div className="mb-8 text-[12.5px] text-muted-2">
        <a onClick={goHome} className="cursor-pointer hover:text-pink">Home</a> /{' '}
        <a onClick={() => goShop('gifts')} className="cursor-pointer hover:text-pink">Gifts</a> /{' '}
        <b className="text-choc">{currentGift.name}</b>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg2 bg-cream-2 p-8">
          <img src={currentGift.img} alt={currentGift.name} className="h-full w-full object-contain" />
          <span className="absolute left-5 top-5 rounded-full bg-pink px-3 py-1 text-[11px] font-bold tracking-[.04em] text-white">GIFT</span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[11px] font-bold uppercase tracking-[.08em] text-pink">Gifting</span>
          <h1 className="my-2.5 text-[30px] sm:text-[38px]">{currentGift.name}</h1>
          <div className="flex items-center gap-[7px] text-[13.5px] text-muted"><span className="tracking-wider text-gold">★★★★★</span> 4.7 · 120 reviews</div>
          <div className="my-[22px] text-[29px] font-bold">{fmt(currentGift.price)}</div>
          <p className="max-w-[540px] text-[15px] leading-[1.7] text-muted-3">A thoughtful add-on for birthdays, celebrations and everyday surprises, packed beautifully and delivered with your order.</p>
          <button onClick={() => addGiftToCart(currentGift.id)} className="mt-7 flex w-full max-w-[360px] items-center justify-center gap-2 rounded-full bg-pink px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] transition-all hover:-translate-y-0.5 hover:bg-pink-deep">
            <Icon className="h-4 w-4"><path d="M12 5v14M5 12h14" /></Icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
