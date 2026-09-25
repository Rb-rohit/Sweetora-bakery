import { useStore } from '../../context/StoreContext.jsx'
import { PRODUCTS, fmt } from '../../data/products.js'
import ProductCard from '../product/ProductCard.jsx'
import Icon from '../ui/Icon.jsx'
import CouponsList from '../ui/CouponsList.jsx'

const TABS = [
  ['profile', 'Profile', <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>],
  ['orders', 'My Orders', <path d="M5 4h14v16H5zM9 4v16M15 4v16" />],
  ['wishlist', 'Wishlist', <path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" />],
  ['addresses', 'Addresses', <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>],
  ['payments', 'Saved Payments', <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 11h18" /></>],
  ['coupons', 'Coupons', <><path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4Z" /><path d="M13 7v2M13 11v2M13 15v2" /></>],
  ['notifs', 'Notifications', <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM10 19a2 2 0 0 0 4 0" />],
  ['reviews', 'My Reviews', <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5Z" />],
  ['help', 'Help & Support', <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.1 1-1.1 1.8v.5" /><circle cx="12" cy="17" r=".5" fill="currentColor" /></>],
  ['logout', 'Logout', <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />],
]

const STATUS_LABELS = ['Placed', 'Confirmed', 'Baking', 'Packed', 'Out for Delivery', 'Delivered']
const NOTIFICATIONS = ['Your midnight delivery is being packed', 'WELCOME10 expires in 2 days', 'New: Mango Alphonso Delight is back', 'Rate your recent order']

function Card({ children, className = '' }) {
  return <div className={`mb-5 rounded-lg2 border border-line bg-white p-[26px] ${className}`}>{children}</div>
}
function EmptyState({ icon, title, sub, action }) {
  return (
    <div className="px-5 py-[60px] text-center">
      <div className="mx-auto mb-5 grid h-[110px] w-[110px] place-items-center rounded-full bg-pink-ghost text-pink"><Icon className="h-10 w-10">{icon}</Icon></div>
      <h3 className="mb-2 text-xl">{title}</h3>
      <p className="mb-[22px] text-sm text-muted">{sub}</p>
      {action}
    </div>
  )
}

export default function AccountView() {
  const { user, accountTab, openAccount, openProfile, doLogout, orders, wishlist, city, goShop, openCart, toast } = useStore()

  if (!user) return null

  return (
    <div className="mx-auto grid w-[92%] max-w-[1240px] gap-9 py-9 pb-[70px] md:grid-cols-[250px_1fr]">
      <aside className="no-scrollbar sticky top-[calc(var(--header-h)+20px)] flex h-max gap-1.5 overflow-x-auto rounded-lg2 border border-line bg-white p-3.5 md:flex-col md:overflow-visible">
        {TABS.map(([k, n, icon]) => (
          <a
            key={k}
            onClick={() => (k === 'logout' ? doLogout() : k === 'profile' ? openProfile() : openAccount(k))}
            className={`flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${k === accountTab ? 'bg-pink text-white' : 'text-muted-3 hover:bg-pink-ghost hover:text-pink'}`}
          >
            <Icon className="h-[17px] w-[17px]">{icon}</Icon> {n}
          </a>
        ))}
      </aside>

      <div>
        {accountTab === 'profile' && (
          <>
            <Card>
              <h3 className="mb-[18px]">Profile</h3>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="Full name" defaultValue={user.name} />
                <Field label="Mobile" defaultValue={user.phone} />
              </div>
              <Field label="Email" defaultValue={`${(user.name.split(' ')[0] || '').toLowerCase()}@example.com`} />
              <button onClick={() => toast('Profile saved')} className="rounded-full bg-pink px-[18px] py-2.5 text-[13.5px] font-bold text-white">Save Changes</button>
            </Card>
            <Card>
              <h3 className="mb-3.5">Quick stats</h3>
              <div className="flex flex-wrap gap-[34px]">
                <Stat n={orders.length} label="Orders" />
                <Stat n={wishlist.size} label="Wishlist" />
                <Stat n={(orders.length * 140).toLocaleString('en-IN')} label="Sweet Points" />
              </div>
            </Card>
          </>
        )}

        {accountTab === 'orders' && (
          <Card>
            <h3 className="mb-[18px]">My Orders</h3>
            {orders.length ? (
              orders.map((o) => (
                <div key={o.id} className="mb-3 flex flex-wrap items-center gap-4 rounded-md2 border border-line p-4">
                  <img src={o.items[0]?.img} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-[150px] flex-1">
                    <b>#{o.id}</b>
                    <div className="my-[3px] text-[12.5px] text-muted">{o.date} · {o.slot}</div>
                    <div className="text-xs text-muted">{o.items.map((x) => `${x.name} ×${x.qty}`).join(', ')}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${o.status < 6 ? 'bg-[#FBF3E3] text-[#A87B1F]' : 'bg-[#EAF4EC] text-green'}`}>{STATUS_LABELS[o.status]}</span>
                  <b>{fmt(o.total)}</b>
                  <button onClick={() => { toast('Reorder added to cart'); openCart() }} className="rounded-full border-[1.5px] border-line px-[18px] py-2 text-[13px] font-semibold text-choc hover:border-pink hover:text-pink">Reorder</button>
                </div>
              ))
            ) : (
              <EmptyState
                icon={<path d="M5 4h14v16H5zM9 4v16M15 4v16" />}
                title="No orders yet"
                sub="Your celebrations are waiting."
                action={<button onClick={() => goShop()} className="rounded-full bg-pink px-[18px] py-2.5 text-[13.5px] font-bold text-white">Order a Cake</button>}
              />
            )}
          </Card>
        )}

        {accountTab === 'wishlist' && (
          <Card>
            <h3 className="mb-[18px]">
              Wishlist {wishlist.size > 0 && <span className="text-pink">({wishlist.size})</span>}
            </h3>
            {wishlist.size ? (
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                {PRODUCTS.filter((p) => wishlist.has(p.id)).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <EmptyState icon={<path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Z" />} title="Your wishlist is empty" sub="Save the cakes you love." />
            )}
          </Card>
        )}

        {accountTab === 'addresses' && (
          <Card>
            <h3 className="mb-[18px]">Saved Addresses</h3>
            <div className="mb-3 flex items-center gap-4 rounded-md2 border border-dashed border-line p-4">
              <div className="flex-1">
                <b>Home</b>
                <div className="mt-[3px] text-[12.5px] text-muted">B-1204, Lotus Heights, Andheri West, {city || 'Mumbai'} 400053</div>
              </div>
              <span className="rounded-full bg-[#EAF4EC] px-3 py-1.5 text-[11px] font-bold text-green">Default</span>
            </div>
            <div onClick={() => toast('Add address form (demo)')} className="flex cursor-pointer items-center gap-4 rounded-md2 border border-dashed border-line p-4">
              <div className="flex-1 font-semibold text-pink">+ Add new address</div>
            </div>
          </Card>
        )}

        {accountTab === 'payments' && (
          <Card>
            <h3 className="mb-[18px]">Saved Payments</h3>
            <div className="flex items-center gap-4 rounded-md2 border border-line p-4">
              <div className="flex-1">
                <b>UPI · aarav@okbank</b>
                <div className="mt-[3px] text-[12.5px] text-muted">Default payment method</div>
              </div>
              <span className="rounded-full bg-[#EAF4EC] px-3 py-1.5 text-[11px] font-bold text-green">Default</span>
            </div>
          </Card>
        )}

        {accountTab === 'coupons' && (
          <Card>
            <h3 className="mb-[18px]">My Coupons</h3>
            <CouponsList />
          </Card>
        )}

        {accountTab === 'notifs' && (
          <Card>
            <h3 className="mb-[18px]">Notifications</h3>
            {NOTIFICATIONS.map((n, i) => (
              <div key={n} className="mb-3 flex items-center gap-4 rounded-md2 border border-line p-4">
                <div className="flex-1 text-[13.5px]">{n}</div>
                <span className="text-[11px] text-muted-2">{i + 1}h ago</span>
              </div>
            ))}
          </Card>
        )}

        {accountTab === 'reviews' && (
          <Card>
            <h3 className="mb-[18px]">My Reviews</h3>
            <EmptyState icon={<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5Z" />} title="No reviews yet" sub="Review your purchases to earn Sweet Points." />
          </Card>
        )}

        {accountTab === 'help' && (
          <Card>
            <h3 className="mb-[18px]">Help &amp; Support</h3>
            {[
              ['Chat with us', 'Avg. reply under 2 minutes', () => toast('Opening WhatsApp chat…')],
              ['Call us', '1800-SWEETORA (toll-free, 8 AM–11 PM)', () => toast('Calling 1800-SWEETORA…')],
              ['Email', 'support@sweetora.in', () => toast('Mail sent to support@sweetora.in')],
            ].map(([t, s, fn]) => (
              <div key={t} onClick={fn} className="mb-3 flex cursor-pointer items-center gap-4 rounded-md2 border border-line p-4">
                <div className="flex-1"><b>{t}</b><div className="mt-[3px] text-[12.5px] text-muted">{s}</div></div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  )
}

function Field({ label, defaultValue }) {
  return (
    <div className="mb-4">
      <label className="mb-[7px] block text-[12.5px] font-bold text-choc">{label}</label>
      <input defaultValue={defaultValue} className="w-full rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-pink" />
    </div>
  )
}
function Stat({ n, label }) {
  return (
    <div>
      <b className="font-display text-[26px]">{n}</b>
      <div className="text-[12.5px] text-muted">{label}</div>
    </div>
  )
}
