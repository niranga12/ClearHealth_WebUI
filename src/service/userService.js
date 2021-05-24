import axios from "axios";
import {WebAPi }  from "../_config";

const axiosBase = axios.create({
    // @ts-ignore
    baseURL: WebAPi
});


const forgotPassword=(loginDetail)=> axiosBase.post(`/auth/login`, loginDetail);
export default forgotPassword;




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