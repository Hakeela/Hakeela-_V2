import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import PasswordInput from '../components/AuthLayout/PasswordInput.jsx'
import PhoneField from '../components/PhoneField/PhoneField.jsx'

function Signup() {
  const [phone, setPhone] = useState('')

  return (
    <AuthLayout>
      <h1 className="auth-title">Create an Account</h1>
      <p className="auth-subtitle">Enter your details to start your learning experience</p>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="su-name">Full Name</label>
          <input id="su-name" type="text" className="auth-input" placeholder="Enter your full name" />
        </div>

        <div className="auth-row auth-row--keep">
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-gender">Gender</label>
            <select id="su-gender" className="auth-select" defaultValue="">
              <option value="" disabled>Select gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-phone">Phone Number</label>
            <PhoneField
              value={phone}
              onChange={setPhone}
              variant="auth"
              inputProps={{ id: 'su-phone' }}
            />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-email">Email</label>
          <input id="su-email" type="email" className="auth-input" placeholder="Enter email" />
        </div>

        <div className="auth-row">
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-hear">How did you hear about us?</label>
            <select id="su-hear" className="auth-select" defaultValue="">
              <option value="" disabled>Select option</option>
              <option>Social media</option>
              <option>A friend</option>
              <option>Search engine</option>
              <option>An event</option>
            </select>
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="su-income">Are you from a low income bckground?</label>
            <select id="su-income" className="auth-select" defaultValue="">
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
          <select id="su-disability" className="auth-select" defaultValue="">
            <option value="" disabled>Select option</option>
            <option>Yes</option>
            <option>No</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-password">Password</label>
          <PasswordInput id="su-password" placeholder="Enter password" />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="su-confirm">Confirm Password</label>
          <PasswordInput id="su-confirm" placeholder="Re-enter password" />
        </div>

        <button type="submit" className="auth-btn">Create</button>
      </form>

      <p className="auth-alt">
        Already have an account?{' '}
        <Link to="/login" className="auth-inline-link">Login here</Link>
      </p>
    </AuthLayout>
  )
}

export default Signup
