import { useState } from "react";

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Username and password regex from the backend constraints
  const usernameRegex = /^[A-Za-z0-9]{4,}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+]{8,}$/;

  // Input change handler with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    validateForm(updatedValues);
  };

  // Validation function
  const validateForm = (values) => {
    let validationErrors = {};

    // Username validation
    if (!values.username.trim()) {
      validationErrors.username = "Username cannot be empty.";
    } else if (!usernameRegex.test(values.username)) {
      validationErrors.username =
        "Username must be at least 4 characters long and contain only letters and digits.";
    }

    // Password validation
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

    // Proceed only if there are no validation errors
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("/api/v1/users/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          // Login was successful. Now, make a request to /api/v1/users/me
          const meResponse = await fetch("/api/v1/users/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (meResponse.ok) {
            const userData = await meResponse.json();
            // Store only the user id in session storage
            sessionStorage.setItem("userId", userData.userId);
            setLoggedIn(true);
          } else {
            // Handle error if /me endpoint fails
            const errorData = await meResponse.json();
            setErrors(
              errorData.errors || {
                general: "Failed to retrieve user data.",
              }
            );
          }
        } else {
          // If login fails, extract error messages from the response.
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
      }
    }
  };

  // Handler to redirect the user to the job posts page
  const handleRedirect = () => {
    window.location.href = "/SearchJobPost";
  };

  // If login is successful, remove the form and display a success message with two buttons.
  if (loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="bg-white dark:bg-gray-800 w-3/5 max-w-4xl rounded-lg shadow-lg p-6 text-center transition-colors duration-500">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Login Successful!
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            You have successfully logged in. Click one of the buttons below to proceed.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRedirect}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold rounded-lg hover:opacity-90 transition"
            >
              Go to Job Posts
            </button>
            <button
              onClick={() => (window.location.href = "/profile")}
              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:opacity-90 transition"
            >
              See Profiles
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the login form when not logged in.
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
      {/* Outer container with two columns */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-500">
        {/* Left Section: Lava-Lamp / Brand Panel */}
        <div className="hidden md:flex flex-col justify-center items-center p-10 lava-lamp-background text-white">
          <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">Welcome Back!</h2>
          <p className="drop-shadow-sm">Don't have an account?</p>
          <a
            href="/register"
            className="mt-4 px-6 py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Right Section: Form */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Sign In
          </h2>
          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Username or Email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full text-white font-bold py-2 rounded-lg transition mt-2 ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-lime-500 hover:opacity-90"
              }`}
            >
              Sign In
            </button>

            {/* Extra Options */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-sm text-green-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
