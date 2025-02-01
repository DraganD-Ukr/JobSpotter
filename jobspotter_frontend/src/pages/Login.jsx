import { useState } from "react";

export function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Password Regex 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  // Input change handler with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Validates form whenever an input is changed
    validateForm({ ...formValues, [name]: value });
  };

  // Validation function
  const validateForm = (values) => {
    let validationErrors = {};

    // Username validation
    if (!values.username.trim()) {
      validationErrors.username = "Username is required.";
    } else if (values.username.length < 3) {
      validationErrors.username = "Username must be at least 3 characters.";
    }

    // Password validation
    if (!values.password) {
      validationErrors.password = "Password is required.";
    } else if (!passwordRegex.test(values.password)) {
      validationErrors.password =
        "Password must be at least 6 characters, include 1 uppercase letter, 1 lowercase letter, and 1 digit.";
    }

    setErrors(validationErrors);
    setIsButtonDisabled(Object.keys(validationErrors).length > 0);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert("Sign in successful!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-3/5 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left Section */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Username"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full text-white font-bold py-2 rounded-lg transition ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-lime-500 hover:opacity-90"
                }`}
              >
                Sign In
              </button>

              {/* Extra Options */}
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Remember Me
                </label>
                <a href="#" className="text-sm text-green-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-l-2xl">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="mt-2">Don't have an account?</p>
            <a
              href="/register"
              className="mt-4 px-6 py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
