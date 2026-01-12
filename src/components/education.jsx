import "../css/education.css";
import { useTranslation } from "../hooks/useTranslation";

function Education() {
  const { t } = useTranslation();

  const educationData = [
    {
      school: t("education.university.school"),
      degree: t("education.university.degree"),
      extra: t("education.university.extra"),
      date: t("education.university.date")
    },
    {
      school: t("education.highSchool.school"),
      degree: t("education.highSchool.degree"),
      extra: t("education.highSchool.extra"),
      date: t("education.highSchool.date")
    }
  ];

  return (
    <div className="education-container">
      <h2 className="education-title">{t("education.title")}</h2>

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
