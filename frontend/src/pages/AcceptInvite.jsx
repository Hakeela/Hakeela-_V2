import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'
import PhoneField from '../components/PhoneField/PhoneField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { updateProfile } from '../lib/data.js'

/**
 * Invite onboarding. Reached via the link in a staff/admin invite email, which
 * carries a session token (picked up automatically by supabase-js). The invitee
 * fills in their details and sets a password to finish creating their account.
 * Their role (admin/staff) was already assigned when they were invited.
 */
function AcceptInvite() {
  const navigate = useNavigate()
  const { user, profile, loading, completeInvite, demo } = useAuth()
  const [f, setF] = useState({
    full_name: '', phone: '', country: '', password: '', confirm: '',
  })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Prefill the name from the invite once the session is ready.
  useEffect(() => {
    const name = profile?.full_name || user?.user_metadata?.full_name || ''
    if (name) setF((p) => (p.full_name ? p : { ...p, full_name: name }))
  }, [profile, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!f.full_name || !f.phone || !f.country) {
      return setError('Please fill in all fields.')
    }
    if (f.password.length < 6) return setError('Password must be at least 6 characters.')
    if (f.password !== f.confirm) return setError('Passwords do not match.')

    setBusy(true)
    const meta = { full_name: f.full_name, phone: f.phone, country: f.country }
    const { error: authErr } = await completeInvite({ password: f.password, meta })
    if (authErr) { setBusy(false); return setError(authErr) }
    if (user) await updateProfile(user.id, meta)
    setBusy(false)
    navigate('/admin', { replace: true })
  }

  // Waiting for supabase-js to pick up the invite token from the URL.
  if (loading) {
    return (
      <AuthLayout>
        <h1 className="auth-title">Setting up your invite…</h1>
      </AuthLayout>
    )
  }

  // No session and not in demo mode → the link is invalid or already used.
  if (!user && !demo) {
    return (
      <AuthLayout>
        <h1 className="auth-title">Invite link invalid or expired</h1>
        <p className="auth-subtitle">
          This invitation link is no longer valid. Please ask an admin to resend your invite.
        </p>
        <p className="auth-alt">
          Already have an account?{' '}
          <Link to="/login" className="auth-inline-link">Login here</Link>
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Complete your account</h1>
      <p className="auth-subtitle">
        You've been invited to the HakPortal team. Fill in your details and set a
        password to finish setting up your account.
      </p>

      {demo && <p className="auth-note">Demo mode — Supabase keys not set yet, so this is a preview of the invite form.</p>}
      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="ai-name">Full Name</label>
          <input id="ai-name" type="text" className="auth-input" placeholder="Enter your full name" value={f.full_name} onChange={(e) => set('full_name', e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="ai-phone">Phone Number</label>
          <PhoneField value={f.phone} onChange={(v) => set('phone', v)} variant="auth" inputProps={{ id: 'ai-phone' }} />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="ai-country">Country</label>
          <input id="ai-country" type="text" className="auth-input" placeholder="e.g. Nigeria" value={f.country} onChange={(e) => set('country', e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="ai-password">Password</label>
          <PasswordInput id="ai-password" placeholder="Create a password" value={f.password} onChange={(e) => set('password', e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="ai-confirm">Confirm Password</label>
          <PasswordInput id="ai-confirm" placeholder="Re-enter password" value={f.confirm} onChange={(e) => set('confirm', e.target.value)} required />
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
      </form>
    </AuthLayout>
  )
}

export default AcceptInvite
