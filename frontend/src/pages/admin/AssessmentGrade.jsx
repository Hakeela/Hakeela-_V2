import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubmission, gradeSubmission } from "../../lib/admin.js";
import { initials } from "./adminData.js";

function AssessmentGrade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    getSubmission(id)
      .then((s) => {
        if (!active || !s) return;
        setSub(s);
        setScore(String(s.score ?? s.autoScore ?? ""));
        setFeedback(s.feedback || "");
      })
      .catch(() => active && setSub(null))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const publish = async () => {
    setBusy(true);
    await gradeSubmission(id, score, feedback);
    setBusy(false);
    navigate("/admin/assessments");
  };

  if (loading) return <div className="dashpg"><p style={{ color: "#8a8a8a" }}>Loading…</p></div>;
  if (!sub) return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/assessments")} style={{ marginBottom: 16 }}>← Back to assessments</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Grade submission</h2>
          <p className="adm-page-head__sub">{sub.type} · {sub.course} · {sub.module}</p>
        </div>
        <span className="adm-badge adm-badge--yellow">Auto-graded · editable</span>
      </div>

      <div className="adm-two-col">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Answers</h3></div>
          <p style={{ fontSize: 13, color: "#8a8a8a", marginTop: -8, marginBottom: 16 }}>
            The quiz was taken on the platform and auto-graded against the correct answers.
            Adjust the final score on the right if needed, then publish.
          </p>

          {sub.questions.length === 0 && <p className="ce-empty">This submission has no auto-gradable questions.</p>}
          {sub.questions.map((q, i) => (
            <div className="adm-grade-q" key={i}>
              <div className="adm-grade-q__title">{i + 1}. {q.question}</div>
              {q.options.map((opt) => {
                const isCorrect = q.correct === opt;
                const isChosen = q.chosen === opt;
                return (
                  <div key={opt} className={`adm-grade-opt ${isCorrect ? "is-correct" : ""} ${isChosen ? "is-chosen" : ""}`} style={{ cursor: "default" }}>
                    <span className="adm-grade-opt__mark">{isCorrect ? "✓" : ""}</span>
                    <span className="adm-grade-opt__text">{opt}</span>
                    {isChosen && <span className="adm-grade-opt__tag">learner&apos;s answer</span>}
                  </div>
                );
              })}
              <div className={`adm-grade-q__verdict ${q.chosen === q.correct ? "ok" : "bad"}`}>
                {q.chosen === q.correct ? "Correct" : "Incorrect"}
              </div>
            </div>
          ))}
        </div>

        <div className="dash-card">
          <div className="adm-card-head"><h3>Result</h3></div>
          <div className="adm-user" style={{ marginBottom: 16 }}>
            <span className="adm-user__ph">{initials(sub.name)}</span>
            <div>
              <div className="adm-user__name">{sub.name}</div>
              <div className="adm-user__sub">Auto score: {sub.autoScore}%</div>
            </div>
          </div>

          <div className="adm-field" style={{ marginBottom: 16 }}>
            <label>Final score (%)</label>
            <input type="number" min="0" max="100" value={score} onChange={(e) => setScore(e.target.value)} />
          </div>
          <div className="adm-field" style={{ marginBottom: 16 }}>
            <label>Feedback for the learner (optional)</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Add any comments…" />
          </div>
          <div className="adm-rowactions">
            <button className="dash-btn dash-btn--outline" onClick={() => navigate("/admin/assessments")}>Cancel</button>
            <button className="dash-btn dash-btn--solid" onClick={publish} disabled={busy}>{busy ? "Publishing…" : "Publish grade"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentGrade;
