<template>
  <div >
    <input type="search" placeholder="搜你想听" id="searchInput" @click="toSearch"/>
    <div id="user-box">
      <div id="profile-name-follow-box" v-show="store.getters.token">
        <div id="profile-picture-box">
          <img src="/img/1000.jpg" width="60"/>
        </div>
        <span id="user-name-span"><strong>UID</strong></span>
        <div class="follow-box">
          <span class="follow-quantity">1</span>
          <span class="follow-span">关注</span>
        </div>
        <div class="follow-box">
          <span class="follow-quantity">0</span>
          <span class="follow-span">新歌</span>
        </div>
      </div>
      <div id="profile-name-follow-box" v-show="!store.getters.token" @click="toLogin">
        <div id="login-button-box">
          <div id="login-button">
            <van-icon name="manager" color="#FFF" size="1.5rem" id="login-button-icon"/>
            <span id="login-button-span">立即登录</span>
          </div>
        </div>
      </div>
    </div>
    <div id="history-play">
      <span id="history-play-span"><strong>最近播放</strong></span>
      <div id="history-play-content">
        <div class="history-item" v-for="i in 10" :key="i">
          <div class="history-picture-box">
            <img src="/img/manleng-album.png" width="90"/>
            <span class="type">歌曲</span>
            <div class="tip-box">
              <van-icon name="play" color="#FFF" size="1rem"/>
            </div>
          </div>
          <span class="play-quantity-span">已播歌曲500</span>
        </div>
      </div>
    </div>
    <div id="history-play">
      <span id="history-play-span">自建歌单</span>
      &nbsp;
      <span id="history-play-span">收藏歌单</span>
      <div id="my-play-list">
        <div class="play-list-item" v-for="p in 10" :key="p" @click="toSongList">
          <div class="play-list-picture-box">
            <img src="/img/manleng-album.png" width="70"/>
          </div>
          <div class="title-and-quantity-box">
            <span class="title-span">默认列表</span>
            <span class="quantity-span">101首</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
export default {
  name: "index",
  setup() {
    let store = useStore()
    let router = useRouter()
    const toSearch = () => {
      router.push('search')
    }
    const toSongList = () => {
      router.push('/songListDetail')
    }
    const toLogin = () => {
      router.push('/login')
    }
    return {
      router,
      store,
      toLogin,
      toSongList,
      toSearch
    }
  }
}
</script>

<style scoped>
  #searchInput{
    width: 87%;
    border: none;
    height: 30px;
    border-radius: 20px;
    font-size: 12px;
    color: #8f8f8f;
    text-indent: 10px;
    display: block;
    margin: 20px auto;
  }
  #profile-name-follow-box{
    width: 85vw;
    margin: 0 auto;
    background-color: #FFF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .history-picture-box{
    width: 90px;
    height: 90px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
  }
  #profile-picture-box{
    border-radius: 50%;
    overflow: hidden;
    height: 60px;
    width: 60px;
    margin: 10px 10px;
  }
  .follow-quantity{
    display: block;
    font-size: 20px;
    color: #8f8f8f;
  }
  .follow-span{
    font-size: 14px;
    color: #8f8f8f;
  }
  .follow-box{
    width: 30px;
    text-align: center;
    position: absolute;
    right: 50px;
  }
  .follow-box:last-child{
    position: absolute;
    right: 10px;
  }
  #user-name-span{
    position: absolute;
    left: 80px;
    top: 16px;
  }
  #history-play{
    margin-top: 20px;
    margin-left: 7.5vw;
  }
  #history-play-span{
    display: inline-block;
    margin-bottom: 5px;
  }
  .history-item{
    display: inline-block;
    margin-right: 10px;
  }
  .type{
    position: absolute;
    top: 10px;
    left: 10px;
    color: #FFF;
    font-weight: bolder;
  }
  .tip-box{
    height: 18px;
    width: 23px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #bfbfbf;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #history-play-content{
    white-space: nowrap;
    overflow-y: hidden;
  }
  #history-play-content::-webkit-scrollbar{
    display: none;
  }
  .play-quantity-span{
    font-size: 12px;
    display: block;
    width: 90px;
    word-break: normal;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .play-list-picture-box{
    width: 70px;
    height: 70px;
    border-radius: 10px;
    overflow: hidden;
    display: inline-block;
  }
  .title-and-quantity-box{
    display: inline-block;
    position: absolute;
    left: 80px;
  }
  .title-span, .quantity-span{
    display: block;
    font-size: 14px;
    line-height: 25px;
  }
  .quantity-span{
    color: #8f8f8f;
  }
  .play-list-item{
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px auto;
  }
  #login-button-box{
    display: flex;
    align-items: center;
  }
  #login-button{
    width: 40vw;
    background-color: #8f8f8f;
    border-radius: 20px;
    margin: 20px 20px;
    text-align: center;
  }
  #login-button-span{
    display: inline-block;
    color: #FFF;
    font-size: 20px;
    margin: 5px 0;
  }
</style>
