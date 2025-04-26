import React, { useState, useEffect, useContext } from 'react';
import UserProfile from '../components/UserProfile'; 
import UserProfileSkeleton from '../components/skeleton/UserProfileSkeleton';
import { useParams } from 'react-router-dom';
import { ThemeContext } from "../components/ThemeContext";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratingLoading, setRatingLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratingError, setRatingError] = useState(null);
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
            setRatingLoading(true);
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
                setRatingLoading(false);
                console.log("Fetch user rating operation completed");
            }
        };

        fetchUserProfile();
        fetchUserRating();
    }, [userId]);

    console.log("Component rendering, user state:", user, "rating state:", rating, "loading state:", loading, "ratingLoading:", ratingLoading, "error state:", error, "ratingError:", ratingError);

    return (
        <div className="container mx-auto py-4 xs:py-6 sm:py-8 md:py-10 px-4 xs:px-6 sm:px-8">
            {loading && <UserProfileSkeleton />}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded relative mb-2 xs:mb-3 sm:mb-4" role="alert">
                    <strong className="font-bold text-xs xs:text-sm sm:text-base md:text-lg">Error fetching profile!</strong>
                    <span className="block sm:inline text-xs xs:text-sm sm:text-base md:text-lg">{error}</span>
                </div>
            )}

            {!loading && !error && (
                <UserProfile
                    user={user}
                    rating={rating}
                    ratingLoading={ratingLoading}
                    ratingError={ratingError}
                />
            )}
        </div>
    );
};

export default UserProfilePage;