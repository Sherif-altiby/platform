import axios from "axios";
import Router from "next/router"; // Import the Router

const URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const Axios = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle 401 errors
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.setItem("isLogin", JSON.stringify(false));
    } else {
      localStorage.setItem("isLogin", JSON.stringify(true));
    }
    return Promise.reject(error);
  }
);
