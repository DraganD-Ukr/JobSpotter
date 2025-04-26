import React from 'react';
import { FaExclamationTriangle, FaUserCheck, FaUserTimes, FaUserClock } from 'react-icons/fa';
import { animated } from 'react-spring';
import ApplicantItem from "./ApplicantItem";
import { ThemeContext } from "../components/ThemeContext";
import { useContext } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ApplicantsManagementPopup = React.memo(({
    isApplicantsPopupVisible,
    applicantCounts,
    errorMessage,
    errorBoxAnimation,
    pendingApplicants,
    approvedApplicants,
    rejectedApplicants,
    currentPendingApplicants,
    currentApprovedApplicants,
    currentRejectedApplicants,
    handleApplicantAction,
    handleSaveChanges,
    handleCloseApplicantsPopup,
    setCurrentPage,
    currentPage,
    totalPages,
    job, 
    isJobOpen,
    isJobFinished,
    jobPostId,
    handleReviewApplicant
}) => {
    const { darkMode } = useContext(ThemeContext);
    if (!isApplicantsPopupVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-2 xs:p-3 sm:p-4" 
             aria-labelledby="applicant-popup-title" role="dialog" aria-modal="true">
            <div className={`
                mt-20 xs:mt-24 sm:mt-30 rounded-lg shadow-xl overflow-hidden 
                w-full max-w-[90%] xs:max-w-[85%] sm:max-w-3xl 
                ${darkMode ? "bg-gray-900 text-white border border-gray-700" : "bg-gray-50 text-gray-900 border border-gray-200"}
            `}>
                {/* Header */}
                <div className={`
                    px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 
                    ${darkMode ? "bg-gray-800 border-b border-gray-700" : "bg-gray-100 border-b border-gray-200"}
                `}>
                    <h3 className="text-base xs:text-lg sm:text-lg font-semibold flex flex-col sm:flex-row items-start sm:items-center justify-between" id="applicant-popup-title">
                        {isJobFinished ? "Review Applicants" : "Manage Applicants"}
                        <span className={`text-xs xs:text-sm sm:text-sm font-normal mt-2 sm:mt-0 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                            <FaUserCheck className="inline-block mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" /> 
                            Approved: {applicantCounts.approved} / {job?.maxApplicants}
                            <FaUserTimes className="inline-block ml-1 xs:ml-2 mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" /> 
                            Rejected: {applicantCounts.rejected}
                            <FaUserClock className="inline-block ml-1 xs:ml-2 mr-1 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" /> 
                            Pending: {applicantCounts.pending}
                        </span>
                    </h3>
                </div>

                {/* Body */}
                <div className="p-4 xs:p-5 sm:p-6">
                    {errorMessage && (
                        <animated.div
                            style={errorBoxAnimation}
                            className="mb-2 xs:mb-3 sm:mb-4 p-2 xs:p-3 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
                            role="alert"
                        >
                            <FaExclamationTriangle className="mr-1 xs:mr-2 h-4 xs:h-5 sm:h-5 w-4 xs:w-5 sm:w-5" />
                            <div>
                                <h3 className="font-bold text-xs xs:text-sm sm:text-sm">Error</h3>
                                <p className="text-xs xs:text-sm sm:text-sm">{errorMessage}</p>
                            </div>
                        </animated.div>
                    )}

                    {/* Approved Applicants (for finished jobs) */}
                    {isJobFinished && approvedApplicants.length > 0 && (
                        <div className="mb-4 xs:mb-5 sm:mb-6">
                            <h4 className="text-sm xs:text-md sm:text-md font-semibold mb-2 xs:mb-3 sm:mb-3 text-green-500 dark:text-green-400">Approved Applicants</h4>
                            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                                {currentApprovedApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        isJobFinished={isJobFinished}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants}
                                        jobPostId={jobPostId}
                                        handleReviewApplicant={handleReviewApplicant}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pending Applicants (for open jobs) */}
                    {!isJobFinished && pendingApplicants.length > 0 && (
                        <div className="mb-4 xs:mb-5 sm:mb-6">
                            <h4 className={`text-sm xs:text-md sm:text-md font-semibold mb-2 xs:mb-3 sm:mb-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Pending Applicants</h4>
                            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                                {currentPendingApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        isJobFinished={isJobFinished}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants}
                                        jobPostId={jobPostId}
                                        handleReviewApplicant={handleReviewApplicant}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Approved Applicants (for open jobs) */}
                    {!isJobFinished && approvedApplicants.length > 0 && (
                        <div className="mb-4 xs:mb-5 sm:mb-6">
                            <h4 className="text-sm xs:text-md sm:text-md font-semibold mb-2 xs:mb-3 sm:mb-3 text-green-500 dark:text-green-400">Approved Applicants</h4>
                            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                                {currentApprovedApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        isJobFinished={isJobFinished}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants}
                                        jobPostId={jobPostId}
                                        handleReviewApplicant={handleReviewApplicant}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Applicants (for open jobs) */}
                    {!isJobFinished && rejectedApplicants.length > 0 && (
                        <div>
                            <h4 className="text-sm xs:text-md sm:text-md font-semibold mb-2 xs:mb-3 sm:mb-3 text-red-500 dark:text-red-400">Rejected Applicants</h4>
                            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                                {currentRejectedApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        isJobFinished={isJobFinished}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants}
                                        jobPostId={jobPostId}
                                        handleReviewApplicant={handleReviewApplicant}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Applicants Message */}
                    {(!pendingApplicants.length && !approvedApplicants.length && !rejectedApplicants.length) && (
                        <p className={`text-xs xs:text-sm sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            No applicants found for this job.
                        </p>
                    )}

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 xs:mt-5 sm:mt-6">
                        <nav className="inline-flex rounded-md shadow-sm gap-1 xs:gap-2 sm:gap-2" aria-label="Applicants pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center justify-center p-1 xs:p-2 sm:p-2 rounded-full border text-xs xs:text-sm sm:text-sm font-medium ${darkMode 
                                    ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" 
                                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"} 
                                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="sr-only">Previous</span>
                                <AiOutlineLeft className="h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" aria-hidden="true" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    id={currentPage === pageNumber ? 'active-page-button' : `page-button-${pageNumber}`}
                                    className={`relative inline-flex items-center justify-center rounded-full w-6 xs:w-8 sm:w-8 h-6 xs:h-8 sm:h-8 text-xs xs:text-sm sm:text-sm font-medium border ${darkMode 
                                        ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" 
                                        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"} 
                                        ${currentPage === pageNumber ? (darkMode 
                                            ? "z-10 bg-blue-900 border-blue-700 text-white" 
                                            : "z-10 bg-blue-50 border-blue-700 text-blue-800") : ""} focus:outline-none`}
                                    aria-current={currentPage === pageNumber ? "page" : undefined}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className={`relative inline-flex items-center justify-center p-1 xs:p-2 sm:p-2 rounded-full border text-xs xs:text-sm sm:text-sm font-medium ${darkMode 
                                    ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" 
                                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"} 
                                    ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="sr-only">Next</span>
                                <AiOutlineRight className="h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Footer */}
                <div className={`px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4 ${darkMode 
                        ? "bg-gray-800 border-t border-gray-700" 
                        : "bg-gray-100 border-t border-gray-200"} text-right`}>
                    {!isJobFinished && (
                        <button
                            onClick={handleSaveChanges}
                            type="button"
                            className="w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Done
                        </button>
                    )}
                    <button
                        onClick={handleCloseApplicantsPopup}
                        type="button"
                        className={`w-full sm:w-auto inline-flex justify-center px-3 xs:px-4 sm:px-4 py-1 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-sm font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${darkMode 
                            ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ApplicantsManagementPopup;