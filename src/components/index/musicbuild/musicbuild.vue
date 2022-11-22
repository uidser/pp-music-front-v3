<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image cover src="/img/109951168061033392.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image cover src="/img/109951168061034982.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image cover src="/img/109951168061044579.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image cover src="/img/109951168061052575.jpg"/>
      </van-swipe-item>
    </van-swipe>
    <div style="width: 95%; margin: 0 auto; height: 175px">
      <div style="width: 100%; margin: 0 auto; margin-top: 10px;">
        <div class="icon-button-div" @click="jump('/singerList')">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
        <div class="icon-button-div" @click="jump('/rank')">
          <van-icon name="fire" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>排行</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="label" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>分类歌单</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="volume" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>电台</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="shopping-cart" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>商城</span>
        </div>
      </div>
      <div style="width: 100%; margin: 0 auto;">
        <div class="icon-button-div">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
        <div class="icon-button-div">
          <van-icon name="manager" color="#8F8F8FFF" size="3rem" class="icon-button"/>
          <span>歌手</span>
        </div>
      </div>
    </div>
    <div style="margin: 20px auto; height: 130px">
      <span style="margin: 0px 24px">编辑甄选</span>
      <div>
        <div class="song-list-div">
          <div class="tip">
            <span style="font-size: 10px">专题</span>
          </div>
          <img src="/img/manleng-album.png" width="100px"/>
        </div>
        <div class="song-list-div">
          <div class="tip">
            <span style="font-size: 10px">专题</span>
          </div>
          <img src="/img/manleng-album.png" width="100px"/>
        </div>
        <div class="song-list-div">
          <div class="tip">
            <span style="font-size: 10px">专题</span>
          </div>
          <img src="/img/manleng-album.png" width="100px"/>
        </div>
      </div>
    </div>
    <div style="margin-left: 15px">
      <div>
        <a href="javascript:void(0)" :class="navNum === 0? 'nav-a-checked': 'nav-a'" @click="changeNavNum(0)">新歌</a>
        <a href="javascript:void(0)" :class="navNum === 1? 'nav-a-checked': 'nav-a'" @click="changeNavNum(1)">新碟</a>
        <a href="javascript:void(0)" :class="navNum === 2? 'nav-a-checked': 'nav-a'" @click="changeNavNum(2)">数字专辑</a>
        <a href="javascript:void(0)" class="more-song-a">更多新歌 ></a>
      </div>
      <div style="display: flex; align-items: center">
        <div class="song-picture-normal">
          <img src="/img/manleng-album.png" width="60px"/>
        </div>
        <div class="song-a-div">
          <a href="javascript:void(0)" class="song-a-song-name">慢冷</a>
          <a href="javascript:void(0)" class="song-a-singer-name">梁静茹</a>
        </div>
        <div class="song-hava-mv-picture">
          <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <div class="song-picture-normal">
          <img src="/img/manleng-album.png" width="60px"/>
        </div>
        <div class="song-a-div">
          <a href="javascript:void(0)" class="song-a-song-name">慢冷</a>
          <a href="javascript:void(0)" class="song-a-singer-name">梁静茹</a>
        </div>
        <div class="song-hava-mv-picture">
          <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <div class="song-picture-normal">
          <img src="/img/manleng-album.png" width="60px"/>
        </div>
        <div class="song-a-div">
          <a href="javascript:void(0)" class="song-a-song-name">慢冷</a>
          <a href="javascript:void(0)" class="song-a-singer-name">梁静茹</a>
        </div>
        <div class="song-hava-mv-picture">
          <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
        </div>
      </div>
    </div>
    <div class="singer-and-album-div">
      <div style="margin-left: 15px">
        <a href="javascript:void(0)" class="nav-a-checked-singer">音乐人</a>
        <a href="javascript:void(0)" class="more-song-a">更多 ></a>
      </div>
      <div class="singer-and-album-box">
        <div class="song-box">
          <div class="play-tip">
            <van-icon name="play" size="1rem" color="#8f8f8f"/>
          </div>
          <img src="/img/manleng-album.png" width="80" />
        </div>
        <div class="singer-profile-picture-and-sing-name">
          <van-image round width="2.5rem" height="2.5rem" src="/img/manleng-album.png" style="float: left"/>
          <div style="float: left; margin-left: 5px">
            <a href="javascript:void(0)" class="song-a-song-name">梁静茹</a>
            <a href="javascript:void(0)" class="song-a-singer-name" style="margin: 2px 0px">慢冷</a>
          </div>
        </div>
      </div>
      <div class="singer-and-album-box">
        <div class="song-box">
          <div class="play-tip">
            <van-icon name="play" size="1rem" color="#8f8f8f"/>
          </div>
          <img src="/img/manleng-album.png" width="80" />
        </div>
        <div class="singer-profile-picture-and-sing-name">
          <van-image round width="2.5rem" height="2.5rem" src="/img/manleng-album.png" style="float: left"/>
          <div style="float: left; margin-left: 5px">
            <a href="javascript:void(0)" class="song-a-song-name">梁静茹</a>
            <a href="javascript:void(0)" class="song-a-singer-name" style="margin: 2px 0px">慢冷</a>
          </div>
        </div>
      </div>
      <div class="singer-and-album-box">
        <div class="song-box">
          <div class="play-tip">
            <van-icon name="play" size="1rem" color="#8f8f8f"/>
          </div>
          <img src="/img/manleng-album.png" width="80" />
        </div>
        <div class="singer-profile-picture-and-sing-name">
          <van-image round width="2.5rem" height="2.5rem" src="/img/manleng-album.png" style="float: left"/>
          <div style="float: left; margin-left: 5px">
            <a href="javascript:void(0)" class="song-a-song-name">梁静茹</a>
            <a href="javascript:void(0)" class="song-a-singer-name" style="margin: 2px 0px">慢冷</a>
          </div>
        </div>
      </div>
    </div>
    <div class="rank-list">
      <div style="margin-left: 15px">
        <a href="javascript:void(0)" class="nav-a-checked-singer">排行榜</a>
        <a href="javascript:void(0)" class="more-song-a">更多 ></a>
      </div>
      <div class="rank-box-content">
        <div class="rank">
          <div class="left-box">
            <img src="/img/manleng-album.png" width="100px"/>
          </div>
          <div class="content-box">
            <div class="content">
              <div>
                <span class="rank-title-span"><strong>流行指数榜</strong></span>
                <span class="rank-content-span" style="display: inline"> _每日更新</span>
              </div>
              <div>
                <span class="rank-content-span">01 慢冷 - 梁静茹</span>
                <span class="rank-content-span">02 慢冷 - 梁静茹</span>
                <span class="rank-content-span">03 慢冷 - 梁静茹</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rank">
          <div class="left-box">
            <img src="/img/manleng-album.png" width="100px"/>
          </div>
          <div class="content-box">
            <div class="content">
              <div>
                <span class="rank-title-span"><strong>流行指数榜</strong></span>
                <span class="rank-content-span" style="display: inline"> _每日更新</span>
              </div>
              <div>
                <span class="rank-content-span">01 慢冷 - 梁静茹</span>
                <span class="rank-content-span">02 慢冷 - 梁静茹</span>
                <span class="rank-content-span">03 慢冷 - 梁静茹</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rank">
          <div class="left-box">
            <img src="/img/manleng-album.png" width="100px"/>
          </div>
          <div class="content-box">
            <div class="content">
              <div>
                <span class="rank-title-span"><strong>流行指数榜</strong></span>
                <span class="rank-content-span" style="display: inline"> _每日更新</span>
              </div>
              <div>
                <span class="rank-content-span">01 慢冷 - 梁静茹</span>
                <span class="rank-content-span">02 慢冷 - 梁静茹</span>
                <span class="rank-content-span">03 慢冷 - 梁静茹</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-video">
      <div style="margin-left: 15px;">
        <a href="javascript:void(0)" class="nav-a-checked-singer">精选视频</a>
        <a href="javascript:void(0)" class="more-song-a">更多 ></a>
      </div>
      <div class="recommend-video-item-box">
        <div class="recommend-video-box">
          <div class="recommend-video-element-box-play-count">
            <van-icon name="play-circle" size="1rem" color="#FFF"/>
            <span class="recommend-video-element-box-play-count-span">10000</span>
          </div>
        </div>
        <div class="recommend-video-element-box-play-title-span-box">
          <span class="recommend-video-element-box-play-title-span">梁静茹 | 慢冷</span>
        </div>
      </div>
      <div class="recommend-video-item-box">
        <div class="recommend-video-box">
          <div class="recommend-video-element-box-play-count">
            <van-icon name="play-circle" size="1rem" color="#FFF"/>
            <span class="recommend-video-element-box-play-count-span">10000</span>
          </div>
        </div>
        <div class="recommend-video-element-box-play-title-span-box">
          <span class="recommend-video-element-box-play-title-span">梁静茹 | 慢冷</span>
        </div>
      </div>
      <div class="recommend-video-item-box">
        <div class="recommend-video-box">
          <div class="recommend-video-element-box-play-count">
            <van-icon name="play-circle" size="1rem" color="#FFF"/>
            <span class="recommend-video-element-box-play-count-span">10000</span>
          </div>
        </div>
        <div class="recommend-video-element-box-play-title-span-box">
          <span class="recommend-video-element-box-play-title-span">梁静茹 | 慢冷</span>
        </div>
      </div>
    </div>
    <div style="height: 110px"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import {useRouter} from "vue-router";
export default {
  name: "musicbuild",
  setup() {
    let navNum = ref(0)
    let router = useRouter()
    function changeNavNum(num) {
      navNum.value = num
    }
    function jump(path) {
      router.push(path)
    }
    return {
      navNum,
      changeNavNum,
      jump
    }
  }
}
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    text-align: center;
  }
  .icon-button{
    margin: 10px 13px;
    display: block;
  }
  .icon-button-div{
    text-align: center;
    float: left;
  }
  .song-list-div{
    border-radius: 10px;
    background-color: #8f8f8f;
    width: 100px;
    height: 100px;
    float: left;
    margin: 10px 0px;
    margin-left: 24px;
    position: relative;
    overflow: hidden;
  }
  .tip{
    position: absolute;
    bottom: 0px;
    background-color: white;
    border-radius: 10px;
    width: 30px;
    text-align: center;
  }
  .nav-a{
    font-size: 16px;
    text-decoration: none;
    color: #8c8c8c;
    margin: 0px 10px;
  }
  .nav-a-checked{
    font-size: 16px;
    text-decoration: none;
    color: #000000;
    margin: 0px 10px;
  }
  .song-picture-normal{
    border-radius: 10px;
    height: 60px;
    width: 60px;
    background-color: #8f8f8f;
    display: inline-block;
    margin: 10px 10px;
    float: left;
    overflow: hidden;
  }
  .song-a-song-name{
    display: block;
    font-size: 14px;
    color: #000000;
  }
  .song-a-singer-name{
    display: block;
    font-size: 12px;
    color: #8f8f8f;
    margin: 5px 0px;
  }
  .song-hava-mv-picture{
    width: 20px;
    margin: 0 auto;
    position: absolute;
    right: 30px;
    display: inline;
  }
  .song-a-div{
    margin: 0 0px;
  }
  .more-song-a{
    text-decoration: none;
    color: #8f8f8f;
    font-size: 14px;
    position: absolute;
    right: 20px;
  }
  .singer-and-album-div{
    margin-top: 10px;
    white-space: nowrap;
    overflow-x: auto;
  }
  .singer-and-album-div::-webkit-scrollbar{
    display: none;
  }
  .singer-and-album-box{
    width: 150px;
    height: 100px;
    background-color: #ede6cc;
    border-radius: 10px;
    margin-left: 25px;
    margin-top: 10px;
    display: inline-block;
    margin-top: 30px;
  }
  .song-box{
    width: 80px;
    height: 80px;
    background-color: #8f8f8f;
    border-radius: 8px;
    margin: 0 auto;
    position: relative;
    top: 10px;
    overflow: hidden;
  }
  .play-tip{
    background-color: white;
    border-radius: 10px 10px 10px 8px;
    width: 25px;
    text-align: center;
    position: absolute;
    bottom: 0px;
  }
  .singer-profile-picture-and-sing-name{
    margin-top: 30px;
    display: flex;
    align-items: center;
  }
  .nav-a-checked-singer{
    font-size: 16px;
    text-decoration: none;
    color: #000000;
    position: absolute;
    left: 25px;
  }
  .rank-list{
    margin-top: 20px;
    height: 150px;
  }
  .left-box{
    box-shadow: 8px 0px 17px 0px rgba(0,0,0,0.1);
    background-color: #8f8f8f;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    position: absolute;
    left: 0px;
    overflow: hidden;
  }
  .rank{
    position: relative;
    top: 30px;
    margin-left: 25px;
    display: inline-block;
  }
  .content-box{
    width: 310px;
    height: 100px;
    background-color: #ede6cc;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .rank-title-span{
    font-size: 14px;
    margin-bottom: 5px;
  }
  .rank-content-span{
    font-size: 12px;
    display: block;
    margin-top: 5px;
  }
  .content{
    margin-left: 120px;
  }
  .rank-box-content{
    white-space: nowrap;
    overflow-x: auto;
    height: 150px;
  }
  .rank-box-content::-webkit-scrollbar{
    display: none;
  }
  .recommend-video{
    height: 200px;
    white-space: nowrap;
    overflow-y: auto;
  }
  .recommend-video::-webkit-scrollbar{
    display: none;
  }
  .recommend-video-box{
    height: 130px;
    width: 250px;
    background-color: #bfbfbf;
    border-radius: 10px;
    position: relative;
    top: 30px;
  }
  .recommend-video-element-box-play-count{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .recommend-video-element-box-play-count-span{
    font-size: 14px;
    margin-left: 2px;
    color: #FFF;
    line-height: 16px;
  }
  .recommend-video-item-box{
    height: 180px;
    display: inline-block;
    margin-left: 25px;
  }
  .recommend-video-element-box-play-title-span-box{
    margin-top: 35px;
    margin-left: 3px;
  }
  .recommend-video-element-box-play-title-span{
    font-size: 14px;
  }
</style>
