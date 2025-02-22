import axios from "axios";

class UserServices {

    static BASE_URL = "http://localhost:8080";

    static async login(email: string, password: string) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData: any, token: String) {
        try {
            const response = await axios.post(`${this.BASE_URL}/api/auth/register`, userData, {
                headers: {
                    Authorization: `Bearer${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default UserServices;