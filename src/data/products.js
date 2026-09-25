import { cakeSVG, giftSVG, bouquetSVG, teddySVG } from './svg.js'

/* ---------- Palettes ---------- */
export const PAL = {
  choc: { sponge: '#5A3028', cream: '#F3E0C8', drip: '#3A2118', top: '#C98A5B', bg: '#F6E8DA' },
  choco2: { sponge: '#7A4A2E', cream: '#FBEEDB', drip: '#5A3028', top: '#E0B183', bg: '#F8EDDE' },
  velvet: { sponge: '#8E2434', cream: '#FFF1EC', drip: '#6E1A28', top: '#F7D9CE', bg: '#FBE7E4' },
  straw: { sponge: '#F48CA0', cream: '#FFF0F3', drip: '#E85D75', top: '#FFE3E8', bg: '#FDEBEF' },
  butter: { sponge: '#E8B36A', cream: '#FBEFDD', drip: '#C98A3B', top: '#F7D9A8', bg: '#FBF1DF' },
  dark: { sponge: '#3A2118', cream: '#F6E3D7', drip: '#241109', top: '#D14A63', bg: '#EFE2D9' },
  rasmalai: { sponge: '#F0DCB8', cream: '#FFF8EA', drip: '#E3C48F', top: '#F5E6C8', bg: '#FBF3E2' },
  pine: { sponge: '#F2C94C', cream: '#FFF8E1', drip: '#DFA72E', top: '#FFF3C4', bg: '#FDF4D8' },
  mango: { sponge: '#F5A623', cream: '#FFF3DE', drip: '#E08A10', top: '#FFD98A', bg: '#FDF0D9' },
  coffee: { sponge: '#8A5A3B', cream: '#F5E9DC', drip: '#6B4226', top: '#D9B08C', bg: '#F4E9DE' },
  berry: { sponge: '#6B5CA8', cream: '#F0EDFA', drip: '#54479A', top: '#B7AEE3', bg: '#EFECF8' },
  pista: { sponge: '#A9BE7A', cream: '#F4F7E6', drip: '#8AA45C', top: '#DCE8BE', bg: '#F4F6E6' },
  vanilla: { sponge: '#F0E0C3', cream: '#FFF9EC', drip: '#E2CCA0', top: '#F9EEDC', bg: '#FBF4E6' },
}

/* ---------- Products ---------- */
const RAW_PRODUCTS = [
  { id: 1, name: 'Chocolate Truffle Cake', cat: 'chocolate', price: 599, mrp: 699, rating: 4.9, reviews: '2.4K', badges: ['best', 'egg'], pal: PAL.choc, variant: 'round', flavours: ['Chocolate Truffle', 'Belgian Chocolate', 'Dark Chocolate'], desc: 'Rich, moist chocolate sponge layered with silky truffle ganache and finished with a glossy chocolate glaze.' },
  { id: 2, name: 'Belgian Chocolate Fudge', cat: 'chocolate', price: 749, mrp: 899, rating: 4.8, reviews: '1.8K', badges: ['egg'], pal: PAL.choco2, variant: 'round', flavours: ['Belgian Chocolate', 'Hazelnut', 'Sea Salt Caramel'], desc: 'Decadent Belgian couverture fudge cake with a molten centre and roasted hazelnut praline crunch.' },
  { id: 3, name: 'Red Velvet Romance', cat: 'redvelvet', price: 649, mrp: 799, rating: 4.9, reviews: '3.1K', badges: ['best', 'egg'], pal: PAL.velvet, variant: 'heart', flavours: ['Classic Cream Cheese', 'White Chocolate', 'Strawberry Cream'], desc: 'Velvety crimson sponge with tangy cream-cheese frosting — our most gifted anniversary cake.' },
  { id: 4, name: 'Butterscotch Crunch', cat: 'butterscotch', price: 549, mrp: 649, rating: 4.7, reviews: '1.2K', badges: ['egg'], pal: PAL.butter, variant: 'round', flavours: ['Classic Butterscotch', 'Praline Crunch', 'Salted Caramel'], desc: 'Light vanilla sponge, butterscotch cream and a generous shower of homemade praline crunch.' },
  { id: 5, name: 'Black Forest Classic', cat: 'blackforest', price: 499, mrp: 599, rating: 4.6, reviews: '980', badges: ['egg'], pal: PAL.dark, variant: 'round', flavours: ['Classic', 'Cherry-loaded', 'Chocolate Shave'], desc: 'The timeless favourite — chocolate sponge, whipped cream, dark shavings and boozy cherries.' },
  { id: 6, name: 'Rasmalai Fusion Cake', cat: 'rasmalai', price: 699, mrp: 849, rating: 4.8, reviews: '760', badges: ['new'], pal: PAL.rasmalai, variant: 'round', flavours: ['Classic Rasmalai', 'Kesar Rasmalai', 'Cardamom'], desc: 'An Indian classic reborn — saffron milk-soaked sponge with rasmalai pieces and pistachio dust.' },
  { id: 7, name: 'Pineapple Sunshine', cat: 'pineapple', price: 449, mrp: 549, rating: 4.5, reviews: '640', badges: ['egg'], pal: PAL.pine, variant: 'round', flavours: ['Classic Pineapple', 'Coconut Pineapple', 'Cherry Top'], desc: 'Fluffy vanilla sponge layered with juicy pineapple compote and fresh cream clouds.' },
  { id: 8, name: 'Strawberry Cream Dream', cat: 'strawberry', price: 599, mrp: 699, rating: 4.7, reviews: '1.1K', badges: ['egg'], pal: PAL.straw, variant: 'heart', flavours: ['Fresh Strawberry', 'Strawberry Shortcake', 'Rose Strawberry'], desc: 'Real strawberry compote folded into chantilly cream over a delicate vanilla genoise.' },
  { id: 9, name: 'Mango Alphonso Delight', cat: 'mango', price: 649, mrp: 749, rating: 4.8, reviews: '530', badges: ['new'], pal: PAL.mango, variant: 'round', flavours: ['Alphonso Mango', 'Mango Cheesecake', 'Aam Ras'], desc: 'Seasonal Alphonso pulp layered with mango mousse — summer in every single bite.' },
  { id: 10, name: 'Coffee Caramel Crunch', cat: 'coffee', price: 679, mrp: 799, rating: 4.7, reviews: '410', badges: [], pal: PAL.coffee, variant: 'round', flavours: ['Espresso Caramel', 'Irish Coffee', 'Mocha'], desc: 'Espresso-soaked sponge, salted caramel ganache and a cocoa-crumble crunch topping.' },
  { id: 11, name: 'Blueberry Bliss Cheesecake', cat: 'desserts', price: 799, mrp: 949, rating: 4.9, reviews: '890', badges: ['best'], pal: PAL.berry, variant: 'round', flavours: ['Baked Blueberry', 'Blueberry Compote', 'Lemon Zest'], desc: 'Baked New-York style cheesecake swirled with wild blueberry compote on a biscuit base.' },
  { id: 12, name: 'Pistachio Rose Bento', cat: 'bento', price: 399, mrp: 499, rating: 4.8, reviews: '1.5K', badges: ['best', 'new'], pal: PAL.pista, variant: 'square', flavours: ['Pistachio Rose', 'Saffron Pistachio', 'Rose Cardamom'], desc: 'The viral Korean-style mini cake — pistachio cream, rose glaze and a personal message.' },
  { id: 13, name: 'Choco Rose Heart Cake', cat: 'anniversary', price: 899, mrp: 1099, rating: 4.9, reviews: '620', badges: ['egg'], pal: PAL.choc, variant: 'heart', flavours: ['Chocolate Rose', 'Red Velvet Heart', 'Pink Champagne'], desc: 'A heart-shaped showstopper with chocolate-rose cream and hand-piped buttercream petals.' },
  { id: 14, name: 'Vanilla Bean Elegance', cat: 'wedding', price: 549, mrp: 649, rating: 4.6, reviews: '380', badges: ['egg'], pal: PAL.vanilla, variant: 'tiered', flavours: ['Madagascar Vanilla', 'Vanilla Berry', 'Vanilla Caramel'], desc: 'Three tiers of Madagascar vanilla sponge with silky buttercream — made for grand days.' },
  { id: 15, name: 'Choco-Brownie Stack', cat: 'brownies', price: 479, mrp: 579, rating: 4.7, reviews: '720', badges: [], pal: PAL.choc, variant: 'brownie', flavours: ['Fudge Brownie', 'Nutella Brownie', 'Walnut Brownie'], desc: 'Stacked fudge brownies with molten centres, roasted nuts and a glossy ganache pour.' },
  { id: 16, name: 'Cupcake Carnival Box', cat: 'cupcakes', price: 549, mrp: 699, rating: 4.8, reviews: '950', badges: ['egg'], pal: PAL.straw, variant: 'cupcake', flavours: ['Assorted Box', 'All Chocolate', 'Berry Mix'], desc: 'Six handcrafted cupcakes in rotating flavours — perfect for office parties and picnics.' },
]

export const PRODUCTS = RAW_PRODUCTS.map((p) => ({
  ...p,
  img: cakeSVG(p.pal, p.variant),
  img2: cakeSVG({ ...p.pal, drip: p.pal.top, top: p.pal.drip }, p.variant),
}))

export const SIZES = [
  { l: '0.5 kg', a: 0 },
  { l: '1 kg', a: 300 },
  { l: '1.5 kg', a: 550 },
  { l: '2 kg', a: 750 },
]

export const SLOTS = [
  { n: 'Standard', t: 'Today, 6–9 PM', fee: 0 },
  { n: 'Same Day', t: 'Today, 4 hrs', fee: 49 },
  { n: '60 Minute', t: 'Rush delivery', fee: 149 },
  { n: 'Midnight', t: '12:00 AM sharp', fee: 199 },
  { n: 'Early Morning', t: '7–9 AM', fee: 99 },
  { n: 'Fixed Time', t: 'You pick the hour', fee: 79 },
]

export const COUPONS = [
  { code: 'WELCOME10', desc: '10% off on your first order', type: 'pct', val: 10, max: 100, min: 499 },
  { code: 'CAKE20', desc: '20% off above ₹999', type: 'pct', val: 20, max: 250, min: 999 },
  { code: 'MIDNIGHT', desc: 'Flat ₹75 off midnight deliveries', type: 'flat', val: 75, min: 699 },
  { code: 'FESTIVE25', desc: '25% off above ₹1,499 (festive days)', type: 'pct', val: 25, max: 400, min: 1499 },
]

export const ADDONS = [
  { id: 'flow', name: 'Fresh Rose Bouquet', price: 499, img: bouquetSVG('#FBE7E4') },
  { id: 'tedd', name: 'Cuddly Teddy 12″', price: 399, img: teddySVG('#FBF1E8') },
  { id: 'choc', name: 'Artisan Chocolate Box', price: 349, img: giftSVG('#5A3028', '#F1E3D6') },
  { id: 'card', name: 'Handwritten Greeting Card', price: 99, img: giftSVG('#E85D75', '#FDECEF') },
  { id: 'ball', name: 'Balloon Bunch (5)', price: 199, img: giftSVG('#D6A756', '#FBF3E3') },
  { id: 'pack', name: 'Premium Gift Packaging', price: 149, img: giftSVG('#6B5CA8', '#EFECF8') },
  { id: 'mug', name: 'Personalised Mug', price: 249, img: giftSVG('#3A9D5D', '#EAF4EC') },
  { id: 'frame', name: 'Photo Frame 6×8', price: 299, img: giftSVG('#E85D75', '#FDECEF') },
]

export const CITIES = ['Mumbai', 'Pune', 'Nagpur', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh']

export const QCATS = [
  ['Birthday', 'birthday', 1], ['Anniversary', 'anniversary', 3], ['Designer', 'designer', 14],
  ['Photo Cakes', 'photocake', 12], ['Bento', 'bento', 12], ['Chocolate', 'chocolate', 1],
  ['Wedding', 'wedding', 14], ['Kids', 'kids', 16], ['Desserts', 'desserts', 11],
  ['Cupcakes', 'cupcakes', 16], ['Brownies', 'brownies', 15], ['Hampers', 'gifts', 0],
]

export const OCCASIONS = [
  ['Birthday', 'birthday', '#E85D75', '#F08CA0'], ['Anniversary', 'anniversary', '#8E2434', '#D14A63'],
  ['Love', 'love', '#D14A63', '#F7B2B7'], ['Wedding', 'wedding', '#5A3028', '#A9744F'],
  ['Congrats', 'congrats', '#3A9D5D', '#8BC79E'], ['Thank You', 'thanks', '#D6A756', '#E8C88C'],
  ['Baby Shower', 'baby', '#F08CA0', '#FAD3DA'], ['Housewarming', 'house', '#A9744F', '#D9B08C'],
  ['Corporate', 'corp', '#2B1B18', '#6B5CA8'], ['Just Because', 'just', '#6B5CA8', '#A79BD8'],
]

export const TRENDS = [
  ['Bento Cakes', 'Small, personal, viral', 12, 'bento'], ['Heart Cakes', 'Say it with shape', 13, 'anniversary'],
  ['Drip Cakes', 'Extra drama, extra chocolate', 2, 'chocolate'], ['Photo Cakes', 'Your memory, edible', 12, 'photocake'],
  ['Minimal Cakes', 'Quiet luxury', 14, 'designer'], ['Barbie & Themes', 'Party starters', 16, 'kids'],
  ['Chocolate Cakes', 'Forever classic', 1, 'chocolate'], ['Floral Cakes', 'Botanical beauty', 3, 'designer'],
]

export const FLAVOURS = [
  ['Chocolate', '#5A3028', 'chocolate'], ['Red Velvet', '#8E2434', 'redvelvet'], ['Butterscotch', '#D99A4E', 'butterscotch'],
  ['Black Forest', '#3A2118', 'blackforest'], ['Pineapple', '#F2C94C', 'pineapple'], ['Rasmalai', '#E3C48F', 'rasmalai'],
  ['Strawberry', '#F48CA0', 'strawberry'], ['Mango', '#F5A623', 'mango'], ['Coffee', '#6B4226', 'coffee'],
  ['Blueberry', '#6B5CA8', 'desserts'], ['Pistachio', '#A9BE7A', 'bento'], ['Vanilla', '#E2CCA0', 'wedding'],
]

export const TESTIMONIALS = [
  ['Ananya S.', 'Mumbai', 5, 'Ordered at 9 PM, cake arrived at midnight with a candle and a handwritten card. My mom cried. 10/10.', 'Red Velvet Romance', '#E85D75'],
  ['Rohit K.', 'Pune', 5, 'The bento cake trend is real and Sweetora nails it. Perfect size, packaging felt like a gift from a boutique.', 'Pistachio Rose Bento', '#3A9D5D'],
  ['Priya M.', 'Bangalore', 5, 'Photo cake came out sharper than expected and tasted genuinely premium. Eggless and nobody could tell.', 'Chocolate Truffle Cake', '#D6A756'],
  ['Arjun T.', 'Delhi', 5, 'Same-day delivery saved my anniversary. The heart cake looked exactly like the photos.', 'Choco Rose Heart Cake', '#6B5CA8'],
  ['Sneha R.', 'Hyderabad', 4, 'Rasmalai cake is genius — not too sweet, real saffron flavour. Delivery boy was courteous and on time.', 'Rasmalai Fusion Cake', '#E85D75'],
  ['Vikram D.', 'Jaipur', 5, 'Corporate gifting for 40 clients, all delivered on schedule with our logo cards. Flawless execution.', 'Artisan Chocolate Box', '#3A9D5D'],
]

/* ---------- Small shared utils ---------- */
export const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
export const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r))
