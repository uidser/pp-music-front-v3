import request from "@/util/request/request"

const BASE_SEARCH_API = '/search'

export default {
  search(queryVo) {
    return request({
      url: BASE_SEARCH_API + '/query',
      method: 'get',
      params: queryVo
    })
  },
  querySingerByCategory(categoryIdList) {
    return request({
      url: BASE_SEARCH_API + '/querySingerByCategory',
      method: 'get',
      params: categoryIdList
    })
  },
  searchSingleSingerSong(singerId, queryVo) {
    return request({
      url: BASE_SEARCH_API + '/searchSingleSingerSong/' + singerId,
      method: 'get',
      params: queryVo
    })
  }
}
