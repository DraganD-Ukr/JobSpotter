import React, { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ReportActionsDropdown({ report, onActionSelect }) {
  const { darkMode } = useContext(ThemeContext);
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);
    onActionSelect(action);
  };

  return (
    <div className="my-4 sm:my-6 md:my-8">
      <label className="block mb-2 font-semibold text-sm sm:text-base md:text-lg">
        Actions
      </label>
      <select
        value={selectedAction}
        onChange={handleActionChange}
        className={`
          rounded w-full sm:w-3/4 md:w-1/2 lg:w-2/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none
          ${darkMode
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-300 text-black"
          }
        `}
      >
        <option value="">Select Action</option>
        {report?.reportedJobPostId && (
          <>
            <option value="editJobPost">Edit job post details</option>
            <option value="deleteJobPost">Delete job post</option>
          </>
        )}
        {report?.reportedApplicantId && (
          <>
            <option value="editApplicant">Edit applicant info</option>
            <option value="deleteApplicant">Delete applicant</option>
          </>
        )}
        {report?.reportedReviewId && (
          <>
            <option value="editReview">Edit review</option>
            <option value="removeReview">Remove review</option>
          </>
        )}
      </select>
    </div>
  );
}

export default ReportActionsDropdown;