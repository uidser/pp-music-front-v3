<template>
  <div>
    <topbacknav id="top-nav"></topbacknav>
    <div id="clear-top-both"></div>
    <div id="recommend-box">
      <span class="rank-title-item-span">推荐</span>
      <div id="recommend-rank-list-box">
        <div class="recommend-rank-item" v-for="rank in rankList" :key="rank.id" @click="jump('/rank/detail/' + rank.id + '/' + rank.rankFrequency)">
          <img :src="rank.mediaList[0].mediaProfilePictureImg" width="110" style="position: absolute; left: 0; top: 0;"/>
          <div class="rank-title-and-button">
            <div class="rank-line-box"></div>
            <span class="rank-name-span">{{ 'top  ' + rank.name }}</span>
          </div>
          <div class="rank-tip-box" :ref="getMainColor(rank.id, rank.mediaList[0].mediaProfilePictureImg)" :style="'background-color:' + mainColorMap.get(rank.id) + ';'">
            <span class="rank-listen-quantity-span">{{ rank.rankListenQuantity }}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="rank-top-box">
      <span class="rank-title-item-span">巅峰榜</span>
      <div id="top-rank-list">
        <rank v-for="rank in rankList" :key="rank.id" :ref="getMainColor(rank.id, rank.mediaList[0].mediaProfilePictureImg)" :play-quantity="rank.rankListenQuantity" :media-list="rank.mediaList" @click="jump('/rank/detail/' + rank.id + '/' + rank.rankFrequency)" class="rank-item" :main-color="mainColorMap.get(rank.id)"></rank>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
import analyze from "rgbaster"
import {ref} from "vue"
import rankApi from "@/api/rank/rank"
import {useRouter} from "vue-router"
import Topbacknav from "@/components/publiccomponent/topbacknav/topbacknav"
import Rank from "@/components/publiccomponent/rank/rank"
import {onMounted} from "vue"
export default {
  name: "ranklist",
  components: {Rank, Topbacknav},
  setup() {
    let router = useRouter()
    let rankList = ref([])
    let mainColorMap = ref(new Map)
    onMounted(() => {
      getAllRank()
    })
    function jump(path) {
      router.push(path)
    }
    const getAllRank = () => {
      rankApi.getAll().then(
        response => {
          rankList.value = response.data
        }
      )
    }
    const getMainColor = async (id, path) => {
      // let color = '#bfbfbf'
      let color = ''
      await analyze(path).then(
        res => {
          color = res[0].color
        }
      )
      mainColorMap.value.set(id, color)
    }
    return {
      rankList,
      mainColorMap,
      getAllRank,
      getMainColor,
      jump
    }
  }
}
</script>

<style scoped>
  #clear-top-both{
    height: 84px;
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
    margin-top: 10px;
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
  .rank-item{
    margin: 10px 0;
  }
</style>
