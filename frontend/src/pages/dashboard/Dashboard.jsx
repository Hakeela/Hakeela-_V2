import { Link } from "react-router-dom";
import "./dashboard-pages.css";

function Dashboard() {
  return (
    <div className="dashpg">
      {/* Welcome banner */}
      <section className="dwb">
        <img
          className="dwb__shapes"
          src="/dash-banner-shapes.png"
          alt=""
          aria-hidden="true"
        />
        <div className="dwb__text">
          <h2 className="dwb__title">
            Welcome back, Victor! You&apos;re on a roll! 👍
          </h2>
          <p className="dwb__desc">
            Your consistency is paying off and you&apos;re making tremendous
            progress. Keep going, and you&apos;ll complete your course in no
            time. A certificate with your name on it is waiting!
          </p>
        </div>
      </section>

      <h3 className="dash-section-title">Quick Actions</h3>

      <div className="quick">
        {/* Resume course */}
        <article className="quick-card quick-card--resume">
          <div className="quick-card__thumb">
            <img src="/gain-1.png" alt="" />
          </div>
          <div className="quick-card__body">
            <span className="quick-card__eyebrow">Resume Course</span>
            <h4 className="quick-card__title">Data Analysis</h4>
            <p className="quick-card__sub">Introduction to Data analytics</p>
            <div className="quick-card__progress">
              <span>13 of 20 lessons</span>
              <div className="dash-bar">
                <i style={{ width: "65%" }} />
              </div>
            </div>
            <Link
              to="/dashboard/courses/data-analysis"
              className="dash-btn dash-btn--outline"
            >
              Continue
            </Link>
          </div>
        </article>

        {/* Invite friends */}
        <article className="quick-card quick-card--action">
          <span className="quick-card__icon quick-card__icon--blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 15 15"
            >
              <path d="M0 0h15v15H0z" fill="none" />
              <path
                fill="currentColor"
                d="M5 8.9c1.44 0 2.68.252 3.575.855C9.502 10.38 10 11.343 10 12.6a.501.501 0 0 1-1 0c0-.958-.358-1.596-.983-2.017C7.359 10.141 6.35 9.9 5 9.9s-2.36.241-3.017.684C1.358 11.005 1 11.643 1 12.601a.501.501 0 0 1-1 0c0-1.258.497-2.221 1.424-2.846C2.319 9.152 3.56 8.9 5 8.9m4.975 0c1.439 0 2.68.252 3.575.855c.927.625 1.425 1.588 1.425 2.846a.5.5 0 0 1-1 0c0-.958-.358-1.596-.984-2.017c-.518-.349-1.253-.57-2.202-.65a4.5 4.5 0 0 0-.87-1.033zM5 1.85a3.151 3.151 0 0 1 0 6.3a3.15 3.15 0 1 1 0-6.3m4.975 0a3.15 3.15 0 0 1 0 6.3c-.524 0-1.016-.13-1.45-.356a4.5 4.5 0 0 0 .534-.852a2.15 2.15 0 1 0 0-3.887a4.5 4.5 0 0 0-.535-.85a3.1 3.1 0 0 1 1.45-.355M5 2.85a2.151 2.151 0 0 0 0 4.3a2.15 2.15 0 0 0 0-4.3"
              />
            </svg>
          </span>
          <h4 className="quick-card__title">Invite your friends</h4>
          <p className="quick-card__text">
            We support a P2P learning community. Invite your friends to learn a
            tech skill, and be a part of your learning journey.
          </p>
          <a href="#" className="dash-btn dash-btn--solid">
            Invite →
          </a>
        </article>

        {/* Pay for certificate */}
        <article className="quick-card quick-card--action">
          <span className="quick-card__icon quick-card__icon--yellow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" />
                <path strokeLinecap="round" d="M10 16H6m8 0h-1.5M2 10h20" />
              </g>
            </svg>
          </span>
          <h4 className="quick-card__title">Pay for your certificate</h4>
          <p className="quick-card__text">
            We support a P2P learning community. Invite your friends to learn a
            tech skill, and be a part of your learning journey.
          </p>
          <a href="#" className="dash-btn dash-btn--yellow">
            Invite →
          </a>
        </article>
      </div>
    </div>
  );
}

export default Dashboard;
