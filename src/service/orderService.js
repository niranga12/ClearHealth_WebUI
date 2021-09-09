import axiosInstance  from "../_helpers/axiosinstance";

export const saveOrderData= (data) => axiosInstance.post(`order`, data);

export const getOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}`);