import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../css/contact.css";
import { useTranslation } from "../hooks/useTranslation";

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-fixed-right">
      <div className="contact-name"></div>

      <div className="contact-icon map-icon" title={t("contact.addressLabel")}>
        <FaMapMarkerAlt />
        <span className="contact-tooltip">{t("contact.address")}</span>
        <span className="contact-label">{t("contact.address")}</span>
      </div>

      <div className="contact-icon email-icon" title={t("contact.emailLabel")}>
        <FaEnvelope />
        <span className="contact-tooltip">{t("contact.email")}</span>
        <span className="contact-label">{t("contact.email")}</span>
      </div>

      <div className="contact-icon phone-icon" title={t("contact.phoneLabel")}>
        <FaPhone />
        <span className="contact-tooltip">{t("contact.phone")}</span>
        <span className="contact-label">{t("contact.phone")}</span>
      </div>

      <div className="contact-icon linkedin-icon" title="LinkedIn">
        <a
          href="https://www.linkedin.com/in/nisanur-eser-0206aa272/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          <span className="contact-tooltip">Nisanureser</span>
          <span className="contact-label">Nisanureser</span>
        </a>
      </div>

      <div className="contact-icon github-icon" title="GitHub">
        <a
          href="https://github.com/Nisanureser"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          <span className="contact-tooltip">Nisanureser</span>
          <span className="contact-label">Nisanureser</span>
        </a>
      </div>
    </div>
  );
}

export default Contact;
