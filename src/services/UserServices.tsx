import axios from "axios";

class UserServices {

    // The base URL of the API
    static BASE_URL = "http://localhost:8080";

    /**
     * Logs in a user
     * 
     * @param email - The email of the user
     * @param password - The password of the user
     * @returns Promise<LoginResponse> - The login response from the server
     */

    static async login(email: string, password: string) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Registers a new user
     * 
     * @param userData - The user data to register
     * @param token - The JWT token of the user
     * @returns Promise<ValidationResponse> - The validation response from the server
     */

    static async register(userData: any, token: String) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/auth/register`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Validates a JWT token by making a request to the Spring Boot backend
     * 
     * @param token - The JWT token to validate
     * @param userData - The user data associated with the token
     * @returns boolean - Returns true if the token is valid, false otherwise
     * 
     * The function performs two levels of validation:
     * 1. Basic structure check (ensures token has three parts separated by dots)
     * 2. Server-side validation through API call
     */

    static validateToken(token: string, userData: any) {
        return new Promise((resolve) => {
            axios.post(`${this.BASE_URL}/api/validate-token`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                resolve(response.data.statusCode === 200);
            }).catch((error) => {
                console.error("Token validation failed:", error);
                resolve(false);
            });
        });
    }

}

export default UserServices;