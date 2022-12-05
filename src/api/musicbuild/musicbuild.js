import request from "@/util/request/request"

const BASE_MUSIC_BUILD_API = '/media/musicBuild'

export default {
  index() {
    return request({
      url: BASE_MUSIC_BUILD_API + '/index',
      method: 'get'
    })
  }
}
