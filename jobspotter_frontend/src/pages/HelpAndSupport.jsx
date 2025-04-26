import React, { useState, useContext } from "react";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaHandsHelping } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";

export default function HelpAndSupport() {
  const { darkMode } = useContext(ThemeContext);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: (
        <>
          Creating an account is easy—simply click on the{" "}
          <a href="/register" className="text-green-600 dark:text-green-400 underline hover:text-green-700">
            Register
          </a>{" "}
          button and fill out the form.
        </>
      ),
    },
    {
      question: "How can I reset my password?",
      answer:
        "Click the 'Forgot Password' link on the login page and follow the email instructions.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Email us at support@jobspotter.com or call +123 456 7890 during business hours.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      {/* Hero Section */}
      <header
        className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] flex items-center justify-center lava-lamp-background rounded-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden fade-in"
        role="banner"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <h1
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight"
            id="help-support-heading"
          >
            Help & Support
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-100 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            We're here to assist with your questions, account issues, or feedback.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="@container max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* How Can We Help? Section */}
        <section
          className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14"
          role="region"
          aria-labelledby="how-can-we-help-heading"
        >
          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            } mb-3 sm:mb-4 md:mb-5 text-center`}
            id="how-can-we-help-heading"
          >
            How Can We Help?
          </h2>
          <div
            className={`enhanced-card feature-card ${
              darkMode
                ? "border-gray-700 bg-gray-800 hover:border-emerald-500"
                : "border-gray-200 bg-white hover:border-emerald-500"
            } p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center text-center`}
          >
            <FaHandsHelping
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                darkMode ? "text-green-400" : "text-green-500"
              } mb-2 sm:mb-3 md:mb-4`}
            />
            <p
              className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                darkMode ? "text-gray-400" : "text-gray-700"
              } max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto leading-relaxed`}
            >
              Whether you have questions about our platform, need help with your account, or want to share feedback, our support team is ready to assist.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="fade-in mb-8 sm:mb-10 md:mb-12 lg:mb-14"
          role="region"
          aria-labelledby="faq-heading"
        >
          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center mb-4 sm:mb-5 md:mb-6 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
            id="faq-heading"
          >
            Frequently Asked Questions
          </h2>

          {/* Search Bar */}
          <div
            className="sticky top-4 z-10 bg-transparent p-4 mb-4 sm:mb-6 md:mb-8 fade-in"
            role="search"
            aria-label="FAQ search"
          >
            <div className="relative max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 sm:px-5 py-2 sm:py-3 border rounded-lg text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-4 sm:w-5 md:w-6 lg:w-7 xl:w-8 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <article
                  key={index}
                  className={`enhanced-card feature-card ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 hover:border-emerald-500"
                      : "border-gray-200 bg-white hover:border-emerald-500"
                  } rounded-lg`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full flex justify-between items-center px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 ${
                      darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    } transition-all duration-300`}
                    aria-expanded={openFAQ === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <FaQuestionCircle
                        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                          darkMode ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFAQ === index && (
                    <div
                      className={`px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 ${
                        darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-700"
                      } text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-all duration-300`}
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </article>
              ))
            ) : (
              <p
                className={`text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } fade-in`}
              >
                No FAQs found matching your search.
              </p>
            )}
          </div>
        </section>

        {/* Contact Support Section */}
        <section
          className="fade-in py-4 sm:py-6 md:py-8 lg:py-10 lava-lamp-background rounded-2xl relative"
          role="region"
          aria-labelledby="contact-support-heading"
        >
          <div className="relative z-10 max-w-4xl xs:max-w-5xl sm:max-w-6xl md:max-w-7xl mx-auto text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
            <h2
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 text-white`}
              id="contact-support-heading"
            >
              Contact Our Support Team
            </h2>
            <p
              className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-5 max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto text-gray-100`}
            >
              Reach out for further assistance or to share your feedback.
            </p>
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <address
                className={`enhanced-card feature-card flex-shrink-0 w-auto ${
                  darkMode
                    ? "border-gray-700 bg-gray-800 hover:border-emerald-500"
                    : "border-gray-200 bg-white hover:border-emerald-500"
                } p-4 sm:p-6 rounded-lg flex flex-col items-center text-center not-italic`}
                aria-label="Email contact"
              >
                <FaEnvelope
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                    darkMode ? "text-green-400" : "text-green-500"
                  } mb-2 sm:mb-3`}
                />
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  support@jobspotter.com
                </p>
              </address>
              <address
                className={`enhanced-card feature-card flex-shrink-0 w-auto ${
                  darkMode
                    ? "border-gray-700 bg-gray-800 hover:border-emerald-500"
                    : "border-gray-200 bg-white hover:border-emerald-500"
                } p-4 sm:p-6 rounded-lg flex flex-col items-center text-center not-italic`}
                aria-label="Phone contact"
              >
                <FaPhone
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                    darkMode ? "text-green-400" : "text-green-500"
                  } mb-2 sm:mb-3`}
                />
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  +123 456 7890
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}