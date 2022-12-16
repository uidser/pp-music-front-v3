import request from "@/util/request/request"

const BASE_SEARCH_API = '/search'

export default {
  search(queryVo) {
    return request({
      url: BASE_SEARCH_API + '/query',
      method: 'get',
      params: queryVo
    })
  }
}
