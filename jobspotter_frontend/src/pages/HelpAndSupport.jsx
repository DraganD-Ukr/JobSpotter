import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelope, FaPhone } from "react-icons/fa";

export function HelpAndSupport() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: (
        <>
          Creating an account is easy—simply click on the{" "}
          <a href="/register" className="text-green-600 underline">
            Register
          </a>{" "}
          button at the top and fill out the registration form with your details.
        </>
      )
    },
    {
      question: "How can I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email."
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to our support team by emailing us at support@jobspotter.com or by calling +123 456 7890 during business hours."
    }
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <div className="main-content min-h-screen p-4 animate-fadeIn">
      {/* Hero/Banner Section */}
      <div className="mt-16 mb-12 lava-lamp-background p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-2/4 mx-auto transition-all duration-1000">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          Help & Support
        </h1>
        <p className="text-xl text-white opacity-90 max-w-lg text-center drop-shadow-md">
          We're here to help you every step of the way.
        </p>
      </div>

      {/* Support Overview */}
      <div className="max-w-3xl mx-auto text-center my-8 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-lime-600 mb-4">How Can We Help?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Whether you have questions about our platform, need help with your account, or simply want to share your feedback, our support team is here to assist you.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto my-12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-green-600">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-2">
                  <FaQuestionCircle className="text-green-500" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {openFAQ === index ? "-" : "+"}
                </span>
              </button>
              {openFAQ === index && (
                <div className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="max-w-3xl mx-auto text-center my-12 transition-all duration-1000">
        <h2 className="text-3xl font-bold text-lime-600 mb-4">Contact Our Support Team</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          If you need further assistance or have any concerns, please feel free to reach out.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-4xl text-green-500 mb-2" />
            <p className="text-lg text-gray-800 dark:text-gray-200">support@jobspotter.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-4xl text-green-500 mb-2" />
            <p className="text-lg text-gray-800 dark:text-gray-200">+123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
