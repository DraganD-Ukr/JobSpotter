import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa'; // Assuming you're using react-icons
import axios from 'axios'; // Or your preferred HTTP client

const ProfilePicture = ({ userId, darkMode }) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME; // Access the bucket name

  const imgLink = `https://${bucketName}.s3.amazonaws.com/${userId}`; // Construct the image URL

  useEffect(() => {
    const fetchProfilePic = async () => {
        setLoading(true);
        try {
            // Check if the image exists by making a GET request to the S3 URL
            const response = await axios.get(imgLink, { 
                timeout: 5000 
            });
            
            // If the request was successful, the image exists
            if (response.status === 200) {
                setProfilePicUrl(imgLink);
            } else {
                setProfilePicUrl(null);  // Image does not exist, show placeholder
            }
        } catch (error) {
            console.warn('Error fetching profile picture:', error);
            setProfilePicUrl(null);  // Fallback to placeholder if error
        } finally {
            setLoading(false);
        }
    };

    fetchProfilePic();
}, [userId]);

  if (loading) {
    return (
      <div className={`w-20 h-20 rounded-full border-2 border-gray-400 ${darkMode ? 'dark:border-gray-600 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100'}`}>
        <div className="flex items-center justify-center h-full w-full rounded-full">
          <FaUser className={`h-10 w-10 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`} />
        </div>
      </div>
    ); // Or a loading spinner
  }

  if (profilePicUrl) {
    return (
      <img
        src={profilePicUrl}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover"
      />
    );
  }

  // Placeholder if image not found
  return (
    <div className={`w-20 h-20 rounded-full border-2 border-gray-400 ${darkMode ? 'dark:border-gray-600 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-center h-full w-full rounded-full">
        <FaUser className={`h-10 w-10 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`} />
      </div>
    </div>
  );

};

export default ProfilePicture;