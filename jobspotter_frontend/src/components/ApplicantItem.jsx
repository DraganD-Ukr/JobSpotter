import React, { useState, useContext } from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ThemeContext } from "../components/ThemeContext";

const ApplicantItem = React.memo(({ applicant, handleApplicantAction, isJobOpen, applicantCounts, jobMaxApplicants }) => {
    const { darkMode } = useContext(ThemeContext);
    const [localStatus, setLocalStatus] = useState(applicant.status); // Local status for immediate UI update

    const onApprove = () => {
        if (applicantCounts.approved >= jobMaxApplicants && localStatus !== 'APPROVED') {
            // Optionally handle max applicants reached visually here if needed more explicitly within item
            return; // Exit if max applicants already reached
        }
        if (isJobOpen && localStatus !== 'APPROVED') {
            handleApplicantAction(applicant.applicantId, "approve");
            setLocalStatus('APPROVED'); // Update local status for immediate visual feedback
        }
    };

    const onReject = () => {
        if (isJobOpen && localStatus !== 'REJECTED') {
            handleApplicantAction(applicant.applicantId, "reject");
            setLocalStatus('REJECTED'); // Update local status for immediate visual feedback
        }
    };


    return (
        <div key={applicant.applicantId} className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{applicant.name || `Applicant ID ${applicant.applicantId}`}</h4>
            {applicant.message && applicant.message.trim() !== "" && (
                <p className={`font-mono mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    <span className={`font-extralight ${darkMode ? 'text-neutral-300' : 'text-neutral-500'}`}>Message: </span>
                    {applicant.message}
                </p>
            )}
            {applicant.email && <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Email: {applicant.email}</p>}
            <p className={`text-sm mb-2 font-medium ${localStatus === 'APPROVED' ? 'text-green-500' :
                    localStatus === 'REJECTED' ? 'text-red-500' :
                        'text-gray-500 dark:text-gray-300'
                }`}>
                Status: {localStatus} (Saving to: {applicant.status})
            </p> {/*Displaying both localStatus and initial applicant.status for clarity - remove (Saving to...) after testing */}
            <div className="mt-3 flex justify-end gap-4">
                {isJobOpen && (
                    <>
                        <button
                            id={`confirm-applicant-popup-${applicant.applicantId}`}
                            onClick={onApprove}
                            className={`p-2 rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50
                                ${localStatus === 'APPROVED'
                                    ? darkMode ? 'bg-green-700' : 'bg-green-600' // Stuck approved style
                                    : darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-600' : 'bg-green-500 hover:bg-green-600  focus:ring-green-500'}
                                `}
                            aria-label="Approve"
                            disabled={!isJobOpen || localStatus === 'APPROVED' || applicantCounts.approved >= jobMaxApplicants}
                        >
                            <FaCheckCircle className="text-white h-5 w-5" />
                        </button>
                        <button
                            id={`reject-applicant-popup-${applicant.applicantId}`}
                            onClick={onReject}
                            className={`p-2 rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50
                                ${localStatus === 'REJECTED'
                                    ? 'bg-red-600' // Stuck rejected style
                                    : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'}
                                `}
                            aria-label="Reject"
                            disabled={!isJobOpen || localStatus === 'REJECTED'}
                        >
                            <FaTimesCircle className="text-white h-5 w-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
});

export default ApplicantItem;