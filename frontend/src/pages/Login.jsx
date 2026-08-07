import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'

function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Login to your Account</h1>
      <p className="auth-subtitle">Login to continue your learning experience</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="login-email">Email</label>
          <input id="login-email" type="email" className="auth-input" placeholder="Enter email" />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">Password</label>
          <PasswordInput id="login-password" placeholder="Enter password" />
        </div>

        <div className="auth-forgot">
          <Link to="/reset-password">Reset Password</Link>
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <p className="auth-alt">
        Don&rsquo;t have an account?{' '}
        <Link to="/signup" className="auth-inline-link">Create an Account</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
