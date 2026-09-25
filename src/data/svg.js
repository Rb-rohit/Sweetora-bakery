/* ============================================================
   SWEETORA — original, generated SVG imagery engine.
   Ported 1:1 from the source site so every product/category
   image is procedurally generated (no external image assets).
   ============================================================ */

export function svgURI(s) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s)
}

export function cakeSVG(pal, variant) {
  const { sponge, cream, drip, top, bg } = pal
  let cake = ''
  if (variant === 'cupcake') {
    cake = `<path d="M120 300 L140 180 h120 l20 120 Z" fill="${cream}"/><ellipse cx="200" cy="180" rx="86" ry="34" fill="${drip}"/><ellipse cx="200" cy="168" rx="70" ry="24" fill="${sponge}"/><circle cx="200" cy="140" r="13" fill="${top}"/><rect x="190" y="112" width="20" height="34" rx="8" fill="${drip}"/>`
  } else if (variant === 'brownie') {
    cake = `<rect x="95" y="180" width="210" height="58" rx="14" fill="${sponge}"/><rect x="108" y="192" width="184" height="10" rx="5" fill="${drip}" opacity=".55"/><rect x="108" y="236" width="150" height="14" rx="7" fill="${drip}" opacity=".45"/><rect x="118" y="130" width="164" height="52" rx="12" fill="${sponge}"/><path d="M118 142 h164 v-8 a12 12 0 0 0 -12 -12 h-140 a12 12 0 0 0 -12 12 Z" fill="${drip}"/><circle cx="160" cy="120" r="8" fill="${top}"/><circle cx="200" cy="114" r="8" fill="${top}"/><circle cx="240" cy="120" r="8" fill="${top}"/>`
  } else if (variant === 'tiered') {
    cake = `<rect x="75" y="230" width="250" height="76" rx="16" fill="${sponge}"/><rect x="75" y="230" width="250" height="22" rx="11" fill="${drip}"/><rect x="105" y="152" width="190" height="82" rx="14" fill="${sponge}"/><rect x="105" y="152" width="190" height="20" rx="10" fill="${drip}"/><rect x="135" y="88" width="130" height="68" rx="13" fill="${sponge}"/><rect x="135" y="88" width="130" height="18" rx="9" fill="${drip}"/><circle cx="200" cy="68" r="12" fill="${top}"/><path d="M200 56 v-18" stroke="${drip}" stroke-width="6" stroke-linecap="round"/><circle cx="200" cy="34" r="7" fill="#E85D75"/>`
  } else if (variant === 'heart') {
    cake = `<path d="M200 308 C120 250 86 206 86 160 a52 52 0 0 1 100 -22 a52 52 0 0 1 100 22 c0 46 -34 90 -86 148Z" fill="${sponge}"/><path d="M200 308 C120 250 86 206 86 160 a52 52 0 0 1 60 -50 c-8 40 10 70 54 108 c44 -38 62 -68 54 -108 a52 52 0 0 1 60 50 c0 46 -34 90 -86 148Z" fill="${drip}" opacity=".9"/><circle cx="200" cy="130" r="12" fill="${top}"/><path d="M158 210 q42 26 84 0" stroke="${cream}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/><path d="M150 246 q50 28 100 0" stroke="${cream}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".6"/>`
  } else if (variant === 'square') {
    cake = `<rect x="92" y="150" width="216" height="158" rx="20" fill="${sponge}"/><rect x="92" y="150" width="216" height="34" rx="17" fill="${drip}"/><rect x="118" y="206" width="164" height="76" rx="12" fill="${cream}"/><text x="200" y="252" text-anchor="middle" font-family="Georgia" font-size="30" font-style="italic" fill="${sponge}">sweet</text><circle cx="130" cy="142" r="9" fill="${top}"/><circle cx="176" cy="136" r="9" fill="${top}"/><circle cx="222" cy="136" r="9" fill="${top}"/><circle cx="268" cy="142" r="9" fill="${top}"/>`
  } else {
    /* round drip */
    cake = `<rect x="82" y="170" width="236" height="132" rx="18" fill="${sponge}"/><path d="M82 188 h236 v-16 a18 18 0 0 0 -18 -18 h-200 a18 18 0 0 0 -18 18 Z" fill="${drip}"/><path d="M104 188 v20 a12 12 0 0 0 24 0 v-20 M152 188 v26 a12 12 0 0 0 24 0 v-26 M200 188 v20 a12 12 0 0 0 24 0 v-20 M248 188 v26 a12 12 0 0 0 24 0 v-26" fill="${drip}"/><rect x="82" y="248" width="236" height="16" rx="8" fill="${cream}" opacity=".85"/><path d="M104 290 q24 -18 48 0 t48 0 t48 0 t48 0" stroke="${drip}" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/><circle cx="200" cy="146" r="14" fill="${top}"/><path d="M200 132 v-20" stroke="${drip}" stroke-width="6" stroke-linecap="round"/><circle cx="200" cy="106" r="8" fill="#E85D75"/><circle cx="140" cy="152" r="8" fill="${cream}"/><circle cx="260" cy="152" r="8" fill="${cream}"/>`
  }
  const sprinkles = [[90, 330], [320, 120], [70, 90], [330, 330], [250, 60]]
    .map(([x, y], i) => `<rect x="${x}" y="${y}" width="14" height="5" rx="2.5" fill="${['#E85D75', '#D6A756', '#3A9D5D'][i % 3]}" opacity=".7" transform="rotate(${i * 40} ${x} ${y})"/>`)
    .join('')
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="50%" cy="42%"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#FFFFFF"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><ellipse cx="200" cy="322" rx="150" ry="20" fill="#EAD9CC"/><ellipse cx="200" cy="316" rx="132" ry="15" fill="#FBF3EA"/>${cake}${sprinkles}</svg>`)
}

export function giftSVG(hue, bg) {
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="50%" cy="40%"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#fff"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><rect x="100" y="170" width="200" height="150" rx="16" fill="${hue}"/><rect x="188" y="170" width="24" height="150" fill="#D6A756"/><rect x="82" y="138" width="236" height="46" rx="12" fill="${hue}"/><rect x="188" y="138" width="24" height="46" fill="#D6A756"/><path d="M200 138 c-30 -42 -76 -22 -58 4 h58 c30 -42 76 -22 58 4 h-58" fill="#D6A756"/><circle cx="140" cy="118" r="12" fill="${hue}"/><circle cx="260" cy="118" r="12" fill="${hue}"/></svg>`)
}

export function bouquetSVG(bg) {
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="50%" cy="40%"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#fff"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><path d="M150 300 L200 200 L250 300 Z" fill="#D6A756"/><path d="M165 260 L200 200 L235 260" stroke="#B8894A" stroke-width="6" fill="none"/><circle cx="160" cy="150" r="34" fill="#E85D75"/><circle cx="240" cy="150" r="34" fill="#F08CA0"/><circle cx="200" cy="112" r="36" fill="#D14A63"/><circle cx="180" cy="188" r="30" fill="#F7B2B7"/><circle cx="224" cy="190" r="28" fill="#E85D75"/><circle cx="160" cy="150" r="14" fill="#FBF3E3"/><circle cx="240" cy="150" r="14" fill="#FBF3E3"/><circle cx="200" cy="112" r="15" fill="#FBF3E3"/><rect x="176" y="286" width="48" height="18" rx="9" fill="#B8894A"/></svg>`)
}

export function teddySVG(bg) {
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="50%" cy="42%"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#fff"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="150" cy="110" r="30" fill="#A9744F"/><circle cx="250" cy="110" r="30" fill="#A9744F"/><circle cx="150" cy="110" r="14" fill="#E8C9A8"/><circle cx="250" cy="110" r="14" fill="#E8C9A8"/><circle cx="200" cy="150" r="62" fill="#A9744F"/><ellipse cx="200" cy="172" rx="26" ry="18" fill="#E8C9A8"/><circle cx="200" cy="164" r="9" fill="#5A3028"/><circle cx="178" cy="140" r="7" fill="#2B1B18"/><circle cx="222" cy="140" r="7" fill="#2B1B18"/><ellipse cx="200" cy="272" rx="72" ry="60" fill="#A9744F"/><ellipse cx="200" cy="282" rx="40" ry="36" fill="#E8C9A8"/><circle cx="200" cy="258" r="12" fill="#E85D75"/><path d="M168 248 q32 -20 64 0" stroke="#E8C9A8" stroke-width="10" fill="none"/></svg>`)
}

export function occSVG(label, pal) {
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${pal[0]}"/><stop offset="100%" stop-color="${pal[1]}"/></linearGradient></defs><rect width="400" height="460" fill="url(#g)"/><circle cx="320" cy="80" r="90" fill="#FFFFFF" opacity=".14"/><circle cx="60" cy="380" r="110" fill="#FFFFFF" opacity=".12"/><circle cx="200" cy="220" r="86" fill="#FFFFFF" opacity=".22"/><text x="200" y="232" text-anchor="middle" font-family="Georgia" font-size="46" font-style="italic" fill="#FFFFFF">${label}</text><path d="M140 268 h120" stroke="#FFFFFF" stroke-width="3" opacity=".6"/><circle cx="200" cy="268" r="4" fill="#fff"/></svg>`)
}
