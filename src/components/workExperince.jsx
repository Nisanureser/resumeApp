import "../css/workExperience.css";
import workExperienceData from "../data/workExperienceData.json";

function WorkExperience() {
  return (
    <div className="work-container">
      <h2 className="work-title">Work Experiences</h2>

      {workExperienceData.map((exp, index) => (
        <div className="work-item" key={index}>
          <div className="work-header">
            <h5 className="work-position">{exp.position}</h5>
            <span className="work-date">{exp.date}</span>
          </div>
          <p className="work-company">{exp.company}</p>
          <p className="work-description">
            {exp.description.map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WorkExperience;
