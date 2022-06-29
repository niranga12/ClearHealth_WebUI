import axiosInstance  from "../_helpers/axiosinstance";



export const getPatientOrderDetailsByOrderId=(id)=>axiosInstance.get(`openorder/${id}`);

export const getOrderSuccessByOrderId=(id,data)=>axiosInstance.post(`openorder/confirmPayment/${id}`,data);


// braintree
// {{URL}}/api/payment/token
// export const getPaymentToken=()=>axiosInstance.get(`payment/token`);


export const paymentCheckout=(data)=>axiosInstance.post(`openorder/checkout`,data);


export const facilityPaymentVerification=(data)=>axiosInstance.post(`openorder/facilityPaymentVerification`,data);

export const providerPaymentVerification=(data)=>axiosInstance.post(`openorder/providerPaymentVerification`,data);
