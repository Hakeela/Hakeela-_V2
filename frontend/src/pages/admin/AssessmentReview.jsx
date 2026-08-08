import { useNavigate, useParams } from "react-router-dom";
import { assessments, sampleSubmission, initials } from "./adminData.js";

function AssessmentReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sub = assessments.find((a) => a.id === id);

  if (!sub) {
    return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;
  }

  const correctCount = sampleSubmission.filter((x) => x.chosen === x.correct).length;
  const score = sub.score != null ? sub.score : Math.round((correctCount / sampleSubmission.length) * 100);

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/assessments")} style={{ marginBottom: 16 }}>← Back to assessments</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Review submission</h2>
          <p className="adm-page-head__sub">{sub.type} · {sub.course} · {sub.module}</p>
        </div>
        <div className="adm-rowactions">
          <span className="adm-badge adm-badge--green">Auto-graded</span>
          <button className="dash-btn dash-btn--outline" onClick={() => navigate(`/admin/assessments/${sub.id}/grade`)}>Edit grade</button>
        </div>
      </div>

      <div className="adm-two-col">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Answers</h3></div>
          {sampleSubmission.map((item, i) => (
            <div className="adm-qrow" key={item.id}>
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
        </div>

        <div className="dash-card">
          <div className="adm-card-head"><h3>Result</h3></div>
          <div className="adm-user" style={{ marginBottom: 18 }}>
            <span className="adm-user__ph">{initials(sub.name)}</span>
            <div className="adm-user__name">{sub.name}</div>
          </div>
          <div className="stat-card" style={{ marginBottom: 12 }}>
            <div>
              <div className="stat-card__value">{score}%</div>
              <div className="stat-card__label">Final score</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#6a6a6a" }}>{correctCount} of {sampleSubmission.length} answered correctly. Auto-graded on submission.</p>
        </div>
      </div>
    </div>
  );
}

export default AssessmentReview;
