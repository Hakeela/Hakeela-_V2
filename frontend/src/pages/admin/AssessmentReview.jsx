import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubmission } from "../../lib/admin.js";
import { initials } from "./adminData.js";

function AssessmentReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSubmission(id)
      .then((s) => active && setSub(s))
      .catch(() => active && setSub(null))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="dashpg"><p style={{ color: "#8a8a8a" }}>Loading…</p></div>;
  if (!sub) return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;

  const correctCount = sub.questions.filter((q) => q.chosen === q.correct).length;

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/assessments")} style={{ marginBottom: 16 }}>← Back to assessments</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Review submission</h2>
          <p className="adm-page-head__sub">{sub.type} · {sub.course} · {sub.module}</p>
        </div>
        <div className="adm-rowactions">
          <span className="adm-badge adm-badge--green">{sub.status}</span>
          <button className="dash-btn dash-btn--outline" onClick={() => navigate(`/admin/assessments/${sub.id}/grade`)}>Edit grade</button>
        </div>
      </div>

      <div className="adm-two-col">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Answers</h3></div>
          {sub.questions.length === 0 && <p className="ce-empty">No auto-gradable answers for this submission.</p>}
          {sub.questions.map((item, i) => (
            <div className="adm-qrow" key={i}>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14 }}>{i + 1}. {item.question}</div>
              {item.options.map((opt) => {
                const isCorrect = opt === item.correct;
                const isChosen = opt === item.chosen;
                const color = isCorrect ? "#1e9e5a" : isChosen ? "#d63a3a" : "#8a8a8a";
                return (
                  <div className="adm-qrow__opt" key={opt} style={{ color }}>
                    <span style={{ width: 16 }}>{isCorrect ? "✓" : isChosen ? "✕" : ""}</span>
                    {opt}
                    {isChosen && <span style={{ fontSize: 12, fontWeight: 700 }}>· learner&apos;s answer</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {sub.feedback && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Feedback</p>
              <p style={{ fontSize: 14, color: "#6a6a6a" }}>{sub.feedback}</p>
            </div>
          )}
        </div>

        <div className="dash-card">
          <div className="adm-card-head"><h3>Result</h3></div>
          <div className="adm-user" style={{ marginBottom: 18 }}>
            <span className="adm-user__ph">{initials(sub.name)}</span>
            <div className="adm-user__name">{sub.name}</div>
          </div>
          <div className="stat-card" style={{ marginBottom: 12 }}>
            <div>
              <div className="stat-card__value">{sub.score}%</div>
              <div className="stat-card__label">Final score</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#6a6a6a" }}>{correctCount} of {sub.questions.length} answered correctly.</p>
        </div>
      </div>
    </div>
  );
}

export default AssessmentReview;
