import request from "@/util/request/request"

const BASE_SONG_LIST_API = '/media/songList'

export default {
  getByCategoryId(id, queryVo) {
    return request({
      url: BASE_SONG_LIST_API + '/getByCategoryId/' + id,
      method: 'get',
      params: queryVo
    })
  },
  get(id) {
    return request({
      url: BASE_SONG_LIST_API + '/get/' + id,
      method: 'get'
    })
  }
}
