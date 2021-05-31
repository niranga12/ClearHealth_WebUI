import axios from "axios";
import {WebAPi }  from "../_config";
import axiosInstance  from "../_helpers/axiosinstance";

const axiosBase = axios.create({
    // @ts-ignore
    baseURL: WebAPi
});


export const forgotPassword=(userDetail)=> axiosBase.post(`/auth/fogotpassword`, userDetail);
// export default forgotPassword;
export const userLogin=(loginDetail)=> axiosBase.post(`/auth/login`, loginDetail);
 
export const forgotUserValidate=(id)=>axiosBase.get(`auth/validatetoken/${id}`)

export const getHelp = () => axiosBase.get(`/help/quote`);

export const getUserList=() => axiosInstance.get(`user`);





// export default {
//     userAuthentication() {
//         return {
//             forgotPassword:(userName)=> axiosBase.post(`auth/forgotPassword`,userName),
//             userLogin:(loginDetail)=> axiosBase.post(`/auth/login`, loginDetail)
//         //   getOne: ({ id }) => axiosBase.get(`${url}/${id}`),
//         //   getAll: () => axiosBase.get(url),
//         //   update: (toUpdate) =>  axiosBase.put(url,toUpdate),
//         //   create: (toCreate) =>  axiosBase.put(url,toCreate),
//         //   delete: ({ id }) =>  axiosBase.delete(`${url}/${id}`)
//         }
//       } 
//     }