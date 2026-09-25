import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePersistentState } from '../hooks/usePersistentState.js'
import { PRODUCTS, ADDONS, SIZES, SLOTS, COUPONS, fmt } from '../data/products.js'
import { useRouter } from './RouterContext.jsx'

const StoreContext = createContext(null)

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within <StoreProvider>')
  return ctx
}

let toastSeq = 0

export function StoreProvider({ children }) {
  const { pathname, search, navigate } = useRouter()

  /* ================= Persistent state ================= */
  const [cart, setCart] = usePersistentState('cart', [])
  const [wishlistArr, setWishlistArr] = usePersistentState('wish', [])
  const [user, setUser] = usePersistentState('user', null)
  const [city, setCity] = usePersistentState('city', null)
  const [coupon, setCoupon] = usePersistentState('coupon', null)
  const [orders, setOrders] = usePersistentState('orders', [])
  const [recentSearches, setRecentSearches] = usePersistentState('recent', [])

  const wishlist = useMemo(() => new Set(wishlistArr), [wishlistArr])

  /* ================= Navigation / views ================= */
  const [view, setView] = useState('home') // home | shop | pdp | account | offers
  const [activeOverlay, setActiveOverlay] = useState(null) // cart|wishlist|location|quickview|auth|checkout|track|search

  useEffect(() => {
    const nextView = pathname.startsWith('/shop')
      ? 'shop'
      : pathname.startsWith('/offers')
        ? 'offers'
      : pathname.startsWith('/account')
        ? 'account'
      : pathname.startsWith('/profile')
          ? 'profile'
          : ['/about', '/careers', '/terms', '/privacy', '/contact', '/faq', '/cancellation', '/refund-policy'].includes(pathname.replace(/\/$/, ''))
            ? 'company'
          : pathname.startsWith('/product/')
            ? 'pdp'
            : pathname.startsWith('/gift/')
              ? 'gift'
            : 'home'
    setView((current) => (current === nextView ? current : nextView))
  }, [pathname])

  useEffect(() => {
    if (!pathname.startsWith('/shop')) return
    const params = new URLSearchParams(search)
    const cat = params.get('cat') || ''
    const q = params.get('q') || ''
    setShopState((current) => (
      current.cat === cat && current.q === q ? current : { ...current, cat, q }
    ))
  }, [pathname, search])

  function closeAll() {
    setActiveOverlay(null)
  }
  function showView(v) {
    setView(v)
    closeAll()
    const paths = { home: '/', shop: '/shop', offers: '/offers', account: '/account', profile: '/profile' }
    navigate(paths[v] || '/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function goHome() {
    showView('home')
  }
  function goOffers() {
    showView('offers')
  }
  function goCompany(slug) {
    closeAll()
    setView('company')
    navigate(`/${slug}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  /* ================= Toasts ================= */
  const [toasts, setToasts] = useState([])
  function toast(msg, type = 'ok') {
    const id = ++toastSeq
    setToasts((t) => [...t, { id, msg, type, leaving: false }])
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)))
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 350)
    }, 3200)
  }

  /* ================= Cart ================= */
  const [cartBump, setCartBump] = useState(0)

  function addToCart(item) {
    const key = [item.id, item.size, item.flav, item.msg, item.photo, item.addons.join('.')].join('|')
    const existing = cart.find((c) => c.key === key)
    const next = existing
      ? cart.map((c) => (c.key === key ? { ...c, qty: c.qty + item.qty } : c))
      : [...cart, { key, ...item }]
    setCart(next)
    setCartBump((n) => n + 1)
  }

  function chQty(key, d) {
    const next = cart.map((c) => (c.key === key ? { ...c, qty: c.qty + d } : c)).filter((c) => c.qty > 0)
    setCart(next)
  }

  function rmItem(key) {
    setCart(cart.filter((c) => c.key !== key))
    toast('Item removed')
  }

  function applyCoupon(codeInput) {
    if (coupon) {
      setCoupon(null)
      toast('Coupon removed')
      return
    }
    const v = (codeInput || '').trim().toUpperCase()
    if (!v) return
    const cp = COUPONS.find((c) => c.code === v)
    if (!cp) {
      toast('Invalid coupon code', 'err')
      return
    }
    setCoupon(v)
    toast(`${v} applied!`)
  }

  const cartTotals = useMemo(() => {
    const sub = cart.reduce((s, c) => s + c.unit * c.qty, 0)
    let disc = 0
    let cErr = ''
    let shouldClear = false
    if (coupon) {
      const cp = COUPONS.find((x) => x.code === coupon)
      if (cp) {
        if (sub < cp.min) {
          cErr = `Add ${fmt(cp.min - sub)} more to use ${cp.code}`
          shouldClear = true
        } else {
          disc = cp.type === 'pct' ? Math.min(Math.round((sub * cp.val) / 100), cp.max) : cp.val
        }
      }
    }
    const slotFee = cart.length ? SLOTS[cart[0].slot]?.fee || 0 : 0
    const tax = Math.round(sub * 0.05)
    const total = Math.max(0, sub - disc + slotFee + tax)
    return { sub, disc, slotFee, tax, total, cErr, shouldClear }
  }, [cart, coupon])

  // If the coupon's minimum is no longer met, drop it after this render
  // (so the "add ₹X more" message still shows once, like the original).
  useEffect(() => {
    if (cartTotals.shouldClear) setCoupon(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartTotals.shouldClear])

  function openCart() {
    setActiveOverlay('cart')
  }

  function addGiftToCart(id) {
    const a = ADDONS.find((x) => x.id === id)
    addToCart({ id: 'g_' + id, name: a.name, img: a.img, size: '—', flav: 'Gift', eggless: false, msg: '', photo: false, addons: [], qty: 1, unit: a.price, slot: 0 })
    toast(a.name + ' added to cart')
    openCart()
  }

  function quickAdd(id) {
    const p = PRODUCTS.find((x) => x.id === id)
    addToCart({ id, name: p.name, img: p.img, size: '0.5 kg', flav: p.flavours[0], eggless: p.badges.includes('egg'), msg: '', photo: false, addons: [], qty: 1, unit: p.price, slot: 0 })
    toast(`${p.name} added to cart`)
  }

  /* ================= Wishlist ================= */
  function toggleWish(id) {
    const has = wishlistArr.includes(id)
    setWishlistArr(has ? wishlistArr.filter((x) => x !== id) : [...wishlistArr, id])
    toast(has ? 'Removed from wishlist' : 'Added to wishlist')
  }
  function openWishlist() {
    setActiveOverlay('wishlist')
  }

  /* ================= Location ================= */
  function setCityValue(c) {
    setCity(c)
    closeAll()
    toast(`Delivering to ${c} — same-day available`)
  }
  function detectCity() {
    toast('Detecting your location…')
    setTimeout(() => setCityValue('Mumbai'), 900)
  }
  function openLocation() {
    setActiveOverlay('location')
  }

  /* ================= PLP / shop ================= */
  const [shopState, setShopState] = useState({ cat: '', flavours: new Set(), price: [], sort: 'pop', q: '' })

  function goShop(cat = '', q = '') {
    setShopState({ cat, flavours: new Set(), price: [], sort: 'pop', q: q || '' })
    closeAll()
    const params = new URLSearchParams()
    if (cat) params.set('cat', cat)
    if (q) params.set('q', q)
    navigate(`/shop${params.toString() ? `?${params}` : ''}`)
    setView('shop')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function setSort(v) {
    setShopState({ ...shopState, sort: v })
  }
  function toggleF(c) {
    const flavours = new Set(shopState.flavours)
    flavours.has(c) ? flavours.delete(c) : flavours.add(c)
    setShopState({ ...shopState, flavours })
  }
  function toggleP(v) {
    const price = shopState.price.includes(v) ? shopState.price.filter((x) => x !== v) : [...shopState.price, v]
    setShopState({ ...shopState, price })
  }
  function resetFilters() {
    setShopState({ ...shopState, flavours: new Set(), price: [] })
  }
  function expressShop(t) {
    toast(`${t} selected — pick your cake and slot at checkout`)
    goShop('')
  }

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (shopState.cat && p.cat !== shopState.cat) return false
      if (shopState.q && !(p.name + ' ' + p.cat + ' ' + p.flavours.join(' ')).toLowerCase().includes(shopState.q)) return false
      if (shopState.flavours.size && !shopState.flavours.has(p.cat)) return false
      if (shopState.price.length) {
        const pr = p.price
        if (shopState.price.includes('lo') && pr > 599) return false
        if (shopState.price.includes('mid') && (pr < 600 || pr > 899)) return false
        if (shopState.price.includes('hi') && pr < 900) return false
      }
      return true
    })
    list = [...list]
    const s = shopState.sort
    if (s === 'lo') list.sort((a, b) => a.price - b.price)
    else if (s === 'hi') list.sort((a, b) => b.price - a.price)
    else if (s === 'rate') list.sort((a, b) => b.rating - a.rating)
    else if (s === 'new') list.sort((a, b) => (b.badges.includes('new') ? 1 : 0) - (a.badges.includes('new') ? 1 : 0))
    else list.sort((a, b) => parseFloat(b.reviews) - parseFloat(a.reviews))
    return list
  }, [shopState])

  /* ================= PDP ================= */
  const [currentPDP, setCurrentPDP] = useState(null)
  const [currentGift, setCurrentGift] = useState(null)

  useEffect(() => {
    if (!pathname.startsWith('/product/')) return
    const id = pathname.slice('/product/'.length)
    const p = PRODUCTS.find((x) => x.id === id)
    if (!p) {
      navigate('/shop', { replace: true })
      return
    }
    setCurrentPDP((current) => current?.p.id === id
      ? current
      : { p, size: 0, flav: 0, eggless: p.badges.includes('egg'), qty: 1, slot: 0, addons: new Set(), msg: '', photo: false })
  }, [pathname])

  function pdpUnit(pdp = currentPDP) {
    if (!pdp) return 0
    return (
      pdp.p.price +
      SIZES[pdp.size].a +
      (pdp.photo ? 99 : 0) +
      [...pdp.addons].reduce((s, a) => s + ADDONS.find((x) => x.id === a).price, 0)
    )
  }

  function openPDP(id) {
    const p = PRODUCTS.find((x) => x.id === id)
    if (!p) return
    setCurrentPDP({ p, size: 0, flav: 0, eggless: p.badges.includes('egg'), qty: 1, slot: 0, addons: new Set(), msg: '', photo: false })
    setView('pdp')
    closeAll()
    navigate(`/product/${id}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    if (!pathname.startsWith('/gift/')) return
    const id = pathname.slice('/gift/'.length)
    const gift = ADDONS.find((x) => x.id === id)
    if (!gift) {
      navigate('/shop?cat=gifts', { replace: true })
      return
    }
    setCurrentGift(gift)
  }, [pathname, navigate])

  function openGift(id) {
    const gift = ADDONS.find((x) => x.id === id)
    if (!gift) return
    setCurrentGift(gift)
    closeAll()
    navigate(`/gift/${id}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function pdpOpt(k, v) {
    setCurrentPDP((c) => {
      if (!c) return c
      if (k === 'qty') return { ...c, qty: Math.max(1, Math.min(9, c.qty + v)) }
      if (k === 'addon') {
        const addons = new Set(c.addons)
        addons.has(v) ? addons.delete(v) : addons.add(v)
        return { ...c, addons }
      }
      return { ...c, [k]: v }
    })
  }

  function pdpAddToCart() {
    const c = currentPDP
    if (!c) return
    const p = c.p
    addToCart({ id: p.id, name: p.name, img: p.img, size: SIZES[c.size].l, flav: p.flavours[c.flav], eggless: c.eggless, msg: c.msg, photo: c.photo, addons: [...c.addons], qty: c.qty, unit: pdpUnit(c), slot: c.slot })
    toast(`${p.name} added to cart`)
    openCart()
  }
  function pdpBuyNow() {
    pdpAddToCart()
    closeAll()
    openCheckout()
  }

  /* ================= Quick view ================= */
  const [qvState, setQvState] = useState(null)

  function openQV(id) {
    const p = PRODUCTS.find((x) => x.id === id)
    if (!p) return
    setQvState({ p, size: 0, flav: 0, qty: 1 })
    setActiveOverlay('quickview')
  }
  function qvOpt(k, v) {
    setQvState((s) => ({ ...s, [k]: k === 'qty' ? Math.max(1, Math.min(9, s.qty + v)) : v }))
  }
  function qvAdd() {
    const p = qvState.p
    addToCart({ id: p.id, name: p.name, img: p.img, size: SIZES[qvState.size].l, flav: p.flavours[qvState.flav], eggless: p.badges.includes('egg'), msg: '', photo: false, addons: [], qty: qvState.qty, unit: p.price + SIZES[qvState.size].a, slot: 0 })
    closeAll()
    toast(`${p.name} added to cart`)
    openCart()
  }

  /* ================= Auth ================= */
  const [authMode, setAuthModeRaw] = useState('login') // login | register | otp
  const [authPhone, setAuthPhone] = useState('')
  const [authError, setAuthError] = useState('')

  function setAuthMode(mode) {
    setAuthError('')
    setAuthModeRaw(mode)
  }
  function openAuth() {
    setActiveOverlay('auth')
  }
  function openProfile() {
    if (!user) {
      openAuth()
      return
    }
    showView('profile')
  }
  function updateProfile(details) {
    setUser((current) => current ? { ...current, ...details } : current)
    toast('Profile updated')
  }
  function finishAuth(u) {
    setUser(u)
    closeAll()
    toast(`Welcome${u ? ', ' + u.name.split(' ')[0] : ''}!`)
  }
  function doAuth({ phone, name }) {
    if (!/^[6-9]\d{9}$/.test(phone || '')) {
      setAuthError('Please enter a valid 10-digit mobile number.')
      return
    }
    if (authMode === 'register' && (!name || name.trim().length < 2)) {
      setAuthError('Please enter your name.')
      return
    }
    setAuthPhone(phone)
    setAuthError('')
    if (authMode === 'register') {
      finishAuth({ name: name.trim(), phone })
    } else {
      setAuthModeRaw('otp')
    }
  }
  function verifyOTP(digits) {
    if (digits.some((d) => !d)) {
      toast('Enter the 4-digit OTP', 'err')
      return
    }
    finishAuth({ name: 'Sweet Guest', phone: authPhone })
  }
  function socialLogin(provider) {
    toast(`Connecting to ${provider}…`)
    setTimeout(() => finishAuth({ name: provider + ' User', phone: '9876500000' }), 800)
  }
  function loginWithOtp() {
    setAuthPhone('98765 00000')
    setAuthModeRaw('otp')
  }
  function doLogout() {
    setUser(null)
    toast('Logged out. Come back soon!')
    goHome()
  }

  /* ================= Account ================= */
  const [accountTab, setAccountTab] = useState('profile')
  function openAccount(tab = 'profile') {
    if (!user) {
      openAuth()
      return
    }
    if (tab === 'profile') {
      openProfile()
      return
    }
    setAccountTab(tab)
    showView('account')
  }

  /* ================= Checkout ================= */
  const [coState, setCoState] = useState({ step: 1, addr: {}, slot: 0, date: 'today', pay: 'upi' })

  function openCheckout() {
    if (!cart.length) {
      toast('Your cart is empty', 'err')
      return
    }
    if (!user) {
      openAuth()
      toast('Please login to continue', 'err')
      return
    }
    setCoState({ step: 1, addr: {}, slot: 0, date: 'today', pay: 'upi' })
    setActiveOverlay('checkout')
  }

  function coNext(formData = {}) {
    const s = coState
    if (s.step === 1) {
      const { name, phone, line, city: ct, pin } = formData
      if (!name || !/^[6-9]\d{9}$/.test(phone || '') || (line || '').length < 8 || !ct || !/^\d{6}$/.test(pin || '')) {
        toast('Please fill all address fields correctly', 'err')
        return
      }
      setCoState({ ...s, addr: { name, phone, line, city: ct, pin }, step: 2 })
    } else if (s.step === 2) {
      setCoState({ ...s, step: 3 })
    } else if (s.step === 3) {
      if (s.pay === 'upi' && !/.+@.+/.test(formData.upi || '')) {
        toast('Enter a valid UPI ID', 'err')
        return
      }
      if (s.pay === 'card' && (formData.card || '').replace(/\s/g, '').length < 16) {
        toast('Enter a valid card number', 'err')
        return
      }
      const t = cartTotals
      const oid = 'SWT' + (100000 + Math.floor(Math.random() * 899999))
      const order = {
        id: oid,
        items: cart.map((c) => ({ name: c.name, qty: c.qty, unit: c.unit, img: c.img })),
        total: t.total,
        slot: SLOTS[s.slot].n,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        status: 1,
      }
      setOrders([order, ...orders])
      setCoupon(null)
      setCart([])
      setCoState({ ...s, step: 4, oid, total: t.total })
    }
  }
  function coBack() {
    setCoState({ ...coState, step: Math.max(1, coState.step - 1) })
  }
  function coSet(patch) {
    setCoState({ ...coState, ...patch })
  }

  function openTrack() {
    if (!orders.length) {
      toast('No orders yet — place one!', 'err')
      return
    }
    setActiveOverlay('track')
  }

  /* ================= Search ================= */
  function openSearch() {
    setActiveOverlay('search')
  }
  function doSearch(q) {
    if (!recentSearches.includes(q)) {
      setRecentSearches([q, ...recentSearches].slice(0, 6))
    }
    setTimeout(() => {
      closeAll()
      goShop('', q)
    }, 350)
  }

  const value = {
    // data passthrough helpers
    fmt,
    // persistent
    cart, wishlist, wishlistArr, user, city, coupon, orders, recentSearches,
    // nav
    view, activeOverlay, showView, goHome, goOffers, goCompany, closeAll,
    // toasts
    toasts, toast,
    // cart
    cartBump, addToCart, chQty, rmItem, applyCoupon, cartTotals, openCart, addGiftToCart, quickAdd,
    // wishlist
    toggleWish, openWishlist,
    // location
    setCityValue, detectCity, openLocation,
    // shop / plp
    shopState, setShopState, goShop, setSort, toggleF, toggleP, resetFilters, expressShop, filteredProducts,
    // pdp
    currentPDP, pdpUnit, openPDP, pdpOpt, pdpAddToCart, pdpBuyNow, currentGift, openGift,
    // quick view
    qvState, openQV, qvOpt, qvAdd,
    // auth
    authMode, authPhone, authError, setAuthMode, openAuth, doAuth, verifyOTP, socialLogin, loginWithOtp, doLogout,
    // account
    accountTab, openAccount, openProfile, updateProfile,
    // checkout
    coState, openCheckout, coNext, coBack, coSet, openTrack,
    // search
    openSearch, doSearch,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
