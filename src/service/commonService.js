import { Roleclassificationtype } from 'src/reusable/enum'
import axiosInstance from '../_helpers/axiosinstance'

export const getValidateOrganization = (data) => axiosInstance.post(`common/orgname/validate`, data)

export const getStateList = (countryId) => axiosInstance.get(`geography/state/${countryId}`)

export const getRoleList = () => axiosInstance.get(`role`)
export const getSpecificRoleList = () => axiosInstance.get(`role/` + Roleclassificationtype.SecurityRoles)

// menu/2/1
export const getMenu = (resourceType, permissionType) => axiosInstance.get(`menu/${resourceType}/${permissionType}`)
