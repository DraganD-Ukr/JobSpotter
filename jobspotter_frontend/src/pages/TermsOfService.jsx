import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";

export function TermsOfService() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="main-content">
      {/* Hero / Banner */}
      <header
        className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden fade-in"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-100 mb-3 sm:mb-4 md:mb-5 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Understand the rules and guidelines for using JobSpotter to ensure a fair and safe experience.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Intro / Short Message */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          <h2 className={`text-3xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
            Welcome to JobSpotter
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto`}>
            Please read these terms of service carefully before using our platform to ensure a fair and safe experience for all users.
          </p>
        </section>

        {/* Terms of Service Details Section */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4 sm:px-6 md:px-8">
          <div className={`card no-hover-glow ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} shadow-md rounded-lg p-4 sm:p-6 md:p-8`}>
            <h2 className={`text-2xl font-semibold mb-4 sm:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
              1. Acceptance of Terms
            </h2>
            <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} mb-6 sm:mb-8`}>
              By using JobSpotter, you agree to be bound by these terms. If you do not agree, please don’t use our platform.
            </p>

            <h2 className={`text-2xl font-semibold mb-4 sm:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
              2. Services Provided
            </h2>
            <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} mb-6 sm:mb-8`}>
              JobSpotter helps users find job opportunities and connect with employers.
            </p>

            <h2 className={`text-2xl font-semibold mb-4 sm:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
              3. User Responsibilities
            </h2>
            <ul className={`list-disc pl-6 mb-6 sm:mb-8 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
              <li>Provide accurate and truthful information.</li>
              <li>Do not engage in any illegal activities on our platform.</li>
              <li>Respect other users and maintain professionalism.</li>
            </ul>

            <h2 className={`text-2xl font-semibold mb-4 sm:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
              4. Termination
            </h2>
            <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} mb-6 sm:mb-8`}>
              We reserve the right to suspend or terminate access if users violate these terms.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="fade-in py-4 sm:py-6 md:py-8 lg:py-10 lava-lamp-background rounded-2xl relative">
          <div className="relative z-10 max-w-4xl xs:max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-7xl mx-auto text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
            <h3 className={`text-2xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-gray-800"}`}>
              Need Clarification?
            </h3>
            <p className={`mb-3 sm:mb-4 md:mb-5 max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl mx-auto ${darkMode ? "text-gray-100" : "text-gray-600"}`}>
              For more details or if you have any questions about our terms, feel free to reach out to our support team.
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              <a
                href="mailto:support@jobspotter.com"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 lg:py-4 text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}