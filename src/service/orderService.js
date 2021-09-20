import axiosInstance  from "../_helpers/axiosinstance";

export const saveOrderData= (data) => axiosInstance.post(`order`, data);

export const getOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}`);

export const  deleteOrderCpt=(orderId,orderDetailId)=>axiosInstance.delete(`order/${orderId}?orderDetailId=${orderDetailId}`);
export const updateOrder=(orderId,orderDetail)=>axiosInstance.put(`order/${orderId}`,orderDetail);

export const orderAprove=(orderId)=>axiosInstance.post(`order/${orderId}/approve`,{});

export const getPatientOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}/patient`);

