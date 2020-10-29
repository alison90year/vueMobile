import { get } from '@/utils/fetch'
const baseHttp = params => get('/posts',params)
//公共请求
export  {
  baseHttp
}