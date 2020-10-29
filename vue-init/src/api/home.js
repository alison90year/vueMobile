import { get } from '@/utils/fetch'
const testHttp = params => get('/albums',params)

export  {
  testHttp
}