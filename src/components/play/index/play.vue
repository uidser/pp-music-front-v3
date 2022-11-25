<template>
  <div>
    <div class="play-title-box">
      <van-icon name="cross" size="1.5rem" color="#8f8f8f" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span">歌曲</span>
      <van-icon name="share" size="1.5rem" color="#8f8f8f" style="float: right" class="play-title-icon"/>
    </div>
    <div class="song-music-picture-box" ref="animation">
      <div class="song-music-picture-content">
        <van-image width="300" :src="store.getters.currentSongPictureSrc" ref="img"/>
      </div>
    </div>
    <div class="song-detail-box">
      <div class="song-name">
        <span class="song-name-span">{{ store.getters.currentSingerName.split('-')[1] }}</span>
        <van-icon name="like-o" color="#8f8f8f" size="2rem" style="float: right;" badge="99+" :badge-props="{color: '#8f8f8f'}" />
      </div>
      <div class="song-owner-name-and-button">
        <div class="play-owner-box">
          <span class="play-owner-span">{{ store.getters.currentSingerName.split('-')[0] }}</span>
        </div>
        <div class="follow-button">
          <span class="follow-span">关注</span>
        </div>
        <div class="flag-button">
          <span class="flag-span">限免</span>
        </div>
        <div class="flag-button">
          <span class="flag-span">标准</span>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="menu-button">
        <van-icon name="comment-o" color="#8f8f8f" size="2rem" @click="toComment" style="float: left;" badge="99+" :badge-props="{color: '#8f8f8f'}"/>
        <van-icon name="ellipsis" color="#8f8f8f" size="2rem" style="float: right;"/>
      </div>
      <div class="song-audio-box">
<!--        <audio class="song-audio" ref="audio" @canplay="loadFinish" :loop="loop"></audio>-->
        <div class="audio-progress">
          <div style="position: relative">
            <van-progress :percentage="progressTage" @click="changeProgress" @change="changeProgress" pivot-color="#dbb833" color="linear-gradient(to right, #e8d58d, #dbb833)" stroke-width="5" pivot-text=" "/>
            <input type="range" min="0" max="360" ref="progressTageRef" @change="changeProgress" style="width: 101%;position: absolute; top: 0px;height: 5px;left: -3px; opacity: 0">
          </div>
          <div class="current-time">
            <span>{{ currentTime }}</span>
          </div>
          <div class="total-time">
            <span>{{ store.getters.totalTime }}</span>
          </div>
        </div>
        <div class="audio-right">
          <div class="audio-button-box">
            <van-icon name="replay" size="2.5rem" color="#8f8f8f" v-show="showReplay" @click="replay" class="audio-button-box-i" style="opacity: 70%;"/>
            <van-icon name="descending" size="2.5rem" color="#8f8f8f" v-show="!showReplay" @click="order" class="audio-button-box-i" style="opacity: 70%;"/>
            <van-icon name="arrow-left" size="2.5rem" color="#8f8f8f" @click="previous" class="audio-button-box-i"/>
            <van-icon name="play-circle-o" size="4rem" color="#8f8f8f" v-if="!isPlayer" @click="playerMusic" class="audio-button-box-i"/>
            <van-icon name="pause-circle-o" size="4rem" color="#8f8f8f" v-if="isPlayer" @click="stopMusic" class="audio-button-box-i"/>
            <van-icon name="arrow" size="2.5rem" color="#8f8f8f" @click="nextSong" class="audio-button-box-i" />
            <van-icon name="wap-nav" size="2.5rem" color="#8f8f8f" @click="showSongList" class="audio-button-box-i" style="opacity: 70%;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {Toast} from "vant"
import {useStore} from "vuex"
import pubSub from "pubsub-js";
export default {
  name: "play",
  setup() {
    let store = useStore()
    let finished = ref(true)
    let loading = ref(false)
    let currentTime = ref('00:00')
    let totalTime = ref('00:00')
    let img = ref()
    let animation = ref()
    let isPlayer = ref(false)
    let audio = ref()
    let computeTime = ref()
    let progressTage = ref('0')
    let router = useRouter()
    let timer = ref()
    let progressTageRef = ref()
    let show = ref(false)
    let showReplay = ref(false)
    let loop = ref(false)
    // let songList = ref([
    //   { src: '/song/manleng.mp3', id: 1, 'name': '慢冷 - 梁静茹' },
    //   { src: '/song/LilNasX-STARWALKIN(LeagueofLegendsWorldsAnthem).mp3', id: 2, 'name': 'STARWALKIN - LilNasX' }
    // ])
    onBeforeUnmount(() => {
      pubSub.unsubscribe('action')
    })
    onMounted(() => {
      pubSub.subscribe('action', (name, msg) => {
        if(msg) {
          playerMusic()
        } else {
          stopMusic()
        }
      })
      if (store.getters.isPlay) {
        isPlayer.value = true
        computeTime = setInterval(async () => {
          progressTage.value = store.getters.progressTage
          if(progressTage.value >= 100) {
            nextSong()
          }
        }, 100)
        timer = setInterval(() => {
          let min = store.getters.currentTime / 60
          let sec = store.getters.currentTime % 60
          if (sec.toString().split('.')[0].length < 2) {
            currentTime.value = '0' + min.toString().split('.')[0] + ':' + '0' + sec.toString().split('.')[0]
          } else {
            currentTime.value = '0' + min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
          }
        }, 1000)
      } else {
        isPlayer.value = false
        totalTime.value = '0:00'
      }
      if (store.getters.progressTage) {
        progressTage.value = store.getters.progressTage
      }
      duration()
    })
    async function back() {
      router.go(-1)
      await clearInterval(computeTime)
      await clearInterval(timer)
    }
    function playerMusic() {
      if (store.getters.isPlay) {

      } else {
        store.commit('changeIsPlay', true)
        pubSub.publish('playOrStop', true)
      }
      isPlayer.value = true
      computeTime = setInterval(async () => {
        progressTage.value = store.getters.progressTage
        if(progressTage.value >= 100) {
          nextSong()
        }
      }, 100)
      timer = setInterval(() => {
        let min = store.getters.currentTime / 60
        let sec = store.getters.currentTime % 60
        if (sec.toString().split('.')[0].length < 2) {
          currentTime.value = '0' + min.toString().split('.')[0] + ':' + '0' + sec.toString().split('.')[0]
        } else {
          currentTime.value = '0' + min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
        }
      }, 1000)
    }
    function showSongList() {
      pubSub.publish('showSongList', true)
    }
    function stopMusic() {
      clearInterval(computeTime)
      clearInterval(timer)
      store.commit('changeIsPlay', false)
      isPlayer.value = false
      pubSub.publish('playOrStop', false)
    }
    function changeProgress() {
      let currentProgress = progressTageRef.value.value
      let redirectTime = currentProgress / 360
      let duration = store.getters.duration
      let currentTime = duration * redirectTime
      store.commit('changeCurrentTime', currentTime)
      progressTage.value = redirectTime * 100
      store.commit('changeProgressTage', progressTage.value)
      pubSub.publish('changeCurrenTimeAndProgressTage', currentTime + ':' + progressTage.value)
      playerMusic()
    }
    async function nextSong() {
      let src = store.getters.currentSongSrc.substring(store.getters.currentSongSrc.lastIndexOf('/') + 1, store.getters.currentSongSrc.length)
      store.getters.songList.forEach((song, index) => {
        let subSrc = song.src.substring(song.src.lastIndexOf('/') + 1, song.src.length)
        if (subSrc === src) {
          if(index < store.getters.songList.length - 1) {
            store.commit('changeCurrentSongSrc', store.getters.songList[index + 1].src)
            store.commit('changeCurrentTime', 0)
            store.commit('changeCurrentSongPictureSrc', store.getters.songList[index + 1].songPicture)
            store.commit('changeCurrentSingerName', store.getters.songList[index + 1].name)
            stopMusic()
            pubSub.publish('changeCurrentSongSrcPubSub', store.getters.songList[index + 1].src)
            playerMusic()
          } else {
            Toast('已经是最后一首了')
            if (Number(progressTage.value).toFixed() >= 100) {
              stopMusic()
            }
          }
        }
      })

    }
    function previous() {
      let src = store.getters.currentSongSrc.substring(store.getters.currentSongSrc.lastIndexOf('/') + 1, store.getters.currentSongSrc.length)
      store.getters.songList.forEach((song, index) => {
        let subSrc = song.src.substring(song.src.lastIndexOf('/') + 1, song.src.length)
        if (subSrc === src) {
          if(index - 1 > -1) {
            store.commit('changeCurrentTime', 0)
            stopMusic()
            pubSub.publish('changeCurrentSongSrcPubSub', store.getters.songList[index - 1].src)
            store.commit('changeCurrentSongPictureSrc', store.getters.songList[index - 1].songPicture)
            store.commit('changeCurrentSingerName', store.getters.songList[index - 1].name)
            playerMusic()
          } else {
            Toast('已经是第一首了')
          }
        }
      })
    }
    function duration() {
      if(store.getters.duration) {
        let duration = store.getters.duration
        let min = duration / 60
        let sec = duration % 60
        totalTime.value = min.toString().split('.')[0] + ':' + sec.toString().split('.')[0]
      }
    }
    // async function onSelect(item) {
    //   store.commit('changeCurrentSongSrc', item.src)
    //   let src = store.getters.currentSongSrc.substring(store.getters.currentSongSrc.lastIndexOf('/') + 1, store.getters.currentSongSrc.length)
    //   store.getters.songList.forEach((song) => {
    //     song.color = ''
    //     let subSrc = song.src.substring(song.src.lastIndexOf('/') + 1, song.src.length)
    //     if (subSrc === src) {
    //       song.color = '#ee0a24'
    //       pubSub.publish('changeCurrentSongSrcPubSub', item.src)
    //       store.commit('changeCurrentTime', 0)
    //     }
    //   })
    //   show.value = false
    //   playerMusic()
    // }
    function replay() {
      Toast('顺序播放')
      showReplay.value = !showReplay.value
      loop.value = false
    }
    function order() {
      Toast('单曲循环')
      showReplay.value = !showReplay.value
      loop.value = true
    }
    async function toComment() {
      router.push('/comment')
      await clearInterval(computeTime)
      await clearInterval(timer)
    }
    return {
      finished,
      loading,
      img,
      timer,
      animation,
      isPlayer,
      progressTage,
      audio,
      router,
      currentTime,
      totalTime,
      progressTageRef,
      show,
      showReplay,
      loop,
      store,
      playerMusic,
      stopMusic,
      back,
      changeProgress,
      nextSong,
      previous,
      showSongList,
      replay,
      order,
      toComment,
      duration
    }
  }
}
</script>

<style scoped>
  .play-title-box{
    margin: 20px 0;
    text-align: center;
  }
  .play-title-span{
    font-size: 14px;
  }
  .play-title-icon{
    margin: 0 15px;
  }
  .song-music-picture-box{
    border-radius: 30px;
    height: 300px;
    width: 300px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0px 0px 64px 15px rgba(0,0,0,0.1);
    margin: 70px auto;
    margin-top: 40px;
  }
  /*.song-music-picture-box{*/
  /*  animation: img 30s infinite linear;*/
  /*}*/
  /*@keyframes img {*/
  /*  0%{*/
  /*    transform: rotate(0deg);*/
  /*  }*/
  /*  100%{*/
  /*    transform: rotate(360deg);*/
  /*  }*/
  /*}*/
  .follow-button{
    border: 1.5px solid #8f8f8f;
    border-radius: 10px;
    width: 34px;
    height: 16px;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
  .follow-span{
    font-size: 12px;
    display: block;
    margin: 0 auto;
  }
  .flag-button{
    width: 30px;
    height: 16px;
    background-color: #8f8f8f;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-left: 10px;
  }
  .flag-span{
    font-size: 12px;
    color: #FFF;
    display: block;
    margin: 0 auto;
  }
  .play-owner-box{
    display: inline-block;
  }
  .song-owner-name-and-button{

  }
  .play-owner-span{
    font-size: 14px;
  }
  .song-name-span{
    font-size: 28px;
  }
  .song-name{
    margin-bottom: 15px;
  }
  .control{
    margin-top: 50px;
  }
  .menu-button{
    height: 60px;
    width: 76%;
    margin: 0 auto;
  }
  .audio-button-box{
    margin: 10px auto;
    display: flex;
    align-items: center;
  }
  .audio-progress{
    width: 80%;
    margin: 0 auto;
  }
  .audio-button-box-i{
    margin: 0 12px;
  }
  .audio-right{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .current-time, .total-time{
    font-size: 14px;
    margin: 5px 0;
    color: #8f8f8f;
  }
  .current-time{
    float: left;
  }
  .total-time{
    float: right;
  }
  .song-detail-box{
    width: 76%;
    margin: 0 auto;
  }
</style>
