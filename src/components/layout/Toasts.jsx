import { useStore } from '../../context/StoreContext.jsx'
import Icon from '../ui/Icon.jsx'

export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="fixed right-[18px] top-[18px] z-[90] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex max-w-[340px] items-center gap-3 rounded-2xl px-5 py-3.5 text-[13.5px] font-semibold text-white shadow-lg2 ${t.type === 'err' ? 'bg-[#B3382E]' : 'bg-ink'} ${t.leaving ? 'animate-toast-out' : 'animate-toast-in'}`}
        >
          <span className={`grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full ${t.type === 'err' ? 'bg-pink' : 'bg-green'}`}>
            <Icon className="h-3.5 w-3.5">
              {t.type === 'err' ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 12l6 6L20 6" />}
            </Icon>
          </span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
