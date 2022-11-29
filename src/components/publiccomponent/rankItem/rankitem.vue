<template>
  <div class="rank-item">
    <div class="rank-num-box">
      <span :class="rankNum <= 3?'rank-num-red': 'rank-num'">{{ rankNum }}</span>
    </div>
    <span class="rank-keyword">{{ keyword }}</span>
    <div class="rank-right">
      <van-icon name="arrow-up" color="#ff0039" size="0.6rem" class="up-icon" v-show="type === 'up'"/>
      <van-icon name="arrow-down" color="#8f8f8f" size="0.6rem" class="up-icon" v-show="type === 'down'"/>
      <div class="line-box" v-show="type === 'peaceful'"></div>
      <span v-show="type === 'new'" class="new-span">new</span>
      <span :class="step > 0?'up-num': 'down-num'" v-show="step > 0 || step < 0">{{ step.toString().replace('-', '') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankitem",
  props: {
    rankNum: {
      type: Number,
      default: 0
    },
    keyword: {
      type: String,
      default: ''
    },
    step: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .line-box{
    height: 3px;
    width: 12px;
    border-radius: 1px;
    margin: 0 auto;
    background-color: #8f8f8f;
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
  .down-num{
    color: #8f8f8f;
    font-size: 10px;
    margin-left: 4px;
  }
  .rank-num-box{
    width: 16px;
    text-align: center;
    display: inline-block;
  }
  .rank-right{
    position: absolute;
    right: 0;
    width: 30px;
    text-align: center;
  }
  .rank-keyword{
    font-size: 14px;
    margin-left: 10px;
  }
  .rank-keyword{
    font-size: 14px;
    margin-left: 10px;
  }
  .rank-item{
    margin: 10px auto;
    display: flex;
    align-items: center;
    position: relative;
  }
  .new-span{
    font-size: 10px;
    color: #ff0039;
  }
</style>
