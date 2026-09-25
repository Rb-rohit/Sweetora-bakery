import { useRef, useState } from 'react'
import { useStore } from '../../context/StoreContext.jsx'
import Modal from './Modal.jsx'
import Icon from '../ui/Icon.jsx'

const SOCIALS = [
  ['Google', <path d="M21 12.2c0-.7-.06-1.4-.18-2H12v3.9h5.05a4.3 4.3 0 0 1-1.87 2.8v2.3h3.02c1.77-1.63 2.8-4.03 2.8-7Z" fill="#4285F4" stroke="none" />],
  ['Apple', <path d="M16.5 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.3-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-2.2-.9-2.5-3-2.5-3Z" fill="#000" stroke="none" />],
  ['Facebook', <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" fill="#1877F2" stroke="none" />],
]

export default function AuthModal() {
  const { authMode, setAuthMode, authPhone, authError, doAuth, verifyOTP, socialLogin, closeAll } = useStore()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [digits, setDigits] = useState(['', '', '', ''])
  const refs = [useRef(), useRef(), useRef(), useRef()]

  function handleDigit(i, v) {
    const d = v.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = d
    setDigits(next)
    if (d && i < 3) refs[i + 1].current?.focus()
  }

  return (
    <Modal onClose={closeAll} widthClass="w-full max-w-[420px]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="text-lg">{authMode === 'otp' ? 'Verify OTP' : authMode === 'register' ? 'Create account' : 'Welcome back'}</h3>
        <button onClick={closeAll} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-choc hover:bg-cream-2">
          <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon>
        </button>
      </div>

      <div className="px-6 py-6">
        {authError && <p className="mb-3.5 rounded-xl bg-[#FBEAE8] px-3.5 py-2.5 text-[12.5px] text-[#B3382E]">{authError}</p>}

        {authMode === 'otp' ? (
          <>
            <p className="mb-5 text-[13.5px] text-muted">Enter the 4-digit code sent to <b className="text-choc">+91 {authPhone}</b></p>
            <div className="mb-5 flex justify-center gap-3">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 w-12 rounded-xl border-[1.5px] border-line text-center text-xl font-bold outline-none focus:border-pink"
                />
              ))}
            </div>
            <button onClick={() => verifyOTP(digits)} className="w-full rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
              Verify &amp; Continue
            </button>
            <div className="mt-4 flex justify-between text-[12.5px]">
              <a onClick={() => setAuthMode('login')} className="cursor-pointer font-semibold text-choc hover:text-pink">← Back</a>
              <a onClick={() => verifyOTP(digits)} className="cursor-pointer font-semibold text-pink">Resend OTP</a>
            </div>
          </>
        ) : (
          <>
            {authMode === 'register' && (
              <div className="mb-4">
                <label className="mb-[7px] block text-[12.5px] font-bold text-choc">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Sharma" className="w-full rounded-xl border-[1.5px] border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-pink" />
              </div>
            )}
            <div className="mb-5">
              <label className="mb-[7px] block text-[12.5px] font-bold text-choc">Mobile number</label>
              <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line px-3.5 py-3 focus-within:border-pink">
                <span className="text-sm text-muted">+91</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} inputMode="numeric" placeholder="98765 43210" className="flex-1 bg-transparent text-sm outline-none" />
              </div>
            </div>
            <button onClick={() => doAuth({ phone, name })} className="w-full rounded-full bg-pink py-[13px] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(232,93,117,.35)] hover:bg-pink-deep">
              {authMode === 'register' ? 'Create Account' : 'Continue'}
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.05em] text-muted-2">
              <span className="h-px flex-1 bg-line" /> or continue with <span className="h-px flex-1 bg-line" />
            </div>
            <div className="flex gap-3">
              {SOCIALS.map(([name2, icon]) => (
                <button key={name2} onClick={() => socialLogin(name2)} aria-label={name2} className="grid h-12 flex-1 place-items-center rounded-xl border-[1.5px] border-line hover:border-pink">
                  <Icon className="h-5 w-5">{icon}</Icon>
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-[13px] text-muted">
              {authMode === 'register' ? (
                <>Already have an account? <a onClick={() => setAuthMode('login')} className="cursor-pointer font-semibold text-pink">Login</a></>
              ) : (
                <>New to Sweetora? <a onClick={() => setAuthMode('register')} className="cursor-pointer font-semibold text-pink">Create account</a></>
              )}
            </p>
          </>
        )}
      </div>
    </Modal>
  )
}
