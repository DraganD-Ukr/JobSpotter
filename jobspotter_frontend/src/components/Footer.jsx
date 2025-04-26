import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer lava-lamp-background py-3 xs:py-4 sm:py-6 px-4 xs:px-6 sm:px-8 relative overflow-hidden">
      {/* Center block: copyright + nav links */}
      <div className="flex flex-col items-center justify-center space-y-2 xs:space-y-3 sm:space-y-4">
        <p className="text-xs xs:text-sm sm:text-base text-white text-center">
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

      {/* Social icons: stick to bottom‑right of the footer */}
      <div className="absolute bottom-3 right-3 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 flex gap-4 xs:gap-5 sm:gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61575856614006"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 transition-all duration-300"
          aria-label={t("facebook", { defaultValue: "Facebook" })}
        >
          <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.022 4.388 11.008 10.125 11.854v-8.385H7.078v-3.469h3.047V9.692c0-3.008 1.792-4.669 4.532-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.516c-1.494 0-1.956.925-1.956 1.875v2.254h3.328l-.532 3.469h-2.796v8.385C19.612 23.081 24 18.095 24 12.073z" />
          </svg>
        </a>

        {/* Instagram */}
        <a  
            href="https://www.instagram.com/jobspottereu/"
            target="_blank"
            className="text-white hover:text-gray-200 transition-all duration-300"
            aria-label={t("instagram", { defaultValue: "Instagram" })}
          >
            <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.735 0 8.332.013 7.052.072 5.766.132 4.326.41 3.097 1.64 1.867 2.869 1.59 4.31 1.53 5.596.013 8.332 0 8.735 0 12s.013 3.668.072 4.948c.06 1.286.338 2.726 1.567 3.955 1.23 1.23 2.669 1.507 3.955 1.567C8.332 23.987 8.735 24 12 24s3.668-.013 4.948-.072c1.286-.06 2.726-.338 3.955-1.567 1.23-1.23 1.507-2.669 1.567-3.955.058-1.28.072-1.683.072-4.948s-.013-3.668-.072-4.948c-.06-1.286-.338-2.726-1.567-3.955C20.674.41 19.234.132 17.948.072 16.668.013 16.265 0 12 0z" />
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>

        {/* Twitter / X */}
        <a
          href="https://x.com/SpotterJobEu"
          target="_blank"
          className="text-white hover:text-gray-200 transition-all duration-300"
          aria-label={t("twitter", { defaultValue: "Twitter" })}
        >
          <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L16.083 19.77z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/job-spotter-9b7536362/"
          target="_blank"
          className="text-white hover:text-gray-200 transition-all duration-300"
          aria-label={t("linkedin", { defaultValue: "LinkedIn" })}
        >
          <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.968v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714V9.561z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
