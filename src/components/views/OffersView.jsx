import CouponsList from '../ui/CouponsList.jsx'

export default function OffersView() {
  return (
    <div className="mx-auto w-[92%] max-w-[760px] py-10 pb-[70px]">
      <div className="mb-[34px]">
        <h2 className="text-[26px] sm:text-[32px] lg:text-[38px]">Offers &amp; coupons</h2>
        <p className="mt-1.5 text-[15px] text-muted">Copy a code, apply it in your cart.</p>
      </div>
      <CouponsList />
    </div>
  )
}
