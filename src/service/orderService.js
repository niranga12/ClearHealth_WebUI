import axiosInstance  from "../_helpers/axiosinstance";

export const saveOrderData= (data) => axiosInstance.post(`order`, data);

export const getOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}`);

export const  deleteOrderCpt=(orderId,orderDetailId)=>axiosInstance.delete(`order/${orderId}?orderDetailId=${orderDetailId}`);
export const updateOrder=(orderId,orderDetail)=>axiosInstance.put(`order/${orderId}`,orderDetail);

export const orderAprove=(orderId)=>axiosInstance.post(`order/${orderId}/approve`,{});

// export const getPatientOrderByOrderId=(orderId)=>axiosInstance.get(`order/${orderId}/patient`);

// {{URL}}/api/openOrder/dob/82b349a0888bd51e77f57216506854bb3792142a0d87f3d923cca4a64b94bf9b9728102b9ef616816fa42cb9e7200dbe9cc850153e7b5364e3d0834efd410b7680ead465a876b6e7a58ada0be0665e22694449b9eb04d8e7807e31fc5fa0f9e3ad0f
export const getOpenOrderByOrderId=(orderId)=>axiosInstance.get(`openOrder/dob/${orderId}`);

export const validateOrderDob=(orderId,validationDetail)=>axiosInstance.post(`openOrder/dob/${orderId}`,validationDetail);


export const getSMSOrderDetails=(orderId)=>axiosInstance.post(`openOrder/smscontent/${orderId}`,{});

export const getOrdersByPatientId=(patientId,searchQuery)=>axiosInstance.post(`order/orderList/${patientId}`,searchQuery);

export const getOrderType=()=>axiosInstance.get(`order/orderType`);

export const getViewReceipt=(orderId)=>axiosInstance.post(`openorder/viewReceipt`,orderId);



