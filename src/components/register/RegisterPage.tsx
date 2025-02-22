// Import necessary libraries and components
import React, { useState, FormEvent } from 'react';
import './RegisterPage.css';
import { FaUser, FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Define the structure of form data
interface FormData {
  /**
   * The username chosen by the user.
   */
  username: string;
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * The password chosen by the user.
   */
  password: string;
  /**
   * The confirmation of the password chosen by the user.
   */
  confirmPassword: string;
}

// Define the structure of form errors
interface FormErrors {
  /**
   * Error message for the username field.
   */
  username?: string;
  /**
   * Error message for the email field.
   */
  email?: string;
  /**
   * Error message for the password field.
   */
  password?: string;
  /**
   * Error message for the confirm password field.
   */
  confirmPassword?: string;
}

// Main RegisterPage component
const RegisterPage: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State to hold form errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to toggle confirm password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Function to validate form data.
   * 
   * Checks for errors in the username, email, password, and confirm password fields.
   * 
   * @returns {boolean} True if the form data is valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Checking username is not empty, and above 3 characters
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Checking email is not empty, and valid
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Email is invalid';
    }
    
    // Checking password is not empty, above 8 characters, has at least 1 uppercase letter, 1 lowercase letter, and 1 number, and 1 special character
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else {
      // Checking A-Z
      const hasUpperCase = /[A-Z]/.test(formData.password);
      // Checking a-z
      const hasLowerCase = /[a-z]/.test(formData.password);
      // Checking 0-9
      const hasNumber = /[0-9]/.test(formData.password);
      // Checking all special characters
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

      if (!hasUpperCase) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!hasLowerCase) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!hasNumber) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!hasSpecialChar) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    // Checking if passwords match, and not empty
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes.
   * 
   * Updates the form data state with the new input value.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission.
   * 
   * Validates the form data, and if valid, submits the form.
   * 
   * @param {FormEvent} e The form submission event.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement registration API call
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle password visibility.
   * 
   * Toggles the visibility of the password or confirm password field.
   * 
   * @param {'password' | 'confirmPassword'} field The field to toggle visibility for.
   */
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    // Register page container
    <div className="register-container">
      {/* // Register form wrapper */}
      <div className="register-form-wrapper">
        {/* // Register page title */}
        <h1>Create Account</h1>
        
        {/* // Register form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* // Username input field */}
          <div className="form-group">
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={errors.username ? 'error' : ''}
              />
            </div>
            {/* // Display username error message if exists */}
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* // Email input field */}
          <div className="form-group">
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {/* // Display email error message if exists */}
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* // Password input field */}
          <div className="form-group">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={errors.password ? 'error' : ''}
              />
              {/* // Toggle password visibility button */}
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? <FaLockOpen /> : <FaLock />}
              </button>
            </div>
            {/* // Display password error message if exists */}
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* // Confirm password input field */}
          <div className="form-group">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {/* // Toggle confirm password visibility button */}
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showConfirmPassword ? <FaLockOpen /> : <FaLock />}
              </button>
            </div>
            {/* // Display confirm password error message if exists */}
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* // Register button */}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* // Login link */}
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
