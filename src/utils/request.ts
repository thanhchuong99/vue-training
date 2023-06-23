import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: (import.meta as ImportMeta).env.VITE_APP_BASE_API
})

service.interceptors.request.use(
  (config) => {
    const method = config?.method?.toLocaleLowerCase() ?? ''
    if (['post', 'put'].includes(method) && config.headers) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status, config, headers, statusText } = response
    if (status < 200 || status > 300) {
      ElMessage({
        message: statusText,
        type: 'error',
        duration: 5 * 1000
      })
      return
    }
    const action = getAction(config, status)
    if (action) {
      ElMessage({
        message: action + 'success',
        type: 'success'
      })
    }
    const count = headers['x-total-count']
    if (count) {
      return {
        list: data,
        total: parseInt(count)
      }
    }
    return data
  },
  (error) => {
    ElMessage({
      message: error.message ?? 'unknown error',
      type: 'error',
      duration: 5 * 1000
    })
    return error.code
  }
)

function getAction(config: AxiosRequestConfig, status: number) {
  if (status === 201) {
    return 'create'
  }
  const method = config?.method?.toLocaleLowerCase() ?? ''
  if (method === 'put') {
    return 'update'
  } else if (method === 'delete') {
    return 'delete'
  }
  return ''
}
export default service
