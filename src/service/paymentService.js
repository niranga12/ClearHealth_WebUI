import axiosInstance  from "../_helpers/axiosinstance";



export const getPatientOrderDetailsByOrderId=(id)=>axiosInstance.post(`openorder/${id}`,{});

export const getOrderSuccessByOrderId=(id,data)=>axiosInstance.post(`openorder/confirmPayment/${id}`,data);
