import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import { PRODUCTS, ADDONS, QCATS, OCCASIONS, TRENDS, FLAVOURS, TESTIMONIALS, fmt, stars } from '../../data/products.js'
import { giftSVG, occSVG } from '../../data/svg.js'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import Carousel from '../product/Carousel.jsx'
import ProductCard from '../product/ProductCard.jsx'

const EX_DATA = [
  ['60 Minute Delivery', 'Hot from the oven to your door in one hour.', 'Fastest', <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>],
  ['2 Hour Delivery', 'Freshly baked, rushed to your celebration.', 'Popular', <><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>],
  ['Same Day Delivery', 'Order by 8 PM, celebrate tonight.', 'Available Today', <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>],
  ['Midnight Delivery', 'Surprise them the moment the clock strikes twelve.', '', <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5Z" />],
  ['Early Morning Delivery', 'Breakfast-in-bed worthy, delivered by 9 AM.', '', <path d="M3 17l3-8h12l3 8M3 17h18M3 17v2h18v-2" />],
  ['Fixed Time Delivery', 'Choose the exact hour — we never miss.', '', <><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></>],
]

const WHY_DATA = [
  ['Freshly Baked', 'Baked in local ateliers hours before delivery — never frozen, never stocked.', <path d="M8 3v8a4 4 0 0 0 8 0V3M8 3h8M12 15v3a4 4 0 0 0 4 4" />, 'bg-pink-ghost text-pink'],
  ['On-Time Delivery', '97% deliveries within the chosen slot. Midnight & 60-min options available.', <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>, 'bg-[#EAF4EC] text-green'],
  ['500+ Designs', 'From minimalist bento to grand tiered wedding cakes, plus full customization.', <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5Z" />, 'bg-[#FBF3E3] text-gold'],
  ['Secure Payments', 'UPI, cards, net-banking & wallets with 256-bit encryption. COD available.', <><rect x="4" y="6" width="16" height="13" rx="3" /><path d="M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M4 11h16" /></>, 'bg-[#F0EBFA] text-[#7C5CBF]'],
]

function AddonCard({ a }) {
  const { toast } = useStore()
  const [sel, setSel] = useState(false)
  return (
    <div
      onClick={() => { setSel((s) => !s); toast(!sel ? 'Added — pick a cake to attach it to' : 'Add-on removed') }}
      className={`relative flex cursor-pointer items-center gap-3.5 rounded-md2 border-[1.5px] p-3.5 transition-all duration-300 ${sel ? 'border-pink bg-pink-ghost' : 'border-line bg-white hover:border-pink-soft hover:shadow-sm2'}`}
    >
      <img src={a.img} alt={a.name} loading="lazy" className="h-[70px] w-[70px] shrink-0 rounded-xl object-cover" />
      <div>
        <b className="block text-sm">{a.name}</b>
        <div className="mt-[3px] text-[13.5px] font-bold text-pink">{fmt(a.price)}</div>
      </div>
      <span className={`absolute right-2.5 top-2.5 grid h-[22px] w-[22px] place-items-center rounded-full border-2 text-white transition-colors ${sel ? 'border-pink bg-pink' : 'border-line'}`}>
        <Icon className="h-3 w-3"><path d="M4 12l6 6L20 6" /></Icon>
      </span>
    </div>
  )
}

export default function HomeView() {
  const { city, goShop, expressShop } = useStore()
  const heroCake = PRODUCTS[2]
  const bestsellers = [...PRODUCTS].sort((a, b) => parseFloat(b.reviews) - parseFloat(a.reviews)).slice(0, 10)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF3EA] via-pink-ghost to-[#FDE7EA]">
        <div className="pointer-events-none absolute -left-[120px] -top-[140px] h-[420px] w-[420px] rounded-full bg-pink-soft opacity-50 blur-[70px]" />
        <div className="pointer-events-none absolute -bottom-[120px] right-[8%] h-[320px] w-[320px] rounded-full bg-gold opacity-30 blur-[70px]" />
        <div className="relative z-[2] mx-auto grid w-[92%] max-w-[1240px] items-center gap-10 py-14 text-center md:grid-cols-[1.05fr_.95fr] md:py-16 md:text-left">
          <div className="order-2 md:order-1">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-[7px] text-[12.5px] font-semibold text-choc shadow-sm2">
              <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-green" /> Baking now in{' '}
              <b className="ml-1">{city || 'your city'}</b>
            </Reveal>
            <Reveal as="h1" className="my-[22px] text-[38px] leading-[1.1] tracking-tight sm:text-[48px] lg:text-[62px]">
              Make every celebration <em className="text-pink not-italic italic">sweeter</em>
            </Reveal>
            <Reveal className="mx-auto mb-[30px] max-w-[480px] text-[16.5px] leading-[1.65] text-[#7A5C52] md:mx-0">
              Freshly baked cakes, thoughtful gifts and delightful surprises — handcrafted this morning and delivered to your doorstep, even at midnight.
            </Reveal>
            <Reveal className="flex flex-wrap justify-center gap-3.5 md:justify-start">
              <button onClick={() => goShop()} className="inline-flex items-center gap-2 rounded-full bg-pink px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] transition-all hover:-translate-y-0.5 hover:bg-pink-deep hover:shadow-[0_14px_28px_rgba(232,93,117,.4)]">
                Shop Cakes <Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
              </button>
              <button onClick={() => goShop('gifts')} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-white px-[26px] py-[13px] text-[15px] font-semibold text-choc transition-all hover:-translate-y-0.5 hover:border-pink hover:text-pink">
                Explore Gifts
              </button>
            </Reveal>
            <Reveal className="mt-9 flex flex-wrap justify-center gap-6 md:justify-start">
              <div className="text-[13px] text-choc"><b className="block font-display text-[21px] text-ink">4.8★</b>2.1 lakh reviews</div>
              <div className="text-[13px] text-choc"><b className="block font-display text-[21px] text-ink">500+</b>signature designs</div>
              <div className="text-[13px] text-choc"><b className="block font-display text-[21px] text-ink">60 min</b>express delivery</div>
            </Reveal>
          </div>
          <Reveal className="relative order-1 grid place-items-center md:order-2">
            <img src={heroCake.img} alt="Signature red velvet cake" className="w-[70%] max-w-[300px] animate-hero-in drop-shadow-[0_30px_50px_rgba(90,48,40,.22)] sm:max-w-[430px] sm:w-[min(430px,88%)]" />
            <img src={PRODUCTS[11].img} alt="" className="absolute left-[2%] top-[4%] w-[62px] animate-floaty drop-shadow-[0_10px_18px_rgba(90,48,40,.18)] sm:w-[78px]" />
            <img src={PRODUCTS[15].img} alt="" className="absolute bottom-[8%] right-0 w-[74px] animate-floaty drop-shadow-[0_10px_18px_rgba(90,48,40,.18)] sm:w-[92px]" style={{ animationDelay: '1.2s' }} />
            <img src={PRODUCTS[10].img} alt="" className="absolute right-[4%] top-[16%] w-[48px] animate-floaty drop-shadow-[0_10px_18px_rgba(90,48,40,.18)] sm:w-[60px]" style={{ animationDelay: '.6s' }} />
          </Reveal>
        </div>
      </section>

      {/* Quick categories */}
      <section className="pb-16 pt-[52px]">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px] flex items-end justify-between gap-5">
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">What are you celebrating?</h2>
              <p className="mt-1.5 text-[15px] text-muted">Pick a category — we'll handle the sweetness.</p>
            </div>
          </Reveal>
          <div className="no-scrollbar grid auto-cols-[minmax(90px,1fr)] grid-flow-col gap-4 overflow-x-auto px-0.5 pb-4 pt-1.5" style={{ scrollSnapType: 'x mandatory' }}>
            {QCATS.map(([n, c, pi]) => (
              <button key={n} onClick={() => goShop(c)} className="flex flex-col items-center gap-2.5 bg-transparent" style={{ scrollSnapAlign: 'start' }}>
                <span className="h-[92px] w-[92px] overflow-hidden rounded-full border border-line bg-white shadow-sm2 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-md2">
                  <img src={pi ? PRODUCTS[pi - 1].img : giftSVG('#E85D75', '#FDECEF')} alt={n} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.08]" />
                </span>
                <span className="text-center text-[12.5px] font-semibold text-choc">{n}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px] flex items-end justify-between gap-5">
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Celebrate every moment</h2>
              <p className="mt-1.5 text-[15px] text-muted">Cakes curated for the occasions that matter.</p>
            </div>
            <a onClick={() => goShop()} className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-[14.5px] font-semibold text-pink">
              View all <Icon className="h-[15px] w-[15px]"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
            </a>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {OCCASIONS.map(([n, c, a, b]) => {
              const count = PRODUCTS.filter((p) => p.cat === c).length || 12
              return (
                <div key={n} onClick={() => goShop(c)} className="group relative aspect-[4/4.6] cursor-pointer overflow-hidden rounded-lg2 bg-cream-2">
                  <img src={occSVG(n, [a, b])} alt={`${n} cakes`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(43,27,24,.62)] via-transparent to-transparent transition-all duration-300 group-hover:from-[rgba(43,27,24,.78)]" />
                  <div className="absolute inset-x-[18px] bottom-4 z-[2] text-white transition-transform duration-300 group-hover:-translate-y-1.5">
                    <h3 className="text-[19px] text-white">{n}</h3>
                    <p className="mt-[3px] text-[12.5px] opacity-85">{count}+ designs</p>
                  </div>
                  <span className="absolute bottom-4 right-4 z-[2] grid h-[34px] w-[34px] translate-y-2.5 place-items-center rounded-full bg-white/[.18] text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Icon className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" /></Icon>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px] flex items-end justify-between gap-5">
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Customer favourites</h2>
              <p className="mt-1.5 text-[15px] text-muted">Made for celebrations, loved by everyone.</p>
            </div>
          </Reveal>
          <Reveal>
            <Carousel items={bestsellers} keyFn={(p) => p.id} renderItem={(p) => <ProductCard product={p} />} />
          </Reveal>
        </div>
      </section>

      {/* Express delivery */}
      <section className="pb-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-ink to-[#4A2620] p-9 text-[#F6E3D7] sm:rounded-[32px] sm:p-12">
            <div className="pointer-events-none absolute -right-[120px] -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(232,93,117,.35),transparent_70%)]" />
            <h2 className="text-[26px] text-white sm:text-[32px] lg:text-[38px]">Need it fast?</h2>
            <p className="mt-2 text-[15px] text-[#D8B9AC]">From oven to doorstep — choose a speed that fits your surprise.</p>
            <div className="relative z-[2] mt-[34px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {EX_DATA.map(([t, d, flag, icon]) => (
                <div key={t} onClick={() => expressShop(t)} className="relative cursor-pointer rounded-md2 border border-white/[.12] bg-white/[.06] p-[22px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[.11]">
                  {flag && <span className="absolute right-3.5 top-3.5 rounded-full bg-gold px-[9px] py-1 text-[10px] font-bold tracking-[.05em] text-ink">{flag}</span>}
                  <div className="mb-3.5 grid h-[46px] w-[46px] place-items-center rounded-2xl bg-pink/20 text-pink-soft">
                    <Icon className="h-[22px] w-[22px]">{icon}</Icon>
                  </div>
                  <h3 className="mb-1.5 text-[17px] text-white">{t}</h3>
                  <p className="mb-3 text-[13px] leading-[1.55] text-[#D8B9AC]">{d}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-gold">
                    Order now <Icon className="h-[13px] w-[13px]"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trending */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px]">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Trending right now</h2>
            <p className="mt-1.5 text-[15px] text-muted">The designs everyone is ordering this week.</p>
          </Reveal>
          <Reveal>
            <Carousel
              items={TRENDS}
              showNav={false}
              itemWidth="w-[80%] sm:w-[46%] lg:w-[31%]"
              keyFn={([t]) => t}
              renderItem={([t, s, pi, c]) => (
                <div onClick={() => goShop(c)} className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-lg2">
                  <img src={PRODUCTS[pi - 1].img2} alt={t} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(43,27,24,.72)] to-transparent p-5 text-white">
                    <h3 className="text-xl text-white">{t}</h3>
                    <span className="text-[12.5px] opacity-90">{s}</span>
                  </div>
                </div>
              )}
            />
          </Reveal>
        </div>
      </section>

      {/* Flavours */}
      <section className="py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px] flex flex-col items-center text-center">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Shop by flavour</h2>
            <p className="mt-1.5 text-[15px] text-muted">Sixteen flavours. Zero compromises.</p>
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-3.5 sm:grid-cols-4 lg:grid-cols-6">
            {FLAVOURS.map(([n, c, cat]) => (
              <div key={n} onClick={() => goShop(cat)} className="cursor-pointer rounded-md2 border-[1.5px] border-line bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-pink hover:shadow-md2 sm:p-5">
                <div className="mx-auto mb-2.5 h-11 w-11 rounded-full shadow-[inset_0_-6px_12px_rgba(0,0,0,.12)]" style={{ background: `linear-gradient(135deg, ${c}, ${c}CC)` }} />
                <b className="block text-[13.5px]">{n}</b>
                <span className="text-[11.5px] text-muted">{PRODUCTS.filter((p) => p.cat === cat).length}+ cakes</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px]">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Make it extra special</h2>
            <p className="mt-1.5 text-[15px] text-muted">Pair your cake with a little something more.</p>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((a) => <AddonCard key={a.id} a={a} />)}
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px] flex flex-col items-center text-center">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Why Sweetora</h2>
            <p className="mt-1.5 text-[15px] text-muted">Baked with care, delivered with promise.</p>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_DATA.map(([t, d, icon, iconBg]) => (
              <div key={t} className="rounded-lg2 border border-line bg-white p-[30px] px-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-soft hover:shadow-md2">
                <div className={`mx-auto mb-[18px] grid h-[62px] w-[62px] place-items-center rounded-[20px] ${iconBg}`}>
                  <Icon className="h-[26px] w-[26px]">{icon}</Icon>
                </div>
                <h3 className="mb-2 text-lg">{t}</h3>
                <p className="text-[13.5px] leading-[1.6] text-muted">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="mb-[34px]">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Sweet words</h2>
            <p className="mt-1.5 text-[15px] text-muted">Over 2 lakh happy celebrations and counting.</p>
          </Reveal>
          <Reveal>
            <Carousel
              items={TESTIMONIALS}
              showNav={false}
              itemWidth="w-[85%] sm:w-[46%] lg:w-[31%]"
              keyFn={([n]) => n}
              renderItem={([n, c, r, txt, p, col]) => (
                <div className="rounded-lg2 border border-line bg-white p-[26px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md2">
                  <div className="mb-3 tracking-wider text-gold">{stars(r)}</div>
                  <p className="mb-[18px] text-[14.5px] italic leading-[1.7] text-muted-3">&ldquo;{txt}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full text-base font-bold text-white" style={{ background: col }}>{n[0]}</span>
                    <div>
                      <b className="block text-sm">{n}</b>
                      <span className="text-xs text-muted">{c}</span>
                    </div>
                    <span className="ml-auto whitespace-nowrap rounded-full bg-pink-ghost px-2.5 py-1 text-[11px] font-bold text-pink">{p}</span>
                  </div>
                </div>
              )}
            />
          </Reveal>
        </div>
      </section>

      {/* App + newsletter */}
      <section className="pt-16">
        <div className="mx-auto w-[92%] max-w-[1240px]">
          <Reveal className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-[24px] bg-gradient-to-br from-pink to-[#F08CA0] p-8 text-white sm:rounded-[32px] sm:p-12 lg:grid-cols-[1.2fr_.8fr]">
            <div className="pointer-events-none absolute -bottom-[120px] -right-[90px] h-[300px] w-[300px] animate-spin-slow rounded-full border-2 border-dashed border-white/25" />
            <NewsletterBlock />
            <div>
              <p className="mb-3.5"><b>Order faster with the app</b><br />Live tracking, one-tap reorder &amp; app-only deals.</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-white/30 bg-white/[.14] px-[18px] py-2.5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[.24]">
                  <Icon><path d="M5 4l14 8-14 8V4Z" fill="currentColor" stroke="none" /></Icon>
                  <div><small className="block text-[10px] opacity-85">Get it on</small><b className="text-[15px]">Google Play</b></div>
                </div>
                <div className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-white/30 bg-white/[.14] px-[18px] py-2.5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[.24]">
                  <Icon><path d="M12 3c-4 0-7 3-7 7.5S8 21 12 21s7-3 7-10.5S16 3 12 3Z" /><path d="M8 8c2 1 6 1 8 0" opacity=".5" /></Icon>
                  <div><small className="block text-[10px] opacity-85">Download on</small><b className="text-[15px]">App Store</b></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function NewsletterBlock() {
  const { toast } = useStore()
  function subscribe(e) {
    e.preventDefault()
    toast('Welcome to the sweet side — check your inbox!')
    e.target.reset()
  }
  return (
    <div>
      <h2 className="mb-2.5 text-2xl text-white sm:text-[34px]">Get sweet updates</h2>
      <p className="mb-6 text-[15px] leading-[1.6] opacity-90">New flavours, exclusive offers and midnight-delivery alerts — straight to your inbox. No spam, only sprinkles.</p>
      <form onSubmit={subscribe} className="flex max-w-[440px] rounded-full bg-white p-1.5 shadow-md2">
        <input type="email" placeholder="Your email address" required aria-label="Email" className="min-w-0 flex-1 bg-transparent px-[18px] py-2.5 text-sm text-ink outline-none" />
        <button type="submit" className="rounded-full bg-ink px-[18px] py-[9px] text-[13.5px] font-semibold text-white">Subscribe</button>
      </form>
    </div>
  )
}
