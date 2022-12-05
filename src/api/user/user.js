import request from "@/util/request/request"

export default {
  login(user) {
    return request({
      url: '/security/login',
      method: 'post',
      data: user
    })
  },
  info() {
    return request({
      url: '/security/info',
      method: 'get'
    })
  }
}
