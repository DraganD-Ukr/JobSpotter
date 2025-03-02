import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle, FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { BeatLoader } from 'react-spinners'; // Or any other loading indicator you prefer
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext for dark mode

const tagMapping = new Map([
    ["GENERAL_HELP", "General Help"],
    ["HANDYMAN_SERVICES", "Handyman Services"],
    ["SKILLED_TRADES", "Skilled Trades"],
    ["CLEANING_SERVICES", "Cleaning Services"],
    ["DELIVERY_SERVICES", "Delivery Services"],
    ["CAREGIVING", "Caregiving"],
    ["PET_CARE", "Pet Care"],
    ["TUTORING_MENTORING", "Tutoring/Mentoring"],
    ["EVENT_STAFF", "Event Staff"],
    ["ADMINISTRATIVE_SUPPORT", "Administrative Support"],
    ["VIRTUAL_ASSISTANCE", "Virtual Assistance"],
    ["FOOD_SERVICES", "Food Services"],
    ["GARDENING_LANDSCAPING", "Gardening/Landscaping"],
    ["COMMUNITY_OUTREACH", "Community Outreach"],
    ["IT_SUPPORT", "IT Support"],
    ["CREATIVE_SERVICES", "Creative Services"],
    ["PERSONAL_SERVICES", "Personal Services"],
    ["TUTORING_LANGUAGES", "Tutoring Languages"],
    ["MUSIC_INSTRUCTION", "Music Instruction"],
    ["HOME_MAINTENANCE", "Home Maintenance"],
    ["TRANSPORTATION_ASSISTANCE", "Transportation Assistance"],
    ["ERRANDS/SHOPPING", "Errands/Shopping"],
    ["VOLUNTEER_WORK", "Volunteer Work"],
    ["COMMUNITY_EVENTS", "Community Events"],
    ["FUNDRAISING", "Fundraising"],
    ["ANIMAL_WELFARE", "Animal Welfare"],
    ["Mentoring (Community)", "Mentoring (Community)"],
    ["HEALTH_SUPPORT", "Health Support"],
    ["COUNSELING_SUPPORT", "Counseling Support"],
    ["DISASTER_RELIEF", "Disaster Relief"],
    ["ENVIRONMENTAL_CONSERVATION", "Environmental Conservation"],
    ["OTHER", "Other"],
]);

export function ViewMoreDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [errorBoxOpacity, setErrorBoxOpacity] = useState(0);
    const [successBoxOpacity, setSuccessBoxOpacity] = useState(0);

    const { darkMode } = useContext(ThemeContext); // Use dark mode context

    const errorBoxAnimation = useSpring({
        to: { opacity: errorMessage ? 1 : 0 },
        from: { opacity: 0 },
        config: { duration: 300 },
        reset: true,
    });

    const successBoxAnimation = useSpring({
        to: { opacity: actionMessage ? 1 : 0 }, // using actionMessage for success
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


    // Helper to parse responses that might have no content (204)
    function parseNoContent(res) {
        if (!res.ok) throw new Error("Request failed");
        if (res.status === 204 || !res.headers.get("content-length")) {
            return null;
        }
        return res.json();
    }

    // Fetch job details from /api/v1/job-posts/{jobId}
    useEffect(() => {
        if (!jobId) {
            setErrorMessage("No job ID provided in the URL.");
            setLoading(false);
            return;
        }

        fetch(`/api/v1/job-posts/${jobId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch job details");
                return res.json();
            })
            .then((data) => {
                // Convert tags to friendly names if present
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
    }, [jobId]);

    // Approve or reject an applicant
    function handleApplicantAction(applicantId, action) {
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
                setJob(prevJob => { // Optimistically update the applicant status in local state
                    if (!prevJob || !prevJob.applicants) return prevJob;
                    const updatedApplicants = prevJob.applicants.map(applicant =>
                        applicant.applicantId === applicantId ? { ...applicant, status: action.toUpperCase() } : applicant
                    );
                    return { ...prevJob, applicants: updatedApplicants };
                });
                setTimeout(() => setActionMessage(""), 3000); // Clear success message after 3 seconds
            })
            .catch((err) => {
                console.error("Error performing applicant action:", err);
                setActionMessage(`Error: ${err.message}`);
                setTimeout(() => setActionMessage(""), 5000); // Clear error message after 5 seconds
            });
    }

    if (loading) {
      return (
        <div className={`main-content min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl`}>
              {/* LEFT: Job Details Skeleton */}
              <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-3/4 h-8"></h1> {/* Title Skeleton */}

                  <div className="space-y-3">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div> {/* Job ID */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 rounded w-3/4"></div> {/* Title Placeholder */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-24 rounded"></div> {/* Description Placeholder */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div> {/* Status */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/3"></div> {/* Tags */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div> {/* Address */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/4"></div> {/* Date Posted */}
                  </div>

                  <div className="mt-8 flex gap-4 justify-start"> {/* Action Buttons Skeleton */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg w-24"></div>
                  </div>
              </div>

              {/* RIGHT: Applicants Sidebar Skeleton */}
              <div className="w-80 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-1/2 h-6"></h2> {/* Applicants Title Skeleton */}
                  <div className="space-y-4">
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div> {/* Applicant 1 */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div> {/* Applicant 2 */}
                      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-20 rounded"></div> {/* Applicant 3 */}
                  </div>
              </div>
          </div>
      );
  }

    if (errorMessage) {
        return (
            <div className="main-content min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
            <div className="main-content min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Job Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400">No job data found for ID: {jobId}</p>
            </div>
        );
    }







    return (
        
        <div className="main-content min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex gap-8 border-1 rounded-4xl">
            {/* LEFT: Job Details */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Extended Job Details</h1>

                <animated.div
                    style={successBoxAnimation}
                    className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center justify-center"
                    role="alert"
                >
                    <FaTrophy className="mr-2 text-green-500 h-6 w-6" />
                    <p>{actionMessage}</p>
                </animated.div>


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
                                <span key={index} className="inline-block px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium text-sm">{tag}</span>
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
                        onClick={() => console.log("Start action")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Start
                    </button>
                    <button
                        onClick={() => console.log("Finish action")}
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Finish
                    </button>
                    <button
                        onClick={() => console.log("Cancel action")}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* RIGHT: Applicants Sidebar */}
            <div className="w-80 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Applicants</h2>

                {Array.isArray(job.applicants) && job.applicants.length > 0 ? (
                    <div className="space-y-4">
                        {job.applicants.map((applicant) => (
                            <div key={applicant.applicantId} className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{applicant.name || `Applicant ID ${applicant.applicantId}`}</h4>
                                {applicant.email && <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Email: {applicant.email}</p>}
                                {applicant.status && <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Status: {applicant.status}</p>}
                                <div className="mt-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleApplicantAction(applicant.applicantId, "approve")}
                                        className="p-2 bg-green-500 hover:bg-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        aria-label="Approve"
                                    >
                                        <FaCheckCircle className="text-white h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleApplicantAction(applicant.applicantId, "reject")}
                                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        aria-label="Reject"
                                    >
                                        <FaTimesCircle className="text-white h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No applicants found for this job.</p>
                )}
            </div>
        </div>
       
    );
}