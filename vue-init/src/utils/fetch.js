import axios from 'axios'
import QS from 'qs'
import setting from "./setting";
import {Toast} from '@nutui/nutui';

import {getToken, getUid} from './auth'
const service = axios.create({
  baseURL: setting.preFix,  // dev pro
  timeout: setting.timeOut,
  headers: {
    'Content-Type': setting.contentType[0],
    'x-client': setting.client,
    'x-version': setting.version,
    'x-uid':getUid() || 1225,
    'x-token': getToken() || 'admin-token'
  }
})

//发送请求
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//响应请求
service.interceptors.response.use(
  response => {
    const res = response.data
    return responseCodeHandle(res)
  },
  error => {
    Toast.fail(error || 'Error', {
      duration: setting.duration,
    });
    return Promise.reject(error)
  }
)

function responseCodeHandle(res) {

  if (res.code === 200 || res.code === 20000 || res.code === '200') {
    return res
  } else {
    Toast.fail(res.message || 'Error', {
      duration: setting.duration,
    });

    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // to re-login
      Toast.fail(res.message || 'Error', {
        duration: setting.duration,
      });
    }
    return Promise.reject(new Error(res.message || 'Error'))
  }
}

function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function del(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function put(url, params) {
  return new Promise((resolve, reject) => {
    service
      .put(url, QS.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function test() {
  Toast.fail('数据获取失败', {
    id: 1,
    duration: 1500,
  });
}

function upload(url, params) {
  service.defaults.headers['Content-Type'] = setting.contentType[1]
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export {
  put,
  post,
  del,
  get,
  upload,
  test
}

export default service
