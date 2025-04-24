import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

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
  const [passwordReqs, setPasswordReqs] = useState({});
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);
  const [isValidForm, setIsValidForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pw) => {
    if (!pw || pw.length === 0) {
      const emptyRequirements = {
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecial: false
      };
      setPwdStrength(0);
      setPasswordReqs(emptyRequirements);
      return false;
    }
    
    const requirements = {
      minLength: pw.length >= 8,
      hasUpper: /[A-Z]/.test(pw),
      hasLower: /[a-z]/.test(pw),
      hasLetter: /[A-Za-z]/.test(pw),
      hasNumber: /\d/.test(pw),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]+/.test(pw)
    };
    
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = Math.min(100, Math.round((metRequirements / 6) * 100));
    setPwdStrength(strengthPercentage);
    setPasswordReqs(requirements);
    
    return Object.values(requirements).every(Boolean);
  };

  const validateField = (name, val) => {
    let msg = "";
    switch (name) {
      case "firstName":
        if (!val.trim())
          msg = "First name cannot be empty.";
        else if (!/^[A-Za-z'\- ]+$/.test(val))
          msg = "First name can only contain letters, apostrophes, hyphens and spaces.";
        break;
      case "lastName":
        if (!val.trim())
          msg = "Last name cannot be empty.";
        else if (!/^[A-Za-z'\- ]+$/.test(val))
          msg = "Last name can only contain letters, apostrophes, hyphens and spaces.";
        break;
      case "email":
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val.trim()) msg = "Email cannot be empty.";
        else if (!re.test(val)) msg = "Invalid email format.";
        break;
      case "username":
        if (!val.trim()) msg = "Username cannot be empty.";
        else if (!/^[A-Za-z0-9]{4,}$/.test(val))
          msg = "Username must be at least 4 characters long and contain only letters and numbers.";
        break;
      case "password":
        if (!val) msg = "Password cannot be empty.";
        else if (!validatePassword(val))
          msg = "Password must meet all requirements listed below.";
        break;
      case "confirmPassword":
        if (val !== formValues.password)
          msg = "Passwords do not match.";
        break;
      case "agreeToTerms":
        if (!val) msg = "You must agree to terms.";
        break;
      default:
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const up = { ...formValues, [name]: val };
    setFormValues(up);

    if (name === 'password') {
      validatePassword(val);
    }

    const err = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: err }));

    const hasAny = Object.keys(up).some(
      (k) => validateField(k, up[k])
    );
    setIsValidForm(!hasAny);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  useEffect(() => {
    const validFields = Object.entries(formValues).filter(([key, value]) => {
      if (key === 'agreeToTerms') return false;
      return typeof value === 'string' && 
             value.length > 0 && 
             !errors[key];
    }).length;
    setFormProgress((validFields / 6) * 100);
  }, [formValues, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidForm) return;
    setIsLoading(true);
    const payload = {
      username: formValues.username,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
      email: formValues.email,
    };
    try {
      const r = await fetch(
        "/api/v1/users/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (r.ok && r.status === 201) {
        const l = await fetch(
          "/api/v1/users/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              username: formValues.username,
              password: formValues.password,
            }),
          }
        );
        if (l.ok) {
          const m = await fetch(
            "/api/v1/users/me",
            { credentials: "include" }
          );
          if (m.ok) {
            const ud = await m.json();
            if (ud.userId)
              sessionStorage.setItem(
                "userId",
                ud.userId
              );
          }
          window.location.href = "/SearchJobPost";
        } else {
          setErrors({
            general: "Login failed. Try manually.",
          });
        }
      } else {
        const ed = await r.json();
        if (r.status === 400 && ed.message) {
          setErrors((p) => ({
            ...p,
            username: ed.message,
            email: ed.message,
          }));
        } else {
          setErrors(
            ed.errors || {
              general: "Registration failed.",
            }
          );
        }
      }
    } catch {
      setErrors({
        general: "Error occurred. Try later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const inputInt = {
    whileHover: { scale: 1 },
    whileFocus: {
      scale: 1,
      outline: "none"
    },
    transition: { duration: 0.15 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="register-page main-content min-h-screen p-4 flex items-center justify-center my-10 rounded-4xl border"
    >
      <div className="card w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-lime-500"
          style={{ width: `${formProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${formProgress}%` }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col items-center p-10 lava-lamp-background text-white"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-center">Welcome to JobSpotter!</h2>
          <p className="mb-6 text-center max-w-sm leading-relaxed">
            Create an account to discover
            new job opportunities.
          </p>
          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login"
              className="underline font-bold hover:opacity-90"
            >
              Sign In{' '}
              <FaArrowRight className="inline ml-1" />
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-10"
        >
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          {errors.general && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg"
            >
              {errors.general}
            </motion.p>
          )}

          <motion.form
            onSubmit={handleSubmit}
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {[
              { name: 'firstName', placeholder: 'First Name', type: 'text' },
              { name: 'lastName', placeholder: 'Last Name', type: 'text' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'username', placeholder: 'Username', type: 'text' },
              { name: 'password', placeholder: 'Password', type: showPassword ? 'text' : 'password' },
              { name: 'confirmPassword', placeholder: 'Repeat Password', type: showConfirmPassword ? 'text' : 'password' },
            ].map(({ name, placeholder, type }) => {
              const ok = formValues[name] && !errors[name];
              const bad = !!errors[name];
              return (
                <motion.div
                  key={name}
                  variants={fieldAnim}
                  className="relative mb-8"
                >
                  <div className="flex items-center">
                    <div className="relative flex-grow">
                      <motion.input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={formValues[name]}
                        onChange={handleChange}
                        onFocus={
                          name === 'password'
                            ? () => {
                                setPwdFocus(true);
                                validatePassword(formValues.password);
                              }
                            : undefined
                        }
                        onBlur={
                          name === 'password'
                            ? () => setPwdFocus(false)
                            : undefined
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
                        {...inputInt}
                      />
                      {(name === 'password' || name === 'confirmPassword') && (
                        <button
                          type="button"
                          onClick={() =>
                            name === 'password'
                              ? setShowPassword(!showPassword)
                              : setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {name === 'password'
                            ? (showPassword ? <FaEyeSlash /> : <FaEye />)
                            : (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)}
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-3 w-6 h-6 flex items-center justify-center">
                      <AnimatePresence>
                        {ok && (
                          <motion.div
                            key="ok"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaCheck className="text-green-500 text-xl" />
                          </motion.div>
                        )}
                        {bad && (
                          <motion.div
                            key="bad"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaTimes className="text-red-500 text-xl" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {errors[name] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors[name]}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}

            <AnimatePresence>
              {pwdFocus && formValues.password && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 mb-4 text-sm bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Password Strength</span>
                      <span className="text-xs font-medium">
                        {pwdStrength < 40 ? 'Weak' : pwdStrength < 70 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div 
                        className={`h-2.5 rounded-full ${pwdStrength < 40 ? 'bg-red-500' : pwdStrength < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pwdStrength}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {[
                      { key: 'minLength', label: 'At least 8 characters' },
                      { key: 'hasUpper', label: 'Contains uppercase' },
                      { key: 'hasLower', label: 'Contains lowercase' },
                      { key: 'hasLetter', label: 'Contains a letter' },
                      { key: 'hasNumber', label: 'Contains a number' },
                      { key: 'hasSpecial', label: 'Contains a special character' }
                    ].map(req => (
                      <motion.li 
                        key={req.key}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: passwordReqs[req.key] ? 1.1 : 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 10 }}
                        >
                          {passwordReqs[req.key] ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </motion.div>
                        <span className={passwordReqs[req.key] ? 'text-green-600' : 'text-red-500'}>
                          {req.label}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              variants={fieldAnim}
              className="flex items-center"
            >
              <motion.input
                type="checkbox"
                name="agreeToTerms"
                checked={formValues.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-green-500"
                whileTap={{ scale: 1.2 }}
              />
              <label className="ml-2 text-sm">
                I agree to the
                <Link
                  to="/terms-of-service"
                  className="text-green-600 underline ml-1"
                >
                  Terms of Service
                </Link>
              </label>
            </motion.div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms}
              </p>
            )}

            <div className="flex items-center">
              <motion.button
                type="submit"
                disabled={!isValidForm || isLoading}
                whileHover={isValidForm && !isLoading ? { scale: 1.05 } : {}}
                whileTap={isValidForm && !isLoading ? { scale: 0.95 } : {}}
                className={`flex-grow py-2 ${isValidForm && !isLoading
                  ? 'bg-gradient-to-r from-green-500 to-lime-500'
                  : 'bg-gray-300'} text-white font-bold rounded-lg transition flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="ml-2">Creating Account...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
              <div className="flex-shrink-0 ml-3 w-6 h-6"></div>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center text-sm"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-green-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;