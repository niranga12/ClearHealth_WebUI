import axiosInstance  from "../_helpers/axiosinstance";

export const getPatientList=(data) => axiosInstance.post(`patient/list`,data);
export const getPatientListCount=(data) => axiosInstance.post(`patient/count`,data);
