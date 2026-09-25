import { useStore } from '../../context/StoreContext.jsx'
import { useRouter } from '../../context/RouterContext.jsx'

const PAGES = {
  about: {
    eyebrow: 'OUR STORY', title: 'A little joy, baked fresh.', intro: 'Sweetora brings people together over thoughtful cakes, desserts and gifts. We pair familiar flavours with careful craft to make everyday moments feel worth celebrating.',
    sections: [
      ['Made for your moments', 'From birthdays and anniversaries to a small treat after a long day, we make it easier to find something lovely to share. Choose a favourite, add a personal message and pick a delivery time that works for you.'],
      ['Freshness with care', 'Our cakes are prepared in local baking kitchens and handled with care from kitchen to doorstep. Product details, ingredients and available delivery options are shown while you shop.'],
      ['Our promise', 'We believe good service should feel as considered as a good bake. We keep ordering straightforward, communicate clearly and are here to help when plans change.'],
    ],
  },
  careers: {
    eyebrow: 'CAREERS AT SWEETORA', title: 'Make room for more joy.', intro: 'We are building a team of people who care about good food, thoughtful service and the small details that make a celebration memorable.',
    sections: [
      ['Where you can make a difference', 'Our work spans baking and kitchen operations, delivery, customer care, product, design and technology. We value curiosity, reliability and a willingness to learn.'],
      ['Interested in joining us?', 'Tell us a little about yourself and the kind of work you would like to do. Email your introduction and résumé to careers@sweetora.in. We will reach out when a suitable opportunity is available.'],
      ['A note on hiring', 'Sweetora does not charge candidates any fee at any stage of recruitment. Please contact careers@sweetora.in if you receive a suspicious job offer claiming to represent us.'],
    ],
  },
  terms: {
    eyebrow: 'THE DETAILS', title: 'Terms of service', intro: 'These terms describe the basic rules for using the Sweetora website and placing an order. By using the site, you agree to follow them.',
    sections: [
      ['Orders and availability', 'An order is subject to product availability, delivery coverage and confirmation at checkout. Product images are illustrative; decorations and presentation may vary. Please review the product description, size, ingredients and delivery details before ordering.'],
      ['Prices and payment', 'Prices and applicable charges are displayed during checkout. Your order total is confirmed before you place the order. Payment must be completed using an option offered at checkout.'],
      ['Delivery and changes', 'Delivery times are estimates and can be affected by conditions outside our control. For changes, cancellations or delivery concerns, contact customer support as soon as possible; options depend on preparation status and the order details.'],
      ['Using this site', 'Please provide accurate information, keep your account credentials secure and do not misuse the site or interfere with its operation. We may update products, features and these terms from time to time.'],
      ['Contact', 'For questions about these terms or an order, contact support@sweetora.in. These website terms are a general summary and do not replace rights available to you under applicable law.'],
    ],
  },
  privacy: {
    eyebrow: 'YOUR INFORMATION', title: 'Privacy policy', intro: 'We use the information you share to help you browse, place and receive orders, and to support your account. This page explains the main ways information is handled on this demo storefront.',
    sections: [
      ['Information you provide', 'This may include your name, mobile number, email address, delivery details, order history and information you enter when contacting support. Account and shopping data in this demo is stored in your browser.'],
      ['How information is used', 'We use order and contact details to process purchases, coordinate delivery, respond to requests, maintain account features and improve the shopping experience. We do not sell personal information.'],
      ['Storage and choices', 'You can update profile details from your Profile page. Because this demo stores data in browser storage, clearing your browser data may remove it. Do not enter sensitive payment credentials into this demo.'],
      ['Cookies and similar storage', 'The storefront uses browser storage to remember preferences such as cart contents, wishlist and account details. Your browser controls allow you to clear stored site data.'],
      ['Questions', 'For a privacy question or request, email support@sweetora.in. This page describes the demo experience; a production service should publish a policy reflecting its actual data systems and practices.'],
    ],
  },
  contact: {
    eyebrow: 'WE ARE HERE TO HELP', title: 'Contact Sweetora', intro: 'Need help with an order or have a question before placing one? Reach our support team and include your order number if you have one.',
    sections: [
      ['Email support', 'Write to support@sweetora.in. Please include the phone number used for your order and your order ID so we can find it quickly.'],
      ['Call us', 'Call 1800-SWEETORA (toll-free) between 8 AM and 11 PM. For delivery updates, keep your order ID handy.'],
      ['Chat with us', 'Use the chat option on the storefront for help with products, delivery availability and order questions. Our typical response time is under two minutes during support hours.'],
    ],
  },
  faq: {
    eyebrow: 'QUICK ANSWERS', title: 'Frequently asked questions', intro: 'A few helpful answers for planning your Sweetora order.',
    sections: [
      ['How do I place an order?', 'Choose a product, select its available options, add it to your cart and follow checkout to enter delivery details and select an available time slot.'],
      ['Can you deliver to my location?', 'Enter or select your city on the storefront to see local availability. Delivery options and time slots depend on your address and the products in your order.'],
      ['Can I add a message to my cake?', 'Many cakes support a personal message. Add it on the product page when that option is available, and check your order details before checkout.'],
      ['How can I track my order?', 'Use Track Order in the site header or contact support with your order ID for help.'],
      ['Can I change or cancel an order?', 'Contact support as soon as possible. Changes and cancellations depend on how close the order is to its selected delivery slot and whether preparation has started. See our Cancellation page.'],
    ],
  },
  cancellation: {
    eyebrow: 'ORDER CHANGES', title: 'Cancellation policy', intro: 'We prepare orders close to their delivery time, so please contact us quickly if your plans change.',
    sections: [
      ['Requesting a cancellation', 'You may request cancellation up to two hours before the selected delivery slot. Contact support@sweetora.in or call 1800-SWEETORA and provide your order ID.'],
      ['Orders already in preparation', 'Once baking or dispatch has started, we may be unable to cancel or change a custom or perishable order. Our team will confirm the options for your specific order.'],
      ['Changes to an order', 'Changes to the delivery address, time, message or product depend on availability and preparation status. Please do not assume a change is complete until support confirms it.'],
      ['Refunds after cancellation', 'If an eligible prepaid order is cancelled, the refund is returned to the original payment method. Processing time depends on the payment provider; see our Refund Policy.'],
    ],
  },
  'refund-policy': {
    eyebrow: 'PAYMENTS', title: 'Refund policy', intro: 'We want to resolve order issues fairly. Contact us with your order ID and a short description of what happened so our team can review it.',
    sections: [
      ['Eligible refunds', 'Refunds may be available for an eligible cancellation, a failed payment where the amount was debited, or a verified issue with an order. Perishable and made-to-order products may have limited cancellation options once preparation begins.'],
      ['How to request help', 'Email support@sweetora.in or call 1800-SWEETORA. For a product or delivery issue, contact us as soon as possible after delivery and include clear photos when relevant.'],
      ['Refund processing', 'Once approved, refunds are sent to the original payment method. They are typically processed within 3–5 business days; your bank or payment provider may take additional time to show the credit.'],
      ['Payment failures', 'If checkout fails but your account was charged, share the payment reference and order attempt details with support. We will check the transaction and help resolve it.'],
    ],
  },
}

const PAGE_LABELS = { about: 'About', careers: 'Careers', terms: 'Terms', privacy: 'Privacy', contact: 'Contact', faq: 'FAQ', cancellation: 'Cancellation', 'refund-policy': 'Refund Policy' }

export default function CompanyPage() {
  const { pathname } = useRouter()
  const { goCompany } = useStore()
  const slug = pathname.replace(/^\//, '').replace(/\/$/, '')
  const page = PAGES[slug] || PAGES.about

  return (
    <article className="mx-auto w-[92%] max-w-[900px] py-14 pb-20">
      <header className="mb-10 rounded-[28px] bg-cream-2 px-7 py-10 sm:px-12 sm:py-14">
        <p className="mb-3 text-xs font-bold tracking-[.16em] text-pink">{page.eyebrow}</p>
        <h1 className="font-display text-3xl font-bold text-choc sm:text-5xl">{page.title}</h1>
        <p className="mt-5 max-w-[680px] text-base leading-7 text-muted-3">{page.intro}</p>
      </header>
      <div className="grid gap-3 border-b border-line pb-8 sm:grid-cols-4">
        {Object.entries(PAGE_LABELS).map(([key, label]) => (
          <button key={key} onClick={() => goCompany(key)} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${key === slug ? 'bg-pink text-white' : 'bg-white text-choc hover:bg-pink-ghost hover:text-pink'}`}>{label}</button>
        ))}
      </div>
      <div className="divide-y divide-line">
        {page.sections.map(([title, body]) => (
          <section key={title} className="py-7">
            <h2 className="mb-3 text-xl font-bold text-choc">{title}</h2>
            <p className="leading-7 text-muted-3">{body}</p>
          </section>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted">Last updated: September 2026</p>
    </article>
  )
}
