<template>
  <div id="all-div">
    <router-view></router-view>
    <div id="audio-player">
      <div class="song-audio-box" @click="toPlay" v-show="store.getters.mainPlayer">
        <audio class="song-audio" ref="audio"></audio>
        <div class="audio-left">
          <img src="/img/manleng-album.png" width="50"/>
        </div>
        <div class="audio-right">
          <span class="audio-song-singer-span">慢冷 - 梁静茹</span>
          <div class="audio-button-box">
            <van-icon name="play" size="1.5rem" color="#FFF" v-show="!isPlayer" @click="realPlayerMusic" class="audio-button-box-i"/>
            <van-icon name="pause" size="1.5rem" color="#FFF" v-show="isPlayer" @click="realStopMusic" class="audio-button-box-i"/>
            <van-icon name="wap-nav" size="1.5rem" color="#FFF" id="audio-list-button" @click="realShowSongList"/>
          </div>
          <div class="audio-progress">
            <van-progress :percentage="progressTage" v-show="progressTage" pivot-color="#7232dd" color="linear-gradient(to right, #e8d58d, #dbb833)" stroke-width="3" :show-pivot="false"/>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; margin: 0 auto; position: absolute; bottom: 0px; box-shadow: 0px -8px 50px 0px rgba(0,0,0,0.1); position: fixed; background-color: white" v-show="store.state.showBottomNav">
      <div class="bottom-nav" @click="changeNavNum(0, '/index')">
        <van-icon name="music" size="2rem" :color="navNum === 0? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>首页</span>
      </div>
      <div class="bottom-nav" @click="changeNavNum(1, '/my')">
        <van-icon name="manager" size="2rem" :color="navNum === 1? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>我的</span>
      </div>
    </div>
    <van-action-sheet v-model:show="show" :actions="store.getters.songList" @select="onSelect" cancel-text="关闭" style="z-index: 10101010"/>
  </div>
</template>
<script>
import {onMounted, ref, watch, onBeforeUnmount} from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import pubSub from 'pubsub-js'
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
    let songList = ref([
      { src: '/song/manleng.mp3' }
    ])
    function compute() {
      store.commit('reComputeShowBottomNav')
      store.commit('reComputeMainPlayer')
    }
    watch(() => router.currentRoute.value, () => {
      store.commit('reComputeShowBottomNav')
      store.commit('reComputeMainPlayer')
      // nextTick(() => {
      //   if(store.getters.mainPlayer) {
      //     if(store.getters.isPlay) {
      //       if (store.getters.currentSongSrc) {
      //         audio.value.src = store.getters.currentSongSrc
      //         audio.value.currentTime = store.getters.currentTime
      //       }
      //       playerMusic()
      //     } else {
      //       audio.value.src = store.getters.songList[0].src
      //     }
      //     store.commit('changeCurrentSongSrc', audio.value.src)
      //   }
      // })
    })
    onBeforeUnmount(() => {
      pubSub.unsubscribe(changeCurrenTimeAndProgressTage)
      pubSub.unsubscribe(playOrStop)
      pubSub.unsubscribe(changeCurrentSongSrc)
      pubSub.unsubscribe(pubShowSongList)
    })
    onMounted(async () => {
      if (localStorage.getItem('songInfo')) {
        var parse = JSON.parse(localStorage.getItem('songInfo'))
        store.commit('changeCurrentSongSrc', parse.songSrc)
        audio.value.src = parse.songSrc
      }
      pubShowSongList = pubSub.subscribe('showSongList', (name, msg) => {
        showSongList()
      })
      changeCurrentSongSrc = pubSub.subscribe('changeCurrentSongSrcPubSub', async (name, msg) => {
        stopMusic()
        store.commit('changeCurrentSongSrc', msg)
        audio.value.src = msg
        progressTage.value = 0
        await store.commit('changeProgressTage', 0)
        let songInfo = { songSrc: msg, duration: await duration() }
        localStorage.setItem('songInfo', JSON.stringify(songInfo))
        playerMusic()
        duration()
      })
      changeCurrenTimeAndProgressTage = pubSub.subscribe('changeCurrenTimeAndProgressTage', (name, msg) => {
        var strings = msg.toString().split(':');
        audio.value.currentTime = strings[0]
        progressTage.value = strings[1]
        store.commit('changeCurrentTime', strings[0])
        store.commit('changeProgressTage', strings[1])
      })
      playOrStop = pubSub.subscribe('playOrStop', (name, msg) => {
        console.log(msg)
        if (msg) {
          playerMusic()
        } else {
          stopMusic()
        }
      })
      await compute()
      if (localStorage.getItem('songInfo')) {
        var parse1 = JSON.parse(localStorage.getItem('songInfo'))
        if (parse1.songSrc){
          audio.value.src = parse1.songSrc
          store.commit('changeCurrentSongSrc', parse1.songSrc)
          duration()
        }
      } else {
        audio.value.src = store.getters.songList[0].src
        store.commit('changeCurrentSongSrc', store.getters.songList[0].src)
      }
    })
    async function onSelect(item) {
      store.commit('changeCurrentSongSrc', item.src)
      let src = store.getters.currentSongSrc.substring(store.getters.currentSongSrc.lastIndexOf('/') + 1, store.getters.currentSongSrc.length)
      store.getters.songList.forEach((song) => {
        song.color = ''
        let subSrc = song.src.substring(song.src.lastIndexOf('/') + 1, song.src.length)
        if (subSrc === src) {
          song.color = '#ee0a24'
          audio.value.src = item.src
          let songInfo = { songSrc: item.src, duration: duration() }
          localStorage.setItem('songInfo', JSON.stringify(songInfo))
          store.commit('changeCurrentTime', 0)
        }
      })
      playerMusic()
      show.value = false
    }
    function realShowSongList() {
      event.cancelBubble = true
      showSongList()
    }
    function showSongList() {
      let src = store.getters.currentSongSrc.substring(store.getters.currentSongSrc.lastIndexOf('/') + 1, store.getters.currentSongSrc.length)
      store.getters.songList.forEach((song) => {
        song.color = ''
        let subSrc = song.src.substring(song.src.lastIndexOf('/') + 1, song.src.length)
        if (subSrc === src) {
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
      if (store.getters.currentTime) {
        audio.value.currentTime = store.getters.currentTime
      } else {
        audio.value.currentTime = 0
      }
      store.commit('changeIsPlay', true)
      isPlayer.value = true
      audio.value.play()
      computeTime = setInterval(() => {
        progressTage.value = (audio.value.currentTime / audio.value.duration) * 100
        store.commit('changeCurrentTime', audio.value.currentTime)
        store.commit('changeProgressTage', progressTage.value)
        if(progressTage.value >= 100) {
          stopMusic()
        }
      }, 100)
      let songInfo = { songSrc: audio.value.src, duration: audio.value.duration }
      localStorage.setItem('songInfo', JSON.stringify(songInfo))
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
      let audio1 = new Audio(store.getters.currentSongSrc)
      audio1.addEventListener('loadedmetadata', () => {
        store.commit('changeDuration', audio1.duration)
        return audio1.duration
      })
    }
    function realStopMusic() {
      event.cancelBubble = true
      stopMusic()
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
  }
  .audio-right{
    height: 50px;
    width: 280px;
    background-color: #ede6cc;
    display: flex;
    align-items: center;
    border-radius: 0px 25px 25px 0px;
    position: relative;
  }
  .audio-song-singer-span{
    line-height: 50px;
    margin-left: 20px;
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
    bottom: 0;
    left: -2px;
    border-radius: 2px;
  }
  #audio-player{
    width: 100%;
    height: 50px;
    display: flex;
    justify-items: center;
    position: fixed;
    bottom: v-bind('store.getters.playerBottom');
    z-index: 10000;
  }
  #all-div{
    height: 100%;
    position: relative;
  }
</style>
