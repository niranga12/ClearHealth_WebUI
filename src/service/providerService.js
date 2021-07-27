import axiosInstance  from "../_helpers/axiosinstance";

export const getProvidersList=(data) => axiosInstance.post(`provider/list`,data);
export const getProvidersListCount=(data) => axiosInstance.post(`provider/count`,data);
export const getProviderByPartyRoleId=(partyRoleId)=>axiosInstance.get(`provider/${partyRoleId}`);
export const saveProvider=(data)=>axiosInstance.post(`provider`,data);
export const updateProviderByPartyRoleId=(partyRoleId,data)=>axiosInstance.put(`provider/${partyRoleId}`,data);
export const getSpecialityList=(data) => axiosInstance.get(`speciality`,data);