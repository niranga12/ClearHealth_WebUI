import axiosInstance  from "../_helpers/axiosinstance";


export const getHospitalsList=(data) => axiosInstance.post(`hospital/list`,data);
export const getHospitalsListCount= (data)=> axiosInstance.post(`hospital/count`,data);
export const saveHospital=(data)=>axiosInstance.post(`hospital`,data);
export const updateHospitalByPartyRoleId=(partyRoleId,data)=>axiosInstance.put(`hospital/${partyRoleId}`,data);
export const getHospitalByPartyRoleId=(partyRoleId)=>axiosInstance.get(`hospital/${partyRoleId}`);


export const getProviderListByHospitalId=(hospitalId,data) =>axiosInstance.post(`hospital/${hospitalId}/providers`,data);
export const getProviderListCountByHospitalId=(hospitalId,data) =>axiosInstance.post(`hospital/${hospitalId}/providers/count`,data);



export const getOrderListByHospitalId=(hospitalId,data) =>axiosInstance.post(`hospital/${hospitalId}/orders`,data);


export const getHospitalDashboard=(data)=>axiosInstance.post(`dashboard`,data);

export const getProcedureByHospitalId=(hospitalId,data)=>axiosInstance.post(`hospital/${hospitalId}/procedures`, data);


// get package details

// facility
export const getFacilityPackageByHospitalId=(hospitalId,data)=>axiosInstance.post(`hospital/${hospitalId}/packages/facility`, data);

// Physician
export const getPhysicianPackageByHospitalId=(hospitalId,data)=>axiosInstance.post(`hospital/${hospitalId}/packages/physician`, data);

// Global Package
export const getGlobalPackageByHospitalId=(hospitalId,data)=>axiosInstance.post(`hospital/${hospitalId}/packages`, data);

//update
// update Package facility details
export const updateFacilityPackage=(hospitalId,data)=>axiosInstance.put(`hospital/${hospitalId}/packages/facility`, data)

// update Package Physician details
export const updatePhysicianPackage=(hospitalId,data)=>axiosInstance.put(`hospital/${hospitalId}/packages/physician`, data)

// update Package global detail
export const updateGlobalPackage=(hospitalId,data)=>axiosInstance.put(`hospital/${hospitalId}/packages`, data)