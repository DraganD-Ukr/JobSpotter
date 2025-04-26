import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";

export function PrivacyPolicy() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="main-content">
      {/* Hero / Banner */}
      <header
        className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden fade-in"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-100 mb-3 sm:mb-4 md:mb-5 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Learn how we protect your data and ensure your privacy on JobSpotter.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Intro / Short Message */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          <h2 className={`text-3xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
            Our Privacy Commitment
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto`}>
            Your privacy is important to us. This privacy policy explains what data we collect, how we use it, and the measures we take to protect your information.
          </p>
        </section>

        {/* Privacy Policy Details Section */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4 sm:px-6 md:px-8">
          <div className={`card no-hover-glow ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} shadow-md rounded-lg p-4 sm:p-6 md:p-8`}>
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <div>
                <h3 className={`text-2xl font-semibold mb-2 sm:mb-3 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
                  1. Data Collection
                </h3>
                <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  We collect personal information such as your name, email address, and other details provided during registration. We also gather usage data like pages visited and time spent on the platform to improve our service.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-2 sm:mb-3 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
                  2. Use of Data
                </h3>
                <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  Your data is used to provide and maintain our services, enhance user experience, and send you job-related updates and notifications.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-2 sm:mb-3 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
                  3. Data Sharing
                </h3>
                <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  We do not sell or give away your data. It is only shared with trusted third parties when necessary and always with your consent.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-2 sm:mb-3 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
                  4. Your Rights
                </h3>
                <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  You have the right to access, correct, or delete your personal data at any time. Contact us to exercise your rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="fade-in py-4 sm:py-6 md:py-8 lg:py-10 lava-lamp-background rounded-2xl relative">
          <div className="relative z-10 max-w-4xl xs:max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-7xl mx-auto text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
            <h3 className={`text-2xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-gray-800"}`}>
              Have Privacy Questions?
            </h3>
            <p className={`mb-3 sm:mb-4 md:mb-5 max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl mx-auto ${darkMode ? "text-gray-100" : "text-gray-600"}`}>
              For questions about our privacy practices, please reach out to us. We’re here to help!
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              <a
                href="mailto:privacy@jobspotter.com"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 lg:py-4 text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}