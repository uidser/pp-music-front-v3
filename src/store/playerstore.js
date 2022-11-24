import {createStore} from "vuex"

const playerStore = createStore({
  state() {
    return {
      isPlay: false,
      songList: [
        {src: 'http://localhost:8080/song/manleng.mp3', id: 1, 'name': '慢冷 - 梁静茹'},
        {src: 'http://localhost:8080/song/LilNasX-STARWALKIN(LeagueofLegendsWorldsAnthem).mp3', id: 2, 'name': 'STARWALKIN - LilNasX'}
      ],
      progressTage: 0,
      currentTime: 0,
      duration: 0,
      currentSongSrc: '',
      showBottomNav: true,
      playerBottom: '52px',
      showMainPlayer: false,
      totalTime: '0:00'
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
      if (window.location.toString().indexOf('/musicBuild') !== -1 || window.location.toString().indexOf('/songList') !== -1 || window.location.toString().indexOf('/my') !== -1 || window.location.toString().indexOf('/index') !== -1) {
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
      // if (localStorage.getItem('songInfo')) {
      //   var parse = JSON.parse(localStorage.getItem('songInfo'))
      //   return parse.songSrc
      // }
      return state.currentSongSrc
    },
    showBottomNav(state) {
      if (window.location.toString().indexOf('/musicBuild') !== -1 || window.location.toString().indexOf('/songList') !== -1 || window.location.toString().indexOf('/my') !== -1 || window.location.toString().indexOf('/index') !== -1) {
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
      }
      state.playerBottom = '5px'
      return '5px'
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
    }
  }
})

export default playerStore
