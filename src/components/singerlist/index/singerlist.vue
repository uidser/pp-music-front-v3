<template>
  <div>
    <div class="top-text-button">
      <van-icon name="arrow-left" size="1.5rem" color="#8f8f8f" class="top-text-button-icon-left" @click="back"/>
      <span class="top-text-button-span"><strong>歌手</strong></span>
      <van-icon name="search" size="1.5rem" color="#8f8f8f" class="top-text-button-icon-right" />
    </div>
    <div id="clear-float-box"></div>
    <div class="always-listen-singer-box">
      <div class="always-listen-singer-title">
        <span id="always-listen-singer-title-span-left">常听歌手</span>
        <span id="always-listen-singer-title-span-right">关注歌手 ></span>
      </div>
      <div class="always-listen-singer-cart-list">
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
      </div>
    </div>
    <div class="options-box">
      <div class="option-line">
        <div :class="optionNum === 0? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 0? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 1? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 1? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 2? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 3? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 4? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 4? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
      </div>
      <div class="option-line">
        <div :class="optionNum === 0? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 0? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 1? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 1? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 2? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 3? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 4? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 4? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
      </div>
      <div class="option-line">
        <div :class="optionNum === 0? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 0? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 1? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 1? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 2? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 3? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 4? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 4? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum === 5? 'option-box-checked': 'option-box'">
          <span :class="optionNum === 5? 'option-span-checked': 'option-span'">全部</span>
        </div>
      </div>
    </div>
    <div id="singer-list-box">
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
      <div class="singer-item" @click="toSinger">
        <div class="singer-item-profile-picture-box">
          <img src="/img/manleng-album.png" width="60">
        </div>
        <span class="singer-item-name-span">梁静茹</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import {useRouter} from "vue-router";
export default {
  name: "singerlist",
  setup() {
    let optionNum = ref(0)
    let router = useRouter()
    function back() {
      router.go(-1)
    }
    function toSinger() {
      router.push('/singer')
    }
    return {
      optionNum,
      back,
      toSinger
    }
  }
}
</script>

<style scoped>
  .top-text-button{
    width: 100%;
    position: fixed;
    margin: 0 auto;
    text-align: center;
    background-color: #FFF;
    padding: 20px 0;
    z-index: 9999;
  }
  .top-text-button-span{
    line-height: 24px;
  }
  .top-text-button-icon-left{
    float: left;
    margin-left: 15px;
  }
  .top-text-button-icon-right{
    float: right;
    font-weight: bolder;
    margin-right: 15px;
  }
  #clear-float-box{
    height: 64px;
  }
  #always-listen-singer-title-span-left, #always-listen-singer-title-span-right{
    font-size: 14px;
    letter-spacing: 0.1px;
    color: #8f8f8f;
    line-height: 14px;
  }
  #always-listen-singer-title-span-left{
    float: left;
    margin-left: 15px;
   }
  #always-listen-singer-title-span-right{
    float: right;
    margin-right: 15px;
  }
  .always-listen-singer-title{
    margin: 5px auto;
    height: 14px;
  }
  .always-listen-singer-cart-item{
    height: 130px;
    width: 90px;
    background-color: #FFF;
    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    margin-left: 15px;
    margin-top: 10px;
  }
  .always-listen-singer-cart-list{
    width: 100%;
    margin: 10px auto;
    white-space: nowrap;
    overflow: auto;
    height: 150px;
  }
  .always-listen-singer-cart-list::-webkit-scrollbar{
    display: none;
  }
  .always-listen-singer-cart-item-profile-picture{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
  .always-listen-singer-cart-item-singer-name{
    font-size: 14px;
    letter-spacing: 0.5px;
    display: block;
    margin: 5px auto;
  }

  .option-box-checked{
    width: 50px;
    height: 25px;
    background-color: #8f8f8f;
    border-radius: 20px;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
    margin-top: 2.5px;
  }
  .option-box{
    width: 50px;
    height: 25px;
    background-color: #FFF;
    border-radius: 20px;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.1);
    margin-top: 2.5px;
  }
  .option-span-checked{
    line-height: 25px;
    font-size: 14px;
    color: #FFF;
  }
  .option-span{
    font-size: 14px;
    line-height: 25px;
    color: #8f8f8f;
  }
  .options-box{
    margin-left: 10px;
  }
  .option-line{
    margin: 5px auto;
    white-space: nowrap;
    overflow: auto;
    height: 30px;
  }
  .option-line::-webkit-scrollbar{
    display: none;
  }
  .singer-item-profile-picture-box{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  #singer-list-box{
    width: 92%;
    margin: 10px auto;
  }
  .singer-item-name-span{
    float: left;
    line-height: 60px;
    margin-left: 15px;
  }
  .singer-item{
    height: 60px;
    margin-bottom: 15px;
  }
  .singer-item-follow-button{
    height: 20px;
    width: 46px;
    float: right;
    border: 1.5px solid #8f8f8f;
    border-radius: 12px;
    text-align: center;
    margin-top: 20px;
  }
  .singer-item-follow-span{
    font-size: 12px;
    color: #8f8f8f;
    float: left;
    margin-left: 1px;
    line-height: 20px;
  }
  .singer-item-follow-icon{
    float: left;
    line-height: 20px;
    margin-left: 5px;
    font-weight: bolder;
  }
</style>
