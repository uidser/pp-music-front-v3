<template>
  <div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#FFF" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong>{{ rank.name }}</strong></span>
      <van-icon name="share" size="1.5rem" color="#FFF" style="float: right" class="play-title-icon" @click="share"/>
    </div>
    <div id="clear-float-both"></div>
    <div></div>
    <div id="rank-introduction">
      <div id="introduction-content">
        <div id="rank-title-box">
          <span id="rank-title"><strong>{{ rank.title }}</strong></span>
          <span id="split-span">&nbsp;-&nbsp;</span>
          <span id="update-periodicity"><strong>每日更新</strong></span>
        </div>
        <div id="rank-profile-picture-box">
          <div id="rank-profile-picture">
            <img :src="mediaPicture" width="90"/>
          </div>
        </div>
        <div id="album-icon"></div>
        <span id="rank-detail-name"><strong>{{ rank.name }}</strong></span>
        <span id="update-time">最近更新 {{ rank.rankUpdateTime }}</span>
      </div>
    </div>
    <div id="rank-content">
      <div id="play-and-sort-button">
        <div id="play-and-sort-button-left" @click="playRank">
          <van-icon name="play-circle"  size="1.7rem" color="#8f8f8f"/>
          <span id="play-all-span">全部播放</span>
        </div>
      </div>
      <div id="rank-list">
        <van-list v-model:loading="loading" :finished="finished" error-text="请求失败，点击重新加载" @load="onLoad">
          <song v-for="(media, index) in songList" :key="media.mediaId" :rank-number="index + 1" :name="media.name" :step="media.step" :author="media.author"
                :album="media.album" @click="play(media)" :clazz="store.state.currentSong.id === media.id?1: 0"></song>
        </van-list>
      </div>
      <div style="height: 50px;"></div>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      :description="shareDescription"
      @select="selectOption"
      style="z-index: 99999"
    />
  </div>
</template>

<script>
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import Topbacknav from "@/components/publiccomponent/topbacknav/topbacknav"
import song from "@/components/publiccomponent/song/song"
import rankApi from "@/api/rank/rank"
import useClipboard from 'vue-clipboard3'
import {Toast} from "vant"
import {useStore} from "vuex";
import pubSub from "pubsub-js";
export default {
  name: "detail",
  components: {
    Topbacknav,
    song
  },
  setup() {
    let { toClipboard } = useClipboard()
    let link = ref()
    let options = ref([])
    let shareDescription = ref('')
    let showShare = ref(false)
    let router = useRouter()
    let topTextOpacity = ref(0)
    let loading = ref(false)
    let songList = ref(100)
    let finished = ref(false)
    let rank = ref({})
    let mediaPicture = ref('')
    let store = useStore()
    let currentSongId = ref(0)
    function back() {
      router.go(-1)
    }
    const onLoad = () => {
      setTimeout(() => {
        // songList.value += 100
        loading.value = false
        if (songList.value >= 300) {
          finished.value = true
        }
      }, 1000)
    }
    onMounted(() => {
      let route = router.currentRoute.value
      rankApi.getRankDetailMediaList(route.params.rankId, route.params.frequency, { current: 1, limit: 100 }).then(
        response => {
          songList.value = response.data.mediaList
          rank.value = response.data
          mediaPicture.value = songList.value[0].mediaProfilePictureImg
        }
      )
      window.addEventListener('scroll', showNavText)
      shareDescription.value = '流行指数榜'
      options.value.push(
        { name: '复制链接', icon: 'link', type: 'link' }
      )
    })
    function showNavText() {
      let scrollTop = window.pageYOffset
      computeColor(scrollTop)
    }
    function computeColor(scrollTop) {
      topTextOpacity.value = scrollTop / 140
    }
    function share() {
      showShare.value = true
    }
    function selectOption(option) {
      if (option.type === 'link') {
        toClipboard(window.location.toString())
        Toast.success('复制成功')
      }
    }
    const playRank = async () => {
      pubSub.publish('playOrStop', false)
      await store.commit('changeProgressTage', 0)
      await store.commit('changeCurrentTime', 0)
      await store.commit('changeSongList', songList.value)
      await store.commit('CHANGE_CURRENT_SONG', songList.value[0])
      store.commit('changeCurrentSingerName', songList.value[0].name + ' - ' + songList.value[0].author)
      pubSub.publish('playOrStop', true)
    }
    const play = async (media) => {
      pubSub.publish('playOrStop', false)
      await store.commit('changeProgressTage', 0)
      await store.commit('changeCurrentTime', 0)
      await store.commit('CHANGE_CURRENT_SONG', media)
      store.commit('changeCurrentSingerName', media.name + ' - ' + media.author)
      pubSub.publish('playOrStop', true)
    }
    return {
      options,
      topTextOpacity,
      showShare,
      shareDescription,
      link,
      loading,
      songList,
      finished,
      rank,
      mediaPicture,
      store,
      currentSongId,
      play,
      playRank,
      onLoad,
      share,
      back,
      selectOption
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
    background-color: #ede6cc;
    z-index: 9999;
  }
  #clear-float-both{
    height: 64px;
  }
  .play-title-icon{
    margin: 0 15px;
  }
  .play-title-span{
    font-size: 14px;
    color: #FFF;
    opacity: v-bind('topTextOpacity');
  }
  #rank-introduction{
    height: 140px;
    width: 100%;
    background-color: #ede6cc;
  }
  #rank-profile-picture{
    width: 90px;
    height: 90px;
    border-radius: 10px;
    overflow: hidden;
  }
  #album-icon{
    border-radius: 50%;
    background-color: #8f8f8f;
    height: 70px;
    width: 70px;
    float: right;
    margin-right: 10px;
    margin-top: -10px;
  }
  #rank-title{
    color: #FFF;
  }
  #update-periodicity{
    font-size: 10px;
    color: #FFF;
  }
  #rank-detail-name{
    font-size: 26px;
    color: #FFF;
    display: block;
    line-height: 50px;
  }
  #update-time{
    color: #FFF;
    font-size: 10px;
    position: absolute;
    bottom: 0;
  }
  #rank-profile-picture-box{
    position: absolute;
    right: 20px;
    bottom: 0;
  }
  #introduction-content{
    width: 90%;
    margin: 0 auto;
    position: relative;
    height: 90px;
  }
  #play-and-sort-button{
    position: relative;
    height: 27px;
    width: 90%;
    margin: 20px auto;
  }
  #play-and-sort-button-left{
    height: 27px;
    display: flex;
    align-items: center;
    float: left;
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
  #play-all-span{
    margin-left: 5px;
  }
  #rank-list{
    width: 90%;
    margin: 0 auto;
  }
  #rank-title-box{
    display: flex;
    align-items: center;
  }
  #split-span{
    color: #FFF;
  }
</style>
