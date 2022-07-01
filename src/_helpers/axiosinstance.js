import axios from 'axios'

import { WebAPi } from '../_config'

const axiosInstance = axios.create({
  // @ts-ignore
  baseURL: WebAPi
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// for error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error

    console.error(error.response.status)
    // @ts-ignore
    if (error.response.status === 401) {
      localStorage.clear()
      // @ts-ignore
      window.location = '/login'
    }
    throw error
  }
)

export default axiosInstance
