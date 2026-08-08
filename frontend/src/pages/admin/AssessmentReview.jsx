import { useNavigate, useParams } from "react-router-dom";
import { assessments, initials } from "./adminData.js";

// A fabricated answered quiz for the review view
const quiz = [
  {
    q: "Which of these is primarily a programming language used in data science?",
    options: ["Tableau", "Python", "Excel", "Power BI"],
    correct: "Python",
    chosen: "Python",
  },
  {
    q: "R is mostly used for statistical analysis and visualization.",
    options: ["True", "False"],
    correct: "True",
    chosen: "False",
  },
  {
    q: "Which library is used for data manipulation in Python?",
    options: ["NumPy", "Pandas", "React", "Django"],
    correct: "Pandas",
    chosen: "Pandas",
  },
];

function AssessmentReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sub = assessments.find((a) => a.id === id);

  if (!sub) {
    return <div className="dashpg"><p>Submission not found. <button className="adm-link" onClick={() => navigate("/admin/assessments")}>Back</button></p></div>;
  }

  const correctCount = quiz.filter((x) => x.chosen === x.correct).length;

  return (
    <div className="dashpg">
      <button className="adm-link" onClick={() => navigate("/admin/assessments")} style={{ marginBottom: 16 }}>← Back to assessments</button>

      <div className="adm-page-head">
        <div>
          <h2 className="adm-page-head__title">Review submission</h2>
          <p className="adm-page-head__sub">{sub.type} · {sub.course} · {sub.module}</p>
        </div>
        <span className="adm-badge adm-badge--green">Auto-graded</span>
      </div>

      <div className="adm-two-col">
        <div className="dash-card">
          <div className="adm-card-head"><h3>Answers</h3></div>
          {quiz.map((item, i) => (
            <div className="adm-qrow" key={i}>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14 }}>{i + 1}. {item.q}</div>
              {item.options.map((opt) => {
                const isCorrect = opt === item.correct;
                const isChosen = opt === item.chosen;
                const color = isCorrect ? "#1e9e5a" : isChosen ? "#d63a3a" : "#8a8a8a";
                return (
                  <div className="adm-qrow__opt" key={opt} style={{ color }}>
                    <span style={{ width: 16 }}>{isCorrect ? "✓" : isChosen ? "✕" : ""}</span>
                    {opt}
                    {isChosen && <span style={{ fontSize: 12, fontWeight: 700 }}>· learner's answer</span>}
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
              <div className="stat-card__value">{sub.score != null ? `${sub.score}%` : `${Math.round((correctCount / quiz.length) * 100)}%`}</div>
              <div className="stat-card__label">Final score</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#6a6a6a" }}>{correctCount} of {quiz.length} answered correctly. Auto-graded on submission.</p>
        </div>
      </div>
    </div>
  );
}

export default AssessmentReview;
