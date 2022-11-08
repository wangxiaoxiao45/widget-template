/** @format */

import axios from '@/request'
import type { SearchType } from './type'

export const searchPost = (params: SearchType) => {
  return axios.post('/apiv2/search/searchAllList', params)
}
export const getInvestorList = () => {
  return axios.get('/api/user/dd/selectInvestorList')
}
export const saveAllInformation = (params: any, config?: any) => {
  return axios.post('/api/listing/saveAllInformation', params, config)
}
