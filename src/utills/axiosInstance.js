import axios from "axios";
import { API_BASE_URL } from "./baseURL";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axiosInstance;

