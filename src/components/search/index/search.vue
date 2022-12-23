<template>
  <div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#8f8f8f" style="float: left" class="play-title-icon" @click="back"/>
      <input type="search" placeholder="搜你想听" id="searchInput" v-model="mainKeyword" @keyup.enter="search(0)" @input="search(1)"/>
    </div>
    <div style="height: 64px;"></div>
    <div id="search-loading-box" v-show="showLoading">
      <van-loading type="spinner" />
    </div>
    <div id="search-history-box" v-show="store.state.searchHistory.length && !showLoading">
      <span id="search-history-span"><strong>搜索历史</strong></span>
      <div id="delete-button-and-icon" @click="deleteHistory">
        <van-icon name="delete" color="#8f8f8f" size="1rem" id="delete-button"/>
        <span id="delete-span">清除历史</span>
      </div>
      <div id="search-history-content-box" v-show="!showLoading">
        <div class="history-item-box" v-for="keyword in store.state.searchHistory" :key="keyword" @click="selectKeyword(keyword)">
          <span class="history-item-span">{{ keyword }}</span>
        </div>
      </div>
    </div>
    <div id="search-card-content"  v-show="!showSearchResult">
      <div class="search-card-box" v-for="card in 5" :key="card">
        <div class="search-top-span-and-button">
          <span class="card-title"><strong>热门搜索</strong></span>
          <div id="play-button">
            <van-icon name="play-circle" size="1rem" color="#8f8f8f" class="play-icon"/>
            <span class="play-span">播放</span>
          </div>
        </div>
        <div class="rank-box">
          <rankitem v-for="r in 10" :keyword="'梁静茹'" :rank-num="r" :step="r" :key="r" :type="'up'"></rankitem>
          <rankitem v-for="r in 10" :keyword="'梁静茹'" :rank-num="r + 20" :step="0" :key="r" :type="'peaceful'"></rankitem>
          <rankitem v-for="r in 10" :keyword="'梁静茹'" :rank-num="r + 40" :step="-1" :key="r" :type="'down'"></rankitem>
          <rankitem v-for="r in 10" :keyword="'梁静茹'" :rank-num="r + 40" :step="0" :key="r" :type="'new'"></rankitem>
        </div>
      </div>
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-show="showSearchResult" id="song-list">
      <song v-for="song in songList" :key="song.id" :name="song.name" :author="song.author" :show-step="false" :show-html="true" @click="playSong(song)"/>
    </van-list>
    <div style="height: 60px"></div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import Rankitem from "@/components/publiccomponent/rankItem/rankitem"
import {Toast} from "vant"
import searchApi from "@/api/search/search"
import Song from "@/components/publiccomponent/song/song";
import pubSub from "pubsub-js";
export default {
  name: "search",
  components: {Song, Rankitem},
  setup() {
    let store = useStore()
    let historyKeyword = ref([])
    let mainKeyword = ref('')
    let router = useRouter()
    let showLoading = ref(false)
    let showSearchResult = ref(false)
    let songList = ref([])
    onMounted(() => {
      store.getters.searchHistory
    })
    const back = () => {
      router.go(-1)
    }
    function query() {
      searchApi.search({queryText: mainKeyword.value}).then(
        response => {
          showLoading.value = false
          showSearchResult.value = true
          songList.value = response.data.songList
        }
      )
    }
    const search = async (event) => {
      if (event) {
        if(mainKeyword.value.trim()) {
          showLoading.value = true
          query()
          showLoading.value = false
        } else {
          songList.value = []
          showSearchResult.value = false
          showLoading.value = false
        }
      } else {
        if (mainKeyword.value.trim()) {
          showLoading.value = true
          query()
          store.commit('CHANGE_SEARCH_HISTORY', mainKeyword.value)
          showLoading.value = false
        } else {
          if (event) {
            songList.value = []
            showLoading.value = false
          } else {
            showLoading.value = false
            showSearchResult.value = false
            Toast('请输入内容')
          }
        }
      }
    }
    const deleteHistory = () => {
      store.commit('RESET_SEARCH_HISTORY')
    }
    const selectKeyword = (keyword) => {
      if (keyword.trim()) {
        mainKeyword.value = keyword
        search()
      }
    }
    const playSong = (song) => {
      pubSub.publish('changeCurrentSongSrcPubSub', song)
      store.commit('CHANGE_SEARCH_HISTORY', mainKeyword.value)
      store.commit('RESET_CURRENT_MAIN_COLOR')
      router.push('/play')
    }
    return {
      back,
      search,
      deleteHistory,
      selectKeyword,
      playSong,
      songList,
      showSearchResult,
      showLoading,
      historyKeyword,
      mainKeyword,
      store,
    }
  }
}
</script>

<style scoped>
  .play-title-box{
    padding: 20px 0;
    text-align: center;
    width: 100%;
    height: 24px;
    margin: 0 auto;
    position: fixed;
    display: flex;
    align-items: center;
    background-color: #F8F8F9FF;
    z-index: 9999;
  }
  .play-title-icon{
    margin-left: 15px;
  }
  #searchInput{
    float: right;
    width: 87%;
    border: none;
    height: 30px;
    border-radius: 20px;
    font-size: 12px;
    color: #8f8f8f;
    text-indent: 10px;
  }
  #search-history-box{
    width: 94%;
    margin: 0 auto;
    margin-left: 6%;
  }
  .history-item-box{
    background-color: #FFF;
    border-radius: 15px;
    text-align: center;
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px 0;
    margin-right: 10px;
  }
  .history-item-span{
    font-size: 10px;
    line-height: 25px;
  }
  #search-history-content-box{
    margin: 10px auto;
  }
  #search-card-content{
    width: 100%;
    white-space: nowrap;
    overflow-y: hidden;
  }
  #search-card-content::-webkit-scrollbar{
    display: none;
  }
  .rank-box{
    width: 90%;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  #play-button{
    width: 55px;
    height: 24px;
    border-radius: 15px;
    background-color: #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 7px;
  }
  .play-span{
    font-size: 10px;
  }
  .play-icon{

  }
  .search-top-span-and-button{
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
    display: flex;
    align-items: center;
  }
  .search-card-box{
    background-color: #FFF;
    width: 60vw;
    border-radius: 10px;
    display: inline-block;
    margin-right: 3vw;
  }
  .search-card-box:first-child{
    margin-left: 6%;
  }
  #delete-span{
    font-size: 12px;
    color: #8f8f8f;
    margin-left: 2px;
  }
  #delete-button-and-icon{
    float: right;
    margin-right: 15px;
    display: flex;
    align-items: center;
    margin-top: 3px;
  }
  #search-loading-box{
    width: 40px;
    display: block;
    margin: 0 auto;
    margin-top: 50%;
  }
  #song-list{
    width: 87vw;
    margin: 0 auto;
  }
</style>
