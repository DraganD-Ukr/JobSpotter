import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle, FaTrophy, FaCheckCircle, FaTimesCircle, FaTag } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';
import { BeatLoader } from 'react-spinners';
import { ThemeContext } from "../components/ThemeContext";

// Removed the static tagMapping; now fetching dynamically
export function ViewMoreDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [errorBoxOpacity, setErrorBoxOpacity] = useState(0);
    const [successBoxOpacity, setSuccessBoxOpacity] = useState(0);
    const [autoStartMessage, setAutoStartMessage] = useState("");

    const { darkMode } = useContext(ThemeContext);
    const [tagMapping, setTagMapping] = useState(new Map());

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [applicantsPerPage] = useState(5);

    const errorBoxAnimation = useSpring({
        to: { opacity: errorMessage ? 1 : 0 },
        from: { opacity: 0 },
        config: { duration: 300 },
        reset: true,
    });

    const successBoxAnimation = useSpring({
        to: { opacity: actionMessage ? 1 : 0 },
        from: { opacity: 0 },
        config: { duration: 300 },
        reset: true,
    });

    useEffect(() => {
        if (errorMessage) {
            setErrorBoxOpacity(1);
        } else {
            setErrorBoxOpacity(0);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (actionMessage) {
            setSuccessBoxOpacity(1);
        } else {
            setSuccessBoxOpacity(0);
        }
    }, [actionMessage]);
    // Fetch tag mapping from API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch('/api/v1/job-posts/tags', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
                }
                const tagsData = await res.json();
                const newTagMap = new Map();
                Object.keys(tagsData).forEach((key) => {
                    newTagMap.set(key, tagsData[key]);
                });
                setTagMapping(newTagMap);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    // Helper to parse responses that might have no content (204)
    function parseNoContent(res) {
        if (!res.ok) throw new Error("Request failed");
        if (res.status === 204 || !res.headers.get("content-length")) {
            return null;
        }
        return res.json();
    }

    useEffect(() => {
        if (!jobId) {
            setErrorMessage("No job ID provided in the URL.");
            setLoading(false);
            return;
        }

        fetch(`/api/v1/job-posts/my-job-post/${jobId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch job details");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data.tags)) {
                    data.tags = data.tags.map((tagObj) => {
                        const enumVal =
                            typeof tagObj === "string"
                                ? tagObj
                                : tagObj.name || tagObj.value || tagObj.tagName;
                        return tagMapping.get(enumVal) || enumVal;
                    });
                }
                setJob(data);
            })
            .catch((err) => {
                console.error("Error fetching job details:", err);
                setErrorMessage(err.message);
            })
            .finally(() => setLoading(false));
    }, [jobId, tagMapping]);

    const refreshJobDetails = () => {
        setLoading(true);
        fetch(`/api/v1/job-posts/my-job-post/${jobId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch job details");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data.tags)) {
                    data.tags = data.tags.map((tagObj) => {
                        const enumVal =
                            typeof tagObj === "string"
                                ? tagObj
                                : tagObj.name || tagObj.value || tagObj.tagName;
                        return tagMapping.get(enumVal) || enumVal;
                    });
                }
                setJob(data);
            })
            .catch((err) => {
                console.error("Error refreshing job details:", err);
                setErrorMessage(err.message);
            })
            .finally(() => setLoading(false));
    };


    function handleApplicantAction(applicantId, action) {
        if (job.status !== "OPEN") { // Assuming "OPEN" is the status before job starts
            setActionMessage(`Cannot ${action} applicants after job has started.`);
            setTimeout(() => setActionMessage(""), 5000);
            return;
        }

        if (action === "approve") {
            const approvedApplicantsCount = job.applicants.filter(app => app.status === "APPROVED").length;
            if (approvedApplicantsCount >= job.maxApplicants) {
                setActionMessage(`Cannot approve more than ${job.maxApplicants} applicants.`);
                setTimeout(() => setActionMessage(""), 5000);
                return;
            }
            if (approvedApplicantsCount + 1 === job.maxApplicants) {
                setAutoStartMessage("Approving this applicant will automatically start the job post.");
            } else {
                setAutoStartMessage("");
            }
        } else {
            setAutoStartMessage("");
        }


        fetch(`/api/v1/job-posts/my-job-posts/${jobId}/applicants/approve-reject`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ applicantId, action }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to perform applicant action");
                return res.json();
            })
            .then(() => {
                setActionMessage(
                    `Applicant action '${action}' for applicant ${applicantId} was successful.`
                );
                setJob(prevJob => {
                    if (!prevJob || !prevJob.applicants) return prevJob;
                    const updatedApplicants = prevJob.applicants.map(applicant =>
                        applicant.applicantId === applicantId ? { ...applicant, status: action.toUpperCase() } : applicant
                    );
                    return { ...prevJob, applicants: updatedApplicants };
                });
                setTimeout(() => setActionMessage(""), 3000);
            })
            .catch((err) => {
                console.error("Error performing applicant action:", err);
                setActionMessage(`Error: ${err.message}`);
                setTimeout(() => setActionMessage(""), 5000);
            });
    }

    const handleStartJob = () => {
        setLoading(true);
        fetch(`/api/v1/job-posts/my-job-posts/${jobId}/start`, { // Assuming this is the endpoint
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to start job. Status: ${res.status}`);
                return parseNoContent(res); // Assuming no content on success
            })
            .then(() => {
                setActionMessage("Job started successfully!");
                refreshJobDetails(); // Refresh job details to update status
                setTimeout(() => setActionMessage(""), 3000);
            })
            .catch(error => {
                console.error("Error starting job:", error);
                setErrorMessage(`Failed to start job: ${error.message}`);
                setTimeout(() => setErrorMessage(""), 5000);
                setLoading(false); // Stop loading even on error
            });
    };

    const handleFinishJob = () => {
        setLoading(true);
        fetch(`/api/v1/job-posts/my-job-posts/${jobId}/finish`, { // Assuming this is the endpoint
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to finish job. Status: ${res.status}`);
                return parseNoContent(res); // Assuming no content on success
            })
            .then(() => {
                setActionMessage("Job finished successfully!");
                refreshJobDetails(); // Refresh job details to update status
                setTimeout(() => setActionMessage(""), 3000);
            })
            .catch(error => {
                console.error("Error finishing job:", error);
                setErrorMessage(`Failed to finish job: ${error.message}`);
                setTimeout(() => setErrorMessage(""), 5000);
                setLoading(false); // Stop loading even on error
            });
    };

    const handleCancelJob = () => {
        setLoading(true);
        fetch(`/api/v1/job-posts/my-job-posts/${jobId}/cancel`, { // Assuming this is the endpoint
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to cancel job. Status: ${res.status}`);
                return parseNoContent(res); // Assuming no content on success
            })
            .then(() => {
                setActionMessage("Job cancelled successfully!");
                refreshJobDetails(); // Refresh job details to update status
                setTimeout(() => setActionMessage(""), 3000);
            })
            .catch(error => {
                console.error("Error cancelling job:", error);
                setErrorMessage(`Failed to cancel job: ${error.message}`);
                setTimeout(() => setErrorMessage(""), 5000);
                setLoading(false); // Stop loading even on error
            });
    };


    if (loading) {
        return (
            <div className="main-content min-h-screen px-20 py-15 my-15 p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl">
                {/* LEFT: Job Details Skeleton */}
                <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-3/4 h-8"></h1>
                    <div className="space-y-3">
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 rounded w-3/4"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-24 rounded"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/3"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div>
                    </div>
                    <div className="mt-8 flex gap-4 justify-start">
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                    </div>
                </div>

                {/* RIGHT: Applicants Sidebar Skeleton */}
                <div className="w-120 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-1/2 h-6"></h2>
                    <div className="space-y-4">
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
                        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="main-content min-h-screen px-20 py-15 my-15 p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl">
                <animated.div
                    style={errorBoxAnimation}
                    className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center"
                    role="alert"
                >
                    <FaExclamationTriangle className="mr-2 text-red-500 h-6 w-6" />
                    <div>
                        <h3 className="font-bold">Error</h3>
                        <p>{errorMessage}</p>
                    </div>
                </animated.div>
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Error Loading Job Details</h1>
                <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="main-content min-h-screen px-20 py-15 my-15 p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400">No job data found for ID: {jobId}</p>
            </div>
        );
    }

    // Determine button disabled states based on job status
    const isJobOpen = job.status === "OPEN";
    const isJobInProgress = job.status === "IN_PROGRESS"; // Or whatever status represents "in progress"
    const isJobFinished = job.status === "COMPLETED";
    const isJobCancelled = job.status === "CANCELLED";


    // Pagination Calculations
    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = Array.isArray(job.applicants)
        ? job.applicants.slice(indexOfFirstApplicant, indexOfLastApplicant)
        : [];
    const totalPages = Array.isArray(job.applicants)
        ? Math.ceil(job.applicants.length / applicantsPerPage)
        : 0;


    return (

        <div className="main-content min-h-screen px-20 py-15 my-15 p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl">
            {/* LEFT: Job Details */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? "text-green-400" : "text-green-600"
                    }`}>{job.title}</h1>

                <animated.div
                    style={successBoxAnimation}
                    className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center justify-center"
                    role="alert"
                >
                    <FaTrophy className="mr-2 text-green-500 h-6 w-6" />
                    <p>{actionMessage}</p>
                </animated.div>

                {autoStartMessage && ( // Conditionally render auto-start message
                    <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-center justify-center" role="alert">
                        <FaExclamationTriangle className="mr-2 text-yellow-500 h-5 w-5" />
                        <p>{autoStartMessage}</p>
                    </div>
                )}


                <div className="mb-4">
                    <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Job ID:</strong>
                    <span className="text-gray-600 dark:text-gray-400">{job.jobPostId}</span>
                </div>
                <div className="mb-4">
                    <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</strong>
                    <span className="text-gray-600 dark:text-gray-400 text-xl">{job.title}</span>
                </div>
                <div className="mb-6">
                    <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</strong>
                    <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
                </div>
                <div className="mb-4">
                    <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Status:</strong>
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm">{job.status}</span>
                </div>

                {job.tags && job.tags.length > 0 && (

                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Tags:</strong>
                        <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium text-sm">
                                    <FaTag className="mr-1 text-purple-600" /> {/* Icon before text, add margin for spacing, style color if needed */}
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                )}

                {job.address && (
                    <div className="mb-4">
                        <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Address:</strong>
                        <span className="text-gray-600 dark:text-gray-400">{job.address}</span>
                    </div>
                )}
                {job.datePosted && (
                    <div>
                        <strong className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Date Posted:</strong>
                        <span className="text-gray-600 dark:text-gray-400">{new Date(job.datePosted).toLocaleDateString()}</span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-start">
                    <button
                        onClick={handleStartJob}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={!isJobOpen} // Disable if job is not open
                    >
                        Start
                    </button>
                    <button
                        onClick={handleFinishJob}
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        disabled={!isJobInProgress} // Disable if job is not in progress
                    >
                        Finish
                    </button>
                    <button
                        onClick={handleCancelJob}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        disabled={!isJobOpen} // Disable if job is not open
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* RIGHT: Applicants Sidebar */}
            <div className="w-120 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Applicants:</h2>

                {autoStartMessage && ( // Auto-start message at the top of applicant list
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-center" role="alert">
                        <FaExclamationTriangle className="mr-2 text-yellow-500 h-5 w-5" />
                        <p className="text-sm">{autoStartMessage}</p>
                    </div>
                )}


                {Array.isArray(job.applicants) && job.applicants.length > 0 ? (
                    <div className="space-y-4">
                        {currentApplicants.map((applicant) => (
                            <div key={applicant.applicantId} className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{applicant.name || `Applicant ID ${applicant.applicantId}`}</h4>

                                {applicant.message && applicant.message.trim() !== "" && (
                                    <p className={`font-mono mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                        <span className={`font-extralight ${darkMode ? 'text-neutral-300' : 'text-neutral-500'}`}>Message: </span>
                                        {applicant.message}
                                    </p>
                                )}

                                {applicant.email && <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Email: {applicant.email}</p>}

                                <p className={`text-sm mb-2 font-medium ${applicant.status === 'APPROVED' ? 'text-green-500' :
                                    applicant.status === 'REJECTED' ? 'text-red-500' :
                                        'text-gray-500 dark:text-gray-300' // Default status color
                                    }`}>
                                    Status: {applicant.status}
                                </p>


                                <div className="mt-3 flex justify-end gap-4">
                                    {isJobOpen && ( // Conditional rendering: only show buttons if isJobOpen is true
                                        <> {/* Use a fragment to group buttons without extra DOM node */}
                                            <button
                                                id="confirm-applicant"
                                                onClick={() => handleApplicantAction(applicant.applicantId, "approve")}
                                                className={`p-2 ${darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-600' : 'bg-green-500 hover:bg-green-600  focus:ring-green-500'} rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50`}
                                                aria-label="Approve"
                                                disabled={!isJobOpen || applicant.status === 'APPROVED'} // Keep disabled logic
                                            >
                                                <FaCheckCircle className="text-white h-5 w-5" />
                                            </button>
                                            <button
                                                id="reject-applicant"
                                                onClick={() => handleApplicantAction(applicant.applicantId, "reject")}
                                                className={`p-2 bg-red-500 hover:bg-red-600 focus:ring-red-500  rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50`}
                                                aria-label="Reject"
                                                disabled={!isJobOpen || applicant.status === 'REJECTED'} // Keep disabled logic
                                            >
                                                <FaTimesCircle className="text-white h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                </div>


                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No applicants found for this job.</p>
                )}

                {/* Pagination Controls */}
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
        </div>

    );
}
