import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, demo } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn({ email, password })
    setBusy(false)
    if (error) return setError(error)
    navigate(location.state?.from || '/dashboard', { replace: true })
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Login to your Account</h1>
      <p className="auth-subtitle">Login to continue your learning experience</p>

      {demo && <p className="auth-note">Demo mode — Supabase keys not set yet, so any email/password will sign you in.</p>}
      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="login-email">Email</label>
          <input id="login-email" type="email" className="auth-input" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">Password</label>
          <PasswordInput id="login-password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="auth-forgot">
          <Link to="/reset-password">Reset Password</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>{busy ? 'Signing in…' : 'Login'}</button>
      </form>

      <p className="auth-alt">
        Don&rsquo;t have an account?{' '}
        <Link to="/signup" className="auth-inline-link">Create an Account</Link>
      </p>
      <p className="auth-alt">
        Admin or staff?{' '}
        <Link to="/admin/login" className="auth-inline-link">Login as admin</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
