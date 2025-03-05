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
    FaExclamationTriangle,
    FaTrophy
} from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext";


let tagMappingCache = null;




export function JobPostDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [jobPoster, setJobPoster] = useState(null); // State for the job jobPoster
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [applicationSuccess, setApplicationSuccess] = useState("");
    const { darkMode } = useContext(ThemeContext);
    const [isSaved, setIsSaved] = useState(false); // State to track if the job is saved
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); // State to control apply modal visibility
    const [applicationMessage, setApplicationMessage] = useState(""); // State for the application message

     // New opacity state for animations
     const [errorBoxOpacity, setErrorBoxOpacity] = useState(0);
     const [successBoxOpacity, setSuccessBoxOpacity] = useState(0);
 
     // ... other state and functions ...
 
     // useEffect for Error Message Animation
     useEffect(() => {
         if (errorMessage) {
             setErrorBoxOpacity(1); // Set opacity to 1 to trigger fade-in
         } else {
             setErrorBoxOpacity(0); // Optionally reset opacity when errorMessage clears (for fade-out if needed later)
         }
     }, [errorMessage]); // Run when errorMessage changes
 
     // useEffect for Success Message Animation
     useEffect(() => {
         if (applicationSuccess) {
             setSuccessBoxOpacity(1); // Set opacity to 1 to trigger fade-in
         } else {
             setSuccessBoxOpacity(0); // Optionally reset opacity when applicationSuccess clears
         }
     }, [applicationSuccess]); // Run when applicationSuccess changes

    const [tagMapping, setTagMapping] = useState(new Map()); // State for dynamic tag map

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
                console.log("Fetched tags data from API:", tagsData);

                if (!tagsData || typeof tagsData !== 'object' || Array.isArray(tagsData)) { // **Improved type checking**
                    console.warn("API response did not return a valid tags object.");
                    setTagMapping(new Map());
                    return;
                }


                const newTagMap = new Map();
                Object.keys(tagsData).forEach(enumValue => { // **Iterate over object keys**
                    const friendlyName = tagsData[enumValue]; // **Get friendly name using enumValue as key**
                    if (friendlyName) { // Check if friendlyName exists
                        newTagMap.set(friendlyName, enumValue); // **Correctly set the map - friendlyName as key, enumValue as value (reversed mapping)**
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
        toggleApplyModal(); // Open the apply modal
    };

    const submitApplication = () => {
        // Here you would typically handle the application submission logic
        // For now, let's just log the message and close the modal
        console.log("Application Message:", applicationMessage);
        applyToJobPost(applicationMessage); // Call the function to submit the application
        toggleApplyModal(); // Close the modal after submission (or attempted submission)
        // In a real application, you would send this message and jobId to your backend
    };

    function applyToJobPost(applicationMessage) {

        fetch(`/api/v1/job-posts/${jobId}/apply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ message: applicationMessage }),
        })
            .then(res => { // **MODIFIED: Removed parseNoContent here and handle status check**
                if (!res.ok) { // Check if the response status is NOT in the success range (2xx)
                    // Handle different error status codes


                    setApplicationSuccess("");  // Clear any previous error message
                    setErrorMessage("Application submitted successfully!");

                    throw new Error("Failed to apply to job post", res.status); // Throw an error to trigger the catch block
                }


            })
            .then(() => {
                setErrorMessage(""); // Clear any previous error message
                console.log("Application submitted successfully");
                // Show a success message to the user
                setApplicationSuccess("Application submitted successfully!"); // Set the success message
            })
            .catch((err) => {
                console.error("Error applying to job post:", err);
                setErrorMessage(err.message); // Use the error message from the thrown Error
                // Here you can show an error message to the user, which is already being done using errorMessage state
            });
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
                            // Don't set an error message here; it's less critical.  Just log it.
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
            className={`main-content min-h-screen border-4  border-double rounded-3xl  mt-10 mb-30 p-6 ${darkMode ? "bg-gray-900 text-white border-blue-600" : "bg-gray-100 text-black border-green-600"
                }`}
        >
             {/* Error Display (Conditional) */}
            {errorMessage && (
                <div
                    className="mb-8 p-4 bg-red-100 mx-auto max-w-100 border border-red-400 text-red-700 rounded-md flex items-center transition-opacity duration-300 ease-out" // Removed opacity-100 from classes
                    role="alert"
                    style={{ opacity: errorBoxOpacity }} // Control opacity with state
                >
                    <FaExclamationTriangle className="mr-2 text-red-500 h-6 w-6" />
                    <div>
                        <h3 className="font-bold">Error</h3>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Success display (Conditional) */}
            {applicationSuccess && (
                <div
                    className="mb-8 justify-center mx-auto max-w-100 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center transition-opacity duration-300 ease-in" // Removed opacity-100 from classes
                    role="alert"
                    style={{ opacity: successBoxOpacity }} // Control opacity with state
                >
                    <FaTrophy className="mr-2 text-green-500 h-6 w-6" />
                    <div>
                        <h3 className="font-bold">Congrats</h3>
                        <p>{applicationSuccess}</p>
                    </div>
                </div>
            )}


            <div
                className={`max-w-4xl mx-auto shadow-lg drop-shadow-2xl rounded-lg p-6 mt-30 transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"
                    } hover:shadow-xl`} 
            >
                {/* Top Section:  Logo, Title, Basic Info, and Poster */}
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
                            {jobPoster && (
                                <Link // Make the outer div a Link
                                to={`/users/${jobPoster.userId}`}
                                className={`flex items-center text-sm p-3 rounded-lg hover:shadow-lg hover:bg-sky-50  duration-300  ${darkMode ? 'text-gray-300 border-gray-500 border' : 'text-gray-700 border-gray-300'}`}
                                style={{ display: 'flex', textDecoration: 'none' }} // Ensure flex display and remove default link underline
                            >
                                {/* Profile Picture Container */}
                                <div className={`w-15 h-15 rounded-full bg-gray-300 mr-2 ${darkMode ? 'bg-gray-600' : ''} flex items-center justify-center`}>
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
                            </Link>
                            )}



                        </div>
                        <div className="flex flex-wrap items-center text-sm text-neutral-500 ">
                            <span className="flex items-center mr-4 font-bold">
                                <FaMapMarkerAlt className={`mr-1 ${darkMode ? 'text-red-500' : 'text-red-600'}`} />
                                {job.address}
                            </span>
                            <span className="flex items-center mr-4 font-bold">
                                <FaUsers className={`mr-1 ${darkMode ? 'text-purple-500' : 'text-purple-700'}`} />
                                {job.maxApplicants}
                            </span>
                            <span className="flex items-center mr-4 font-bold">
                                <FaCalendarAlt className={`mr-1 ${darkMode ? 'text-yellow-500' : 'text-amber-600'}`} />
                                Posted: {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                            <br />
                            <span className="flex items-center mr-4 font-bold ">
                                <FaUsers className={`mr-1 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                                Already applied: {job.applicantsCount}
                            </span>
                        </div>

                    </div>
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
                        <div className={`flex flex-wrap items-center mt-20 ${darkMode ? 'text-gray-300' : ''}`}>

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

                {/* Buttons */}
                <div className="flex justify-center sm:justify-end space-x-4 mb-6">
                    <button
                        onClick={handleApply}
                        className={`bg-green-500 text-white px-6 py-2 rounded-3xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 ${darkMode ? "dark:bg-green-700 dark:hover:bg-green-800" : ""
                            }`}
                    >
                        Apply
                    </button>
                    <button
                        onClick={toggleSave}
                        className={`px-2.5 py-2 rounded-3xl transition duration-300 ease-in-out transform hover:scale-105 flex items-center ${isSaved
                            ? (darkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-500 text-white hover:bg-red-600')
                            : (darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400')
                            }`}
                    >
                        {isSaved ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                    </button>
                </div>

            </div>



            {/* Apply Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-xs bg-opacity-50 flex justify-center items-center">

                    <div className={`  ${darkMode ? 'bg-gray-700 text-white' : 'bg-neutral-200 bg-opacity-40 '} rounded-lg p-8 max-w-md w-full mx-auto`}>
                        <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
                        <p className="mb-4">Leave an optional message with your application:</p>
                        <textarea
                            className={`w-full p-2 border rounded mb-4 text-black ${darkMode ? 'bg-gray-700 text-white border-gray-500' : ''}`}
                            placeholder="Optional message to the job poster..."
                            value={applicationMessage}
                            onChange={(e) => setApplicationMessage(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={submitApplication}
                                className={` px-4 py-2 rounded ${darkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'} `}
                            >
                                Submit Application
                            </button>
                            <button
                                id="cancel-apply"
                                onClick={toggleApplyModal}
                                className={`px-4 py-2 rounded   ${darkMode ? 'bg-gray-300 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700 '}`}
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