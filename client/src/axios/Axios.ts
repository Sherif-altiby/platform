import axios from "axios";

const URL = process.env.NEXT_PUBLIC_SERVER_URL ;

export const Axios = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})