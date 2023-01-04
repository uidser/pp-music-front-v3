import request from "@/util/request/request"

const BASE_SONG_LIST_CATEGORY_API = '/media/songListCategoryRelation'

export default {
  getAll() {
    return request({
      url: BASE_SONG_LIST_CATEGORY_API + '/getAll',
      method: 'get'
    })
  }
}
