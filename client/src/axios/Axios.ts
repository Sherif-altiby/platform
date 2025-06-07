import axios from "axios";

const URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const Axios = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Helper function to get token safely
const getToken = (): string | null => {
    if (typeof window === 'undefined') {
        return null; // Server-side, no localStorage access
    }
    
    try {
        return localStorage.getItem('token');
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
    }
};

// Request interceptor to add token to headers
Axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        
        if (token) {
            // Add token to Authorization header
            config.headers.Authorization = `Bearer ${token}`;
            // Also add to custom header for middleware compatibility
            config.headers['x-auth-token'] = token;
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
                
                // Use Next.js router for better navigation
                if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
        
        return Promise.reject(error);
    }
);