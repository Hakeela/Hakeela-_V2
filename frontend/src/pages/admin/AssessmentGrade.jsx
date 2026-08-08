import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assessments, sampleSubmission, initials } from "./adminData.js";

function AssessmentGrade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sub = assessments.find((a) => a.id === id);

  // grader-editable correct answers, pre-filled from the quiz definition (auto-graded)
  const [correct, setCorrect] = useState(() => Object.fromEntries(sampleSubmission.map((q) => [q.id, q.correct])));
  const [feedback, setFeedback] = useState("");

  if (!sub) {
    return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;
  }

  const correctCount = sampleSubmission.filter((q) => q.chosen === correct[q.id]).length;
  const score = Math.round((correctCount / sampleSubmission.length) * 100);

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
        {/* On-site answers with editable correct answer */}
        <div className="dash-card">
          <div className="adm-card-head">
            <h3>Answers</h3>
          </div>
          <p style={{ fontSize: 13, color: "#8a8a8a", marginTop: -8, marginBottom: 16 }}>
            The quiz was taken on the platform. Correct answers are pre-selected — click an option to change which one counts as correct and the score updates automatically.
          </p>

          {sampleSubmission.map((q, i) => (
            <div className="adm-grade-q" key={q.id}>
              <div className="adm-grade-q__title">{i + 1}. {q.question}</div>
              {q.options.map((opt) => {
                const isCorrect = correct[q.id] === opt;
                const isChosen = q.chosen === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    className={`adm-grade-opt ${isCorrect ? "is-correct" : ""} ${isChosen ? "is-chosen" : ""}`}
                    onClick={() => setCorrect((c) => ({ ...c, [q.id]: opt }))}
                  >
                    <span className="adm-grade-opt__mark">{isCorrect ? "✓" : ""}</span>
                    <span className="adm-grade-opt__text">{opt}</span>
                    {isChosen && <span className="adm-grade-opt__tag">learner&apos;s answer</span>}
                  </button>
                );
              })}
              <div className={`adm-grade-q__verdict ${q.chosen === correct[q.id] ? "ok" : "bad"}`}>
                {q.chosen === correct[q.id] ? "Correct" : "Incorrect"}
              </div>
            </div>
          ))}
        </div>

        {/* Grade panel */}
        <div className="dash-card">
          <div className="adm-card-head"><h3>Result</h3></div>
          <div className="adm-user" style={{ marginBottom: 16 }}>
            <span className="adm-user__ph">{initials(sub.name)}</span>
            <div>
              <div className="adm-user__name">{sub.name}</div>
              <div className="adm-user__sub">Submitted Aug 6, 2026</div>
            </div>
          </div>

          <div className="stat-card" style={{ marginBottom: 16 }}>
            <div>
              <div className="stat-card__value">{score}%</div>
              <div className="stat-card__label">{correctCount} of {sampleSubmission.length} correct</div>
            </div>
          </div>

          <div className="adm-field" style={{ marginBottom: 16 }}>
            <label>Feedback for the learner (optional)</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Add any comments…" />
          </div>
          <div className="adm-rowactions">
            <button className="dash-btn dash-btn--outline" onClick={() => navigate("/admin/assessments")}>Cancel</button>
            <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/assessments")}>Publish grade</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentGrade;
