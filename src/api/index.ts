/** @format */

import axios from '@/request'
import type { SearchType } from './type'

// 'http://43.206.26.117:32261'   开发模式服务
let api = import.meta.env.MODE == 'development' ? 'https://widget.tokeninsight.com' : 'https://widget.tokeninsight.com'


export const searchPost = (params: SearchType) => {
  return axios.post(api +'/apiv2/search/searchAllList', params)
}
export const getInvestorList = () => {
  return axios.get(api +'/api/user/dd/selectInvestorList')
}
export const saveAllInformation = (params: any, config?: any) => {
  return axios.post(api +'/api/listing/saveAllInformation', params, config)
}
