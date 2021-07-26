import axiosInstance  from "../_helpers/axiosinstance";


export const getValidateOrganization=(data) => axiosInstance.post(`common/orgname/validate`,data);