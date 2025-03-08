import React from 'react';
import { FaExclamationTriangle, FaUserCheck, FaUserTimes, FaUserClock, FaCheckCircle, FaTimesCircle, } from 'react-icons/fa';
import { animated } from 'react-spring';
import ApplicantItem from "./ApplicantItem"; // Assuming ApplicantItem is in the same directory or adjust path
import { ThemeContext } from "../components/ThemeContext"; // Ensure ThemeContext is correctly imported
import { useContext } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ApplicantsManagementPopup = React.memo(({
    isApplicantsPopupVisible,
    applicantCounts,
    errorMessage,
    errorBoxAnimation,
    autoStartMessage,
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
    job, // Assuming job prop is passed to access job.maxApplicants
    isJobOpen // Assuming isJobOpen prop is passed from parent
}) => {
    const { darkMode } = useContext(ThemeContext);

    if (!isApplicantsPopupVisible) {
        return null; // Don't render if not visible
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center p-4" aria-labelledby="applicant-popup-title" role="dialog" aria-modal="true">
            <div className="bg-white mt-30 dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden sm:max-w-3xl sm:w-full">
                <div className="px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between" id="applicant-popup-title">
                        Manage Applicants
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-300">
                            <FaUserCheck className="inline-block mr-1" /> Approved: {applicantCounts.approved} / {job?.maxApplicants}
                            <FaUserTimes className="inline-block ml-2 mr-1" /> Rejected: {applicantCounts.rejected}
                            <FaUserClock className="inline-block ml-2 mr-1" /> Pending: {applicantCounts.pending}
                        </span>
                    </h3>
                </div>
                <div className="p-6">
                    {errorMessage && (
                        <animated.div
                            style={errorBoxAnimation}
                            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
                            role="alert"
                        >
                            <FaExclamationTriangle className="mr-2 text-red-500 h-5 w-5" />
                            <div>
                                <h3 className="font-bold">Error</h3>
                                <p>{errorMessage}</p>
                            </div>
                        </animated.div>
                    )}
                    {autoStartMessage && (
                        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-center" role="alert">
                            <FaExclamationTriangle className="mr-2 text-yellow-500 h-5 w-5" />
                            <p className="text-sm">{autoStartMessage}</p>
                        </div>
                    )}

                    {/* Pending Applicants */}
                    {pendingApplicants.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">Pending Applicants</h4>
                            <div className="space-y-4">
                                {currentPendingApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants} // Use job?.maxApplicants to avoid potential null/undefined job
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Approved Applicants */}
                    {approvedApplicants.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-md font-semibold text-green-500 dark:text-green-400 mb-3">Approved Applicants</h4>
                            <div className="space-y-4">
                                {currentApprovedApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants} // Use job?.maxApplicants to avoid potential null/undefined job
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Applicants */}
                    {rejectedApplicants.length > 0 && (
                        <div>
                            <h4 className="text-md font-semibold text-red-500 dark:text-red-400 mb-3">Rejected Applicants</h4>
                            <div className="space-y-4">
                                {currentRejectedApplicants.map((applicant) => (
                                    <ApplicantItem
                                        key={applicant.applicantId}
                                        applicant={applicant}
                                        handleApplicantAction={handleApplicantAction}
                                        isJobOpen={isJobOpen}
                                        applicantCounts={applicantCounts}
                                        jobMaxApplicants={job?.maxApplicants} // Use job?.maxApplicants to avoid potential null/undefined job
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Applicants Message */}
                    {!pendingApplicants.length && !approvedApplicants.length && !rejectedApplicants.length ? (
                        <p className="text-gray-600 dark:text-gray-400">No applicants found for this job.</p>
                    ) : null}

                    {/* Pagination Controls - Inside popup now */}
                    <div className="flex justify-center mt-6">
                        <nav className="inline-flex rounded-md shadow-sm gap-2" aria-label="Applicants pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center justify-center p-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="sr-only">Previous</span>
                                <AiOutlineLeft className="h-4 w-4" aria-hidden="true" /> {/* React Icon for Previous */}
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    id={currentPage === pageNumber ? 'active-page-button' : `page-button-${pageNumber}`}
                                    className={`relative inline-flex items-center justify-center rounded-full w-8 h-8 text-xs font-medium ${currentPage === pageNumber ? 'z-10 bg-blue-50 border-blue-700 text-blue-800' : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'} focus:outline-none`}
                                    aria-current={currentPage === pageNumber ? "page" : undefined}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0} // Disable on last page or if no applicants
                                className={`relative inline-flex items-center justify-center p-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="sr-only">Next</span>
                                <AiOutlineRight className="h-4 w-4" aria-hidden="true" /> {/* React Icon for Next */}
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-right flex justify-between items-center">
                    <button
                        onClick={handleSaveChanges}
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Done
                    </button>
                    <button
                        onClick={handleCloseApplicantsPopup}
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ApplicantsManagementPopup;