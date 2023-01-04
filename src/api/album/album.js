import request from "@/util/request/request"

const BASE_ALBUM_API = '/media/album'

export default {
  getAlbumAndSongList(albumId) {
    return request({
      url: BASE_ALBUM_API + '/getAlbumAndSongList/' + albumId,
      method: 'get'
    })
  }
}
