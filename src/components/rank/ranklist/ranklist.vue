<template>
  <div>
    <topbacknav id="top-nav"></topbacknav>
    <div id="clear-top-both"></div>
    <div id="recommend-box">
      <span class="rank-title-item-span">推荐</span>
      <div id="recommend-rank-list-box">
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
        <div class="recommend-rank-item">
          <img src="/img/manleng-album.png" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">INDIE 图鉴榜</span>
          </div>
          <div class="rank-tip-box">
            <span class="rank-listen-quantity-span">23万</span>
          </div>
        </div>
      </div>
    </div>
    <div id="rank-top-box">
      <span class="rank-title-item-span">巅峰榜</span>
      <div id="top-rank-list">
        <rank class="top-rank-item" @click="jump('/rank/detail')"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
        <rank class="top-rank-item"></rank>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import Topbacknav from "@/components/publiccomponent/topbacknav/topbacknav";
import Rank from "@/components/publiccomponent/rank/rank";
export default {
  name: "ranklist",
  components: {Rank, Topbacknav},
  setup() {
    let router = useRouter()
    function jump(path) {
      router.push(path)
    }
    return {
      jump
    }
  }
}
</script>

<style scoped>
  #clear-top-both{
    height: 64px;
  }
  .recommend-rank-item{
    height: 110px;
    width: 110px;
    background-color: #8f8f8f;
    border-radius: 10px;
    position: relative;
    margin-top: 5px;
    margin-right: 10px;
    display: inline-block;
    overflow: hidden;
  }
  .rank-tip-box{
    height: 20px;
    width: 35px;
    border-radius: 10px;
    text-align: center;
    background-color: #bfbfbf;
    position: absolute;
    bottom: 0;
  }
  .rank-listen-quantity-span{
    color: #FFF;
    font-size: 10px;
    line-height: 20px;
  }
  .rank-line-box{
    height: 3px;
    width: 20px;
    border-radius: 2px;
    background-color: #FFF;
    float: left;
    margin: 10px 5px;
    z-index: 9999;
  }
  .rank-name-span{
    color: #FFF;
    margin-left: 5px;
    float: left;
    display: block;
    height: 16px;
    line-height: 16px;
    font-weight: bolder;
  }
  #recommend-box{
    margin-left: 15px;
  }
  #recommend-rank-list-box{
    white-space: nowrap;
    overflow-y: auto;
  }
  #recommend-rank-list-box::-webkit-scrollbar{
    display: none;
  }
  .rank-title-and-button{
    position: absolute;
    left: 0;
    top: 0;
  }
  .rank-title-item-span{
    font-size: 14px;
    font-weight: bolder;
    letter-spacing: 1px;
  }
  #rank-top-box{
    margin-left: 15px;
    margin-top: 20px;
  }
  #top-rank-list{
    width: 100%;
  }
  .top-rank-item{
    margin: 10px auto;
  }
  #top-nav{
    z-index: 9999;
  }
</style>
