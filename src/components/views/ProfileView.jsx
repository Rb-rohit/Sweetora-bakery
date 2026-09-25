import { useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'

export default function ProfileView() {
  const { user, updateProfile, orders, wishlist, city, goHome, doLogout } = useStore()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [email, setEmail] = useState(user?.email || '')

  if (!user) return null

  function save(event) {
    event.preventDefault()
    updateProfile({ name: name.trim(), phone: phone.trim(), email: email.trim() })
  }

  return (
    <section className="mx-auto w-[92%] max-w-[1000px] py-10 pb-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-semibold text-pink">YOUR ACCOUNT</p>
          <h1 className="font-display text-3xl font-bold">Profile</h1>
          <p className="mt-2 text-sm text-muted">View and update your personal details.</p>
        </div>
        <button onClick={goHome} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-pink hover:text-pink">Back to shopping</button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <form onSubmit={save} className="rounded-lg2 border border-line bg-white p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-pink-ghost font-display text-xl font-bold text-pink">
              {(name || user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div><h2 className="text-lg font-bold">Personal information</h2><p className="text-sm text-muted">These details are saved to your account.</p></div>
          </div>
          <ProfileField label="Full name" value={name} onChange={setName} autoComplete="name" />
          <ProfileField label="Mobile number" value={phone} onChange={setPhone} type="tel" autoComplete="tel" />
          <ProfileField label="Email address" value={email} onChange={setEmail} type="email" autoComplete="email" placeholder="Add an email address" />
          <button type="submit" className="mt-2 rounded-full bg-pink px-6 py-3 text-sm font-bold text-white hover:bg-pink-deep">Save changes</button>
        </form>

        <div className="space-y-6">
          <div className="rounded-lg2 border border-line bg-white p-6 sm:p-8">
            <h2 className="mb-5 text-lg font-bold">Account overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <Overview value={orders.length} label="Orders" />
              <Overview value={wishlist.size} label="Wishlist items" />
              <Overview value={(orders.length * 140).toLocaleString('en-IN')} label="Sweet points" />
              <Overview value={city || 'Not set'} label="Delivery city" />
            </div>
          </div>
          <div className="rounded-lg2 border border-line bg-white p-6 sm:p-8">
            <h2 className="mb-2 text-lg font-bold">Account access</h2>
            <p className="mb-5 text-sm text-muted">Signed in as {user.name}{user.phone ? ` · +91 ${user.phone}` : ''}</p>
            <button onClick={doLogout} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-choc hover:border-pink hover:text-pink">Log out</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileField({ label, value, onChange, ...props }) {
  return <label className="mb-5 block text-sm font-semibold text-choc">{label}<input {...props} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border-[1.5px] border-line bg-white px-4 py-3 font-normal outline-none focus:border-pink" /></label>
}

function Overview({ value, label }) {
  return <div className="min-w-0 rounded-xl bg-cream px-4 py-3"><div className="truncate text-lg font-bold">{value}</div><div className="mt-1 text-xs text-muted">{label}</div></div>
}
