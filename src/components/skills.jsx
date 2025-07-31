import "../css/skills.css";
import skillsData from "../data/skillsData.json";

function Skills() {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Skills</h2>

      {skillsData.map((group, index) => (
        <div className="skills-group" key={index}>
          <h4 className="group-title">{group.groupTitle}</h4>
          <ul className="skills-list">
            {group.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Skills;
