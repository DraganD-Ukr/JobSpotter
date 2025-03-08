import React, { useState, useEffect, useContext } from 'react';
import UserProfile from '../components/UserProfile'; 
import UserProfileSkeleton from '../components/skeleton/UserProfileSkeleton';
import { useParams } from 'react-router-dom'; // If using React Router for navigation
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext for dark mode
import { User } from 'lucide-react';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(null); // State for user ratings
    const [loading, setLoading] = useState(true);
    const [ratingLoading, setRatingLoading] = useState(true); // Separate loading for ratings, initialize to true
    const [error, setError] = useState(null);
    const [ratingError, setRatingError] = useState(null); // Separate error for ratings
    const { userId } = useParams();
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        console.log("useEffect is running for UserProfilePage with userId:", userId);

        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            console.log("fetchUserProfile function called");
            try {
                console.log("Attempting to fetch user profile for userId:", userId);
                const response = await fetch(`/api/v1/users/${userId}`);
                console.log("Fetch user profile response received:", response);

                if (!response.ok) {
                    console.log("User profile response was not OK:", response);
                    const message = `Could not fetch user profile: ${response.status} ${response.statusText}`;
                    throw new Error(message);
                }
                const userData = await response.json();
                console.log("User data received from API:", userData);
                setUser(userData);
            } catch (error) {
                console.error("Fetch user profile error:", error);
                setError(error.message);
                setUser(null);
            } finally {
                setLoading(false);
                console.log("Fetch user profile operation completed");
            }
        };

        const fetchUserRating = async () => {
            setRatingLoading(true); // Rating loading starts
            setRatingError(null);
            console.log("fetchUserRating function called");
            try {
                console.log("Attempting to fetch user rating for userId:", userId);
                const response = await fetch(`/api/v1/reviews/user/${userId}/ratings`);
                console.log("Fetch user rating response received:", response);

                if (!response.ok) {
                    console.log("User rating response was not OK:", response);
                    const message = `Could not fetch user ratings: ${response.status} ${response.statusText}`;
                    throw new Error(message);
                }
                const ratingData = await response.json();
                console.log("Rating data received from API:", ratingData);
                setRating(ratingData);
            } catch (error) {
                console.error("Fetch user rating error:", error);
                setRatingError(error.message);
                setRating(null);
            } finally {
                setRatingLoading(false); // Rating loading ends
                console.log("Fetch user rating operation completed");
            }
        };

        // Fetch both in parallel
        fetchUserProfile();
        fetchUserRating();


    }, [userId]); // Dependency array only on userId


    console.log("Component rendering, user state:", user, "rating state:", rating, "loading state:", loading, "ratingLoading:", ratingLoading, "error state:", error, "ratingError:", ratingError);

    return (
        <div className="container mx-auto py-10 px-4">

            {loading && <UserProfileSkeleton />} {/* Show skeleton while loading */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error fetching profile!</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Ratings loading and error are handled in UserProfile component now */}

            {!loading && !error && (
                <UserProfile
                    user={user}
                    rating={rating}
                    ratingLoading={ratingLoading} // Pass ratingLoading state
                    ratingError={ratingError}     // Pass ratingError state
                />
            )}


        </div>
    );
};

export default UserProfilePage;