import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css"; // Move your CSS styles here

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isActive, setIsActive] = useState(i18n.language === "fa");

  const toggleLanguage = () => {
    const newLanguage = isActive ? "en" : "fa";
    i18n.changeLanguage(newLanguage);
    setIsActive(!isActive);
  };

  return (
    <div
      className={`toggle-container ${isActive ? "active" : ""}`}
      onClick={toggleLanguage}
    >
      <div className='toggle-circle'></div>
    </div>
  );
};

export default LanguageSwitcher;
