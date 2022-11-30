import axios from 'axios';
export const service = axios.create({
    withCredentials: true,
    // baseURL: "http://localhost:3001/api/v1",
    baseURL: "https://sell-tool-api-nest-js.onrender.com/api/v1",
});