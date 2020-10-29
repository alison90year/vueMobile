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
  }
})

//发送请求
service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = getToken()
    config.headers['x-uid'] = getUid()
    return config
  },
  error => {
    console.log(new Error(error))
    return Promise.reject(error)
  }
)
//响应请求
service.interceptors.response.use(
  response => {
    const res = response
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
  if (res.status === 200 || res.status === 20000 || res.status === '200') {
    return res
  } else {
    Toast.fail(res.message || 'Error', {
      duration: setting.duration,
    });

    if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
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
        params: QS.stringify(params)
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
  const uploadService = axios.create({
    baseURL: setting.baseUrl,
    timeout: setting.timeOut,
    headers: {
      'Content-Type': setting.contentType[1],
      'x-uid': getUid()
    }
  })
  uploadService.interceptors.response.use(
    response => {
      const res = response.data
      return responseCodeHandle(res)
    },
    error => {
      Toast.fail(error, {
        duration: setting.duration,
      });
      return Promise.reject(error)
    }
  )
  return new Promise((resolve, reject) => {
    uploadService
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
