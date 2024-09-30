import axios from "axios";
import envconfig from "../config/envConfig";


const axiosInstance = axios.create({
    baseURL: envconfig.baseApi,
});

export default axiosInstance;