<template>
  <div class="song-item">
    <span class="song-item-name">慢冷</span>
    <div class="song-item-right">
      <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
      <van-icon name="ellipsis" size="1.5rem" color="#8f8f8f" style="margin-left: 10px"/>
    </div>
    <span class="song-item-singer-name">梁静茹 - 我好吗？- 太阳如常升起</span>
  </div>
</template>

<script>
export default {
  name: "song"
}
</script>

<style scoped>
  .song-item{
    height: 50px;
    margin: 10px 0;
  }
  .song-item-name{
    display: block;
  }
  .song-item-right{
    float: right;
    height: 50px;
    position: relative;
    top: -7px;
  }
  .song-item-singer-name{
    float: left;
    font-size: 12px;
    color: #8f8f8f;
    display: block;
    margin: 3px auto;
  }
</style>
