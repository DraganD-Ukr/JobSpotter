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

        // Add a filename to the FormData
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
                <div className="relative w-20 h-20">
                    {loading ? (
                        <Placeholder darkMode={darkMode} />
                    ) : (
                        <>
                            {profilePicUrl ? (  // Check if profilePicUrl is truthy (not null, not empty string)
                                <img
                                    src={profilePicUrl}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover cursor-pointer"
                                    onClick={() => setShowModal(true)}
                                />
                            ) : (
                                <Placeholder darkMode={darkMode} onClick={() => setShowModal(true)} /> // Display Placeholder if profilePicUrl is null
                            )}
                            <label className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full cursor-pointer">
                                <FaEdit className="text-white text-sm" />
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
    <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-lg flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[600px] lg:h-[700px] xl:h-[800px] flex flex-col justify-center items-center">
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
                <FaTimes className="w-6 h-6" />
            </button>

            {!imageSrc ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <label className="flex flex-col items-center bg-gray-300 dark:bg-gray-600 p-4 rounded-lg cursor-pointer w-full">
                        <FaUpload className="text-gray-700 dark:text-gray-300 text-3xl mb-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-lg">Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            ) : (
                <>
                    <div className="relative w-[500px] h-[500px] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
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
                    <div className="flex justify-between mt-4 w-full">
                        <button className="bg-red-500 text-white px-6 py-2 rounded text-lg" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="bg-green-500 text-white px-6 py-2 rounded text-lg" onClick={uploadCroppedImage}>
                            Save
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
);

const Placeholder = ({ darkMode, onClick }) => (
    <div className={`w-20 h-20 rounded-full border-2 border-gray-400 ${darkMode ? 'dark:border-gray-600 bg-gray-200 dark:bg-gray-700' : 'bg-gray-100'}`} onClick={onClick}>
        <div className="flex items-center justify-center h-full w-full rounded-full cursor-pointer">
            <FaUser className={`h-10 w-10 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`} />
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
