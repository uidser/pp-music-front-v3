<template>
  <div id="all-div">
    <transition name="van-fade">
      <router-view></router-view>
    </transition>
    <audio class="song-audio" ref="audio"></audio>
    <div id="audio-player" v-if="store.state.showPLay">
      <div class="song-audio-box" @click="toPlay">
        <div class="audio-left">
          <img :src="store.state.currentSong.mediaProfilePictureImg?store.state.currentSong.mediaProfilePictureImg: store.getters.songList[0].mediaProfilePictureImg" width="50"/>
        </div>
        <div class="audio-right">
          <span class="audio-song-singer-span" ref="audioSongSingerSpan"><p :id="store.state.currentIndexSongAuthorNameAnimation?'song-singer-p-animation': 'song-singer-p'" ref="songSingerP">{{ store.getters.currentSingerName }}</p></span>
          <div class="audio-button-box">
            <van-icon name="play" size="1.5rem" color="#FFF" v-show="!isPlayer" @click="realPlayerMusic" class="audio-button-box-i"/>
            <van-icon name="pause" size="1.5rem" color="#FFF" v-show="isPlayer" @click="realStopMusic" class="audio-button-box-i"/>
            <van-icon name="wap-nav" size="1.5rem" color="#FFF" id="audio-list-button" @click="realShowSongList"/>
          </div>
          <div class="audio-progress">
            <van-progress :percentage="progressTage" v-show="progressTage" pivot-color="#7232dd" :color="store.state.currentMainColor?`linear-gradient(to right, ${store.state.currentMainColor}, ${store.state.currentMainColor})`: 'linear-gradient(to right, #e8d58d, #dbb833)'" stroke-width="3" :show-pivot="false"/>
          </div>
        </div>
      </div>
    </div>
    <div id="bottom-nav">
      <div class="bottom-nav" @click="changeNavNum(0, '/index')">
        <van-icon name="music" size="2rem" :color="router.currentRoute.value.path.lastIndexOf('/index') !== -1 || router.currentRoute.value.path.lastIndexOf('/musicBuild') !== -1? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>首页</span>
      </div>
      <div class="bottom-nav" @click="changeNavNum(1, '/my')">
        <van-icon name="manager" size="2rem" :color="router.currentRoute.value.path.lastIndexOf('/my') !== -1? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>我的</span>
      </div>
    </div>
    <van-action-sheet v-model:show="show" @select="onSelect" cancel-text="关闭" style="z-index: 10101010" description="播放列表">
      <div v-for="song in store.getters.songList" :key="song.id" class="song-list" @click="changeCurrentSong(song)">
        <span :class="song.color?'song-list-span-check': 'song-list-span'">{{ song.name + ' - ' + song.author }}</span>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import {onMounted, ref, watch, onBeforeUnmount, nextTick} from "vue"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import pubSub from 'pubsub-js'
import pageApi from "@/api/page/page";
import {Toast} from "vant";
export default {
  name: "index",
  setup() {
    let store = useStore()
    let router = useRouter()
    let navNum = ref(0)
    let isPlayer = ref(false)
    let audio = ref()
    let progressTage = ref(0)
    let computeTime = ref()
    let showBottomNav = ref(false)
    let playerBottom = ref('52px')
    let changeCurrenTimeAndProgressTage = ref()
    let playOrStop = ref()
    let changeCurrentSongSrc = ref()
    let pubShowSongList = ref()
    let show = ref(false)
    let showPlay = ref(false)
    let songList = ref([])
    let audioSongSingerSpan = ref()
    let songSingerP = ref()
    let pubSubDuration = ref()
    function compute() {
      store.commit('reComputeShowBottomNav')
      store.commit('reComputeMainPlayer')
    }
    watch(() => router.currentRoute.value, () => {
      store.commit('reComputeShowBottomNav')
      store.commit('reComputeMainPlayer')
    })
    onBeforeUnmount(() => {
      pubSub.unsubscribe(changeCurrenTimeAndProgressTage)
      pubSub.unsubscribe(playOrStop)
      pubSub.unsubscribe(changeCurrentSongSrc)
      pubSub.unsubscribe(pubShowSongList)
      pubSub.unsubscribe(pubSubDuration)
    })
    async function init() {
      if (localStorage.getItem('songInfo')) {
        var parse = JSON.parse(localStorage.getItem('songInfo'))
        if (parse.mediaId) {
          await pageApi.play().then(
            response => {
              store.commit('changeSongList', response.data.firstBrowsePlayList)
              store.getters.songList.forEach((song) => {
                if (song.id === parse.mediaId) {
                  audio.value.src = song.mediaUrl
                  store.commit('CHANGE_CURRENT_SONG', song)
                  store.commit('changeCurrentSingerName', song.name + ' - ' + song.author)
                }
              })
            }
          )
        }
      } else {
        await pageApi.play().then(
          response => {
            store.commit('changeSongList', response.data.firstBrowsePlayList)
          }
        )
        audio.value.src = store.getters.songList[0].mediaUrl
        store.commit('CHANGE_CURRENT_SONG', store.getters.songList[0])
        store.commit('changeCurrentSingerName', store.getters.songList[0].name + ' - ' + store.getters.songList[0].author)
      }
      store.getters.currentMainColor
      duration()
    }
    onMounted(async () => {
      pubSubDuration = pubSub.subscribe('computeDuration', (name, msg) => {
        duration()
      })
      pubShowSongList = pubSub.subscribe('showSongList', (name, msg) => {
        showSongList()
      })
      changeCurrentSongSrc = pubSub.subscribe('changeCurrentSongSrcPubSub', async (name, msg) => {
        stopMusic()
        store.commit('CHANGE_CURRENT_SONG', msg)
        audio.value.src = msg.mediaUrl
        audio.value.currentTime = 0
        progressTage.value = 0
        await store.commit('changeProgressTage', 0)
        await store.commit('changeCurrentTime', 0)
        msg.name = msg.name.replace('<span style=\'color: #ff0039;\'>', '').replace('</span>', '')
        msg.author = msg.author.replace('<span style=\'color: #ff0039;\'>', '').replace('</span>', '')
        await store.commit('changeCurrentSingerName', msg.name + ' - ' + msg.author)
        let songInfo = { mediaUrl: msg.mediaUrl, mediaId: msg.id }
        localStorage.setItem('songInfo', JSON.stringify(songInfo))
        playerMusic()
        duration()
      })
      changeCurrenTimeAndProgressTage = pubSub.subscribe('changeCurrenTimeAndProgressTage', (name, msg) => {
        var strings = msg.toString().split(':')
        audio.value.currentTime = strings[0]
        progressTage.value = strings[1]
        store.commit('changeCurrentTime', strings[0])
        store.commit('changeProgressTage', strings[1])
      })
      playOrStop = pubSub.subscribe('playOrStop', (name, msg) => {
        if (msg) {
          playerMusic()
        } else {
          stopMusic()
        }
      })
      await compute()
      nextTick(() => {
        init()
      })
    })
    async function onSelect(item) {
      if (item.mediaUrl === store.getters.currentSongSrc) {
        if (store.getters.progressTage === 100) {
          store.commit('changeCurrentTime', 0)
          store.commit('changeProgressTage', 0)
          playerMusic()
        }
        if (!store.state.isPlay) {
          playerMusic()
        }
        show.value = false
      } else {
        store.commit('changeCurrentSongSrc', item.mediaUrl)
        store.getters.songList.forEach((song) => {
          song.color = ''
          if (store.state.currentSong.id === song.id) {
            song.color = '#ee0a24'
            audio.value.src = item.mediaUrl
            store.commit('changeCurrentSingerName', item.name + ' - ' + item.author)
            store.commit('CHANGE_CURRENT_SONG', item)
            let songInfo = { mediaUrl: item.mediaUrl, mediaId: item.id }
            localStorage.setItem('songInfo', JSON.stringify(songInfo))
            store.commit('changeCurrentTime', 0)
            pubSub.publish('action', true)
            store.commit('RESET_CURRENT_MAIN_COLOR')
          }
        })
        duration()
        playerMusic()
        show.value = false
      }
    }
    function realShowSongList() {
      event.cancelBubble = true
      showSongList()
    }
    function showSongList() {
      if (!store.getters.currentSongSrc) {
        store.commit('changeCurrentSongSrc', store.getters.songList[0].mediaUrl)
      }
      store.state.songList.forEach((song) => {
        song.color = ''
        if (store.state.currentSong.id === song.id) {
          song.color = '#ee0a24'
        }
      })
      show.value = true
    }
    function changeNavNum(num, path) {
      navNum.value = num
      router.push(path)
    }
    function realPlayerMusic() {
      event.cancelBubble = true
      playerMusic()
    }
    function playerMusic() {
      audio.value.src = store.state.currentSong.mediaUrl
      if (store.getters.currentTime) {
        audio.value.currentTime = store.getters.currentTime
      } else {
        audio.value.currentTime = 0
      }
      store.commit('changeIsPlay', true)
      isPlayer.value = true
      audio.value.play()
      pubSub.publish('changeIsPlayPubSub', true)
      store.commit('RESET_CURRENT_INDEX_SONG_AUTHOR_NAME_ANIMATION', { ref1: songSingerP.value, ref2: audioSongSingerSpan.value })
      computeTime = setInterval(() => {
        progressTage.value = (audio.value.currentTime / audio.value.duration) * 100
        store.commit('changeCurrentTime', audio.value.currentTime)
        store.commit('changeProgressTage', progressTage.value)
        if(progressTage.value >= 100) {
          if (store.state.currentSong.id === store.getters.songList[store.getters.songList.length - 1].id) {
            stopMusic()
          } else {
            nextSong()
          }
        }
      }, 100)
    }
    function stopMusic() {
      store.commit('changeIsPlay', false)
      isPlayer.value = false
      audio.value.pause()
      clearInterval(computeTime)
    }
    function toPlay() {
      router.push('/play')
    }
    function duration() {
      // let audio1 = new Audio(store.state.currentSong.mediaUrl)
      // audio1.addEventListener('loadedmetadata', () => {
      //   store.commit('changeDuration', audio1.duration)
      //   return audio1.duration
      // })
      audio.value.addEventListener('loadedmetadata', () => {
        store.commit('changeDuration', audio.value.duration)
        return audio.value.duration
      })
    }
    function realStopMusic() {
      event.cancelBubble = true
      stopMusic()
    }
    const changeCurrentSong = (song) => {
      onSelect(song)
    }
    const nextSong = () => {
      for (let i = 0; i < store.getters.songList.length; i++) {
        if (store.state.currentSong.id === store.getters.songList[i].id) {
          if(i < store.getters.songList.length - 1) {
            store.commit('CHANGE_CURRENT_SONG', store.getters.songList[i + 1])
            store.commit('RESET_CURRENT_MAIN_COLOR')
            store.commit('changeCurrentSingerName', store.getters.songList[i + 1].name + ' - ' + store.getters.songList[i + 1].author)
            stopMusic()
            pubSub.publish('changeCurrentSongSrcPubSub', store.getters.songList[i + 1])
            playerMusic()
            break
          } else {
            Toast('已经是最后一首了')
            if (store.getters.progressTage >= 100) {
              stopMusic()
            }
          }
        }
      }
    }
    return {
      isPlayer,
      navNum,
      audio,
      songList,
      progressTage,
      computeTime,
      store,
      show,
      showBottomNav,
      playerBottom,
      changeCurrenTimeAndProgressTage,
      playOrStop,
      changeCurrentSongSrc,
      pubShowSongList,
      showPlay,
      audioSongSingerSpan,
      songSingerP,
      router,
      changeCurrentSong,
      realShowSongList,
      onSelect,
      showSongList,
      changeNavNum,
      playerMusic,
      stopMusic,
      toPlay,
      realPlayerMusic,
      duration,
      realStopMusic,
      compute
    }
  }
}
</script>

<style scoped>
  .bottom-nav{
    width: 50%;
    margin: 0 auto;
    display: inline-block;
    text-align: center
  }
  .song-audio{

  }
  .song-audio-box{
    width: 330px;
    height: 50px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .audio-left{
    height: 50px;
    width: 50px;
    border-radius: 5px;
    overflow: hidden;
    display: inline-block;
    float: left;
    box-shadow: 14px 20px 15px -3px rgba(0,0,0,0.1);
    z-index: 99999;
  }
  .audio-right{
    height: 50px;
    width: 284px;
    background-color: v-bind('store.state.currentMainColor');
    display: flex;
    align-items: center;
    border-radius: 0px 25px 25px 0px;
    position: relative;
    left: -4px;
  }
  .audio-song-singer-span{
    line-height: 50px;
    margin-left: 20px;
    width: 70%;
    overflow: hidden;
    color: #FFF;
    font-size: 14px;
    float: left;
  }
  #audio-list-button{
    float: right;
    height: 100%;
    width: 24px;
  }
  .audio-button-box-i{
    float: right;
    display: block;
    width: 24px;
    height: 100%;
    margin: 0 8px;
    position: absolute;
    right: 18px;
  }
  .audio-button-box{
    position: absolute;
    right: 10px;
  }
  .audio-progress{
    width: 263px;
    position: absolute;
    bottom: 0px;
    border-radius: 2px;
  }
  #audio-player{
    width: 100vw;
    height: 50px;
    display: flex;
    justify-items: center;
    position: fixed;
    bottom: v-bind('store.getters.playerBottom');
    transition-duration: 0.5s;
    z-index: 10000;
  }
  #all-div{
    height: 100vw;
    position: relative;
  }
  #bottom-nav{
    width: 100%;
    margin: 0 auto;
    bottom: v-bind('store.getters.bottomNavDistance');
    box-shadow: 0px -8px 50px 0px rgba(0,0,0,0.1);
    transition-duration: 0.5s;
    position: fixed;
    background-color: white
  }
  @keyframes titleLoop {
    0% {
      transform: translateX(10%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  #song-singer-p{
    display: inline-block;
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
  #song-singer-p-animation{
    display: inline-block;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    animation: titleLoop 15s linear infinite normal;
  }
  .song-list{
    width: 90vw;
    margin-left: 10vw;
  }
  .song-list-span{
    display: inline-block;
    width: 80vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 15px 0;
  }
  .song-list-span-check{
    display: inline-block;
    width: 80vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 15px 0;
    color: #ff0039;
  }
  .line{
    height: 0.5px;
    width: 80%;
    background-color: #8f8f8f;
  }
</style>
