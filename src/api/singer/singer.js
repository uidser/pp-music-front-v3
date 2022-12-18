import request from "@/util/request/request"

const BASE_SINGER_API = '/media/singer'

export default {
  page(queryVo) {
    return request({
      url: BASE_SINGER_API + '/page',
      method: 'get',
      params: queryVo
    })
  },
  get(id) {
    return request({
      url: BASE_SINGER_API + '/get' + '/' + id,
      method: 'get'
    })
  }
}
