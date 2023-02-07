import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://18.216.178.179/api/v1/`,
})

axiosInstance.interceptors.request.use((config) => {
    console.log(config)
    config.params = config.params || {}

    return config;
})

export default axiosInstance