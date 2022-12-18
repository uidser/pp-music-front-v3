import request from "@/util/request/request"

const BASE_MEDIA_PAGE_API = '/media/page'

export default {
  play() {
    return request({
      url: BASE_MEDIA_PAGE_API + '/play',
      method: 'get'
    })
  },
  musicBuildPage() {
    return request({
      url: BASE_MEDIA_PAGE_API + '/musicBuild',
      method: 'get'
    })
  },
  singerList() {
    return request({
      url: BASE_MEDIA_PAGE_API + '/singerList',
      method: 'get'
    })
  }
}
