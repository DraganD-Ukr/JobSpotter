import React, { useState, useEffect, useCallback } from 'react';
import { FaUser, FaTimes, FaEdit, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import Cropper from 'react-easy-crop';

const ProfilePicture = ({ userId, darkMode }) => {
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
    const imgLink = `https://${bucketName}.s3.amazonaws.com/${userId}`;

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
                    setProfilePicUrl(null); 
                }
            } catch (error) {
                console.warn('Error fetching profile picture:', error);
                setProfilePicUrl(null);  
            } finally {
                setLoading(false);
            }
        };

        fetchProfilePic();
    }, [userId]);


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result);
                setShowModal(true);
            };
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadCroppedImage = async () => {
        if (!croppedAreaPixels || !imageSrc) return;

        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        const formData = new FormData();

        formData.append('profileImage', croppedImage, 'profileImage.jpg');

        try {
            await axios.put('http://localhost:8100/api/v1/users/me/profile-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            setProfilePicUrl(URL.createObjectURL(croppedImage));
            setShowModal(false);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="relative w-16 xs:w-20 sm:w-24 h-16 xs:h-20 sm:h-24">
            {loading ? (
                <Placeholder darkMode={darkMode} />
            ) : (
                <>
                    {profilePicUrl ? (  
                        <img
                            src={profilePicUrl}
                            alt="Profile"
                            className="w-16 xs:w-20 sm:w-24 h-16 xs:h-20 sm:h-24 rounded-full object-cover cursor-pointer"
                            onClick={() => setShowModal(true)}
                        />
                    ) : (
                        <Placeholder darkMode={darkMode} onClick={() => setShowModal(true)} /> // Display Placeholder if profilePicUrl is null
                    )}
                    <label className="absolute bottom-0 right-0 bg-gray-700 p-1 xs:p-1.5 sm:p-2 rounded-full cursor-pointer">
                        <FaEdit className="text-white text-xs xs:text-sm sm:text-sm" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </>
            )}

            {showModal && (
                <CropModal
                    imageSrc={imageSrc}
                    crop={crop}
                    setCrop={setCrop}
                    zoom={zoom}
                    setZoom={setZoom}
                    onCropComplete={onCropComplete}
                    uploadCroppedImage={uploadCroppedImage}
                    closeModal={() => setShowModal(false)}
                    handleFileChange={handleFileChange}
                />
            )}
        </div>
    );
};

const CropModal = ({
    imageSrc,
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    uploadCroppedImage,
    closeModal,
    handleFileChange,
}) => (
    <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-lg flex justify-center items-center p-2 xs:p-3 sm:p-4">
        <div className={`
            bg-white dark:bg-gray-800 p-2 xs:p-3 sm:p-4 rounded-lg shadow-lg 
            w-full max-w-[90%] xs:max-w-[80%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 
            h-[500px] xs:h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[800px] 
            flex flex-col justify-center items-center
        `}>
            <button
                onClick={closeModal}
                className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
                <FaTimes className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
            </button>

            {!imageSrc ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <label className="flex flex-col items-center bg-gray-300 dark:bg-gray-600 p-2 xs:p-3 sm:p-4 rounded-lg cursor-pointer w-full">
                        <FaUpload className="text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-3xl mb-1 xs:mb-2 sm:mb-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm xs:text-base sm:text-lg">Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            ) : (
                <>
                    <div className="relative w-[300px] xs:w-[400px] sm:w-[500px] h-[300px] xs:h-[400px] sm:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between mt-2 xs:mt-3 sm:mt-4 w-full gap-2 xs:gap-3 sm:gap-4">
                        <button 
                            className="w-full sm:w-auto bg-red-500 text-white px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-2 rounded text-sm xs:text-base sm:text-lg" 
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button 
                            className="w-full sm:w-auto bg-green-500 text-white px-4 xs:px-5 sm:px-6 py-1 xs:py-2 sm:py-2 rounded text-sm xs:text-base sm:text-lg" 
                            onClick={uploadCroppedImage}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
);

const Placeholder = ({ darkMode, onClick }) => (
    <div 
        className={`w-16 xs:w-20 sm:w-24 h-16 xs:h-20 sm:h-24 rounded-full border-2 border-gray-400 ${darkMode ? 'dark:border-gray-600 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100'}`} 
        onClick={onClick}
    >
        <div className="flex items-center justify-center h-full w-full rounded-full cursor-pointer">
            <FaUser className={`h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`} />
        </div>
    </div>
);

const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
};

export default ProfilePicture;