import { get , upload } from '../utils/fetch'
const testHttp = params => get('/live/b/notice/query-show-list.api',params)
const uploadHttp = params => upload('/upload/b/upload.api',params)
const picToStoreByIdHttp = params => get('/upload/b/update-pic.api',params)
export  {
  testHttp,
  uploadHttp,
  picToStoreByIdHttp
}