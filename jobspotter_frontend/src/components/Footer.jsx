import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer lava-lamp-background py-3 xs:py-4 sm:py-6 px-4 xs:px-6 sm:px-8 relative">
      <div className="flex flex-col items-center justify-center space-y-2 xs:space-y-3 sm:space-y-4">
        <p className="text-xs xs:text-sm sm:text-base text-white">
          © {new Date().getFullYear()} JobSpotter. {t("allRightsReserved", { defaultValue: "All Rights Reserved." })}
        </p>
        <ul className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 text-white text-xs xs:text-sm sm:text-base">
          <li>
            <Link to="/about" className="hover:underline hover:text-gray-200 transition-all duration-300">
              {t("about", { defaultValue: "About" })}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-gray-200 transition-all duration-300">
              {t("contact", { defaultValue: "Contact" })}
            </Link>
          </li>
          <li>
            <Link to="/privacypolicy" className="hover:underline hover:text-gray-200 transition-all duration-300">
              {t("privacyPolicy", { defaultValue: "Privacy Policy" })}
            </Link>
          </li>
          <li>
            <Link to="/termsofservice" className="hover:underline hover:text-gray-200 transition-all duration-300">
              {t("termsOfService", { defaultValue: "Terms of Service" })}
            </Link>
          </li>
          <li>
            <Link to="/helpandsupport" className="hover:underline hover:text-gray-200 transition-all duration-300">
              {t("helpAndSupport", { defaultValue: "Help & Support" })}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}