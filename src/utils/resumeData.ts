import educationData from "../data/educationData.json";
import workExperienceData from "../data/workExperienceData.json";
import skillsData from "../data/skillsData.json";
import enTranslations from "../translations/en.json";
import trTranslations from "../translations/tr.json";

export const getResumeDataAsText = (language: "en" | "tr"): string => {
  const translations = language === "tr" ? trTranslations : enTranslations;
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
  const about = {
    name: t("about.name"),
    title: t("about.title"),
    description: t("about.description"),
  };

  const education = educationData.map((edu) => ({
    school: edu.school,
    degree: edu.degree,
    extra: edu.extra,
    date: edu.date,
  }));

  const workExperience = workExperienceData.map((work) => ({
    position: work.position,
    company: work.company,
    date: work.date,
    description: work.description,
  }));

  const skills = skillsData.flatMap((group) =>
    group.skills.map((skill) => skill)
  );

  return `CANDIDATE INFORMATION:

ABOUT:
Name: ${about.name}
Title: ${about.title}
Description: ${about.description}

EDUCATION:
${education
  .map(
    (edu) =>
      `- ${edu.degree} at ${edu.school} (${edu.date})\n  ${edu.extra || ""}`
  )
  .join("\n")}

WORK EXPERIENCE:
${workExperience
  .map(
    (work) =>
      `- ${work.position} at ${work.company} (${work.date})\n  ${work.description.join("\n  ")}`
  )
  .join("\n\n")}

SKILLS:
${skills.join(", ")}`;
};
