import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers,
    FaTags,
    FaCheckCircle,
    FaTimesCircle,
    FaBuilding,
    FaHeart,
    FaRegHeart,
    FaClock,
    FaUser,
    FaExclamationTriangle,
    FaTrophy
} from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";
import ProfilePicture from "../components/ProfilePicture";

let tagMappingCache = null;

export function JobPostDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [jobPoster, setJobPoster] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [applicationSuccess, setApplicationSuccess] = useState("");
    const { darkMode } = useContext(ThemeContext);
    const [isSaved, setIsSaved] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");

    const [errorBoxOpacity, setErrorBoxOpacity] = useState(0);
    const [successBoxOpacity, setSuccessBoxOpacity] = useState(0);

    useEffect(() => {
        if (errorMessage) {
            setErrorBoxOpacity(1);
        } else {
            setErrorBoxOpacity(0);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (applicationSuccess) {
            setSuccessBoxOpacity(1);
        } else {
            setSuccessBoxOpacity(0);
        }
    }, [applicationSuccess]);

    const [tagMapping, setTagMapping] = useState(new Map());
    useEffect(() => {
        const fetchTags = async () => {
            if (tagMappingCache) {
                console.log("Using cached tag data.");
                setTagMapping(tagMappingCache);
                return;
            }
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
                if (!tagsData || typeof tagsData !== "object" || Array.isArray(tagsData)) {
                    console.warn("API response did not return a valid tags object.");
                    setTagMapping(new Map());
                    return;
                }

                const newTagMap = new Map();
                Object.keys(tagsData).forEach(enumValue => {
                    const friendlyName = tagsData[enumValue];
                    if (friendlyName) {
                        newTagMap.set(friendlyName, enumValue);
                    } else {
                        console.warn(`Tag object missing friendlyName for enumValue: ${enumValue}`);
                    }
                });

                tagMappingCache = newTagMap;
                setTagMapping(newTagMap);
            } catch (error) {
                console.error("Error fetching tags:", error);
                setErrorMessage("Failed to load job tags.");
            }
        };
        fetchTags();
    }, []);

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    const toggleApplyModal = () => {
        setIsApplyModalOpen(!isApplyModalOpen);
    };

    const handleApply = () => {
        toggleApplyModal();
    };

    const submitApplication = () => {
        console.log("Application Message:", applicationMessage);
        applyToJobPost(applicationMessage);
        toggleApplyModal();
    };

    function applyToJobPost(applicationMessage) {
        fetch(`/api/v1/job-posts/${jobId}/apply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ message: applicationMessage }),
        })
            .then(res => {
                if (!res.ok) {
                    setApplicationSuccess("");
                    setErrorMessage("Application submitted successfully!");
                    throw new Error("Failed to apply to job post", res.status);
                }
            })
            .then(() => {
                setErrorMessage("");
                console.log("Application submitted successfully");
                setApplicationSuccess("Application submitted successfully!");
            })
            .catch((err) => {
                console.error("Error applying to job post:", err);
                setErrorMessage(err.message);
            });
    }

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

                if (data.jobPosterId) {
                    fetch(`/api/v1/users/${data.jobPosterId}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                    })
                        .then((res) => {
                            if (!res.ok) throw new Error("Failed to fetch job poster details");
                            return res.json();
                        })
                        .then((jobPosterData) => {
                            setJobPoster(jobPosterData);
                        })
                        .catch((err) => {
                            console.error("Error fetching job jobPoster details:", err);
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching job details:", err);
                setErrorMessage(err.message);
            })
            .finally(() => setLoading(false));
    }, [jobId]);

    if (loading) {
        return (
            <div
                className={`main-content flex items-center justify-center min-h-screen p-4 xs:p-6 sm:p-8 ${
                    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
            >
                <p className="text-sm xs:text-base sm:text-lg">Loading job details...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div
                className={`main-content min-h-screen p-4 xs:p-6 sm:p-8 ${
                    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
            >
                <h1
                    className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8 ${
                        darkMode ? "text-white" : "text-gray-800"
                    }`}
                >
                    Job Not Found
                </h1>
                <p className={`text-sm xs:text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    No job data found for ID: {jobId}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`main-content min-h-screen border-4 border-double rounded-3xl mt-6 xs:mt-8 sm:mt-10 mb-6 xs:mb-8 sm:mt-10 p-4 xs:p-6 sm:p-8 ${
                darkMode ? "bg-gray-900 text-white border-blue-600" : "bg-gray-100 text-black border-green-600"
            }`}
        >
            {/* Error Display (Conditional) */}
            {errorMessage && (
                <div
                    className="mb-4 xs:mb-6 sm:mb-8 p-4 xs:p-5 sm:p-6 bg-red-100 mx-auto max-w-2xl xs:max-w-3xl sm:max-w-4xl border border-red-400 text-red-700 rounded-md flex items-center transition-opacity duration-300 ease-out"
                    role="alert"
                    style={{ opacity: errorBoxOpacity }}
                >
                    <FaExclamationTriangle className="mr-2 text-red-500 h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
                    <div>
                        <h3 className="text-sm xs:text-base sm:text-lg font-bold">Error</h3>
                        <p className="text-sm xs:text-base sm:text-lg">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Success display (Conditional) */}
            {applicationSuccess && (
                <div
                    className="mb-4 xs:mb-6 sm:mb-8 justify-center mx-auto max-w-2xl xs:max-w-3xl sm:max-w-4xl p-4 xs:p-5 sm:p-6 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center transition-opacity duration-300 ease-in"
                    role="alert"
                    style={{ opacity: successBoxOpacity }}
                >
                    <FaTrophy className="mr-2 text-green-500 h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
                    <div>
                        <h3 className="text-sm xs:text-base sm:text-lg font-bold">Congrats</h3>
                        <p className="text-sm xs:text-base sm:text-lg">{applicationSuccess}</p>
                    </div>
                </div>
            )}

            <div
                className={`max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto shadow-lg drop-shadow-2xl rounded-lg p-4 xs:p-6 sm:p-8 mt-6 xs:mt-8 sm:mt-10 transition-all duration-300 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                } hover:shadow-xl`}
            >
                {/* Top Section: Logo, Title, Basic Info, and Poster */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 mb-4 xs:mb-6 sm:mb-8">
                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <h1
                                className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 ${
                                    darkMode ? "text-green-400" : "text-green-600"
                                }`}
                            >
                                {job.title}
                            </h1>

                            {/* Display Job Poster */}
                            {jobPoster && (
                                <Link
                                    to={`/users/${jobPoster.userId}`}
                                    className={`flex items-center text-xs xs:text-sm sm:text-base p-2 xs:p-3 rounded-lg hover:shadow-lg duration-300 ${
                                        darkMode ? "text-gray-300 border-gray-500 border hover:bg-gray-600" : "text-gray-700 border-gray-600 border hover:bg-sky-100"
                                    }`}
                                    style={{ display: 'flex', textDecoration: 'none' }}
                                >
                                    <div className="mr-2 xs:mr-4 sm:mr-6">
                                        <ProfilePicture userId={jobPoster.userId} darkMode={darkMode} />
                                    </div>
                                    <div className="flex flex-col font-semibold">
                                        <span>{jobPoster.firstName}</span>
                                        <span>{jobPoster.lastName}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center text-xs xs:text-sm sm:text-base text-neutral-500">
                            <span className="flex items-center mr-4 xs:mr-5 sm:mr-6 font-bold">
                                <FaMapMarkerAlt className={`mr-1 ${darkMode ? "text-red-500" : "text-red-600"}`} />
                                {job.address}
                            </span>
                            <span className="flex items-center mr-4 xs:mr-5 sm:mr-6 font-bold">
                                <FaUsers className={`mr-1 ${darkMode ? "text-purple-500" : "text-purple-700"}`} />
                                {job.maxApplicants}
                            </span>
                            <span className="flex items-center mr-4 xs:mr-5 sm:mr-6 font-bold">
                                <FaCalendarAlt className={`mr-1 ${darkMode ? "text-yellow-500" : "text-amber-600"}`} />
                                Posted: {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                            <br />
                            <span className="flex items-center mr-4 xs:mr-5 sm:mr-6 font-bold">
                                <FaUsers className={`mr-1 ${darkMode ? "text-green-500" : "text-green-600"}`} />
                                Already applied: {job.applicantsCount}
                            </span>
                        </div>
                        {/* Google Maps Iframe and Fallback Link */}
                        {job.address && (
                            <div className="mt-4 xs:mt-6 sm:mt-8">
                                <iframe
                                    className="w-full h-64 xs:h-72 sm:h-80 rounded-lg"
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(job.address)}&output=embed`}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Job Location Map"
                                ></iframe>
                                <div className="mt-2 text-center">
                                    <a
                                        href={`https://www.google.com/maps?q=${encodeURIComponent(job.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-xs xs:text-sm sm:text-base underline ${
                                            darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                                        }`}
                                    >
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Job Description */}
                <div className="mb-4 xs:mb-6 sm:mb-8">
                    <h2 className={`text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 ${darkMode ? "text-white" : ""}`}>
                        {job.title}
                    </h2>
                    <p className={`mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg ${darkMode ? "text-gray-300" : ""}`}>
                        {job.description}
                    </p>

                    {job.responsibilities && (
                        <>
                            <h3 className={`text-base xs:text-lg sm:text-xl font-semibold mb-2 xs:mb-3 sm:mb-4 ${darkMode ? "text-white" : ""}`}>
                                Responsibilities
                            </h3>
                            <ul className={`list-disc pl-5 mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg ${darkMode ? "text-gray-300" : ""}`}>
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {job.requirements && (
                        <>
                            <h3 className={`text-base xs:text-lg sm:text-xl font-semibold mb-2 xs:mb-3 sm:mb-4 ${darkMode ? "text-white" : ""}`}>
                                Requirements
                            </h3>
                            <ul className={`list-disc pl-5 mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg ${darkMode ? "text-gray-300" : ""}`}>
                                {job.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {job.tags && job.tags.length > 0 && (
                        <div className={`flex flex-wrap items-center mt-6 xs:mt-8 sm:mt-10 ${darkMode ? "text-gray-300" : ""}`}>
                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full flex items-center text-xs xs:text-sm sm:text-base mr-2 mb-2 ${
                                        darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    <FaTags className={`mr-1 ${darkMode ? "text-purple-400" : "text-purple-500"}`} />
                                    <span>{tag}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center sm:justify-end space-x-4 mb-4 xs:mb-6 sm:mb-8">
                    <button
                        onClick={handleApply}
                        className={`bg-green-500 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-3xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 text-sm xs:text-base sm:text-lg ${
                            darkMode ? "dark:bg-green-700 dark:hover:bg-green-800" : ""
                        }`}
                    >
                        Apply
                    </button>
                    <button
                        onClick={toggleSave}
                        className={`px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3 rounded-3xl transition duration-300 ease-in-out transform hover:scale-105 flex items-center text-sm xs:text-base sm:text-lg ${
                            isSaved
                                ? (darkMode ? "bg-red-700 text-white hover:bg-red-800" : "bg-red-500 text-white hover:bg-red-600")
                                : (darkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400")
                        }`}
                    >
                        {isSaved ? <FaHeart className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" /> : <FaRegHeart className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />}
                    </button>
                </div>
            </div>

            {/* Apply Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-xs bg-opacity-50 flex justify-center items-center">
                    <div className={`rounded-lg p-4 xs:p-6 sm:p-8 max-w-sm xs:max-w-md sm:max-w-lg w-full mx-auto ${
                        darkMode ? "bg-gray-700 text-white" : "bg-neutral-200 bg-opacity-40"
                    }`}>
                        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 xs:mb-6 sm:mb-8">Apply for Job</h2>
                        <p className="mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg">Leave an optional message with your application:</p>
                        <textarea
                            className={`w-full p-2 xs:p-3 sm:p-4 border rounded mb-4 xs:mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg text-black ${
                                darkMode ? "bg-gray-700 text-white border-gray-500" : ""
                            }`}
                            placeholder="Optional message to the job poster..."
                            value={applicationMessage}
                            onChange={(e) => setApplicationMessage(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2 xs:space-x-3 sm:space-x-4">
                            <button
                                onClick={submitApplication}
                                className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded text-sm xs:text-base sm:text-lg ${
                                    darkMode ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                            >
                                Submit Application
                            </button>
                            <button
                                id="cancel-apply"
                                onClick={toggleApplyModal}
                                className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded text-sm xs:text-base sm:text-lg ${
                                    darkMode ? "bg-gray-300 hover:bg-gray-500 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                                }`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}