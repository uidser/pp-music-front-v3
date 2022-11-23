<template>
  <div>
    <router-view></router-view>
    <div style="width: 100%; height: 50px;display: flex; justify-items: center; position: fixed; bottom: 52px; z-index: 10000;">
      <div class="song-audio-box" @click="toPlay">
        <audio class="song-audio" ref="audio"></audio>
        <div class="audio-left">
          <img src="/img/manleng-album.png" width="50"/>
        </div>
        <div class="audio-right">
          <span class="audio-song-singer-span">慢冷 - 梁静茹</span>
          <div class="audio-button-box">
            <van-icon name="play" size="1.5rem" color="#FFF" v-show="!isPlayer" @click="realPlayerMusic" class="audio-button-box-i"/>
            <van-icon name="pause" size="1.5rem" color="#FFF" v-show="isPlayer" @click="stopMusic" class="audio-button-box-i"/>
            <van-icon name="wap-nav" size="1.5rem" color="#FFF" id="audio-list-button"/>
          </div>
          <div class="audio-progress">
            <van-progress :percentage="progressTage" v-show="progressTage" pivot-color="#7232dd" color="linear-gradient(to right, #e8d58d, #dbb833)" stroke-width="3" :show-pivot="false"/>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; margin: 0 auto; position: absolute; bottom: 0px; box-shadow: 0px -8px 50px 0px rgba(0,0,0,0.1); position: fixed; background-color: white">
      <div class="bottom-nav" @click="changeNavNum(0, '/index')">
        <van-icon name="music" size="2rem" :color="navNum === 0? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>首页</span>
      </div>
      <div class="bottom-nav" @click="changeNavNum(1, '/my')">
        <van-icon name="manager" size="2rem" :color="navNum === 1? '#000000': '#8F8F8FFF'" style="display: block"/>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
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
    let songList = ref([
      { src: '/song/manleng.mp3' }
    ])
    onMounted(() => {
      if(store.getters.isPlay) {
        if (store.getters.currentSongSrc) {
          audio.value.src = store.getters.currentSongSrc
          audio.value.currentTime = store.getters.currentTime
        }
        playerMusic()
      } else {
        audio.value.src = store.getters.songList[0].src
      }
      store.commit('changeCurrentSongSrc', audio.value.src)
    })
    function changeNavNum(num, path) {
      navNum.value = num
      router.push(path)
    }
    function realPlayerMusic() {
      event.cancelBubble = true
      playerMusic()
    }
    function playerMusic() {

      store.commit('changeIsPlay', true)
      isPlayer.value = true
      audio.value.play()
      computeTime = setInterval(() => {
        if (audio.value.currentTime !== null) {
          progressTage.value = (audio.value.currentTime / audio.value.duration) * 100
          store.commit('changeCurrentTime', audio.value.currentTime)
        } else {
          progressTage.value = 0
        }
        store.commit('changeProgressTage', progressTage.value)
        if(progressTage.value >= 100) {
          stopMusic()
        }
      }, 100)
    }
    function stopMusic() {
      event.cancelBubble = true
      store.commit('changeIsPlay', false)
      isPlayer.value = false
      audio.value.pause()
      clearInterval(computeTime)
    }
    function toPlay() {
      router.push('/play')
      clearInterval(computeTime)
    }
    return {
      isPlayer,
      navNum,
      audio,
      songList,
      progressTage,
      computeTime,
      store,
      changeNavNum,
      playerMusic,
      stopMusic,
      toPlay,
      realPlayerMusic
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
</style>
