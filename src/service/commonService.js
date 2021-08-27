import axiosInstance  from "../_helpers/axiosinstance";


export const getValidateOrganization=(data) => axiosInstance.post(`common/orgname/validate`,data);

export const getStateList=(countryId) => axiosInstance.get(`geography/state/${countryId}`);

export const getRoleList=() => axiosInstance.get(`role`);

