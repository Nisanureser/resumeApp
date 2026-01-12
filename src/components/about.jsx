import "../css/about.css";
import { useTranslation } from "../hooks/useTranslation";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <div>
        <h1 className="about-title">{t("about.name")}</h1>
        <h2 className="about-subtitle">{t("about.title")}</h2>
      </div>
      <p className="about-description">
        {t("about.description")}
      </p>
    </div>
  );
}

export default About;
