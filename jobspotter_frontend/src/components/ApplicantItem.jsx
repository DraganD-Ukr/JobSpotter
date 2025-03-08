import React, { useState, useContext } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";

import ProfilePicture from './ProfilePicture';

const ApplicantItem = React.memo(({
  applicant,
  handleApplicantAction,
  isJobOpen,
  applicantCounts,
  jobMaxApplicants
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [localStatus, setLocalStatus] = useState(applicant.status);

  // Modified functions: Added event parameter to prevent navigation when buttons are clicked.
  const onApprove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (applicantCounts.approved >= jobMaxApplicants && localStatus !== 'ACCEPTED') {
      return;
    }
    if (isJobOpen && localStatus !== 'ACCEPTED') {
      handleApplicantAction(applicant.applicantId, "accepted");
      setLocalStatus('ACCEPTED');
    }
  };

  const onReject = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isJobOpen && localStatus !== 'REJECTED') {
      handleApplicantAction(applicant.applicantId, "reject");
      setLocalStatus('REJECTED');
    }
  };

  return (
    <div key={applicant.applicantId} className="p-4 border-b border-gray-200 dark:border-gray-700">
      <Link
        to={`/users/${applicant.userId}`}
        className={`flex items-center text-sm p-3 rounded-lg hover:shadow-lg hover:scale-105 duration-300 ${darkMode ? 'text-gray-300 border-gray-500 border' : 'text-gray-700 border-gray-300'}`}
        style={{ display: 'flex', textDecoration: 'none' }}
      >
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
          {applicant.name || `Applicant ID ${applicant.applicantId}`}
        </h4>

        <div className="mr-6">
          <ProfilePicture userId={applicant.userId} darkMode={darkMode} />
        </div>

        {applicant.message && applicant.message.trim() !== "" && (
          <p className={`font-mono mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            <span className={`font-extralight ${darkMode ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Message:{" "}
            </span>
            {applicant.message}
          </p>
        )}
        {applicant.email && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Email: {applicant.email}
          </p>
        )}
        <p className={`text-sm mb-2 font-medium ${localStatus === 'ACCEPTED' ? 'text-green-500' :
          localStatus === 'REJECTED' ? 'text-red-500' :
            'text-gray-500 dark:text-gray-300'}`}>
          Status: {localStatus}
        </p>
        <div className="mt-3 flex justify-end gap-4">
          {isJobOpen && (
            <>
              <button
                id={`confirm-applicant-popup-${applicant.applicantId}`}
                onClick={onApprove}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${localStatus === 'ACCEPTED'
                    ? darkMode ? 'bg-green-700' : 'bg-green-600'
                    : darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-600' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                  }`}
                aria-label="accepted"
                disabled={!isJobOpen || localStatus === 'ACCEPTED' || applicantCounts.approved >= jobMaxApplicants}
              >
                <FaCheckCircle className="text-white h-5 w-5" />
              </button>
              <button
                id={`reject-applicant-popup-${applicant.applicantId}`}
                onClick={onReject}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${localStatus === 'REJECTED'
                    ? 'bg-red-600'
                    : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                  }`}
                aria-label="Reject"
                disabled={!isJobOpen || localStatus === 'REJECTED'}
              >
                <FaTimesCircle className="text-white h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </Link>
    </div>
  );
});

export default ApplicantItem;
