import {createStore} from "vuex"
import analyze from 'rgbaster'
const index = createStore({
  state() {
    return {
      isPlay: false,
      songList: [
        {src: '/song/manleng.mp3', id: 1, name: '慢冷 - 梁静茹', songPicture: '/img/manleng-album.png' },
        {src: '/song/LilNasX-STARWALKIN(LeagueofLegendsWorldsAnthem).mp3', id: 2, name: 'STARWALKIN - LilNasX', songPicture: '/img/20221125142653.jpg'}
      ],
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
      searchHistory: []
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
    }
  },
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
      let result = null;
      if (state.currentSongPictureSrc) {
        result = analyze(state.currentSongPictureSrc, { scale: 0.1})
      } else {
        result = analyze(state.songList[0].songPicture, { scale: 0.1})
      }
      result.then(
        res => {
          state.currentMainColor = res[0].color
        }
      )
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
    }
  }
})

export default index
