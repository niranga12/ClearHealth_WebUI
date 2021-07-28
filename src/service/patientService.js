import axiosInstance  from "../_helpers/axiosinstance";

export const getPatientList=(data) => axiosInstance.post(`patient/list`,data);
