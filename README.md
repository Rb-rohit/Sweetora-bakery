# Sweetora — React + Tailwind

A full port of the original single-file SWEETORA bakery site into a proper
**React 18 + Vite + Tailwind CSS** project. Every feature from the original
is implemented: browsing, PDP configurator, cart, wishlist, search, coupons,
login/OTP, multi-step checkout, order tracking, and the full account area —
all client-side, with cart/wishlist/user/orders persisted to `localStorage`.

Product imagery is unchanged from the original: every cake/gift image is a
procedurally generated inline SVG (see `src/data/svg.js`), so there are no
external image assets to manage.

## Getting started

```bash
npm install
npm run dev       # starts a local dev server (usually http://localhost:5173)
```

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  data/
    svg.js          Generated SVG image engine (cakes, gifts, bouquets, teddies, occasion art)
    products.js      Product catalogue, sizes, delivery slots, coupons, add-ons, cities, etc.
  context/
    StoreContext.jsx Global app state: cart, wishlist, auth, PDP config, checkout, search…
  hooks/
    usePersistentState.js  localStorage-backed useState
    useReveal.js            IntersectionObserver scroll-reveal
    useScrollY.js            live window scrollY
  components/
    layout/           Announcement bar, Header, Footer, MobileNav, FloatingButtons, Toasts
    product/           ProductCard, ProductGrid, Carousel
    views/             Home, Shop (PLP), PDP, Account, Offers
    overlays/           Drawer/Modal shells + Cart, Wishlist, Location, QuickView,
                         Auth, Checkout, Track, Search, StickyCTA
    ui/                 Small shared bits: Icon, Reveal, CouponsList
  App.jsx             Layout shell, route-based view switching, overlay mounting, keyboard shortcuts
  main.jsx            Entry point
```

## Notes

- **State management** is a single React Context (`StoreContext`) exposing
  everything the original's global functions/variables did — no Redux/Zustand
  needed for an app this size.
- **Styling** is Tailwind utility classes throughout. The original's CSS
  variables (colors, shadows, radii, breakpoints) were ported into
  `tailwind.config.js` under `theme.extend`, including custom breakpoints
  (`sm:640px / md:900px / lg:1100px`) that match the original's media queries.
- **Routing** is handled by the lightweight custom router in
  `src/context/RouterContext.jsx`. Routes use the browser History API, so
  page URLs are shareable and browser Back/Forward restores the previous view.
