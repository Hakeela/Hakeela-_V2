import './FellowshipForm.css'

function FellowshipForm() {
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

                <div className="ability-form__iframe-container">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfyn1rXruYRSXnoYHxlQ7LyBeTURhFaeJoQoJFxU17fut_y3Q/viewform?embedded=true"
                        width="640"
                        height="1601"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        title="Apply for Hak-AbilityTech"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </section>
    )
}

export default FellowshipForm
