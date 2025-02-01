import { useState } from "react";

export function Register() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasLetter: false,
    hasNumber: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password validation rules
  const validatePassword = (password) => {
    const updatedRequirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
    };
    setPasswordRequirements(updatedRequirements);

    return Object.values(updatedRequirements).every((req) => req);
  };

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) message = "First name is required.";
        break;
      case "lastName":
        if (!value.trim()) message = "Last name is required.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) message = "Email is required.";
        else if (!emailRegex.test(value)) message = "Enter a valid email address.";
        break;
      case "username":
        if (value.length < 3) message = "Username must be at least 3 characters.";
        break;
      case "password":
        if (!value) message = "Password is required.";
        else if (!validatePassword(value)) message = "Password must meet all requirements.";
        break;
      case "confirmPassword":
        if (value !== formValues.password) message = "Passwords do not match.";
        break;
      case "agreeToTerms":
        if (!value) message = "You must agree to the terms of service.";
        break;
      default:
        break;
    }
    return message;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    const errorMessage = validateField(name, fieldValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    checkFormValidity({ ...formValues, [name]: fieldValue });
  };

  const checkFormValidity = (updatedValues) => {
    const hasErrors = Object.keys(updatedValues).some(
      (key) => validateField(key, updatedValues[key]) !== ""
    );
    setIsFormValid(!hasErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Registration successful!");
    }
  };

  const areAllRequirementsMet =
    Object.values(passwordRequirements).every((req) => req) && formValues.password.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-4/5 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-l-2xl">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="mt-2 text-sm">Already have an account?</p>
            <a
              href="/login"
              className="mt-4 px-6 py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200"
            >
              Sign In
            </a>
          </div>

          {/* Right Section - Registration Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* First Name */}
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Username */}
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                {/* Toggle Password Requirements */}
                {passwordFocused && (
                  <ul className="mt-2 text-sm list-disc pl-5">
                    <li
                      className={passwordRequirements.minLength ? "text-green-600" : "text-red-500"}
                    >
                      At least 8 characters long
                    </li>
                    <li
                      className={passwordRequirements.hasUppercase ? "text-green-600" : "text-red-500"}
                    >
                      Contains at least 1 uppercase letter
                    </li>
                    <li
                      className={passwordRequirements.hasLowercase ? "text-green-600" : "text-red-500"}
                    >
                      Contains at least 1 lowercase letter
                    </li>
                    <li
                      className={passwordRequirements.hasLetter ? "text-green-600" : "text-red-500"}
                    >
                      Contains at least 1 letter
                    </li>
                    <li
                      className={passwordRequirements.hasNumber ? "text-green-600" : "text-red-500"}
                    >
                      Contains at least 1 number
                    </li>
                  </ul>
                )}
                {areAllRequirementsMet && (
                  <p className="text-green-600 mt-2">Password requirements met!</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms of Service */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formValues.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-500"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-green-600 underline">
                    Terms of Service
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2 ${
                  isFormValid
                    ? "bg-gradient-to-r from-green-500 to-lime-500"
                    : "bg-gray-300"
                } text-white font-bold rounded-lg hover:opacity-90`}
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 font-bold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
