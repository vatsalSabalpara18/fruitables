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

axiosInstance.interceptors.response.use(function (response) {

    return response;
}, async function (error) {

    console.log(error);

    if (error?.response && error?.response?.status === 401) {
        try {            
            await axios.post(API_BASE_URL + 'user/gen-new-token',{}, { withCredentials: true });

            return axiosInstance(error?.config);
        } catch (error) {
            console.log("error in the gen new token");
           return Promise.reject(error);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;

