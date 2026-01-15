import "./App.css";
import LeftField from "./components/leftField";
import About from "./components/about";
import Education from "./components/education";
import WorkExperience from "./components/workExperince";
import Contact from "./components/contact";
import Skills from "./components/skills";
import References from "./components/references";
import LanguageToggle from "./components/LanguageToggle";
import Chatbot from "./components/Chatbot";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "education",
        "work-experience",
        "skills",
        "references",
      ];
      let maxVisibleSection = null;
      let maxVisibleArea = 0;
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            maxVisibleSection = id;
          }
        }
      });

      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    // Add passive option to optimize scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }

    // Mevcut URL'yi güncelle
    // window.location.hash = id;
    // setActiveSection(id);
  };

  return (
    <LanguageProvider>
      <div className={`app-container ${isChatOpen ? "chat-open" : ""}`}>
        <div className="top-controls">
          <div className="desktop-language-toggle">
            <LanguageToggle />
          </div>
          {!isChatOpen && (
            <button
              className="chatbot-toggle-button"
              onClick={() => setIsChatOpen(true)}
              aria-label="Open chatbot"
            >
              <FaComments />
            </button>
          )}
        </div>
        <LeftField activeSection={activeSection} onSelect={scrollToSection} />
        <div className="main-content">
          <section id="about">
            <About />
          </section>
          <section id="education">
            <Education />
          </section>
          <section id="work-experience">
            <WorkExperience />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="references">
            <References />
          </section>
        </div>
        <Chatbot isOpen={isChatOpen} onToggle={setIsChatOpen} />
        <Contact />
      </div>
    </LanguageProvider>
  );
}

export default App;
