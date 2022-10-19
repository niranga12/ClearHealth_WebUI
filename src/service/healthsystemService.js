import axiosInstance from '../_helpers/axiosinstance'

export const getHealthSystemList = (data) => axiosInstance.post(`healthSystem/list`, data);

export const getHealthSystemListCount = (data) => axiosInstance.post(`healthSystem/count`, data);

export const getHealthSystemByPartyRoleId = (partyRoleId) => axiosInstance.get(`healthSystem/${partyRoleId}`);

export const updateHealthSystemByPartyRoleId = (partyRoleId, data) => axiosInstance.put(`healthSystem/${partyRoleId}`, data);

export const addHealthSystemNew = (data) => axiosInstance.post(`healthSystem`, data);

export const deleteHealthSystem = (partyRoleId) => axiosInstance.delete(`healthSystem/${partyRoleId}`);
