import axios from 'axios'
import { WebAPi } from '../_config'
import axiosInstance from '../_helpers/axiosinstance'

const axiosBase = axios.create({
  // @ts-ignore
  baseURL: WebAPi
})

export const forgotPassword = (userDetail) => axiosBase.post(`/auth/forgotpassword`, userDetail)
// export default forgotPassword;
export const userLogin = (loginDetail) => axiosBase.post(`/auth/login`, loginDetail)
export const forgotUserValidate = (id) => axiosBase.get(`auth/validatetoken/${id}`)
export const getHelp = () => axiosBase.get(`/help/quote`)
export const resetPasswordService = (data) => axiosInstance.post(`/auth/resetpassword`, data)
export const getUserList = (data) => axiosInstance.post(`user/list`, data)
export const getUserListCount = (data) => axiosInstance.post(`user/count`, data)
export const getUserByPartyRoleId = (partyRoleId) => axiosInstance.get(`user/${partyRoleId}`)
export const saveUser = (data) => axiosInstance.post(`user`, data)
export const updateUserByPartyRoleId = (partyRoleId, data) => axiosInstance.put(`user/${partyRoleId}`, data)

export const getUserNameAvailability = (data) => axiosInstance.post(`user/userNameAvailability`, data)

