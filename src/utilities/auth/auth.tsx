import UserServices from "../../services/UserServices";

interface UserData {
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

/**
 * Checks the current authentication status of the user
 * 
 * @returns Promise<boolean> - Returns true if the user is authenticated, false otherwise
 * 
 * This function:
 * 1. Checks if a token exists in localStorage
 * 2. Validates the token if it exists
 * 3. Cleans up invalid tokens
 */
export const checkAuthStatus = (callback: (isValid: boolean) => void): void => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    console.log(token);
    
    if (!token) {
        console.log('No token found');
        callback(false);
        return;
    }
    
    UserServices.validateToken(token, JSON.parse(userData ?? "{}")).then((isValid: any) => {
        if (!isValid) {
            console.log('Invalid token found, cleaning up');
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
        }

        callback(isValid);
    }).catch(() => {
        callback(false);
    });
};

/**
 * Generates authentication headers for API requests
 * 
 * @returns HeadersInit - Returns an object containing the necessary headers for authenticated requests
 * 
 * Used to add authentication headers to fetch requests:
 * fetch(url, { headers: getAuthHeaders() })
 */
export const getAuthHeaders = (): HeadersInit => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // Return an object containing the Authorization and Content-Type headers
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

/**
 * Logs out the current user
 * 
 * This function:
 * 1. Removes the authentication token from localStorage
 * 2. Removes the user roles from localStorage
 * 3. Can be extended to make a logout API call if needed
 */
export const logout = (): void => {
    // Remove authentication data from localStorage
    // Remove the token and roles from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    
    // Example of how to add a logout API call:
    // await fetch('http://localhost:8080/api/auth/logout', {
    //     method: 'POST',
    //     headers: getAuthHeaders()
    // });
};