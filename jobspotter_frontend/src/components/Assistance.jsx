import React from "react";

export default function Assistance() {
  return (
    <div className="p-4 xs:p-6 sm:p-8">
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">
        Need Assistance?
      </h1>
      <p className="text-sm xs:text-base sm:text-lg mb-4 xs:mb-5 sm:mb-6">
        Congratulations on completing your profile, Where would you like to go next?
      </p>

      <div className="mt-2 xs:mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4">
        <button
          onClick={() => window.location.href = "/searchjobpost"}
          className="w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-base"
        >
          Search for Jobs
        </button>
        <button
          onClick={() => window.location.href = "/myjobposts"}
          className="w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-base"
        >
          View My Job Posts
        </button>
        <button
          onClick={() => window.location.href = "/"}
          className="w-full sm:w-auto px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-xs xs:text-sm sm:text-base"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}