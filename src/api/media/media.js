import request from "@/util/request/request"

const BASE_MEDIA_URL = '/media'

export default {
  getAuthor(mediaId) {
    return request({
      url: BASE_MEDIA_URL + '/getAuthor/' + mediaId,
      method: 'get'
    })
  }
}
