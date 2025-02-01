import { useState, useEffect, useRef } from "react";
import { Search, LogOut } from "lucide-react";
import trollImage from "../assets/troll.jpg";
import gigachadImage from "../assets/gigachad.png";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 lava-lamp-background p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-white font-bold text-xl">
          JobSpotter
        </a>

        <div className="relative flex items-center ml-auto mr-4" ref={searchRef}>
          {!isExpanded ? (
            <button
              className="bg-gradient-to-r from-green-500 to-lime-500 p-2 rounded-full shadow hover:opacity-80 transition duration-300"
              onClick={() => setIsExpanded(true)}
            >
              <Search className="text-white" size={24} />
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-full shadow-md overflow-hidden w-[400px]">
              <div className="flex items-center px-3 w-2/3">
                <Search className="text-gray-500" size={20} />
                <input
                  type="text"
                  className="w-full bg-gray-100 px-3 py-2 rounded-l-full focus:outline-none"
                  placeholder="Search"
                />
              </div>

              <div className="w-px h-8 bg-gray-300"></div>

              <div className="flex items-center px-3 w-1/3">
                <img src={trollImage} alt="Location" className="w-6 h-6 rounded-full" />
                <input
                  type="text"
                  className="w-full bg-gray-100 px-3 py-2 rounded-r-full focus:outline-none"
                  placeholder="Location"
                />
              </div>
            </div>
          )}
        </div>

        <ul className="flex gap-4 items-center">
         <li>
            <a href="/jobpost" className="bg-yellow-500 px-4 py-1.5 text-white rounded-md hover:bg-yellow-600 duration-200">
              Job Posts
            </a>
          </li>
          <li>
            <a href="/login" className="bg-green-700 px-4 py-1.5 text-white rounded-md hover:bg-green-800">
              Login
            </a>
          </li>

          <li>
            <a href="/register" className="bg-lime-700 px-4 py-1.5 text-white rounded-md hover:bg-lime-800">
              Register
            </a>
          </li>

          

          <div className="relative" ref={profileMenuRef}>
            <img
              src={gigachadImage}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Job Activity
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                  Sign Out <LogOut className="ml-auto" size={16} />
                </a>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}
