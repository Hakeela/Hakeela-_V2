import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'
import PhoneField from '../components/PhoneField/PhoneField.jsx'
import Popup from '../components/Popup/Popup.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Signup() {
  const navigate = useNavigate()
  const { signUp, demo } = useAuth()
  const [f, setF] = useState({
    full_name: '', gender: '', phone: '', email: '',
    how_heard: '', low_income: '', disability: '', password: '', confirm: '',
  })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (f.password.length < 6) return setError('Password must be at least 6 characters.')
    if (f.password !== f.confirm) return setError('Passwords do not match.')
    setBusy(true)
    const { error, needsConfirmation } = await signUp({
      email: f.email,
      password: f.password,
      meta: {
        full_name: f.full_name, gender: f.gender, phone: f.phone,
        how_heard: f.how_heard, low_income: f.low_income, disability: f.disability,
      },
    })
    setBusy(false)
    if (error) return setError(error)
    if (needsConfirmation) return setConfirmOpen(true)
    navigate('/dashboard', { replace: true })
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Create an Account</h1>
      <p className="auth-subtitle">Enter your details to start your learning experience</p>

      {demo && <p className="auth-note">Demo mode — Supabase keys not set yet, so this creates a local demo session.</p>}
      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="su-name">Full Name</label>
          <input id="su-name" type="text" className="auth-input" placeholder="Enter your full name" value={f.full_name} onChange={(e) => set('full_name', e.target.value)} required />
        </div>

        <div className="auth-row auth-row--keep">
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-gender">Gender</label>
            <select id="su-gender" className="auth-select" value={f.gender} onChange={(e) => set('gender', e.target.value)}>
              <option value="" disabled>Select gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-phone">Phone Number</label>
            <PhoneField value={f.phone} onChange={(v) => set('phone', v)} variant="auth" inputProps={{ id: 'su-phone' }} />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-email">Email</label>
          <input id="su-email" type="email" className="auth-input" placeholder="Enter email" value={f.email} onChange={(e) => set('email', e.target.value)} required />
        </div>

        <div className="auth-row">
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-hear">How did you hear about us?</label>
            <select id="su-hear" className="auth-select" value={f.how_heard} onChange={(e) => set('how_heard', e.target.value)}>
              <option value="" disabled>Select option</option>
              <option>Social media</option>
              <option>A friend</option>
              <option>Search engine</option>
              <option>An event</option>
            </select>
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-income">Are you from a low income bckground?</label>
            <select id="su-income" className="auth-select" value={f.low_income} onChange={(e) => set('low_income', e.target.value)}>
              <option value="" disabled>Select option</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-disability">
            Do you identify as someone living with disabilities?
          </label>
          <select id="su-disability" className="auth-select" value={f.disability} onChange={(e) => set('disability', e.target.value)}>
            <option value="" disabled>Select option</option>
            <option>Yes</option>
            <option>No</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-password">Password</label>
          <PasswordInput id="su-password" placeholder="Enter password" value={f.password} onChange={(e) => set('password', e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-confirm">Confirm Password</label>
          <PasswordInput id="su-confirm" placeholder="Re-enter password" value={f.confirm} onChange={(e) => set('confirm', e.target.value)} required />
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>{busy ? 'Creating…' : 'Create'}</button>
      </form>

      <p className="auth-alt">
        Already have an account?{' '}
        <Link to="/login" className="auth-inline-link">Login here</Link>
      </p>

      <Popup
        open={confirmOpen}
        onClose={() => navigate('/login')}
        title="Confirm your email"
        actionLabel="Go to login"
        onAction={() => navigate('/login')}
      >
        <p>
          Your account has been created! A confirmation email has been sent to{' '}
          <strong>{f.email}</strong>. Please check your inbox and confirm your
          email address to activate your account, then log in.
        </p>
      </Popup>
    </AuthLayout>
  )
}

export default Signup
