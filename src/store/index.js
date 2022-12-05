import {createStore} from "vuex"
import analyze from 'rgbaster'
import JsCookie from "js-cookie"
const index = createStore({
  state() {
    return {
      isPlay: false,
      songList: [],
      progressTage: 0,
      currentTime: 0,
      duration: 0,
      currentSongSrc: '',
      showBottomNav: true,
      playerBottom: '52px',
      showMainPlayer: false,
      totalTime: '0:00',
      bottomNavDistance: '0px',
      currentSongPictureSrc: '',
      currentMainColor: '',
      currentSingerName: '',
      searchHistory: [],
      showPLay: false,
      currentTimeMin: '0:00',
      currentMediaId: 0,
      currentSongNameAnimation: false,
      currentSong: {},
      currentAuthorAnimation: false,
      currentIndexSongAuthorNameAnimation: false
    }
  },
  mutations: {
    changeIsPlay(state, args) {
      state.isPlay = args
    },
    changeSongList(state, args) {
      state.songList = args
    },
    changeProgressTage(state, args) {
      state.progressTage = args
    },
    changeCurrentTime(state, args) {
      state.currentTime = args
    },
    changeDuration(state, args) {
      state.duration = args
    },
    changeCurrentSongSrc(state, args) {
      state.currentSongSrc = args
    },
    reComputeShowBottomNav(state) {
      if (window.location.toString().indexOf('/musicBuild') !== -1 || window.location.toString().indexOf('/my') !== -1 || window.location.toString().indexOf('/index') !== -1) {
        state.showBottomNav = true
      } else {
        state.showBottomNav = false
      }
    },
    reComputeMainPlayer(state) {
      if (window.location.toString().indexOf('/play') !== -1) {
        state.showMainPlayer = false
      } else {
        state.showMainPlayer = true
      }
    },
    changeCurrentSongPictureSrc(state, args) {
      state.currentSongPictureSrc = args
    },
    changeCurrentSingerName(state, args) {
      state.currentSingerName = args
    },
    CHANGE_SEARCH_HISTORY(state, args) {
      let totalKeyword = new Object()
      let tempHistory = localStorage.getItem('searchHistoryKeyword') === null? null: JSON.parse(localStorage.getItem('searchHistoryKeyword')).keyword.length? JSON.parse(localStorage.getItem('searchHistoryKeyword')): null
      if(tempHistory) {
        if (tempHistory.keyword.length) {
          if (tempHistory.keyword.includes(args)) {
            tempHistory.keyword[tempHistory.keyword.indexOf(args)] = null
            totalKeyword.keyword = []
            totalKeyword.keyword.push(args)
            tempHistory.keyword.forEach((keyword) => {
              if (keyword) {
                totalKeyword.keyword.push(keyword)
              }
            })
          } else {
            totalKeyword.keyword = [
              args,
              ...tempHistory.keyword
            ]
          }
        }
      } else {
        totalKeyword.keyword = [
          args
        ]
      }
      state.searchHistory = totalKeyword.keyword
      localStorage.setItem('searchHistoryKeyword', JSON.stringify(totalKeyword))
    },
    RESET_SEARCH_HISTORY(state) {
      state.searchHistory = []
      localStorage.removeItem('searchHistoryKeyword')
    },
    CHANGE_SHOW_PLAY(state, args) {
      state.showPLay = args
    },
    CHANGE_CURRENT_TIME_MIN(state, args) {
      let min = state.currentTime / 60
      let sec = state.currentTime % 60
      if (sec.toString().split('.')[0].length < 2) {
        state.currentTimeMin = '0' + min.toString().split('.')[0] + ':' + '0' + sec.toString().split('.')[0]
      } else {
        state.currentTimeMin = '0' + min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
      }
    },
    CHANGE_CURRENT_MEDIA_ID(state, args) {
      state.currentMediaId = args
    },
    RESET_CURRENT_MAIN_COLOR(state) {
      let result = null
      if (state.currentSong) {
        result = analyze(state.currentSong.mediaProfilePictureImg, { scale: 0.1})
      } else {
        result = analyze(state.songList[0].mediaProfilePictureImg, { scale: 0.1})
      }
      result.then(
        res => {
          state.currentMainColor = res[0].color
        }
      )
    },
    RESET_SONG_NAME_ANIMATION(state, ref) {
      if (ref.ref1.clientWidth > ref.ref2.clientWidth) {
        state.currentSongNameAnimation = true
      } else {
        state.currentSongNameAnimation = false
      }
    },
    RESET_AUTHOR_ANIMATION(state, ref) {
      console.log(ref.ref1.clientWidth)
      console.log(ref.ref2.clientWidth)
      if (ref.ref1.clientWidth > ref.ref2.clientWidth) {
        state.currentAuthorAnimation = true
      } else {
        state.currentAuthorAnimation = false
      }
    },
    CHANGE_CURRENT_SONG(state, args) {
      state.currentSong = args
    },
    RESET_CURRENT_INDEX_SONG_AUTHOR_NAME_ANIMATION(state, ref) {
      if (ref.ref1.clientWidth > ref.ref2.clientWidth) {
        state.currentIndexSongAuthorNameAnimation = true
      } else {
        state.currentIndexSongAuthorNameAnimation = false
      }
    }
  }
  ,
  getters: {
    progressTage(state) {
      return state.progressTage
    },
    isPlay(state) {
      return state.isPlay
    },
    songList(state) {
      return state.songList
    },
    currentTime(state) {
      return state.currentTime
    },
    duration(state) {
      return state.duration
    },
    currentSongSrc(state) {
      return state.currentSongSrc
    },
    showBottomNav(state) {
      if (window.location.toString().indexOf('/musicBuild') !== -1 || window.location.toString().indexOf('/my') !== -1 || window.location.toString().indexOf('/index') !== -1) {
        state.showBottomNav = true
        return true
      } else {
        state.showBottomNav = false
        return false
      }
    },
    playerBottom(state) {
      if(state.showBottomNav) {
        state.playerBottom = '52px'
        return '52px'
      } else if (state.showMainPlayer) {
        state.playerBottom = '5px'
        return '5px'
      }
      state.playerBottom = '-50px'
      return '-50px'
    },
    mainPlayer(state) {
      return state.showMainPlayer
    },
    totalTime(state) {
      if(state.duration !== '0:00') {
        let min = state.duration / 60
        let sec = state.duration % 60
        return min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
      } else {
        if (localStorage.getItem('songInfo')) {
          var parse = JSON.parse(localStorage.getItem('songInfo'))
          let duration = parse.duration
          let min = duration / 60
          let sec = duration % 60
          return min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
        }
      }
      return '0:00'
    },
    bottomNavDistance(state) {
      if (state.showBottomNav) {
        state.bottomNavDistance = '0px'
        return '0px'
      }
      state.bottomNavDistance = '-53px'
      return '-53px';
    },
    currentSongPictureSrc(state) {
      return state.currentSongPictureSrc
    },
    currentMainColor(state) {
      let result = null
      if (state.currentSong) {
        result = analyze(state.currentSong.mediaProfilePictureImg, { scale: 0.1, ignore: ['rgb(255 ,255, 255)'] })
      } else {
        result = analyze(state.songList[0].mediaProfilePictureImg, { scale: 0.1, ignore: [`rgb(255 ,255, 255)`] })
      }
      result.then(
        res => {
          state.currentMainColor = res[0].color
        })
      state.showPLay = true
      return state.currentMainColor
    },
    currentSingerName(state) {
      return state.currentSingerName
    },
    searchHistory(state) {
      if (!localStorage.getItem('searchHistoryKeyword')) {
        return []
      }
      state.searchHistory = JSON.parse(localStorage.getItem('searchHistoryKeyword')).keyword
      return JSON.parse(localStorage.getItem('searchHistoryKeyword')).keyword
    },
    token() {
      return JsCookie.get('token')
    },
    currentMediaId(state) {
      return state.currentMediaId
    }
  }
})

export default index
