import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assessments, initials } from "./adminData.js";

function AssessmentGrade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sub = assessments.find((a) => a.id === id);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!sub) {
    return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;
  }

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/assessments")} style={{ marginBottom: 16 }}>← Back to assessments</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Grade submission</h2>
          <p className="adm-page-head__sub">{sub.type} · {sub.course} · {sub.module}</p>
        </div>
      </div>

      <div className="adm-two-col">
        {/* Submitted work */}
        <div className="dash-card">
          <div className="adm-card-head">
            <h3>Submitted work</h3>
            <span className="adm-badge adm-badge--yellow">Needs grading</span>
          </div>

          <div className="adm-user" style={{ marginBottom: 18 }}>
            <span className="adm-user__ph">{initials(sub.name)}</span>
            <div>
              <div className="adm-user__name">{sub.name}</div>
              <div className="adm-user__sub">Submitted Aug 6, 2026</div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: "#4a4a4a", lineHeight: 1.7 }}>
            For this {sub.type.toLowerCase()}, the learner submitted their work covering {sub.module} of {sub.course}.
            Review the attached file and the notes below before assigning a score.
          </p>

          <div className="ce-file__drop" style={{ marginTop: 14, cursor: "default" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {sub.name.split(" ")[0].toLowerCase()}-{sub.type.toLowerCase()}-submission.pdf
            <button className="adm-btn-sm" style={{ marginLeft: "auto" }}>Download</button>
          </div>

          <div style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Learner note</p>
            <p style={{ fontSize: 14, color: "#6a6a6a" }}>
              &ldquo;I focused on cleaning the dataset and building the summary charts. Ran out of time on the final section.&rdquo;
            </p>
          </div>
        </div>

        {/* Grade panel */}
        <div className="dash-card">
          <div className="adm-card-head"><h3>Grade</h3></div>
          <div className="adm-field" style={{ marginBottom: 16 }}>
            <label>Score (%)</label>
            <input type="number" min="0" max="100" value={score} onChange={(e) => setScore(e.target.value)} placeholder="0 – 100" />
          </div>
          <div className="adm-field" style={{ marginBottom: 16 }}>
            <label>Feedback for the learner</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Explain the score and give guidance…" />
          </div>
          <div className="adm-rowactions">
            <button className="dash-btn dash-btn--outline" onClick={() => navigate("/admin/assessments")}>Save draft</button>
            <button className="dash-btn dash-btn--solid" onClick={() => navigate("/admin/assessments")}>Publish grade</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentGrade;
