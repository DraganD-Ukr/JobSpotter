import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

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
    hasSpecial: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password validation
  const validatePassword = (password) => {
    const updatedRequirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+]/.test(password),
    };
    setPasswordRequirements(updatedRequirements);
    return (
      updatedRequirements.minLength &&
      updatedRequirements.hasLetter &&
      updatedRequirements.hasNumber &&
      updatedRequirements.hasSpecial
    );
  };

  // Field‑specific validation
  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) message = "First name cannot be empty.";
        else if (!/^[A-Za-z' -]+$/.test(value))
          message = "First name can include letters, apostrophes or hyphens only.";
        break;

      case "lastName":
        if (!value.trim()) message = "Last name cannot be empty.";
        else if (!/^[A-Za-z' -]+$/.test(value))
          message = "Last name can include letters, apostrophes or hyphens only.";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) message = "Email cannot be empty.";
        else if (!emailRegex.test(value)) message = "Invalid email format.";
        break;

      case "username":
        if (!value.trim()) message = "Username cannot be empty.";
        else if (!/^[A-Za-z0-9' -]{4,}$/.test(value))
          message =
            "Username must be ≥4 chars and may include letters, digits, apostrophes or hyphens.";
        break;

      case "password":
        if (!value) message = "Password cannot be empty.";
        else if (!validatePassword(value))
          message =
            "Password must be ≥8 chars with a letter, a number and a special symbol.";
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    const updatedValues = { ...formValues, [name]: fieldValue };
    setFormValues(updatedValues);

    const errorMessage = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));

    checkFormValidity(updatedValues);
  };

  // Check overall form validity
  const checkFormValidity = (values) => {
    const hasErrors = Object.keys(values).some(
      (key) => validateField(key, values[key]) !== ""
    );
    setIsFormValid(!hasErrors);
  };

  // Form submission
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
        // Register
        const registerResponse = await fetch("/api/v1/users/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (registerResponse.ok && registerResponse.status === 201) {
          // Auto‑login
          const loginResponse = await fetch("/api/v1/users/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              username: formValues.username,
              password: formValues.password,
            }),
          });

          if (loginResponse.ok) {
            const meResponse = await fetch("/api/v1/users/me", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
            if (meResponse.ok) {
              const userData = await meResponse.json();
              if (userData.userId) sessionStorage.setItem("userId", userData.userId);
            }
            window.location.href = "/SearchJobPost";
          } else {
            setErrors({ general: "Login failed. Please try to log in manually." });
          }
        } else {
          const errorData = await registerResponse.json();
          if (registerResponse.status === 400 && errorData.message) {
            setErrors((prev) => ({ ...prev, username: errorData.message, email: errorData.message }));
          } else {
            setErrors(
              errorData.errors || { general: "Registration failed. Please try again." }
            );
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ general: "An error occurred. Please try again later." });
      }
    }
  };

  const areAllRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  // Render
  return (
    <div className="register-page main-content min-h-screen p-4 flex items-center justify-center my-10 rounded-4xl border">
      <div className="card w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center p-10 lava-lamp-background text-white">
          <h2 className="text-3xl font-extrabold mb-4 drop-shadow-lg text-center">
            Welcome to JobSpotter!
          </h2>
          <p className="mb-6 text-center max-w-sm leading-relaxed">
            Create an account to discover new job opportunities and connect with local employers.
          </p>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline font-bold hover:opacity-90">
              Sign In <FaArrowRight className="inline ml-1" />
            </Link>
          </p>
        </div>

        {/* Right Panel – Form */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

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

              {/* Password Requirements */}
              {passwordFocused && (
                <ul className="mt-2 text-sm list-disc pl-5">
                  <li className={passwordRequirements.minLength ? "text-green-600" : "text-red-500"}>
                    At least 8 characters long
                  </li>
                  <li className={passwordRequirements.hasUppercase ? "text-green-600" : "text-red-500"}>
                    At least 1 uppercase letter
                  </li>
                  <li className={passwordRequirements.hasLowercase ? "text-green-600" : "text-red-500"}>
                    At least 1 lowercase letter
                  </li>
                  <li className={passwordRequirements.hasNumber ? "text-green-600" : "text-red-500"}>
                    At least 1 number
                  </li>
                  <li className={passwordRequirements.hasSpecial ? "text-green-600" : "text-red-500"}>
                    At least 1 special symbol
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
              <label className="ml-2 text-sm">
                I agree to the{" "}
                <Link to="/terms-of-service" className="text-green-600 underline">
                  Terms of Service
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 ${
                isFormValid ? "bg-gradient-to-r from-green-500 to-lime-500" : "bg-gray-300"
              } text-white font-bold rounded-lg hover:opacity-90 transition`}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
