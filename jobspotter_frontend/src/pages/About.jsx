import { FaHandsHelping, FaGlobe, FaUsers, FaBriefcase, FaLightbulb } from "react-icons/fa";

export function About() {
  return (
    <div className="main-content min-h-screen p-4 animate-fadeIn">
      {/* Banner / Hero Section */}
      <div className="mt-16 mb-12 lava-lamp-background object-contain h-25 p-4 rounded-full shadow-2xl flex flex-col items-center justify-center w-2/4 mx-auto transition-all duration-1000">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          About JobSpotter
        </h1>
      </div>

      {/* Intro / Mission */}
      <div className="max-w-3xl mx-auto text-center my-8 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-lime-600 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-900 dark:text-gray-300 leading-relaxed">
          At JobSpotter, we’re dedicated to making local job searches
          simpler, faster, and more rewarding. Whether you’re exploring a new career path
          or looking for a side hustle, we connect you to relevant opportunities 
          in your community helping you get hired and grow your career.
        </p>
      </div>

      {/* Why JobSpotter */}
      <div className="max-w-6xl mx-auto my-12 px-4">
        <h3 className="text-2xl font-semibold text-center mb-8 text-green-600">
          Why Choose JobSpotter?
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaHandsHelping className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Community Focused</h4>
            <p className="text-gray-900 dark:text-gray-300">
              We connect local talent to local jobs, strengthening 
              neighborhoods and fostering real human connections.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaGlobe className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Global Reach</h4>
            <p className="text-gray-900 dark:text-gray-300">
              Even as we emphasize local opportunities, we also 
              bring global job listings so you can aim for the stars.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaUsers className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Inclusive Community</h4>
            <p className="text-gray-900 dark:text-gray-300">
              We welcome job seekers of all backgrounds and experiences, 
              ensuring equitable access to every listing.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaBriefcase className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Diverse Opportunities</h4>
            <p className="text-gray-900 dark:text-gray-300">
              From part-time gigs to full-time careers, we’ve got you 
              covered with a variety of job postings tailored to your skills.
            </p>
          </div>

          {/* Card 5 */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaLightbulb className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Innovative Features</h4>
            <p className="text-gray-900 dark:text-gray-300">
              Our platform is constantly evolving recommendations, location-based 
              matching, and more to make your job search effortless.
            </p>
          </div>
        </div>
      </div>

      {/* CTA / Join Us */}
      <div className="mt-12 mb-20 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
          Ready to join us?
        </h3>
        <p className="text-gray-900 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Whether you’re looking for your first job, a career change, 
          or an extra side hustle, JobSpotter is here to help. Start exploring 
          local listings, apply in one click, and get hired faster.
        </p>
        <a
          href="/register"
          className="inline-block px-6 py-3 text-white bg-green-600 rounded-full text-lg hover:bg-green-700 transition"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
