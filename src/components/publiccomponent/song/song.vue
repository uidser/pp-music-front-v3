<template>
  <div class="song-item">
    <div class="rank-number-box" v-if="showStep">
      <span :class="rankNumber > 3? 'rank-number': 'rank-number-red'">{{ rankNumber }}</span>
      <div class="rank-tip" v-show="showStep && step === 0"></div>
      <div class="rank-tip-up" v-show="showStep && step > 0">
        <van-icon name="arrow-up" color="#ff0039" size="0.5rem"/>
        <span class="up-span">{{ step }}</span>
      </div>
      <div class="rank-tip-down" v-show="showStep && step < 0">
        <van-icon name="arrow-down" color="#8f8f8f" size="0.5rem"/>
        <span class="down-span">{{ step }}</span>
      </div>
    </div>
    <div class="song-content-text">
      <span :class="clazz === 0?'song-item-name': 'song-item-name-check'" v-if="showHtml" v-html="name"></span>
      <span :class="clazz === 0?'song-item-name': 'song-item-name-check'" v-if="!showHtml">{{ name }}</span>
      <span :class="clazz === 0?'song-item-singer-name': 'song-item-singer-name-check'" v-if="showHtml" v-html="author + album"></span>
      <span :class="clazz === 0?'song-item-singer-name': 'song-item-singer-name-check'" v-if="!showHtml">{{ author + ' - ' + album }}</span>
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
      default: 1,
      require: true
    },
    author: {
      type: String,
      default: '',
      require: true
    },
    album: {
      type: String,
      default: '',
      require: true
    },
    name: {
      type: String,
      default: '',
      require: true
    },
    step: {
      type: Number,
      default: 0,
      require: true
    },
    showStep: {
      type: Boolean,
      default: true,
    },
    clazz: {
      type: Number,
      default: 0,
      require: true
    },
    showHtml: {
      type: Boolean,
      default: false,
      require: true
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
  .song-item-name-check{
    display: block;
    color: #ff0039;
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
  .song-item-singer-name-check{
    float: left;
    font-size: 12px;
    display: block;
    margin: 3px auto;
    color: #ff0039;
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
    /*position: absolute;*/
    /*left: 40px;*/
    float: left;
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
  .rank-tip-up{
    margin: 0 auto;
  }
  .rank-tip-down{
    margin: 0 auto;
  }
  .up-span, .down-span{
    font-size: 10px;
  }
  .up-span{
    color: #ff0039;
  }
  .down-span{
    color: #8f8f8f;
  }
</style>
