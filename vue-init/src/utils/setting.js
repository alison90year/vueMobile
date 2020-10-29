const setting = {
  preFix : process.env.VUE_APP_PREFIX,
  baseUrl: process.env.VUE_APP_BASEURL,
  timeOut:5000,
  contentType:['application/x-www-form-urlencoded','multipart/form-data'],
  client: process.env.VUE_APP_CLIENT,  //公共参数
  version:process.env.VUE_APP_VERSION,
  duration:2 * 1000
}



export default setting