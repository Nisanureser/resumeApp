import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../css/contact.css";

function Contact() {
  return (
    <div className="contact-fixed-right">
      <div className="contact-icon map-icon" title="Adres">
        <FaMapMarkerAlt />
        <span className="contact-tooltip">Pendik/İstanbul</span>
      </div>

      <div className="contact-icon email-icon" title="E-posta">
        <FaEnvelope />
        <span className="contact-tooltip">nisa2415@hotmail.com</span>
      </div>

      <div className="contact-icon phone-icon" title="Telefon">
        <FaPhone />
        <span className="contact-tooltip">0554 151 17 58</span>
      </div>

      <a
        className="contact-icon linkedin-icon"
        href="https://www.linkedin.com/in/nisanur-eser-0206aa272/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <FaLinkedin />
      </a>

      <a
        className="contact-icon github-icon"
        href="https://github.com/Nisanureser"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
      >
        <FaGithub />
      </a>
    </div>
  );
}

export default Contact;
