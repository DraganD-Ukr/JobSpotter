import React, { useState, useContext } from "react";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
import ProfilePicture from './ProfilePicture';

const ApplicantItem = React.memo(({
  applicant,
  handleApplicantAction,
  isJobOpen,
  isJobFinished,
  applicantCounts,
  jobMaxApplicants,
  jobPostId,
  handleReviewApplicant
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [localStatus, setLocalStatus] = useState(applicant.status);

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
      handleApplicantAction(applicant.applicantId, "rejected");
      setLocalStatus('REJECTED');
    }
  };

  const onReview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleReviewApplicant(applicant);
  };

  return (
    <div key={applicant.applicantId} className="p-2 xs:p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
      <Link
        to={`/users/${applicant.userId}`}
        className={`flex flex-col sm:flex-row items-start sm:items-center text-xs xs:text-sm sm:text-sm p-2 xs:p-3 sm:p-3 rounded-lg hover:shadow-lg hover:scale-105 duration-300 ${darkMode ? 'text-gray-300 border-gray-500 border' : 'text-gray-700 border-gray-300'}`}
        style={{ display: 'flex', textDecoration: 'none' }}
      >
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm xs:text-base sm:text-base">
          {applicant.name || `Applicant ID ${applicant.applicantId}`}
        </h4>

        <div className="mr-0 sm:mr-4 xs:mr-5 mt-2 sm:mt-0">
          <ProfilePicture userId={applicant.userId} darkMode={darkMode} />
        </div>

        <div className="flex-1 mt-2 sm:mt-0">
          {applicant.message && applicant.message.trim() !== "" && (
            <p className={`font-mono mt-1 xs:mt-2 sm:mt-2 text-xs xs:text-sm sm:text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <span className={`font-extralight ${darkMode ? 'text-neutral-300' : 'text-neutral-500'}`}>
                Message:{" "}
              </span>
              {applicant.message}
            </p>
          )}
          {applicant.email && (
            <p className="text-gray-600 dark:text-gray-400 text-xs xs:text-sm sm:text-sm mb-1 xs:mb-2 sm:mb-2">
              Email: {applicant.email}
            </p>
          )}
          <p className={`text-xs xs:text-sm sm:text-sm mb-1 xs:mb-2 sm:mb-2 font-medium ${localStatus === 'ACCEPTED' ? 'text-green-500' :
            localStatus === 'REJECTED' ? 'text-red-500' :
              'text-gray-500 dark:text-gray-300'}`}>
            Status: {localStatus}
          </p>
        </div>

        <div className="flex justify-end gap-2 xs:gap-3 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
          {isJobOpen && (
            <>
              <button
                id={`confirm-applicant-popup-${applicant.applicantId}`}
                onClick={onApprove}
                className={`p-1 xs:p-2 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${localStatus === 'ACCEPTED'
                    ? darkMode ? 'bg-green-700' : 'bg-green-600'
                    : darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-600' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                  }`}
                aria-label="accepted"
                disabled={!isJobOpen || localStatus === 'ACCEPTED' || applicantCounts.approved >= jobMaxApplicants}
              >
                <FaCheckCircle className="text-white h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
              </button>
              <button
                id={`reject-applicant-popup-${applicant.applicantId}`}
                onClick={onReject}
                className={`p-1 xs:p-2 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${localStatus === 'REJECTED'
                    ? 'bg-red-600'
                    : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                  }`}
                aria-label="Reject"
                disabled={!isJobOpen || localStatus === 'REJECTED'}
              >
                <FaTimesCircle className="text-white h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
              </button>
            </>
          )}
          {isJobFinished && (localStatus === 'ACCEPTED' || localStatus === 'APPROVED') && (
            <button
              id={`review-applicant-popup-${applicant.applicantId}`}
              onClick={onReview}
              className={`p-1 xs:p-2 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500`}
              aria-label="Review"
            >
              <FaStar className="text-white h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
            </button>
          )}
          <Link 
            to={`/userreportformpopup?jobId=${jobPostId}&reportedUserId=${applicant.userId}&applicantId=${applicant.applicantId}`}
            className="text-red-500 hover:text-red-700"
            title="Report this job post"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimesCircle className="h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
          </Link>
        </div>
      </Link>
    </div>
  );
});

export default ApplicantItem;