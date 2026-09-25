import { useStore } from '../../context/StoreContext.jsx'
import Icon from '../ui/Icon.jsx'

export default function Footer() {
  const { goHome, goShop, openTrack, goOffers, goCompany } = useStore()

  return (
    <footer className="mt-16 bg-ink pt-16 text-[#CBB0A5]">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <div className="grid grid-cols-2 gap-9 pb-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a onClick={goHome} className="flex cursor-pointer items-center gap-2.5">
              <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-pink to-pink-soft">
                <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
                  <path d="M4 20h16M5 20v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M7 15V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6" stroke="#fff" strokeWidth="1.8" />
                  <path d="M12 8V5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="4" r="1.4" fill="#fff" />
                </svg>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                SWEET<span className="text-pink-soft">ORA</span>
              </div>
            </a>
            <p className="my-4 max-w-[280px] text-[13.5px] leading-[1.7]">
              Premium handcrafted cakes, desserts and gifts — baked fresh in local ateliers and delivered across India with love.
            </p>
            <div className="flex gap-2.5">
              {[
                { label: 'Instagram', el: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" /></> },
                { label: 'Facebook', el: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" /> },
                { label: 'X', el: <path d="M4 4l16 16M20 4L4 20" /> },
                { label: 'YouTube', el: <><rect x="2.5" y="6" width="19" height="12" rx="4" /><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" /></> },
              ].map((s) => (
                <a key={s.label} aria-label={s.label} className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-xl bg-white/[.08] text-[#F6E3D7] transition-all duration-200 hover:-translate-y-[3px] hover:bg-pink hover:text-white">
                  <Icon className="h-[17px] w-[17px]">{s.el}</Icon>
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" items={[
            ['All Cakes', () => goShop()],
            ['Birthday Cakes', () => goShop('birthday')],
            ['Desserts', () => goShop('desserts')],
            ['Gifts & Hampers', () => goShop('gifts')],
            ['Combos', () => goShop()],
            ['Trending', () => goShop()],
          ]} />
          <FooterCol title="Occasions" items={[
            ['Birthday', () => goShop('birthday')],
            ['Anniversary', () => goShop('anniversary')],
            ['Wedding', () => goShop('wedding')],
            ['Baby Shower', () => goShop()],
            ['Congratulations', () => goShop()],
          ]} />
          <FooterCol title="Support" items={[
            ['Contact Us', () => goCompany('contact')],
            ['Track Order', () => openTrack()],
            ['FAQ', () => goCompany('faq')],
            ['Cancellation', () => goCompany('cancellation')],
            ['Refund Policy', () => goCompany('refund-policy')],
          ]} />
          <FooterCol title="Company" items={[
            ['About Us', () => goCompany('about')],
            ['Careers', () => goCompany('careers')],
            ['Offers', () => goOffers()],
            ['Terms', () => goCompany('terms')],
            ['Privacy', () => goCompany('privacy')],
          ]} />
        </div>

        <div className="flex flex-wrap justify-between gap-3.5 border-t border-white/10 py-5 text-[12.5px]">
          <span>© 2026 Sweetora Foods Pvt. Ltd. All rights reserved.</span>
          <span>FSSAI Lic. 10012043001234 · Made with butter, not shortcuts.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="mb-[18px] font-body text-[15px] font-bold text-white">{title}</h4>
      <ul className="flex flex-col gap-[11px] text-[13.5px]">
        {items.map(([label, fn]) => (
          <li key={label}>
            <a onClick={fn} className="cursor-pointer transition-colors hover:text-pink-soft">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
