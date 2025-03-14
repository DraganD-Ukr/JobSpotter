import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

function ReportActionsDropdown({ report, onActionSelect }) {
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);
    onActionSelect(action); // Inform the parent component about the selected action
  };

  console.log("ReportDropDown report:" + JSON.stringify(report));

  return (
    <div className="my-6">
      <label className="block mb-2 font-semibold">Actions</label>
      <select
        value={selectedAction}
        onChange={handleActionChange}
        className={`rounded w-full px-3 py-2 focus:outline-none ${
          useContext(ThemeContext).darkMode
            ? "bg-gray-900 border border-gray-700 text-white"
            : "bg-white border border-gray-300"
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