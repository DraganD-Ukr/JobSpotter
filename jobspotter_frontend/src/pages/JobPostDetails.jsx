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
    FaUser, // Icon for job poster
} from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";

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

export function JobPostDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [jobPoster, setJobPoster] = useState(null); // State for the job jobPoster
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const { darkMode } = useContext(ThemeContext);
    const [isSaved, setIsSaved] = useState(false); // State to track if the job is saved

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    // Helper to parse responses with no content (204)
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

        // Fetch job details
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

                // Fetch job poster details using the posterId from the job data
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
                            // Don't set an error message here; it's less critical.  Just log it.
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
                className={`main-content flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                    }`}
            >
                <p>Loading job details...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div
                className={`main-content min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                    }`}
            >
                <h1
                    className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-red-500"
                        }`}
                >
                    Error
                </h1>
                <p className={`text-red-500 ${darkMode ? "text-red-400" : ""}`}>
                    {errorMessage}
                </p>
            </div>
        );
    }

    if (!job) {
        return (
            <div
                className={`main-content min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                    }`}
            >
                <h1
                    className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"
                        }`}
                >
                    Job Not Found
                </h1>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    No job data found for ID: {jobId}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`main-content min-h-screen p-6 ${darkMode ? "bg-gray-600 text-white" : "bg-gray-100 text-black"
                }`}
        >
            <div
                className={`max-w-4xl mx-auto shadow-lg rounded-lg p-6 transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"
                    } hover:shadow-xl`}
            >
                {/* Top Section:  Logo, Title, Basic Info, and Poster */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 mb-6">
                    {/* Placeholder for Logo */}


                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <h1
                                className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? "text-green-400" : "text-green-600"
                                    }`}
                            >
                                {job.title}
                            </h1>


                            {/* Display Job Poster */}
                            {/* Display Job Poster */}
                            {jobPoster && (
                                <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} border p-3 rounded-lg ${darkMode ? 'border-gray-500' : 'border-gray-300'}`}>
                                    {/* Profile Picture Container */}
                                    <div className={`w-15 h-15 rounded-full  bg-gray-300 mr-2 ${darkMode ? 'bg-gray-600' : ''} flex items-center justify-center`}>
                                        {/* Profile Picture or Placeholder Icon */}
                                        {jobPoster.profilePicture ? (
                                            <img
                                                src={jobPoster.profilePicture}
                                                alt={`${jobPoster.firstName} ${jobPoster.lastName}`}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <FaUser className={`w-6 h-6 text-gray-500 ${darkMode ? "text-gray-400" : ""}`} />
                                        )}
                                    </div>
                                    {/* User Info */}
                                    <div className="flex flex-col font-semibold text-lg">
                                        <span>{jobPoster.firstName}</span>
                                        <span>{jobPoster.lastName}</span>
                                    </div>
                                </div>
                            )}



                        </div>
                        <div className="flex flex-wrap items-center text-sm text-neutral-500 ">
                            <span className="flex items-center mr-4 font-bold">
                                <FaMapMarkerAlt className={`mr-1 ${darkMode ? 'text-red-500' : 'text-red-600'} `} />
                                {job.address}
                            </span>
                            <span className="flex items-center mr-4 font-bold">
                                <FaUsers className={`mr-1 ${darkMode ? 'text-yellow-400' : 'text-amber-700'} `} />
                                {job.maxApplicants}
                            </span>
                            <span className="flex items-center mr-4 font-bold">
                                <FaCalendarAlt className={`mr-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'} `} />
                                Posted: {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                            <br />
                            <span className="flex items-center mr-4 font-bold ">
                                <FaUsers className={`mr-1 ${darkMode ? 'text-green-400' : 'text-green-600'} `} />
                                Already applied: {job.applicantsCount}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center sm:justify-end space-x-4 mb-6">
                    <button
                        className={`bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 ${darkMode ? "dark:bg-green-700 dark:hover:bg-green-800" : ""
                            }`}
                    >
                        Apply
                    </button>
                    <button
                        onClick={toggleSave}
                        className={`px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center ${isSaved
                            ? (darkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-500 text-white hover:bg-red-600')
                            : (darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400')
                            }`}
                    >
                        {isSaved ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                    </button>
                </div>


                {/* Job Description */}
                <div className="mb-6">
                    <h2 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : ""}`}>
                        {job.title}
                    </h2>
                    <p className={`mb-4 ${darkMode ? "text-gray-300" : ""}`}>
                        {job.description}
                    </p>

                    {job.responsibilities && (
                        <>
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : ""}`}>Responsibilities</h3>
                            <ul className={`list-disc pl-5 mb-4 ${darkMode ? 'text-gray-300' : ''}`}>
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {job.requirements && (
                        <>
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : ""}`}>Requirements</h3>
                            <ul className={`list-disc pl-5 mb-4 ${darkMode ? 'text-gray-300' : ''}`}>
                                {job.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {job.tags && job.tags.length > 0 && (
                        <div className={`flex flex-wrap items-center mt-4 ${darkMode ? 'text-gray-300' : ''}`}>

                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-2 py-1 rounded-full flex items-center text-sm mr-2 mb-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    <FaTags className={`mr-1 ${darkMode ? "text-purple-400" : "text-purple-500"}`} />
                                    <span>{tag}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}