import { get , upload } from '@/utils/fetch'
const testHttp = params => get('/live/b/notice/query-show-list.api',params)
const uploadHttp = params => upload('/upload/b/upload.api',params)
export  {
  testHttp,
  uploadHttp
}