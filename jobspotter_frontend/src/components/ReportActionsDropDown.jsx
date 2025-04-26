import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ReportActionsDropdown({ report, onActionSelect }) {
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);
    onActionSelect(action); // Inform the parent component about the selected action
  };

  return (
    <div className="my-4 xs:my-5 sm:my-6">
      <label className="block mb-1 xs:mb-2 sm:mb-2 font-semibold text-sm xs:text-base sm:text-base">
        Actions
      </label>
      <select
        value={selectedAction}
        onChange={handleActionChange}
        className={`rounded w-full px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 focus:outline-none text-xs xs:text-sm sm:text-sm ${
          useContext(ThemeContext).darkMode
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-300 text-gray-900"
        }`}
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