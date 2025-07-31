import "../css/education.css";
import educationData from "../data/educationData.json";

function Education() {
  return (
    <div className="education-container">
      <h2 className="education-title">Education</h2>

      {educationData.map((item, index) => (
        <div className="education-item" key={index}>
          <div className="education-text">
            <h3 className="education-school">{item.school}</h3>
            <p className="education-degree">{item.degree}</p>
            <p className="education-degree">{item.extra}</p>
          </div>
          <span className="education-date">{item.date}</span>
        </div>
      ))}
    </div>
  );
}

export default Education;
