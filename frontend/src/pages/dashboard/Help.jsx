import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { submitHelpMessage } from "../../lib/data.js";
import "./dashboard-pages.css";

const MAX = 1500;

function Help() {
  const { user, profile } = useAuth();
  // Prefilled from the signed-in learner (read-only)
  const account = {
    name: profile?.full_name || user?.email?.split("@")[0] || "",
    email: user?.email || "",
  };

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const count = message.length;
  const over = count > MAX;
  const canSubmit = message.trim().length > 0 && !over && !busy;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setBusy(true);
    const { error } = await submitHelpMessage(user?.id, { name: account.name, email: account.email, message });
    setBusy(false);
    if (error) return setError(error);
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="dashpg">
      <div className="help-intro">
        <h2 className="help-intro__title">Need a hand?</h2>
        <p className="help-intro__sub">
          Send us a message and our support team will get back to you at your registered email.
        </p>
      </div>

      <div className="dash-card help-card">
        {sent && <div className="help-success">Thanks! Your message has been sent. We&apos;ll reply to {account.email}.</div>}
        {error && <div className="help-warning" style={{ marginBottom: 16 }}>{error}</div>}

        <form className="help-form" onSubmit={submit}>
          <div className="settings-field">
            <label>Name</label>
            <input className="settings-input help-readonly" value={account.name} readOnly aria-readonly="true" />
          </div>

          <div className="settings-field">
            <label>Email</label>
            <input className="settings-input help-readonly" value={account.email} readOnly aria-readonly="true" />
          </div>

          <div className="settings-field">
            <div className="help-msg-label">
              <label htmlFor="help-message">Message</label>
              <span className={`help-count ${over ? "is-over" : ""}`}>{count}/{MAX}</span>
            </div>
            <textarea
              id="help-message"
              className={`settings-input help-textarea ${over ? "is-over" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              rows={7}
            />
            {over && (
              <p className="help-warning">
                Your message is {count - MAX} character{count - MAX === 1 ? "" : "s"} over the {MAX}-character limit. Please shorten it before sending.
              </p>
            )}
          </div>

          <button type="submit" className="dash-btn dash-btn--solid" disabled={!canSubmit}>
            {busy ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Help;
