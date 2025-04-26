import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { FaEnvelope, FaPhone, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Contact() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="main-content">
      {/* Hero / Banner */}
      <header
        className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden fade-in"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg text-gray-100 mb-3 sm:mb-4 md:mb-5 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Reach out to our team for support, feedback, or just to say hello. We're here to help you succeed.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Intro / Short Message */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          <h2 className={`text-3xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
            Need Assistance?
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-700"} max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto`}>
            Whether you’re curious about our job postings, have feedback on our platform, or simply want to say hi, our team is here to listen.
          </p>
        </section>

        {/* Team Contact Section */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4 sm:px-6 md:px-8">
          <h3 className={`text-2xl font-semibold text-center mb-4 sm:mb-5 md:mb-6 ${darkMode ? "text-lime-400" : "text-lime-600"}`}>
            Meet Our Team
          </h3>
          <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dmytro */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"} p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center text-center`}>
              <FaUserTie className={`text-4xl ${darkMode ? "text-emerald-400" : "text-emerald-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Dmytro
              </h4>
              <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 sm:mb-3`}>
                Back-End Wizard
              </p>
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaEnvelope className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> dmytro@jobspotter.com
                </p>
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaPhone className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> +123 456 7890
                </p>
              </div>
            </div>

            {/* Joart */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"} p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center text-center`}>
              <FaUserTie className={`text-4xl ${darkMode ? "text-emerald-400" : "text-emerald-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Joart
              </h4>
              <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 sm:mb-3`}>
                Full-Stack Extraordinaire
              </p>
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaEnvelope className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> joart@jobspotter.com
                </p>
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaPhone className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> +987 654 3210
                </p>
              </div>
            </div>

            {/* Aloy */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"} p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center text-center`}>
              <FaUserTie className={`text-4xl ${darkMode ? "text-emerald-400" : "text-emerald-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Aloy
              </h4>
              <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 sm:mb-3`}>
                Front-End Visionary
              </p>
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaEnvelope className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> aloy@jobspotter.com
                </p>
                <p className={`flex items-center justify-center gap-1 sm:gap-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  <FaPhone className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} /> +555 123 4567
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="fade-in py-4 sm:py-6 md:py-8 lg:py-10 lava-lamp-background rounded-2xl relative">
          <div className="relative z-10 max-w-4xl xs:max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-7xl mx-auto text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
            <h3 className={`text-2xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-lime-400" : "text-gray-800"}`}>
              We’d Love to Hear From You
            </h3>
            <p className={`mb-3 sm:mb-4 md:mb-5 max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl mx-auto ${darkMode ? "text-gray-100" : "text-gray-600"}`}>
              Have a specific question, feedback, or idea? Drop us a line and let’s connect!
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              <Link
                to="/contact-form"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 lg:py-4 text-lg bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Send Us a Message
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}