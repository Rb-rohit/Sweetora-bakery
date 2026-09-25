import { useRef } from 'react'
import Icon from '../ui/Icon.jsx'

export default function Carousel({ items, renderItem, itemWidth = 'w-[78%] sm:w-[46%] lg:w-[31%]', showNav = true, keyFn }) {
  const ref = useRef(null)

  function scroll(dir) {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {showNav && (
        <div className="mb-3.5 hidden justify-end gap-2.5 sm:flex lg:absolute lg:-top-16 lg:right-0 lg:mb-0">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-[42px] w-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-choc transition-all duration-200 hover:-translate-y-0.5 hover:border-pink hover:text-pink hover:shadow-sm2">
            <Icon><path d="M15 6l-6 6 6 6" /></Icon>
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="grid h-[42px] w-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-choc transition-all duration-200 hover:-translate-y-0.5 hover:border-pink hover:text-pink hover:shadow-sm2">
            <Icon><path d="M9 6l6 6-6 6" /></Icon>
          </button>
        </div>
      )}
      <div ref={ref} className="no-scrollbar flex gap-[22px] overflow-x-auto px-0.5 pb-[18px] pt-1" style={{ scrollSnapType: 'x mandatory' }}>
        {items.map((item, i) => (
          <div key={keyFn ? keyFn(item) : i} className={`flex-none ${itemWidth}`} style={{ scrollSnapAlign: 'start' }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  )
}
