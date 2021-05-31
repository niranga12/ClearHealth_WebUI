import axios from "axios";
import {WebAPi}   from "../_config";


const axiosInstance = axios.create({
    // @ts-ignore
    baseURL: WebAPi
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] =  token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
