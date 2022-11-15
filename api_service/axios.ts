import axios from 'axios';
export const service = axios.create({
    withCredentials: true,
    baseURL: "https://sell-tool-nest-js.herokuapp.com/api/v1",
    // baseURL: "http://localhost:3001/api/v1",
});