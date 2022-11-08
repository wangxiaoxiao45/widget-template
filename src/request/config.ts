import type { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  // baseURL: '/apiv2',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 1000 * 60 * 10,
  withCredentials: true,
  responseType: 'json',
}

export default config
