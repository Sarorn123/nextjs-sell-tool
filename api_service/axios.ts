import axios from 'axios';
export const service = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api/v1",
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
});