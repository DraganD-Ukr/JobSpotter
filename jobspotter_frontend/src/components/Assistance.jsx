import React from "react";
import { useNavigate } from "react-router-dom";

export default function Assistance() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-sm xs:text-base sm:text-lg font-bold mb-1 xs:mb-2 sm:mb-2">
        Need Assistance?
      </h1>
      <p className="text-xs xs:text-sm sm:text-sm mb-2 xs:mb-3 sm:mb-3">
        Congratulations on completing your profile. Where would you like to go next?
      </p>
      <div className="flex flex-col gap-1 xs:gap-2 sm:gap-2">
        <button
          onClick={() => navigate("/SearchJobPost")}
          className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm"
        >
          Search for Jobs
        </button>
        <button
          onClick={() => navigate("/MyJobs")}
          className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm"
        >
          View My Job Posts
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-sm"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}