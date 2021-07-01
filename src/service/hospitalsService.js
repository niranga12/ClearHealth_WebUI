import axiosInstance  from "../_helpers/axiosinstance";


export const getHospitalsList=(data) => axiosInstance.post(`hospital/list`,data);
export const getHospitalsListCount= (data)=> axiosInstance.post(`hospital/count`,data);
