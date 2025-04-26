import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

export function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Username and password regex from the backend constraints
  const usernameRegex = /^[A-Za-z0-9]{4,}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+]{8,}$/;

  // Input change handler with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updatedValues = { ...formValues, [name]: val };
    setFormValues(updatedValues);
    validateForm(updatedValues);
  };

  // Calculate form progress only count valid fields with checkmarks
  useEffect(() => {
    const validFields = Object.entries(formValues)
      .filter(([key, value]) => {
        if (key === 'rememberMe') return false;
        return typeof value === 'string' && 
               value.length > 0 && 
               !errors[key];
      })
      .length;
    setFormProgress((validFields / 2) * 100);
  }, [formValues, errors]);

  // Validation function
  const validateForm = (values) => {
    let validationErrors = {};

    if (!values.username.trim()) {
      validationErrors.username = "Username cannot be empty.";
    } else if (!usernameRegex.test(values.username)) {
      validationErrors.username =
        "Username must be at least 4 characters long and contain only letters and digits.";
    }

    if (!values.password) {
      validationErrors.password = "Password cannot be empty.";
    } else if (!passwordRegex.test(values.password)) {
      validationErrors.password =
        "Password must be at least 8 characters long and contain only letters, digits, and special characters.";
    }

    setErrors(validationErrors);
    setIsButtonDisabled(Object.keys(validationErrors).length > 0);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/v1/users/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formValues.username,
            password: formValues.password
          }),
        });

        if (response.ok) {
          const meResponse = await fetch("/api/v1/users/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (meResponse.ok) {
            const userData = await meResponse.json();
            if (userData.userId) {
              sessionStorage.setItem("userId", userData.userId);
            }

            if (userData.userType === "ADMIN") {
              window.location.href = "/dashboard";
            } else {
              window.location.href = "/SearchJobPost";
            }
          } else {
            const errorData = await meResponse.json();
            setErrors(
              errorData.errors || {
                general: "Failed to retrieve user data.",
              }
            );
          }
        } else if (response.status === 403) {
          setErrors({
            general: "You have been banned. Please contact support.",
          });
        } else {
          const errorData = await response.json();
          setErrors(
            errorData.errors || {
              general: "Login failed. Please check your credentials.",
            }
          );
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setErrors({ general: "An error occurred. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const fieldAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  // Render the login form
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="login-page main-content min-h-screen p-4 xs:p-6 sm:p-8 flex items-center justify-center my-6 xs:my-8 sm:my-10 rounded-3xl border font-sans"
    >
      {/* Outer container with two columns */}
      <div className="card w-full max-w-2xl xs:max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative">
        {/* Progress bar */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-lime-500"
          style={{ width: `${formProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${formProgress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Left Section: Welcome Panel */}
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-center items-center p-4 xs:p-6 sm:p-8 lava-lamp-background text-white"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 drop-shadow-lg">
            Welcome Back!
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl drop-shadow-sm mb-4 xs:mb-6 sm:mb-8">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="mt-2 xs:mt-4 px-4 xs:px-6 py-2 text-sm xs:text-base sm:text-lg md:text-xl bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200 transition flex items-center"
          >
            Sign Up <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>

        {/* Right Section: Form */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-4 xs:p-6 sm:p-8"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8">
            Sign In
          </h2>
          {errors.general && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 mb-4 xs:mb-6 sm:mb-8 p-2 xs:p-3 bg-red-50 rounded-lg text-sm xs:text-base sm:text-lg"
            >
              {errors.general}
            </motion.p>
          )}
          <motion.form 
            onSubmit={handleSubmit} 
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-4 xs:space-y-5 sm:space-y-6"
          >
            {/* Username */}
            <motion.div variants={fieldAnim} className="relative mb-4 xs:mb-6 sm:mb-8">
              <label className="block text-sm xs:text-base sm:text-lg font-medium mb-1 xs:mb-2">
                Username
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <motion.input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Username or Email"
                    className="mt-1 block w-full px-4 py-2 xs:px-5 xs:py-3 sm:px-6 sm:py-4 border rounded-lg focus:outline-none focus:border-gray-400 text-sm xs:text-base sm:text-lg"
                    whileHover={{ scale: 1 }}
                    whileFocus={{ scale: 1 }}
                  />
                </div>
                <div className="flex-shrink-0 ml-2 xs:ml-3 sm:ml-4 w-6 h-6 flex items-center justify-center">
                  <AnimatePresence>
                    {formValues.username && !errors.username && (
                      <motion.div
                        key="ok"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaCheck className="text-green-500 text-lg xs:text-xl sm:text-2xl" />
                      </motion.div>
                    )}
                    {errors.username && (
                      <motion.div
                        key="bad"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaTimes className="text-red-500 text-lg xs:text-xl sm:text-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs xs:text-sm sm:text-base mt-1 xs:mt-2"
                >
                  {errors.username}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={fieldAnim} className="relative mb-4 xs:mb-6 sm:mb-8">
              <label className="block text-sm xs:text-base sm:text-lg font-medium mb-1 xs:mb-2">
                Password
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="mt-1 block w-full px-4 py-2 xs:px-5 xs:py-3 sm:px-6 sm:py-4 border rounded-lg focus:outline-none focus:border-gray-400 pr-10 text-sm xs:text-base sm:text-lg"
                    whileHover={{ scale: 1 }}
                    whileFocus={{ scale: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-1"
                  >
                    {showPassword ? <FaEyeSlash className="text-lg xs:text-xl sm:text-2xl" /> : <FaEye className="text-lg xs:text-xl sm:text-2xl" />}
                  </button>
                </div>
                <div className="flex-shrink-0 ml-2 xs:ml-3 sm:ml-4 w-6 h-6 flex items-center justify-center">
                  <AnimatePresence>
                    {formValues.password && !errors.password && (
                      <motion.div
                        key="ok"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaCheck className="text-green-500 text-lg xs:text-xl sm:text-2xl" />
                      </motion.div>
                    )}
                    {errors.password && (
                      <motion.div
                        key="bad"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaTimes className="text-red-500 text-lg xs:text-xl sm:text-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs xs:text-sm sm:text-base mt-1 xs:mt-2"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Sign In button matching width of input fields */}
            <div className="flex items-center">
              <motion.button
                type="submit"
                disabled={isButtonDisabled || isLoading}
                whileHover={!isButtonDisabled && !isLoading ? { scale: 1.05 } : {}}
                whileTap={!isButtonDisabled && !isLoading ? { scale: 0.95 } : {}}
                className={`flex-grow text-white font-bold py-2 xs:py-3 sm:py-4 rounded-lg transition flex items-center justify-center text-sm xs:text-base sm:text-lg md:text-xl ${isButtonDisabled || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-lime-500 hover:opacity-90"
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="ml-2">Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
              <div className="flex-shrink-0 ml-2 xs:ml-3 sm:ml-4 w-6 h-6"></div>
            </div>

            {/* Extras */}
            <motion.div 
              variants={fieldAnim}
              className="flex items-center justify-between mt-2 xs:mt-4 sm:mt-6"
            >
              <label className="flex items-center text-xs xs:text-sm sm:text-base">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formValues.rememberMe}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 xs:h-5 xs:w-5 text-green-500"
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-xs xs:text-sm sm:text-base text-green-600 hover:underline">
                Forgot Password?
              </Link>
            </motion.div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 xs:mt-4 sm:mt-6 text-xs xs:text-sm sm:text-base"
          >
            <div className="flex items-center justify-center">
              <span>Don't have an account?{' '}</span>
              <Link
                to="/register"
                className="text-green-600 font-bold hover:underline ml-1"
              >
                Sign Up
              </Link>
            </div>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}