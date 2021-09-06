import axiosInstance  from "../_helpers/axiosinstance";

export const saveOrderData= (data) => axiosInstance.post(`order`, data);