import "../css/leftField.css";
import userImage from "../assets/user.jpg";

function LeftField({ onSelect, activeSection }) {
  return (
    <div className="leftField">
      <div className="imageField">
        <img src={userImage} alt="profile" />
      </div>
      <button
        className={activeSection === "about" ? "active" : ""}
        onClick={() => onSelect("about")}
      >
        About
      </button>
      <button
        className={activeSection === "education" ? "active" : ""}
        onClick={() => onSelect("education")}
      >
        Education
      </button>
      <button
        className={activeSection === "work-experience" ? "active" : ""}
        onClick={() => onSelect("work-experience")}
      >
        Work Experience
      </button>
      <button
        className={activeSection === "skills" ? "active" : ""}
        onClick={() => onSelect("skills")}
      >
        Skills
      </button>
      <button
        className={activeSection === "references" ? "active" : ""}
        onClick={() => onSelect("references")}
      >
        References
      </button>
    </div>
  );
}

export default LeftField;
