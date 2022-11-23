import {createStore} from "vuex"

const playerStore = createStore({
  state() {
    return {
      isPlay: false,
      songList: [
        {src: '/song/manleng.mp3', id: 1, 'name': '慢冷 - 梁静茹'},
        {src: '/song/LilNasX-STARWALKIN(LeagueofLegendsWorldsAnthem).mp3', id: 2, 'name': 'STARWALKIN - LilNasX'}
      ],
      progressTage: 0,
      currentTime: 0,
      duration: 0,
      currentSongSrc: ''
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
      state.currentTime = args
    },
    changeCurrentSongSrc(state, args) {
      state.currentSongSrc = args
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
    }
  }
})

export default playerStore
