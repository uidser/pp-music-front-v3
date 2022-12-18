import axios from "axios"
import {Toast} from "vant"
import jsCookie from "js-cookie"
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (jsCookie.get('token')) {
      config.headers['token'] = jsCookie.get('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.code === 403) {
      Toast('请登录')
      return Promise.reject(new Error('请登录'))
    }
    if (res.code !== 200) {
      Toast(res.msg || 'Error')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const code = error.response.status;
    if (code === 403) {
      Toast('错误：无权访问或登录过期')
      if (window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length) !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default service
