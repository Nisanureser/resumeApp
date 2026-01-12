import "../css/references.css";
import { FaPhoneAlt } from "react-icons/fa";
import referencesData from "../data/referencesData.json";
import { useTranslation } from "../hooks/useTranslation";

function References() {
  const { t } = useTranslation();

  return (
    <div className="references-container">
      <h2 className="references-title">{t("references.title")}</h2>

      <div className="references-list">
        {referencesData.map((ref, index) => (
          <div key={index} className="reference-card">
            <h4 className="name">{ref.name}</h4>
            <p className="position">{ref.position}</p>
            <p className="company">{ref.company}</p>
            <p className="phone">
              <FaPhoneAlt style={{ marginRight: "8px", color: "#4a4e69" }} />
              {ref.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default References;
