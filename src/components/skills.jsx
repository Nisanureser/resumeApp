import "../css/skills.css";
import { useTranslation } from "../hooks/useTranslation";

function Skills() {
  const { t } = useTranslation();

  const skillsData = [
    {
      groupTitle: t("skills.groups.frontend"),
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Sass",
        "Tailwind CSS",
        "Flutter",
        "Figma",
        "WordPress",
        "Next.js"
      ]
    },
    {
      groupTitle: t("skills.groups.backend"),
      skills: ["PHP", "MySQL", "C# / .NET"]
    },
    {
      groupTitle: t("skills.groups.versionControl"),
      skills: ["Git-Github"]
    },
    {
      groupTitle: t("skills.groups.other"),
      skills: ["Jira", "Postman", "Microsoft Office Programs", t("skills.otherSkills.english")]
    }
  ];

  return (
    <div className="skills-container">
      <h2 className="skills-title">{t("skills.title")}</h2>

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
