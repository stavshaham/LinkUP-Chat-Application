// Import necessary libraries and components
import React, { useState, FormEvent } from 'react';
import './LoginPage.css';
import { FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import UserServices from '../../services/UserServices';

// Define the structure of form data
interface FormData {
  email: string;
  password: string;
}

// Define the structure of form errors
interface FormErrors {
  email?: string;
  password?: string;
}

// Main LoginPage component: Handles user login functionality
const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  // State to hold form data: email and password
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  // State to hold form errors: email and password
  const [errors, setErrors] = useState<FormErrors>({});
  // State to manage loading state: true when API call is in progress
  const [isLoading, setIsLoading] = useState(false);
  // State to toggle password visibility: true when password is visible
  const [showPassword, setShowPassword] = useState(false);
  // State to toggle Success alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  //State to toggle Error alert
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate form data: checks for email and password validity
  const validateForm = (): boolean => {
    // Initialize new errors object
    const newErrors: FormErrors = {};
    
    // Checking email is not empty, and valid
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Email is invalid';
    }
    
    // Checking password is not empty
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    // Update errors state
    setErrors(newErrors);
    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes: updates form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get input name and value
    const { name, value } = e.target;
    // Update form data state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  // Handle form submission: handles login functionality
  const handleSubmit = async (e: FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      return;
    }

    // Set loading state to true
    setIsLoading(true);
    
    try {
      // TODO: Implement login logic here
      const userData = await UserServices.login(formData.email, formData.password);
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('roles', userData.roles);
        
        setSuccessMessage('Login successful!');

        setShowSuccess(true); // Show success alert

              // Hide the success alert after 5 seconds
              setTimeout(() => {
                  setShowSuccess(false);
              }, 5000);

        navigate('/chats');
      }
      console.log('Login form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      // Log error and update errors state
      console.error('Login error:', error);
      setErrors({
        email: 'Invalid email or password'
      });
      setErrorMessage(`Login failed: Invalid email or password`); // Custom error message
        setShowError(true); // Show error alert

            // Hide the error alert after 5 seconds
            setTimeout(() => {
                setShowError(false);
            }, 5000);
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };

  return (
    // Container for login form
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to your account</p>
        
        {/* // Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* // Email input field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {/* // Display email error message if exists */}
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* // Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {/* // Password toggle button */}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaLockOpen /> : <FaLock />}
              </button>
            </div>
            {/* // Display password error message if exists */}
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* // Submit button */}
          {/* Disabling the button after pressing and if the page is still loading the login request */}
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {/* // Display loading text if loading state is true */}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* // Link to register page */}
        <div className="register-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;