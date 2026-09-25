import { useStore } from '../../context/StoreContext.jsx'
import { useScrollY } from '../../hooks/useScrollY.js'
import Icon from '../ui/Icon.jsx'

export default function FloatingButtons() {
  const { toast } = useStore()
  const scrollY = useScrollY()

  return (
    <>
      <a
        aria-label="Chat on WhatsApp"
        onClick={() => toast('WhatsApp support: +91 98SWEETORA')}
        className="fixed bottom-20 right-[22px] z-[45] grid h-[54px] w-[54px] cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_26px_rgba(37,211,102,.4)] transition-transform duration-300 hover:scale-[1.08] sm:bottom-24"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.2Z" />
        </svg>
      </a>
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-36 right-[22px] z-[45] grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-choc shadow-md2 transition-all duration-300 hover:border-pink hover:text-pink sm:bottom-40 ${scrollY > 600 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <Icon><path d="M12 19V5M6 11l6-6 6 6" /></Icon>
      </button>
    </>
  )
}
