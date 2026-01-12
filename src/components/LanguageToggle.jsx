import { useLanguage } from "../contexts/LanguageContext";
import "../css/languageToggle.css";

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isTurkish = language === "tr";

  return (
    <div className="language-switch-container">
      <span className={`language-label ${isTurkish ? "active" : ""}`}>TR</span>
      <button 
        className={`language-switch ${isTurkish ? "turkish" : "english"}`}
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        <span className="language-switch-slider"></span>
      </button>
      <span className={`language-label ${!isTurkish ? "active" : ""}`}>EN</span>
    </div>
  );
}

export default LanguageToggle;
