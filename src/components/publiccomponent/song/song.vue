<template>
  <div class="song-item">
    <div class="rank-number-box">
      <span :class="rankNumber > 3? 'rank-number': 'rank-number-red'">{{ rankNumber }}</span>
      <div class="rank-tip"></div>
    </div>
    <div class="song-content-text">
      <span class="song-item-name">慢冷</span>
      <span class="song-item-singer-name">梁静茹 - 我好吗？- 太阳如常升起</span>
    </div>
    <div class="song-item-right">
      <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
      <van-icon name="ellipsis" size="1.5rem" color="#8f8f8f" style="margin-left: 10px"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankNumber: {
      type: Number,
      default: 1
    }
  },
  name: "song"
}
</script>

<style scoped>
  .song-item{
    height: 50px;
    margin: 10px 0;
    position: relative;
  }
  .song-item-name{
    display: block;
  }
  .song-item-right{
    float: right;
    height: 50px;
    position: relative;
    top: 13px;
  }
  .song-item-singer-name{
    float: left;
    font-size: 12px;
    color: #8f8f8f;
    display: block;
    margin: 3px auto;
  }
  .rank-number{
    font-size: 18px;
    line-height: 25px;
    color: #8f8f8f;
  }
  .rank-number-box{
    height: 30px;
    width: 30px;
    float: left;
    text-align: center;
  }
  .song-content-text{
    position: absolute;
    left: 40px;
  }
  .rank-number-red{
    font-size: 22px;
    line-height: 25px;
    color: #ff0039;
    font-weight: bolder;
  }
  .rank-tip{
    width: 8px;
    height: 2px;
    background-color: #8f8f8f;
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 10px;
  }
</style>
