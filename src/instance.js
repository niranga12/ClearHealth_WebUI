import axios from "axios";
import {WebAPi}   from "./_config";


const instance = axios.create({
    // @ts-ignore
    baseURL: WebAPi
});

instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
