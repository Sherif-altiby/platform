import axios from "axios";

const URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const Axios = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add token to headers
Axios.interceptors.request.use(
    (config) => {
        // Get token from localStorage (only on client side)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            
            if (token) {
                // Add token to Authorization header
                config.headers.Authorization = `Bearer ${token}`;
                // Also add to custom header for middleware compatibility
                config.headers['x-auth-token'] = token;
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized responses
        if (error.response?.status === 401) {
            // Token expired or invalid
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                // Redirect to login page
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);