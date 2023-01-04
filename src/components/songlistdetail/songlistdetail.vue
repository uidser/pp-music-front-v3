<template>
  <div>
    <div id="front-box"></div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#FFF" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong><p id="title">{{ songList.name }}</p></strong></span>
      <van-icon name="search" size="1.5rem" color="#FFF" style="float: right;" class="play-title-icon" @click="search"/>
    </div>
    <div id="background-img-and-title-box">
      <div id="img-box">
        <img :src="songList.profilePicture" id="background-img" />
      </div>
    </div>
    <div id="song-list-content">
      <div id="title-box">
        <span id="title-span"><strong>{{ songList.name }}</strong></span>
        <span id="introduction-span">{{ songList.introduction }}</span>
      </div>
      <div id="owner-box">
        <div id="owner-profile-picture-box">
          <img :src="songList.owner.profilePicture" width="30"/>
        </div>
        <span id="owner-span">{{ songList.owner.nickname }}</span>
        <div id="follow-box">
          <span id="follow-span">关注</span>
        </div>
        <div id="listen-quantity-box">
          <van-icon name="audio" size="0.7rem" color="#8f8f8f" style="font-weight: bolder"/>
          <span id="listen-quantity">2.3万</span>
        </div>
      </div>
      <div id="center-button">
        <van-icon name="like" size="1.5rem" color="#e0e0e0" class="center-button-icon" :badge="songList.favoriteQuantity" v-if="songList.favoriteQuantity > 0" :badge-props="{color: '#8f8f8f'}" max="999"/>
        <van-icon name="like" size="1.5rem" color="#e0e0e0" class="center-button-icon" v-if="songList.favoriteQuantity === 0"/>
        <van-icon name="comment" size="1.5rem" color="#e0e0e0" class="center-button-icon" :badge="songList.commentQuantity" v-if="songList.commentQuantity > 0" :badge-props="{color: '#8f8f8f'}" max="999"/>
        <van-icon name="comment" size="1.5rem" color="#e0e0e0" class="center-button-icon" v-if="songList.commentQuantity === 0"/>
        <van-icon name="share" size="1.5rem" color="#e0e0e0" class="center-button-icon"/>
      </div>
      <div id="play-and-sort-button">
        <div id="play-and-sort-button-left" @click="playAll">
          <van-icon name="play-circle"  size="1.7rem" color="#8f8f8f"/>
          <span id="play-all-span">全部播放</span>
        </div>
      </div>
      <div id="song-list-items">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <song v-for="(song, index) in songList.songList" :key="song" :show-step="false" :rank-number="index + 1" :album="song.album" :author="song.author" :name="song.name"></song>
          </van-list>
      </div>
    </div>
    <div id="bottom-safe"></div>
  </div>
</template>

<script>
import songlistApi from "@/api/songlist/songlist"
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import Song from "@/components/publiccomponent/song/song"
import {useStore} from "vuex"
import pubSub from "pubsub-js"
export default {
  name: "songlistdetail",
  components: {Song},
  setup() {
    let finished = ref(false)
    let loading = ref(false)
    let router = useRouter()
    let titleSpanOpacity = ref(0)
    let songListList = ref(100)
    let playTitleBoxBackGroundColor = ref('rgba(237, 230, 204, 0)')
    let songList = ref({
      owner: {}
    })
    let store = useStore()
    const back = () => {
      router.go(-1)
    }
    const search = () => {

    }
    onMounted(() => {
      let route = router.currentRoute.value
      songlistApi.get(route.params.id).then(
        response => {
          songList.value = response.data
        }
      )
      window.addEventListener('scroll', () => {
        let scrollTop = pageYOffset
        titleSpanOpacity.value = scrollTop / 390
        playTitleBoxBackGroundColor.value = `rgba(237, 230, 204, ${titleSpanOpacity.value})`
      })
    })
    const onLoad = () => {
      setTimeout(() => {
        songListList.value += 100
        loading.value = false
        if(songListList.value >= 300) {
          finished.value = true
        }
      }, 1000)
    }
    const playAll = () => {
      pubSub.publish('playOrStop', false)
      store.commit('changeSongList', songList.value.songList)
      store.commit('CHANGE_CURRENT_SONG', songList.value[0])
      store.commit('RESET_CURRENT_MAIN_COLOR')
      store.commit('changeCurrentSingerName', songList.value[0].author + ' - ' + songList.value[0].name)
    }
    return {
      router,
      titleSpanOpacity,
      playTitleBoxBackGroundColor,
      finished,
      loading,
      songListList,
      songList,
      store,
      playAll,
      onLoad,
      back,
      search
    }
  }
}
</script>

<style scoped>
  .play-title-box{
    padding: 20px 0;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    background-color: v-bind('playTitleBoxBackGroundColor');
    z-index: 9999;
  }
  .play-title-icon{
    margin: 0 15px;
  }
  .play-title-span{
    display: inline-block;
    width: 60%;
    margin: 0 auto;
    color: #FFF;
    opacity: v-bind('titleSpanOpacity');
    white-space: nowrap;
    overflow: hidden;
  }
  #title{
    display: inline-block;
    margin: 0 auto;
    animation: titleLoop 15s linear infinite normal;
  }
  @keyframes titleLoop {
    0% {
      transform: translateX(70%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  #background-img-and-title-box{
    width: 100%;
  }
  #background-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #front-box{
    width: 100%;
    height: 550px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
    position: absolute;
    top: 100px;
  }
  #title-box{
    width: 88%;
    margin: 0 auto;
    position: relative;
  }
  #title-span{
    font-size: 20px;
    display: block;
  }
  #introduction-span{
    font-size: 10px;
    color: #8f8f8f;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    margin: 10px auto;
  }
  #owner-box{
    position: relative;
    width: 88%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  #owner-span{
    font-size: 10px;
    margin-left: 5px;
  }
  #follow-box{
    width: 35px;
    height: 18px;
    background: #bfbfbf;
    border-radius: 10px;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
  }
  #follow-span{
    font-size: 10px;
    display: block;
    margin-top: 1px;
  }
  #listen-quantity{
    font-size: 10px;
    margin-left: 5px;
  }
  #owner-profile-picture-box{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
  }
  #listen-quantity-box{
    margin-left: 20px;
  }
  #center-button{
    width: 88%;
    margin: 20px auto;
    text-align: center;
    position: relative;
  }
  .center-button-icon{
    font-weight: bolder;
  }
  .center-button-icon:first-child{
    float: left;
  }
  .center-button-icon:last-child{
    margin-right: 0;
    float: right;
  }
  #play-and-sort-button{
    height: 27px;
    width: 88%;
    margin: 10px auto;
    position: relative;
  }
  #play-and-sort-button-left{
    height: 27px;
    display: flex;
    align-items: center;
    float: left;
  }
  #play-and-sort-button-left{
    height: 27px;
    display: flex;
    align-items: center;
    float: left;
  }
  #play-all-span{
    margin-left: 5px;
  }
  #play-and-sort-button-right{
    float: right;
    height: 27px;
    display: flex;
    align-items: center;
  }
  #hot-span{
    font-size: 14px;
    color: #8f8f8f;
  }
  #song-list-items{
    width: 88%;
    margin: 0 auto;
    position: relative;
  }
  #song-list-content{
    margin-top: -90px;
    background-color: #FFF;
  }
  #bottom-safe{
    height: 50px;
  }
</style>
