import ProductCard from './ProductCard.jsx'
import { useStore } from '../../context/StoreContext.jsx'
import Icon from '../ui/Icon.jsx'

export default function ProductGrid({ products, columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4', gap = 'gap-3.5 lg:gap-[22px]' }) {
  const { resetFilters } = useStore()

  if (!products.length) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-5 grid h-[110px] w-[110px] place-items-center rounded-full bg-pink-ghost text-pink">
          <Icon className="h-11 w-11"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
        </div>
        <h3 className="mb-2 text-xl">No treats found</h3>
        <p className="mb-5 text-sm text-muted">Try a different filter or search.</p>
        <button onClick={resetFilters} className="rounded-full bg-pink px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)]">
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div className={`grid ${columns} ${gap}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
