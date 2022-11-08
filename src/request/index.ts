import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import config from './config'

interface Res {
  code: number
  msg: string
}

interface ResState<T> extends Res {
  data: T
}

class Request {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log(config)
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (error) => {
        Promise.reject(error)
      },
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get<T>(url: string, params?: object): Promise<ResState<T>> {
    return this.instance.get(url, { params })
  }

  post<T>(url: string, params?: object, config?: object): Promise<ResState<T>> {
    console.log(params)
    return this.instance.post(url, params, config)
  }
}

export default new Request(config)
