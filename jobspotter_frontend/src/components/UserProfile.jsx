import React, { useContext, useState } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { formatDate, formatTextDate } from '../utils/dateUtils';

import UserProfileSkeleton from './skeleton/UserProfileSkeleton'; // Import skeleton component

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaRegIdCard,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaInfoCircle // Import info icon
} from 'react-icons/fa';
import { BsInfoLg } from "react-icons/bs";
import ProfilePicture from './ProfilePicture';


// Helper function to render star ratings
const StarRating = ({ rating }) => {
    const { darkMode } = useContext(ThemeContext);
    if (rating === null || rating === undefined) {
        return <span className={` ${darkMode ? 'text-gray-500' : 'text-gray-400'} `}>No Ratings yet...</span>;
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }
    return <div className="flex items-center">{stars} <span className="ml-2 text-gray-600 dark:text-gray-400">({rating.toFixed(1)})</span></div>;
};


const UserProfile = React.memo(({ user, rating, ratingLoading, ratingError }) => { // Accept ratingLoading and ratingError props
    const { darkMode } = useContext(ThemeContext);
    const [isTooltipVisible, setTooltipVisible] = useState(false); // State for tooltip visibility

    const handleTooltipMouseEnter = () => setTooltipVisible(true);
    const handleTooltipMouseLeave = () => setTooltipVisible(false);

    if (!user) {
        return <p className={`text-gray-500 ${darkMode ? 'text-gray-400' : ''}`}>No user data available.</p>;
    }

    

    return (
        <div className={`rounded-lg shadow-xl p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>

            {/* Header with Profile Picture and Ratings */}
            <div className={`mb-8 p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-start justify-between`}> {/* items-start and justify-between */}

                {/* Profile Picture and Username */}
                <div className="flex items-start"> {/* items-start for vertical alignment of pic and username */}
                    <div className="mr-6">
                        <ProfilePicture userId={user.userId} darkMode={darkMode} />
                    </div>
                    <div> {/* Container for username and status */}
                        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{user.username}</h2>
                        <div className={`font-semibold text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            Active User
                        </div>
                    </div>
                </div>

                {/* User Ratings  */}
                <div className="text-right relative"> {/* Align ratings to the right and relative for tooltip positioning */}
                    {ratingLoading ? (
                        <p className="text-gray-500 dark:text-gray-300">Loading ratings...</p>
                    ) : ratingError ? (
                        <p className="text-red-500 dark:text-red-400">Error loading ratings.</p>
                    ) : rating ? (
                        <div className="flex flex-col items-end"> {/* Vertical flex and align-items-end for right alignment */}
                            <div className="mb-1 flex items-center"> {/* Provider Rating */}

                                <FaInfoCircle
                                    className="ml-1 text-gray-500 dark:text-gray-400 cursor-pointer"
                                    onMouseEnter={handleTooltipMouseEnter}
                                    onMouseLeave={handleTooltipMouseLeave}
                                />
                            </div>
                            <div className="mb-1 flex items-center"> {/* Provider Rating */}
                                <span className={`mr-2 font-medium  ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Provider:</span>
                                <StarRating rating={rating?.avgProviderRating || null} />
                                <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>({rating?.providerRatingCount || 0})</span>
                            </div>
                            <div className="flex items-center"> {/* Seeker Rating */}
                                <span className={`mr-2 font-medium  ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Seeker:</span>
                                <StarRating rating={rating?.avgSeekerRating || null} />
                                <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>({rating?.seekerRatingCount || 0})</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-300">Ratings not available.</p>
                    )}
                    {/* Tooltip Popup */}
                    {/* Tooltip Popup */}
                    <div
                        className={`absolute right-0 top-full text-left mt-2 p-4 rounded-md shadow-xl w-64 md:w-80 lg:w-96 transition-opacity duration-300 ease-in-out transform ${darkMode
                                ? 'bg-gray-800 text-white border border-gray-700'
                                : 'bg-white text-gray-800 border border-gray-300'
                            } ${isTooltipVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleTooltipMouseLeave}
                    >
                        <p className="text-sm">
                            <b>Provider Ratings:</b> Average rating given to this user as a{' '}
                            <a className="font-semibold decoration-2 underline decoration-sky-500/60">provider</a>.
                            <br />
                            <br />
                            <b>Seeker Ratings:</b> Average rating given to this user as a{' '}
                            <a className="font-semibold decoration-2 underline decoration-red-300/60">seeker</a>.
                            <br />
                            <br />
                            Ratings are based on a 5-star scale.
                        </p>
                    </div>

                </div>
            </div>

            {/* About Section - Separate Section Below Header */}
            <div className={`mb-8 p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>About</h4>
                <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{user.about || 'No bio available.'}</p>
            </div>

            {/* User Summary Section (Moved below About for visual flow) */}
            <div className="flex justify-between mb-6">
                <div>
                    <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : ''}`}>Member Since:</p>
                    <p className={`font-semibold  ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.createdAt ? formatTextDate(user.createdAt) : 'N/A'}
                    </p>
                </div>
            </div>

            {/* From and To style sections - User Info and Contact */}
            <div className="flex mb-8">
                <div className="w-1/2 pr-4">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                        <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>User Information</h4>
                        <div>
                            <p className={`mb-1 flex items-center  ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><BsInfoLg className="mr-2" /> Full Name: <span className={`font-semibold ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.firstName} {user.lastName}</span></p>
                            <p className={`mb-1 flex items-center  ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><BsInfoLg className="mr-2" /> Username: <span className={`font-semibold ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>@{user.username}</span></p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                        <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Contact Details</h4>
                        <div>
                            <p className={`mb-1 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> <FaEnvelope className="mr-2" /> Email: <span className={`font-semibold ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.email}</span></p>
                            <p className={`mb-1 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> <FaPhone className="mr-2" /> Phone: <span className={`font-semibold ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.phoneNumber || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects/Items like section - User Type */}
            <div className={`p-4 rounded-lg border mb-6 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                <h4 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Account Type</h4>
                <div className="flex items-center">
                    <FaUser className={`mr-3 h-6 w-6 text-gray-500 ${darkMode ? 'text-gray-400' : ''}`} />
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.userType}</p>
                </div>
            </div>

            {/* Activity/Timeline-like Section - User ID */}
            <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
                <h4 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>System Information</h4>
                <div className="flex items-center">
                    <FaRegIdCard className={`mr-3 h-6 w-6 text-gray-500 ${darkMode ? 'text-gray-400' : ''}`} />
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User ID: {user.userId}</p>
                </div>
            </div>

            {/* You can add more sections here if needed */}

        </div>
    );
});





export default UserProfile;