import axios from 'axios'
import { BASE_URL } from './constants'

const axiosInstances = axios.create({
    baseURL : BASE_URL,
    timeut : 10000,
    headers: {
        "Content-Type":"application/json" ,
    },
}) 

axiosInstances.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); 

export default axiosInstances