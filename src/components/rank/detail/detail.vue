<template>
  <div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#FFF" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong>流行指数榜</strong></span>
      <van-icon name="share" size="1.5rem" color="#FFF" style="float: right" class="play-title-icon" @click="share"/>
    </div>
    <div id="clear-float-both"></div>
    <div></div>
    <div id="rank-introduction">
      <div id="introduction-content">
        <div id="rank-title-box">
          <span id="rank-title"><strong>巅峰榜</strong></span>
          <span id="split-span">&nbsp;-&nbsp;</span>
          <span id="update-periodicity"><strong>每日更新</strong></span>
        </div>
        <div id="rank-profile-picture-box">
          <div id="rank-profile-picture">
            <img src="/img/manleng-album.png" width="90"/>
          </div>
        </div>
        <div id="album-icon"></div>
        <span id="rank-detail-name"><strong>流行指数榜</strong></span>
        <span id="update-time">最近更新 11月22日</span>
      </div>
    </div>
    <div id="rank-content">
      <div id="play-and-sort-button">
        <div id="play-and-sort-button-left">
          <van-icon name="play-circle"  size="1.7rem" color="#8f8f8f"/>
          <span id="play-all-span">全部播放</span>
        </div>
        <div id="play-and-sort-button-right">
          <span id="hot-span">热门</span>
          <van-icon name="descending" size="1rem" color="#8f8f8f"/>
        </div>
      </div>
      <div id="rank-list">
        <song v-for="song in 300" :key="song" :rank-number="song"></song>
      </div>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      :description="shareDescription"
      @select="selectOption"
    />
  </div>
</template>

<script>
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import Topbacknav from "@/components/publiccomponent/topbacknav/topbacknav"
import song from "@/components/publiccomponent/song/song"
import useClipboard from 'vue-clipboard3'
import {Toast} from "vant";
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
    function back() {
      router.go(-1)
    }
    onMounted(() => {
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
    return {
      options,
      topTextOpacity,
      showShare,
      shareDescription,
      link,
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
