import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContext';
import { BsInfoLg } from "react-icons/bs";
import {
    FaUser,

} from 'react-icons/fa';

const UserProfileSkeleton = () => {
    const { darkMode } = useContext(ThemeContext);
    const baseSkeletonClass = `animate-pulse rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`;
    const textSkeletonClass = `animate-pulse rounded-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`;
    const borderClass = `${darkMode ? 'border-gray-700' : 'border-gray-300'}`;

    return (
        <div className={`rounded-lg shadow-xl p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

            {/* Header Skeleton */}
            <div className={`mb-8 p-4 border-b ${borderClass} flex items-start justify-between`}>
                <div className="flex items-start">
                    <div className="mr-6">
                        <div className={`w-20 h-20 rounded-full border-2 border-gray-400 ${darkMode ? 'dark:border-gray-600 bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                             <FaUser className={`h-10 w-10 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`} />
                        </div>
                    </div>
                    <div>
                        <div className={`${baseSkeletonClass} h-8 w-48 mb-2`}></div> {/* Username skeleton */}
                        <div className={`${baseSkeletonClass} h-6 w-32`}></div>        {/* Status skeleton */}
                    </div>
                </div>
                {/* Ratings Skeleton (Placeholder) */}
                <div>
                    <div className={`${baseSkeletonClass} h-4 w-24 mb-2`}></div> {/* Rating Row 1 */}
                    <div className={`${baseSkeletonClass} h-4 w-24`}></div>    {/* Rating Row 2 */}
                </div>
            </div>

            {/* About Section Skeleton */}
            <div className={`mb-8 p-4 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`${baseSkeletonClass} h-6 w-32 mb-2`}></div> {/* About heading skeleton */}
                <div className={`${textSkeletonClass} h-4 w-full mb-1`}></div> {/* About text line 1 */}
                <div className={`${textSkeletonClass} h-4 w-5/6 mb-1`}></div> {/* About text line 2 */}
                <div className={`${textSkeletonClass} h-4 w-4/6`}></div>      {/* About text line 3 */}
            </div>

            {/* User Summary Skeleton */}
            <div className="flex justify-between mb-6">
                <div>
                    <div className={`${textSkeletonClass} h-4 w-24 mb-2`}></div> {/* Member Since label */}
                    <div className={`${baseSkeletonClass} h-6 w-32`}></div>      {/* Member Since date */}
                </div>
            </div>

            {/* User Info and Contact Skeletons */}
            <div className="flex mb-8">
                <div className="w-1/2 pr-4">
                    <div className={`p-4 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`${baseSkeletonClass} h-6 w-32 mb-2`}></div> {/* User Info heading */}
                        <div className={`${textSkeletonClass} h-4 w-48 mb-1 flex items-center`}>  </div> {/* Full Name */}
                        <div className={`${textSkeletonClass} h-4 w-32 mb-1 flex items-center`}>  </div> {/* Username */}
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <div className={`p-4 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`${baseSkeletonClass} h-6 w-32 mb-2`}></div> {/* Contact Details heading */}
                        <div className={`${textSkeletonClass} h-4 w-full mb-1 flex items-center`}> </div> {/* Email */}
                        <div className={`${textSkeletonClass} h-4 w-4/5 mb-1 flex items-center`}> </div>  {/* Phone */}
                    </div>
                </div>
            </div>

            {/* Account Type Skeleton */}
            <div className={`p-4 rounded-lg border mb-6 ${borderClass} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`${baseSkeletonClass} h-6 w-32 mb-3`}></div> {/* Account Type heading */}
                <div className="flex items-center">
                    <FaUser className={`mr-3 h-6 w-6 text-gray-500 ${darkMode ? 'text-gray-400' : ''}`} />
                    <div className={`${baseSkeletonClass} h-6 w-40`}></div>      {/* Account Type text */}
                </div>
            </div>

            {/* System Information Skeleton */}
            <div className={`p-4 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`${baseSkeletonClass} h-6 w-32 mb-3`}></div> {/* System Info heading */}
                <div className="flex items-center">
                    
                    <div className={`${baseSkeletonClass} h-6 w-48`}></div>      {/* User ID text */}
                </div>
            </div>

        </div>
    );
};

export default UserProfileSkeleton;