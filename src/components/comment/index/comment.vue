<template>
  <div>
    <div class="comment-title-box">
      <van-icon name="arrow-left" size="1.5rem" style="position: absolute; left: 15px" color="#8f8f8f" class="play-title-icon" @click="back"/>
      <span class="play-title-span"><strong>评论 {{ commentQuantity }}</strong></span>
    </div>
    <div id="top-clear-float"></div>
    <div></div>
    <div class="comment-content-box">
      <div class="comment-sort-box">
        <span id="comment-sort-box-span-comment"><strong>评论区</strong></span>
        <span id="countQuantity">{{ commentQuantity }}</span>
        <div class="comment-sort-word">
          <span :class="sortWordNum === 0? 'comment-sort-box-span-checked': 'comment-sort-box-span'" @click="changeSortWord(0)">推荐</span>
          <div class="comment-sort-box-span-split"></div>
          <span :class="sortWordNum === 1? 'comment-sort-box-span-checked': 'comment-sort-box-span'" @click="changeSortWord(1)">最热</span>
          <div class="comment-sort-box-span-split"></div>
          <span :class="sortWordNum === 2? 'comment-sort-box-span-checked': 'comment-sort-box-span'" @click="changeSortWord(2)" style="margin-right: 20px">最新</span>
        </div>
      </div>
      <div class="comment-box">
        <div class="comment-item">
           <div class="profile-picture-box">
             <img src="/img/1000.jpg" width="35"/>
           </div>
          <span class="comment-item-user-name">伦敦西区52号</span>
          <span class="comment-item-publish-time">11-14 17:35</span>
          <span class="comment-item-comment-self">谢谢笑笑老婆！今天大降温，但是歌有带给我力量和温暖啦！以后要早点睡，不要半夜发泡泡啦哈哈哈哈哈哈哈</span>
          <div class="recomment-box" @click="toCommentDetail">
            <span class="recomment-box-span">共3条回复 ></span>
          </div>
          <div class="comment-item-address-like-other">
            <van-icon name="guide-o" size="0.5rem" color="#8f8f8f" class="address-icon"/>
            <span class="comment-item-address-span">江苏</span>
            <div class="other-icon">
              <span class="comment-item-like-quantity">84</span>
              <van-icon name="thumb-circle-o" size="1rem" color="#8f8f8f" class="comment-item-like-icon"/>
              <van-icon name="ellipsis" size="1rem" color="#8f8f8f" class="comment-item-other-icon"/>
            </div>
          </div>
        </div>
        <div class="comment-item">
          <div class="profile-picture-box">
            <img src="/img/1000.jpg" width="35"/>
          </div>
          <span class="comment-item-user-name">伦敦西区52号</span>
          <span class="comment-item-publish-time">11-14 17:35</span>
          <span class="comment-item-comment-self">谢谢笑笑老婆！今天大降温，但是歌有带给我力量和温暖啦！以后要早点睡，不要半夜发泡泡啦哈哈哈哈哈哈哈</span>
          <div class="recomment-box">
            <span class="recomment-box-span">共3条回复 ></span>
          </div>
          <div class="comment-item-address-like-other">
            <van-icon name="guide-o" size="0.5rem" color="#8f8f8f" class="address-icon"/>
            <span class="comment-item-address-span">江苏</span>
            <div class="other-icon">
              <span class="comment-item-like-quantity">84</span>
              <van-icon name="thumb-circle-o" size="1rem" color="#8f8f8f" class="comment-item-like-icon"/>
              <van-icon name="ellipsis" size="1rem" color="#8f8f8f" class="comment-item-other-icon"/>
            </div>
          </div>
        </div>
        <div class="comment-item">
          <div class="profile-picture-box">
            <img src="/img/1000.jpg" width="35"/>
          </div>
          <span class="comment-item-user-name">伦敦西区52号</span>
          <span class="comment-item-publish-time">11-14 17:35</span>
          <span class="comment-item-comment-self">谢谢笑笑老婆！今天大降温，但是歌有带给我力量和温暖啦！以后要早点睡，不要半夜发泡泡啦哈哈哈哈哈哈哈</span>
          <div class="recomment-box">
            <span class="recomment-box-span">共3条回复 ></span>
          </div>
          <div class="comment-item-address-like-other">
            <van-icon name="guide-o" size="0.5rem" color="#8f8f8f" class="address-icon"/>
            <span class="comment-item-address-span">江苏</span>
            <div class="other-icon">
              <span class="comment-item-like-quantity">84</span>
              <van-icon name="thumb-circle-o" size="1rem" color="#8f8f8f" class="comment-item-like-icon"/>
              <van-icon name="ellipsis" size="1rem" color="#8f8f8f" class="comment-item-other-icon"/>
            </div>
          </div>
        </div>
        <div class="comment-item">
          <div class="profile-picture-box">
            <img src="/img/1000.jpg" width="35"/>
          </div>
          <span class="comment-item-user-name">伦敦西区52号</span>
          <span class="comment-item-publish-time">11-14 17:35</span>
          <span class="comment-item-comment-self">谢谢笑笑老婆！今天大降温，但是歌有带给我力量和温暖啦！以后要早点睡，不要半夜发泡泡啦哈哈哈哈哈哈哈</span>
          <div class="recomment-box">
            <span class="recomment-box-span">共3条回复 ></span>
          </div>
          <div class="comment-item-address-like-other">
            <van-icon name="guide-o" size="0.5rem" color="#8f8f8f" class="address-icon"/>
            <span class="comment-item-address-span">江苏</span>
            <div class="other-icon">
              <span class="comment-item-like-quantity">84</span>
              <van-icon name="thumb-circle-o" size="1rem" color="#8f8f8f" class="comment-item-like-icon"/>
              <van-icon name="ellipsis" size="1rem" color="#8f8f8f" class="comment-item-other-icon"/>
            </div>
          </div>
        </div>
        <div class="comment-item">
          <div class="profile-picture-box">
            <img src="/img/1000.jpg" width="35"/>
          </div>
          <span class="comment-item-user-name">伦敦西区52号</span>
          <span class="comment-item-publish-time">11-14 17:35</span>
          <span class="comment-item-comment-self">谢谢笑笑老婆！今天大降温，但是歌有带给我力量和温暖啦！以后要早点睡，不要半夜发泡泡啦哈哈哈哈哈哈哈</span>
          <div class="recomment-box">
            <span class="recomment-box-span">共3条回复 ></span>
          </div>
          <div class="comment-item-address-like-other">
            <van-icon name="guide-o" size="0.5rem" color="#8f8f8f" class="address-icon"/>
            <span class="comment-item-address-span">江苏</span>
            <div class="other-icon">
              <span class="comment-item-like-quantity">84</span>
              <van-icon name="thumb-circle-o" size="1rem" color="#8f8f8f" class="comment-item-like-icon"/>
              <van-icon name="ellipsis" size="1rem" color="#8f8f8f" class="comment-item-other-icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
export default {
  name: "comment",
  setup() {
    let commentQuantity = ref(10)
    let router = useRouter()
    let sortWordNum = ref(0)
    function back() {
      router.go(-1)
    }
    function changeSortWord(num) {
      sortWordNum.value = num
    }
    function toCommentDetail() {
      router.push('/comment/detail')
    }
    return {
      commentQuantity,
      sortWordNum,
      back,
      changeSortWord,
      toCommentDetail
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
  .comment-sort-box{
    width: 100%;
    margin: 0 auto;
    height: 20px;
    position: fixed;
    top: 64px;
    background-color: #FFF;
    z-index: 9999;
  }
  .comment-sort-box-span{
    font-size: 14px;
    margin: 0 5px;
    display: inline-block;
    line-height: 20px;
  }
  #countQuantity{
    font-size: 14px;
    color: #8f8f8f;
    margin-left: 5px;
    line-height: 20px;
  }
  .comment-sort-box-span-split{
    display: inline-block;
    height: 10px;
    width: 1px;
    background-color: #8f8f8f;
    margin: 0 auto;
    line-height: 20px;
  }
  #comment-sort-box-span-comment {
    float: left;
    font-size: 14px;
    line-height: 20px;
    margin-left: 15px;
  }
  #top-clear-float{
    height: 84px;
    background-color: #FFF;
  }
  .comment-sort-word{
    float: right;
  }
  .comment-sort-box-span-checked{
    font-size: 14px;
    margin: 0 5px;
    display: inline-block;
    line-height: 20px;
    font-weight: bolder;
  }
  .profile-picture-box{
    height: 35px;
    width: 35px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  .comment-box{
    width: 92%;
    margin: 20px auto;
  }
  .comment-item-user-name{
    font-size: 14px;
    color: #8f8f8f;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 0;
  }
  .comment-item-publish-time{
    display: block;
    margin-left: 45px;
    margin-top: 1px;
    font-size: 10px;
    color: #8f8f8f;
  }
  .comment-item-comment-self{
    font-size: 14px;
    color: black;
    display: block;
    width: 86%;
    margin-left: 45px;
    margin-top: 3px;
    letter-spacing: 0.1px;
  }
  .recomment-box{
    background-color: #eaeaea;
    height: 30px;
    width: 85%;
    margin-left: 45px;
    border-radius: 3px;
    margin-top: 4px;
    display: flex;
    align-items: center;
  }
  .recomment-box-span{
    font-size: 12px;
    display: inline-block;
    margin-left: 5px;
    color: #8f8f8f;
  }
  .comment-item-address-like-other{
    width: 85%;
    margin: 4px auto;
    margin-left: 45px;
    height: 20px;
  }
  .comment-item-address-span{
    font-size: 10px;
    color: #8f8f8f;
    margin-left: 2px;
  }
  .address-icon, .comment-item-address-span{
    float: left;
    line-height: 20px;
  }
  .comment-item-like-quantity{
    font-size: 12px;
    color: #8f8f8f;
    display: inline-block;
  }
  .other-icon{
    float: right;
    display: flex;
    align-items: center;
  }
  .comment-item-like-icon, .comment-item-other-icon{
    line-height: 20px;
    margin-left: 5px;
  }
  .comment-item{
    margin-bottom: 20px;
  }
</style>
