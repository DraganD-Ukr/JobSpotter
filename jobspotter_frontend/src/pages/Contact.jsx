import { FaEnvelope, FaPhone, FaUserTie } from "react-icons/fa";

export function Contact() {
  return (
    <div className="main-content min-h-screen p-4 animate-fadeIn">
      {/* Hero / Banner */}
      <div className="mt-16 mb-12 lava-lamp-background object-contain h-25 p-4 rounded-full shadow-2xl flex flex-col items-center justify-center w-2/4 mx-auto transition-all duration-1000">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          Contact Us
        </h1>
      </div>

      {/* Intro / Short Message */}
      <div className="max-w-3xl mx-auto text-center my-8 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-lime-600 mb-4">Need Assistance?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Whether you’re curious about our job postings, have feedback on our platform,
          or simply want to say hi our team is here to listen.
        </p>
      </div>

      {/* Team Contact Section */}
      <div className="max-w-6xl mx-auto my-12 px-4 transition-all duration-1000">
        <h3 className="text-2xl font-semibold text-center mb-8 text-green-600">
          Meet Our Team
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {/* Dmytro */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaUserTie className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Dmytro</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Back-End Wizard
            </p>
            <div className="flex flex-col gap-2 items-center text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FaEnvelope /> dmytro@jobspotter.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +123 456 7890
              </p>
            </div>
          </div>

          {/* Aloy */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaUserTie className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Aloy</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Front-End Visionary
            </p>
            <div className="flex flex-col gap-2 items-center text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FaEnvelope /> aloy@jobspotter.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +987 654 3210
              </p>
            </div>
          </div>

          {/* Joart */}
          <div className="card border border-gray-300 hover:shadow-md hover:border-green-500 transition p-6 rounded-lg flex flex-col items-center text-center">
            <FaUserTie className="text-4xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Joart</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Full-Stack Extraordinaire
            </p>
            <div className="flex flex-col gap-2 items-center text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FaEnvelope /> joart@jobspotter.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +555 123 4567
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 mb-20 text-center transition-all duration-1000">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-lime-600 mb-4">
          We’d Love to Hear From You
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Have a specific question, feedback, or idea? Drop us a line!
        </p>
        <a
          href="/contact-form" 
          className="inline-block px-6 py-3 text-white bg-green-600 rounded-full text-lg hover:bg-green-700 transition"
        >
          Send Us a Message
        </a>
      </div>
    </div>
  );
}
