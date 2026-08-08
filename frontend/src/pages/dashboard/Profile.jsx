import { useEffect, useState } from 'react'
import PhoneField from '../../components/PhoneField/PhoneField.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { updateProfile } from '../../lib/data.js'
import './dashboard-pages.css'

function Profile() {
  const { user, profile, updatePassword } = useAuth()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [savingInfo, setSavingInfo] = useState(false)
  const [savingPw, setSavingPw] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setPhone(profile.phone || '')
    }
  }, [profile])

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 3500) }

  const saveInfo = async (e) => {
    e.preventDefault()
    setSavingInfo(true)
    const { error } = await updateProfile(user?.id, { full_name: fullName, phone })
    setSavingInfo(false)
    flash(error ? `Error: ${error}` : 'Account information updated.')
  }

  const savePassword = async (e) => {
    e.preventDefault()
    if (pw.length < 6) return flash('Password must be at least 6 characters.')
    if (pw !== pw2) return flash('Passwords do not match.')
    setSavingPw(true)
    const { error } = await updatePassword(pw)
    setSavingPw(false)
    if (!error) { setPw(''); setPw2('') }
    flash(error ? `Error: ${error}` : 'Password updated.')
  }

  return (
    <div className="dashpg">
      <div className="dash-card settings-card">
        <div className="settings-user">
          <div className="settings-user__photo">
            <img src="/user-photo.png" alt="" />
            <span className="settings-user__cam">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </span>
          </div>
          <div>
            <h2 className="settings-user__name">{fullName || user?.email?.split('@')[0] || 'Your account'}</h2>
            <p className="settings-user__role">Student</p>
          </div>
        </div>

        {msg && <div className="help-success" style={{ marginBottom: 18 }}>{msg}</div>}

        {/* Account */}
        <form className="settings-sec" onSubmit={saveInfo}>
          <h3 className="settings-sec__title">Account Information</h3>
          <p className="settings-sec__hint">Edit your personal account information.</p>

          <div className="settings-field">
            <label>Full Name</label>
            <input className="settings-input" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="settings-field">
            <label>Phone Number</label>
            <PhoneField value={phone} onChange={setPhone} variant="settings" />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input className="settings-input" type="email" value={user?.email || ''} readOnly aria-readonly="true" />
          </div>
          <button className="dash-btn dash-btn--solid" disabled={savingInfo}>{savingInfo ? 'Saving…' : 'Update'}</button>
        </form>

        <hr className="settings-divider" />

        {/* Security */}
        <form className="settings-sec" onSubmit={savePassword}>
          <h3 className="settings-sec__title">Security Information</h3>
          <p className="settings-sec__hint">Edit your security account information.</p>

          <div className="settings-field">
            <label>Password</label>
            <input className="settings-input" type="password" placeholder="Enter new password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          <div className="settings-field">
            <label>Confirm Password</label>
            <input className="settings-input" type="password" placeholder="Re-enter password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
          </div>
          <button className="dash-btn dash-btn--solid" disabled={savingPw}>{savingPw ? 'Saving…' : 'Update'}</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
