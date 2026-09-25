import { useEffect } from 'react'
import { useStore } from './context/StoreContext.jsx'
import { useRouter } from './context/RouterContext.jsx'

import Announcement from './components/layout/Announcement.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import MobileNav from './components/layout/MobileNav.jsx'
import FloatingButtons from './components/layout/FloatingButtons.jsx'
import Toasts from './components/layout/Toasts.jsx'

import HomeView from './components/views/HomeView.jsx'
import ShopView from './components/views/ShopView.jsx'
import PDPView from './components/views/PDPView.jsx'
import AccountView from './components/views/AccountView.jsx'
import OffersView from './components/views/OffersView.jsx'
import GiftView from './components/views/GiftView.jsx'
import ProfileView from './components/views/ProfileView.jsx'
import CompanyPage from './components/views/CompanyPage.jsx'

import StickyCTA from './components/overlays/StickyCTA.jsx'
import CartDrawer from './components/overlays/CartDrawer.jsx'
import WishlistDrawer from './components/overlays/WishlistDrawer.jsx'
import LocationModal from './components/overlays/LocationModal.jsx'
import QuickViewModal from './components/overlays/QuickViewModal.jsx'
import AuthModal from './components/overlays/AuthModal.jsx'
import CheckoutModal from './components/overlays/CheckoutModal.jsx'
import TrackModal from './components/overlays/TrackModal.jsx'
import SearchOverlay from './components/overlays/SearchOverlay.jsx'

const VIEWS = {
  home: HomeView,
  shop: ShopView,
  pdp: PDPView,
  account: AccountView,
  profile: ProfileView,
  offers: OffersView,
  gift: GiftView,
  company: CompanyPage,
}

export default function App() {
  const { view, activeOverlay, openSearch, closeAll, user, openAuth } = useStore()
  const { pathname, navigate } = useRouter()
  const ActiveView = VIEWS[view] || HomeView

  useEffect(() => {
    if ((pathname.startsWith('/account') || pathname.startsWith('/profile')) && !user) {
      navigate('/', { replace: true })
      openAuth()
    }
  }, [pathname, user, navigate, openAuth])

  // Keyboard shortcuts: Cmd/Ctrl+K or "/" opens search, Escape closes overlays
  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        openSearch()
      } else if (e.key === 'Escape') {
        closeAll()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen pb-[66px] sm:pb-0">
      <Announcement />
      <Header />
      <main>
        <ActiveView />
      </main>
      <Footer />

      <MobileNav />
      <FloatingButtons />
      <StickyCTA />
      <Toasts />

      {activeOverlay === 'cart' && <CartDrawer />}
      {activeOverlay === 'wishlist' && <WishlistDrawer />}
      {activeOverlay === 'location' && <LocationModal />}
      {activeOverlay === 'quickview' && <QuickViewModal />}
      {activeOverlay === 'auth' && <AuthModal />}
      {activeOverlay === 'checkout' && <CheckoutModal />}
      {activeOverlay === 'track' && <TrackModal />}
      {activeOverlay === 'search' && <SearchOverlay />}
    </div>
  )
}
