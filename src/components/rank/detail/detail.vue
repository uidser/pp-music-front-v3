<template>
  <div>
    <div class="play-title-box">
      <van-icon name="cross" size="1.5rem" color="#FFF" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong>流行指数榜</strong></span>
      <van-icon name="share" size="1.5rem" color="#FFF" style="float: right" class="play-title-icon"/>
    </div>
    <div id="clear-float-both"></div>
    <div></div>
    <div id="rank-introduction">
      <div id="introduction-content">
        <span id="rank-title"><strong>巅峰榜 - </strong></span>
        <span id="update-periodicity"><strong>每日更新</strong></span>
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
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
        <song></song>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router"
import Topbacknav from "@/components/publiccomponent/topbacknav/topbacknav"
import song from "@/components/publiccomponent/song/song";
export default {
  name: "detail",
  components: {
    Topbacknav,
    song
  },
  setup() {
    let router = useRouter()
    let topTextOpacity = ref(0)
    function back() {
      router.go(-1)
    }
    onMounted(() => {
      window.addEventListener('scroll', showNavText)
    })
    function showNavText() {
      let scrollTop = window.pageYOffset
      computeColor(scrollTop)
    }
    function computeColor(scrollTop) {
      topTextOpacity.value = scrollTop / 140 - 0.1
    }
    return {
      back,
      topTextOpacity
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
    margin-top: 10px;
    margin-right: 10px;
  }
  #rank-title{
    color: #FFF;
  }
  #update-periodicity{
    font-size: 10px;
    color: #FFF;
    display: inline-block;
    line-height: 16px;
  }
  #rank-detail-name{
    font-size: 20px;
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
    width: 88%;
    margin: 0 auto;
  }
</style>
