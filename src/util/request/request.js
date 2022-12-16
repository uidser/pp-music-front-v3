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
  }
)

export default service
