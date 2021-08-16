import axios from "axios";
import {WebAPi }  from "../_config";
import axiosInstance  from "../_helpers/axiosinstance";

const axiosBase = axios.create({
    // @ts-ignore
    baseURL: WebAPi
});


export const forgotPassword=(userDetail)=> axiosBase.post(`/auth/forgotpassword`, userDetail);
// export default forgotPassword;
export const userLogin=(loginDetail)=> axiosBase.post(`/auth/login`, loginDetail);
 
export const forgotUserValidate=(id)=>axiosBase.get(`auth/validatetoken/${id}`)

export const getHelp = () => axiosBase.get(`/help/quote`);

export const getUserList=() => axiosInstance.get(`user`);

export const resetPasswordService=(data) =>axiosInstance.post(`/auth/resetpassword`,data);



