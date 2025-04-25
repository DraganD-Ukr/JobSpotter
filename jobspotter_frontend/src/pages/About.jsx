import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import { FaHandsHelping, FaGlobe, FaUsers, FaBriefcase, FaLightbulb } from "react-icons/fa";

export function About() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="main-content">
      {/* HERO SECTION */}
      <header className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden fade-in">
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">
            About JobSpotter
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-5 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed text-gray-100">
            Discover who we are, our mission, and why JobSpotter is the best platform to find your next opportunity.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Our Mission */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 ${darkMode ? "text-green-400" : "text-green-600"}`}>
            Our Mission
          </h2>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            At JobSpotter, we’re dedicated to making local job searches simpler, faster, and more rewarding. Whether you’re exploring a new career path or looking for a side hustle, we connect you to relevant opportunities in your community helping you get hired and grow your career.
          </p>
        </section>

        {/* Why Choose JobSpotter */}
        <section className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-4 sm:px-6 md:px-8">
          <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center mb-4 sm:mb-5 md:mb-6 ${darkMode ? "text-green-400" : "text-green-600"}`}>
            Why Choose JobSpotter?
          </h3>
          <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Card 1 */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaHandsHelping className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${darkMode ? "text-emerald-400" : "text-emerald-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Community Focused
              </h4>
              <p className={`text-center text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                We connect local talent to local jobs, strengthening neighborhoods and fostering real human connections.
              </p>
            </div>
            {/* Card 2 */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaGlobe className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${darkMode ? "text-sky-400" : "text-sky-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Global Reach
              </h4>
              <p className={`text-center text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Even as we emphasize local opportunities, we also bring global job listings so you can aim for the stars.
              </p>
            </div>
            {/* Card 3 */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaUsers className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${darkMode ? "text-violet-400" : "text-violet-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Inclusive Community
              </h4>
              <p className={`text-center text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                We welcome job seekers of all backgrounds and experiences, ensuring equitable access to every listing.
              </p>
            </div>
            {/* Card 4 */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaBriefcase className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${darkMode ? "text-amber-400" : "text-amber-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Diverse Opportunities
              </h4>
              <p className={`text-center text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                From part-time gigs to full-time careers, we’ve got you covered with a variety of job postings tailored to your skills.
              </p>
            </div>
            {/* Card 5 */}
            <div className={`enhanced-card feature-card ${darkMode ? "border-gray-700 bg-gray-800 hover:border-emerald-500" : "border-gray-200 bg-white hover:border-emerald-500"}`}>
              <FaLightbulb className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${darkMode ? "text-rose-400" : "text-rose-500"} mb-2 sm:mb-3 mx-auto`} />
              <h4 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-1.5 text-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Innovative Features
              </h4>
              <p className={`text-center text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Our platform is constantly evolving with recommendations, location-based matching, and more to make your job search effortless.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="fade-in py-4 sm:py-6 md:py-8 lg:py-10 lava-lamp-background rounded-2xl relative">
          <div className="relative z-10 max-w-4xl xs:max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-7xl mx-auto text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 text-white">
              Ready to Join Us?
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-5 max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl mx-auto text-gray-100">
              Whether you’re looking for your first job, a career change, or an extra side hustle, JobSpotter is here to help. Start exploring local listings, apply in one click, and get hired faster.
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:justify-center xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              <Link
                to="/register"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl bg-emerald-500 text-white rounded-full font-semibold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}