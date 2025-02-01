import { useState } from "react";

export function Register() {
  // New state to track if registration was successful
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

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

  // Backend password validation rules
  const validatePassword = (password) => {
    const updatedRequirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
    };
    setPasswordRequirements(updatedRequirements);

    return /^[A-Za-z0-9!@#$%^&*()_+]{8,}$/.test(password);
  };

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) message = "First name cannot be empty.";
        else if (!/^[A-Za-z ]+$/.test(value))
          message = "First name can only contain letters and spaces.";
        break;

      case "lastName":
        if (!value.trim()) message = "Last name cannot be empty.";
        else if (!/^[A-Za-z ]+$/.test(value))
          message = "Last name can only contain letters and spaces.";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) message = "Email cannot be empty.";
        else if (!emailRegex.test(value)) message = "Invalid email format.";
        break;

      case "username":
        if (!value.trim()) message = "Username cannot be empty.";
        else if (!/^[A-Za-z0-9]{4,}$/.test(value))
          message =
            "Username must be at least 4 characters long and contain only letters and digits.";
        break;

      case "password":
        if (!value) message = "Password cannot be empty.";
        else if (!validatePassword(value))
          message =
            "Password must be at least 8 characters long and contain only valid symbols.";
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

    // Update form values
    setFormValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate the changed field and update errors
    const errorMessage = validateField(name, fieldValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    // Check overall form validity
    checkFormValidity({ ...formValues, [name]: fieldValue });
  };

  const checkFormValidity = (updatedValues) => {
    const hasErrors = Object.keys(updatedValues).some(
      (key) => validateField(key, updatedValues[key]) !== ""
    );
    setIsFormValid(!hasErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const payload = {
        username: formValues.username,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password,
        email: formValues.email,
      };

      try {
        const response = await fetch("/api/v1/user/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // If the API returns 201, update state to display the success message
          if (response.status === 201) {
            setRegistrationSuccessful(true);
          } else {
            // In case the API returns a different success status,
            // you can add extra handling here if needed.
            const data = await response.json();
            console.log("User registered successfully:", data);
          }
        } else {
          const errorData = await response.json();
          console.error("Registration failed:", errorData);
          if (response.status === 400 && errorData.message) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: errorData.message,
              email: errorData.message,
            }));
          } else {
            setErrors(
              errorData.errors || { general: "Registration failed. Please try again." }
            );
          }
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        setErrors({ general: "An error occurred. Please try again later." });
      }
    }
  };

  const areAllRequirementsMet =
    /^[A-Za-z0-9!@#$%^&*()_+]{8,}$/.test(formValues.password) &&
    formValues.password.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-4/5 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-l-2xl">
          </div>

          {/* Right Section */}
          <div className="p-10">
            {registrationSuccessful ? (
              // Registration Successful: Show success message and proceed button
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Registration Successful!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your account has been created successfully.
                </p>
                <a
                  href="/login"
                  className="inline-block px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                >
                  Proceed to Login
                </a>
              </div>
            ) : (
              // Registration Form
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

                {errors.general && (
                  <p className="text-red-500 text-sm mb-4">{errors.general}</p>
                )}

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
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
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
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
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
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
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
                    {errors.username && (
                      <p className="text-red-500 text-sm">{errors.username}</p>
                    )}
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
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}

                    {/* Toggle Password Requirements */}
                    {passwordFocused && (
                      <ul className="mt-2 text-sm list-disc pl-5">
                        <li
                          className={
                            passwordRequirements.minLength
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          At least 8 characters long
                        </li>
                        <li
                          className={
                            passwordRequirements.hasUppercase
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          Contains at least 1 uppercase letter
                        </li>
                        <li
                          className={
                            passwordRequirements.hasLowercase
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          Contains at least 1 lowercase letter
                        </li>
                        <li
                          className={
                            passwordRequirements.hasLetter
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          Contains at least 1 letter
                        </li>
                        <li
                          className={
                            passwordRequirements.hasNumber
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          Contains at least 1 number
                        </li>
                      </ul>
                    )}
                    {areAllRequirementsMet && (
                      <p className="text-green-600 mt-2">
                        Password requirements met!
                      </p>
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
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
