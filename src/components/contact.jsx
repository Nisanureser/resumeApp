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
      <div className="contact-name"></div>

      <div className="contact-icon map-icon" title="Adres">
        <FaMapMarkerAlt />
        <span className="contact-tooltip">Pendik/İstanbul</span>
        <span className="contact-label">Pendik/İstanbul</span>
      </div>

      <div className="contact-icon email-icon" title="E-posta">
        <FaEnvelope />
        <span className="contact-tooltip">nisa2415@hotmail.com</span>
        <span className="contact-label">nisa2415@hotmail.com</span>
      </div>

      <div className="contact-icon phone-icon" title="Telefon">
        <FaPhone />
        <span className="contact-tooltip">0554 151 17 58</span>
        <span className="contact-label">0554 151 17 58</span>
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
