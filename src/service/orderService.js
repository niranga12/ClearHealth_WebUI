import axiosInstance  from "../_helpers/axiosinstance";

export const saveOrderData= (data) => axiosInstance.post(`order`, data);

export const getOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}`);

export const  deleteOrderCpt=(orderId,orderDetailId)=>axiosInstance.delete(`order/${orderId}?orderDetailId=${orderDetailId}`);
export const updateOrder=(orderId,orderDetail)=>axiosInstance.post(`order/${orderId}`,orderDetail);