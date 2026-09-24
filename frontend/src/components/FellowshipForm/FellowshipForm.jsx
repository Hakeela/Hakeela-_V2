import { useState } from 'react'
import Popup from '../Popup/Popup.jsx'
import './FellowshipForm.css'

const DISABILITY_OPTIONS = [
    'Hearing impairment',
    'Speech impairment',
    'Visual impairment',
    'Mobility impairment',
    'Multiple disabilities',
    'Prefer not to say',
]

const emptyForm = {
    fullName: '',
    email: '',
    phone: '',
    countryCity: '',
    disability: '',
    commit100Percent: '',
    acceptTerms: false,
}

function FellowshipForm() {
    const [form, setForm] = useState(emptyForm)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [done, setDone] = useState(false)

    const setValue = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const submit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/hakabilitytech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Unable to submit application.')

            setDone(true)
            setForm(emptyForm)
        } catch (submissionError) {
            setError(submissionError.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="ability-form" id="apply">
            <div className="ability-form__inner">
                <div className="ability-form__head">
                    <p className="ability-form__label">AI &amp; Design Fellowship</p>
                    <h2 className="ability-form__title">Apply for Hak-AbilityTech</h2>
                    <p className="ability-form__subtitle">
                        This program is free. We are looking for serious applicants who are ready to learn, show up,
                        and commit 100% to the fellowship.
                    </p>
                </div>

                <form className="ability-form__form" onSubmit={submit}>
                    <div className="ability-form__grid">
                        <div className="field">
                            <label htmlFor="fullName">Full name</label>
                            <input
                                id="fullName"
                                value={form.fullName}
                                onChange={(event) => setValue('fullName', event.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(event) => setValue('email', event.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="phone">Phone number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(event) => setValue('phone', event.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="countryCity">Country/City</label>
                            <input
                                id="countryCity"
                                value={form.countryCity}
                                onChange={(event) => setValue('countryCity', event.target.value)}
                                placeholder="Ex: Nigeria, Lagos"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="disability">What type of disability do you identify with?</label>
                        <select
                            id="disability"
                            value={form.disability}
                            onChange={(event) => setValue('disability', event.target.value)}
                            required
                        >
                            <option value="" disabled>Select an option</option>
                            {DISABILITY_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="commit100Percent">Are you ready to commit 100% to this Fellowship?</label>
                        <select
                            id="commit100Percent"
                            value={form.commit100Percent}
                            onChange={(event) => setValue('commit100Percent', event.target.value)}
                            required
                        >
                            <option value="" disabled>Select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <label className="ability-form__checkbox">
                        <input
                            type="checkbox"
                            checked={form.acceptTerms}
                            onChange={(event) => setValue('acceptTerms', event.target.checked)}
                            required
                        />
                        <span>
                            This program is free, but unserious students would be kicked out of the fellowship.
                        </span>
                    </label>

                    <button type="submit" className="ability-form__submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>

                    {error && <p className="ability-form__status ability-form__status--error">{error}</p>}
                </form>
            </div>

            <Popup open={done} onClose={() => setDone(false)} title="Application received!" image="/nav-avatar.png">
                <p>Thank you. Your Hak-AbilityTech fellowship application has been received successfully.</p>
            </Popup>
        </section>
    )
}

export default FellowshipForm
