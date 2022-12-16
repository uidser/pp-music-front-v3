import request from "@/util/request/request"

export default {
  getRankDetailMediaList(rankId, frequency, queryVo) {
    return request({
      url: '/rank/getRankDetailAndMediaList' + `/${rankId}/${frequency}`,
      method: 'get',
      params: queryVo
    })
  },
  getAll() {
    return request({
      url: '/rank/getAll',
      method: 'get'
    })
  }
}
