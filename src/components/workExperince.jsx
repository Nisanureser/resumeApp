import "../css/workExperience.css";
import { useTranslation } from "../hooks/useTranslation";

function WorkExperience() {
  const { t } = useTranslation();

  const getDescription = (key) => {
    const desc = t(key);
    return Array.isArray(desc) ? desc : [desc];
  };

  const workExperienceData = [
    {
      position: t("workExperience.internship1.position"),
      date: t("workExperience.internship1.date"),
      company: t("workExperience.internship1.company"),
      description: getDescription("workExperience.internship1.description")
    },
    {
      position: t("workExperience.internship2.position"),
      date: t("workExperience.internship2.date"),
      company: t("workExperience.internship2.company"),
      description: getDescription("workExperience.internship2.description")
    },
    {
      position: t("workExperience.job1.position"),
      date: t("workExperience.job1.date"),
      company: t("workExperience.job1.company"),
      description: getDescription("workExperience.job1.description")
    }
  ];

  return (
    <div className="work-container">
      <h2 className="work-title">{t("workExperience.title")}</h2>

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
