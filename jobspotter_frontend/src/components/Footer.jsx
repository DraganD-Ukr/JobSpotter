import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className="footer lava-lamp-background py-6 relative">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} JobSpotter. {t("allRightsReserved", { defaultValue: "All Rights Reserved." })}
        </p>
        <ul className="flex gap-4 text-white text-sm">
          <li>
            <Link to="/about" className="hover:underline hover:text-gray-200">
              {t("about", { defaultValue: "About" })}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-gray-200">
              {t("contact", { defaultValue: "Contact" })}
            </Link>
          </li>
          <li>
            <Link to="/privacypolicy" className="hover:underline hover:text-gray-200">
              {t("privacyPolicy", { defaultValue: "Privacy Policy" })}
            </Link>
          </li>
          <li>
            <Link to="/termsofservice" className="hover:underline hover:text-gray-200">
              {t("termsOfService", { defaultValue: "Terms of Service" })}
            </Link>
          </li>
          <li>
            <Link to="/helpandsupport" className="hover:underline hover:text-gray-200">
              {t("helpAndSupport", { defaultValue: "Help & Support" })}
            </Link>
          </li>
        </ul>
      </div>

      {/* Language Switcher in bottom right */}
      <div className="absolute right-4 bottom-4">
        <select
          onChange={handleLanguageChange}
          value={i18n.language}
          className="px-2 py-1 rounded-md border border-gray-300"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </footer>
  );
}
