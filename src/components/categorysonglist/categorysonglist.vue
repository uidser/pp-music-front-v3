<template>
  <div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#8f8f8f" style="float: left" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong>流行指数榜</strong></span>
      <van-icon name="search" size="1.5rem" color="#8f8f8f" style="float: right;" class="play-title-icon" @click="search"/>
      <div id="top-category-nav-button-and-all-button">
        <div id="top-category-nav-button">
          <span :class="categoryNavNum === 0?'category-span-check': 'category-span'" @click="check(0)">国语</span>
          <span :class="categoryNavNum === 1?'category-span-check': 'category-span'" @click="check(1)">国语</span>
          <span :class="categoryNavNum === 2?'category-span-check': 'category-span'" @click="check(2)">国语</span>
          <span :class="categoryNavNum === 3?'category-span-check': 'category-span'" @click="check(3)">国语</span>
          <span :class="categoryNavNum === 4?'category-span-check': 'category-span'" @click="check(4)">国语</span>
          <span :class="categoryNavNum === 5?'category-span-check': 'category-span'" @click="check(5)">国语</span>
          <span :class="categoryNavNum === 6?'category-span-check': 'category-span'" @click="check(6)">国语</span>
          <span :class="categoryNavNum === 7?'category-span-check': 'category-span'" @click="check(7)">国语</span>
          <span :class="categoryNavNum === 8?'category-span-check': 'category-span'" @click="check(8)">国语</span>
        </div>
        <van-icon name="wap-nav" size="1.5rem" color="#8f8f8f" id="all-button"/>
      </div>
    </div>
    <div id="clear-fixed-both"></div>
    <div id="category-song-list-content">
      <div id="play-and-sort-button">
        <div id="play-and-sort-button-left">
          <van-icon name="play-circle"  size="1.7rem" color="#8f8f8f"/>
          <span id="play-all-span">全部播放</span>
        </div>
      </div>
      <div id="category-song-list">
        <div class="category-song-list-item" @click="toSongListDetail" v-for="songList in 15" :key="songList">
          <div class="profile-picture-box">
            <img src="/img/manleng-album.png" width="100">
            <div class="left-box">
              <van-icon name="audio" size="0.5rem" color="#FFF" style="font-weight: bolder"/>
              <span class="play-quantity">213.0万</span>
            </div>
            <div class="right-box">
              <van-icon name="play-circle" size="1rem" color="#FFF"/>
            </div>
          </div>
          <div class="song-list-name-span-box">
            <span class="song-list-name-span">歌单歌单歌单歌单歌</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 70px"></div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"
import {ref} from "vue";
export default {
  name: "categorysonglist",
  setup() {
    let router = useRouter()
    let categoryNavNum = ref(0)
    const back = () => {
      router.go(-1)
    }
    const search = () => {

    }
    const check = (num) => {
      categoryNavNum.value = num
    }
    const toSongListDetail = () => {
      router.push('songListDetail')
    }
    return {
      categoryNavNum,
      toSongListDetail,
      back,
      search,
      check
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
    background-color: #FFF;
    z-index: 9999;
  }
  .play-title-span{
    font-size: 18px;
    color: #000;
  }
  .play-title-icon{
    margin: 0 15px;
  }
  #top-category-nav-button-and-all-button{
    width: 92%;
    margin: 0 auto;
    white-space: nowrap;
  }
  #all-button{
    float: right;
    margin-top: 20px;
  }
  #top-category-nav-button{
    width: 90%;
    float: left;
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 10px;
    white-space: nowrap;
    overflow-y: auto;
  }
  #top-category-nav-button::-webkit-scrollbar{
    display: none;
  }
  .category-span-check{
    display: inline-block;
    height: 20px;
    margin-right: 30px;
    color: #000;
  }
  .category-span{
    display: inline-block;
    height: 20px;
    margin-right: 30px;
    color: #8f8f8f;
  }
  #clear-fixed-both{
    height: 108px;
  }
  #play-and-sort-button{
    height: 27px;
    width: 88%;
    margin: 0 auto;
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
  .category-song-list-item{
    width: 100px;
    display: inline-block;
    margin: 0 2.42%;
    margin-top: 10px;
  }
  .profile-picture-box{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .song-list-name-span{
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    margin-top: 5px;
  }
  .play-quantity{
    color: #FFF;
    font-size: 10px;
    margin-left: 5px;
  }
  .left-box{
    position: absolute;
    bottom: 4px;
    left: 5px;
  }
  .song-list-name-span-box{
    width: 90px;
    margin: 0 auto;
  }
  .right-box{
    position: absolute;
    bottom: 3px;
    right: 4px;
  }
  #category-song-list{
    width: 90%;
    margin: 0 auto;
  }
</style>
