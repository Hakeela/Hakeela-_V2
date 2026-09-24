import { useState } from 'react'
import Popup from './Popup.jsx'

const PROGRAMS = ['Software Engineering', 'Product & UI/UX Design', 'Data & AI Fundamentals', 'Graphics Design', 'Tech Entrepreneurship']
const MODES = ['Online', 'Hybrid (online + hub)', 'In-person hub']
const SUPPORT = ['No', 'Yes — hearing/speech support', 'Yes — visual support', 'Yes — other (we will follow up)']
const SCHOLARSHIP_OPTIONS = ['No', 'Yes']

const empty = { first: '', last: '', email: '', phone: '', program: '', mode: '', support: '', scholarship: '', scholarshipReason: '' }

function Admissions() {
  const [f, setF] = useState(empty)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit application.')

      setDone(true)
      setF(empty)
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="apply" id="apply">
      <div className="container">
        <div className="apply__head">
          <p className="apply__label">Join HakVersity</p>
          <h2 className="apply__title">Start your journey today.</h2>
          <p className="apply__sub">
            Fill in the form below and our admissions team will reach out within 36 hours
            with your next steps. Enrollment fee is N5,000 for Nigerians, and $3 for Non-Nigerians (A-Must). Scholarships available for qualifying applicants.
          </p>
        </div>

        <form className="apply__form" onSubmit={submit}>
          <div className="apply__row">
            <div className="field">
              <label htmlFor="first">First Name</label>
              <input id="first" value={f.first} onChange={(e) => set('first', e.target.value)} placeholder="Enter your first name" required />
            </div>
            <div className="field">
              <label htmlFor="last">Last Name</label>
              <input id="last" value={f.last} onChange={(e) => set('last', e.target.value)} placeholder="Enter your last name" required />
            </div>
          </div>

          <div className="apply__row">
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="Enter your email address" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Phone number" required />
            </div>
          </div>

          <div className="apply__row">
            <div className="field">
              <label htmlFor="program">Program of Interest</label>
              <select id="program" value={f.program} onChange={(e) => set('program', e.target.value)} required>
                <option value="" disabled>Select option</option>
                {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="mode">Learning Mode</label>
              <select id="mode" value={f.mode} onChange={(e) => set('mode', e.target.value)} required>
                <option value="" disabled>Select option</option>
                {MODES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="support">Do you require accessibility support?</label>
            <select id="support" value={f.support} onChange={(e) => set('support', e.target.value)} required>
              <option value="" disabled>Select option</option>
              {SUPPORT.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="scholarship">Are you applying for a scholarship?</label>
            <select id="scholarship" value={f.scholarship} onChange={(e) => set('scholarship', e.target.value)} required>
              <option value="" disabled>Select option</option>
              {SCHOLARSHIP_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          {f.scholarship === 'Yes' && (
            <div className="field">
              <label htmlFor="scholarshipReason">Why should we select you for a scholarship?</label>
              <textarea
                id="scholarshipReason"
                value={f.scholarshipReason}
                onChange={(e) => set('scholarshipReason', e.target.value)}
                placeholder="Tell us why you should be selected for a scholarship"
                rows="5"
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn--solid apply__submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
          {error && <p className="apply__status apply__status--error" role="alert">{error}</p>}
          <p className="apply__note">
            By applying you agree to Hakeela&rsquo;s <a href="/hakversity/privacy-policy">Privacy Policy</a>. We never share your data with third parties.
          </p>
        </form>
      </div>

      <Popup open={done} onClose={() => setDone(false)} title="Application received!" image="/nav-avatar.png">
        <p>Thanks for applying to HakVersity. Our admissions team will reach out within 48 hours with your next steps.</p>
      </Popup>
    </section>
  )
}

export default Admissions
