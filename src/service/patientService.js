import axiosInstance  from "../_helpers/axiosinstance";

export const getPatientList=(data) => axiosInstance.post(`patient/list`,data);
export const getPatientListCount=(data) => axiosInstance.post(`patient/count`,data);
export const getPatientByPartyRoleId=(partyRoleId)=>axiosInstance.get(`patient/${partyRoleId}`);
export const savePatient=(data)=>axiosInstance.post(`patient`,data);
export const updatePatientByPartyRoleId=(partyRoleId,data)=>axiosInstance.put(`patient/${partyRoleId}`,data);
