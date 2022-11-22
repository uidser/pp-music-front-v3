<template>
  <div class="comment-title-box">
    <van-icon name="arrow-left" size="1.5rem" style="position: absolute; left: 15px" color="#8f8f8f" class="play-title-icon" @click="back"/>
    <span class="play-title-span"><strong>{{ navName }}</strong></span>
    <slot></slot>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default {
  props: {
    navName: {
      type: String,
      default: '排行榜'
    }
  },
  name: "topbacknav",
  setup() {
    let router = useRouter()
    function back() {
      router.go(-1)
    }
    return {
      router,
      back
    }
  }
}
</script>

<style scoped>
  .comment-title-box{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;
    position: fixed;
    background-color: #FFF;
    padding: 20px 0px;
  }
  .play-title-span{
    display: inline-block;
    font-size: 14px;
  }
</style>
