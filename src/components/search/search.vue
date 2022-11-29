<template>
  <div>
    <div class="play-title-box">
      <van-icon name="arrow-left" size="1.5rem" color="#8f8f8f" style="float: left" class="play-title-icon" @click="back"/>
      <input type="search" placeholder="搜你想听" id="searchInput"/>
    </div>
    <div style="height: 64px;"></div>
    <div id="search-history-box">
      <span id="search-history-span"><strong>搜索历史</strong></span>
      <div id="search-history-content-box">
        <div class="history-item-box" v-for="history in 10" :key="history">
          <span class="history-item-span">慢冷</span>
        </div>
      </div>
    </div>
    <div id="search-card-content">
      <div class="search-card-box" v-for="card in 5" :key="card">
        <div class="search-top-span-and-button">
          <span class="card-title"><strong>热门搜索</strong></span>
          <div id="play-button">
            <van-icon name="play-circle" size="1rem" color="#8f8f8f" class="play-icon"/>
            <span class="play-span">播放</span>
          </div>
        </div>
        <div class="rank-box">
          <div class="rank-item" v-for="keyword in 30" :key="keyword">
            <div class="rank-num-box">
              <span :class="keyword <= 3?'rank-num-red': 'rank-num'">{{ keyword }}</span>
            </div>
            <span class="rank-keyword">梁静茹</span>
            <div class="rank-right">
              <van-icon name="arrow-up" color="#ff0039" size="0.6rem" class="up-icon"/>
              <span class="up-num">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 60px"></div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default {
  name: "search",
  setup() {
    let router = useRouter()
    const back = () => {
      router.go(-1)
    }
    return {
      back
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
  .van-search{
    padding: 0;
    width: 85%;
    margin: 0 auto;
  }
  #search-history-box{
    width: 94%;
    margin: 0 auto;
    margin-left: 6%;
  }
  .history-item-box{
    height: 25px;
    width: 40px;
    background-color: #FFF;
    border-radius: 15px;
    text-align: center;
    display: inline-block;
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
  .up-icon{
    font-weight: bolder;
  }
  .up-num{
    color: #ff0039;
    font-size: 10px;
    margin-left: 4px;
  }
  .rank-num{
    color: #8f8f8f;
  }
  .rank-num-red{
    color: #ff0039;
  }
  .rank-box{
    width: 90%;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  #play-button{
    width: 60px;
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
  .rank-right{
    float: right;
  }
  .rank-num-box{
    width: 16px;
    text-align: center;
    display: inline-block;
  }
  .rank-keyword{
    font-size: 14px;
    margin-left: 10px;
  }
  .rank-item{
    margin: 10px auto;
  }
</style>
