import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const OTP_SECONDS = 56

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'your email'
  const [name, domain] = email.split('@')
  if (name.length <= 3) return `${name[0] || ''}****@${domain}`
  return `${name.slice(0, 2)}****${name.slice(-1)}@${domain}`
}

function ResetPassword() {
  const navigate = useNavigate()
  const { requestPasswordReset, verifyResetOtp, updatePassword, demo } = useAuth()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [seconds, setSeconds] = useState(OTP_SECONDS)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (step !== 2 || seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [step, seconds])

  const sendCode = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    const { error } = await requestPasswordReset(email)
    setBusy(false)
    if (error) return setError(error)
    setSeconds(OTP_SECONDS); setOtp(''); setStep(2)
  }

  const resend = async () => {
    setError('')
    await requestPasswordReset(email)
    setSeconds(OTP_SECONDS); setOtp('')
  }

  const verify = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    const { error } = await verifyResetOtp(email, otp)
    setBusy(false)
    if (error) return setError(error)
    setStep(3)
  }

  const complete = async (e) => {
    e.preventDefault()
    setError('')
    if (pw.length < 6) return setError('Password must be at least 6 characters.')
    if (pw !== pw2) return setError('Passwords do not match.')
    setBusy(true)
    const { error } = await updatePassword(pw)
    setBusy(false)
    if (error) return setError(error)
    navigate('/dashboard', { replace: true })
  }

  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <AuthLayout>
      <h1 className="auth-title">Reset your password</h1>

      {demo && <p className="auth-note">Demo mode — Supabase keys not set yet, so any code is accepted.</p>}
      {error && <p className="auth-error">{error}</p>}

      {step === 1 && (
        <>
          <p className="auth-subtitle">
            Kindly enter the email address associated with your account to reset your password
          </p>
          <form className="auth-form" onSubmit={sendCode}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="rp-email">Email</label>
              <input id="rp-email" type="email" className="auth-input" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="auth-btn" disabled={busy}>{busy ? 'Sending…' : 'Send OTP code'}</button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <p className="auth-subtitle">Enter the OTP sent to {maskEmail(email)}</p>
          <form className="auth-form" onSubmit={verify}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="rp-otp">Enter OTP</label>
              <div className="auth-otp-wrap">
                <input id="rp-otp" type="text" inputMode="numeric" maxLength={10} className="auth-input" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))} />
                <span className="auth-timer">
                  {seconds > 0 ? mmss : <button type="button" onClick={resend}>Resend</button>}
                </span>
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={otp.length < 6 || busy}>{busy ? 'Verifying…' : 'Verify'}</button>
            <p className="auth-note" style={{ marginTop: 10 }}>The code from your email may be 6–8 digits. Paste or type it exactly.</p>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <p className="auth-subtitle">Enter your new password</p>
          <form className="auth-form" onSubmit={complete}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="rp-new">Password</label>
              <PasswordInput id="rp-new" placeholder="Enter new password" value={pw} onChange={(e) => setPw(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="rp-confirm">Confirm Password</label>
              <PasswordInput id="rp-confirm" placeholder="Re-enter new password" value={pw2} onChange={(e) => setPw2(e.target.value)} required />
            </div>
            <button type="submit" className="auth-btn" disabled={busy}>{busy ? 'Saving…' : 'Complete'}</button>
          </form>
        </>
      )}
    </AuthLayout>
  )
}

export default ResetPassword
