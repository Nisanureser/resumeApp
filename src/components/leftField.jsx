import { useState, useEffect } from "react";
import "../css/leftField.css";
import userImage from "../assets/NisanurVesikalık-min.png";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

function LeftField({ onSelect, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); //  modal state

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (section) => {
    onSelect(section);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  return (
    <>
      {/* Mobil Navbar */}
      {isMobile && (
        <div className="mobile-navbar">
          <img
            src={userImage}
            alt="profile"
            className="mobile-profile"
            onClick={toggleImageModal} //  tıklayınca modal açılır
          />
          <div className="hamburger" onClick={handleToggleMenu}>
            <FaBars />
          </div>
        </div>
      )}

      {/* Masaüstü Sidebar */}
      {!isMobile && (
        <div className="leftField">
          <div className="imageField">
            <img src={userImage} alt="profile" />
          </div>
          <MenuButtons
            activeSection={activeSection}
            handleSelect={handleSelect}
          />
        </div>
      )}

      {/* Mobil Açılır Menü */}
      {isMobile && isOpen && (
        <div className="mobile-menu">
          <MenuButtons
            activeSection={activeSection}
            handleSelect={handleSelect}
          />
        </div>
      )}

      {/* ✅ Resim Modal */}
      {isImageModalOpen && (
        <div className="image-modal" onClick={toggleImageModal}>
          <div className="image-modal-content">
            <img src={userImage} alt="large-profile" />
          </div>
        </div>
      )}
    </>
  );
}

function MenuButtons({ activeSection, handleSelect }) {
  const { t } = useTranslation();

  const sections = [
    { key: "about", label: t("menu.about") },
    { key: "education", label: t("menu.education") },
    { key: "work-experience", label: t("menu.workExperience") },
    { key: "skills", label: t("menu.skills") },
    { key: "references", label: t("menu.references") },
  ];

  return (
    <>
      {sections.map((sec) => (
        <button
          key={sec.key}
          className={activeSection === sec.key ? "active" : ""}
          onClick={() => handleSelect(sec.key)}
        >
          {sec.label}
        </button>
      ))}
    </>
  );
}

export default LeftField;
