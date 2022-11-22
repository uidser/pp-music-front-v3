<template>
  <div class="rank">
    <div class="left-box">
      <img src="/img/manleng-album.png" width="100px"/>
      <div class="rank-tip-box">
        <span class="rank-listen-quantity-span">23万</span>
      </div>
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
</template>

<script>
export default {
  name: "rank"
}
</script>

<style scoped>
  .rank{
    position: relative;
  }
  .left-box{
    box-shadow: 8px 0px 17px 0px rgba(0,0,0,0.1);
    background-color: #8f8f8f;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    position: absolute;
    left: 0;
    overflow: hidden;
  }
  .content-box{
    width: 96%;
    height: 100px;
    background-color: #ede6cc;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .content{
    margin-left: 120px;
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
</style>
