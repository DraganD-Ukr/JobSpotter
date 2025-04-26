import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";

export default function Assistance() {
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);

  // Define a pool of possible suggestions with actions and styles
  const suggestionsPool = [
    {
      text: "Search for your next job opportunity",
      action: () => navigate("/SearchJobPost"),
      color: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
    {
      text: "View your job posts and applications",
      action: () => navigate("/MyJobs"),
      color: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    },
    {
      text: "Go to the home page",
      action: () => navigate("/"),
      color: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
    },
    {
      text: "Create a new job post to hire talent",
      action: () => navigate("/CreateJobPost"),
      color: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    },
    {
      text: "Toggle dark mode for a better experience",
      action: toggleTheme,
      color: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    },
    {
      text: "Update your profile details",
      action: () => navigate("/Profile"),
      color: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
    },
    {
      text: "Contact our support team",
      action: () => navigate("/Contact"),
      color: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500",
    },
    {
      text: "Check your job application history",
      action: () => navigate("/JobPostHistory"),
      color: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500",
    },
    {
      text: "Manage your addresses",
      action: () => navigate("/Address"),
      color: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
    },
    {
      text: "Review our privacy policy",
      action: () => navigate("/PrivacyPolicy"),
      color: "bg-lime-600 hover:bg-lime-700 focus:ring-lime-500",
    },
  ];

  // State for displayed suggestions and current index
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize displayed suggestions
  useEffect(() => {
    const initialSuggestions = suggestionsPool.slice(0, 5);
    setDisplayedSuggestions(initialSuggestions);
  }, []);

  // Rotate suggestions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 5) % suggestionsPool.length;
        const newSuggestions = [];
        for (let i = 0; i < 5; i++) {
          const suggestionIndex = (nextIndex + i) % suggestionsPool.length;
          newSuggestions.push(suggestionsPool[suggestionIndex]);
        }
        setDisplayedSuggestions(newSuggestions);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [suggestionsPool.length]);

  return (
    <div className="p-4 xs:p-6 sm:p-8">
      <h1 className="text-sm xs:text-base sm:text-lg font-bold mb-1 xs:mb-2 sm:mb-2">
        Need Assistance?
      </h1>
      <p className="text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-3">
        Here are some things you might want to do next:
      </p>
      <div className="flex flex-col gap-1 xs:gap-2 sm:gap-2">
        {displayedSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={suggestion.action}
            className={`w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-1.5 ${suggestion.color} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm transition-all duration-300 hover:scale-105`}
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}