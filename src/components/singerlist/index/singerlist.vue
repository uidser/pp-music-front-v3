<template>
  <div>
    <div class="top-text-button">
      <van-icon name="arrow-left" size="1.5rem" color="#8f8f8f" class="top-text-button-icon-left" @click="back"/>
      <span class="top-text-button-span"><strong>歌手</strong></span>
      <van-icon name="search" size="1.5rem" color="#8f8f8f" class="top-text-button-icon-right" @click="toSearch"/>
    </div>
    <div id="clear-float-box"></div>
    <div class="always-listen-singer-box">
      <div class="always-listen-singer-title">
        <span id="always-listen-singer-title-span-left">常听歌手</span>
        <span id="always-listen-singer-title-span-right">关注歌手 ></span>
      </div>
      <div class="always-listen-singer-cart-list">
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
        <div class="always-listen-singer-cart-item">
          <div class="always-listen-singer-cart-item-profile-picture">
            <img src="/img/manleng-album.png" width="50"/>
          </div>
          <span class="always-listen-singer-cart-item-singer-name">梁静茹</span>
          <van-icon name="play-circle-o" size="1.3rem" color="#8f8f8f"/>
        </div>
      </div>
    </div>
    <div class="options-box" v-if="showOptions">
      <div class="option-line" v-for="(category, index1) in categoryList" :key="category.id" >
        <div :class="optionNum[index1][0] === 0? 'option-box-checked': 'option-box'" @click="check(index1, null, category.id)">
          <span :class="optionNum[index1][0] === 0? 'option-span-checked': 'option-span'">全部</span>
        </div>
        <div :class="optionNum[index1][index2 + 1] === categoryItem.id? 'option-box-checked': 'option-box'" v-for="(categoryItem, index2) in category.categoryChildrenList" :key="categoryItem.id" @click="check(index1, index2 + 1, categoryItem.id)">
          <span :class="optionNum[index1][index2 + 1] === categoryItem.id? 'option-span-checked': 'option-span'">{{ categoryItem.name }}</span>
        </div>
      </div>
    </div>
    <div id="singer-list-box">
      <div class="singer-item" @click="jump('/singer/' + singer.id)" v-for="singer in singerList" :key="singer.id">
        <div class="singer-item-profile-picture-box">
          <img :src="singer.profilePicture" width="60">
        </div>
        <span class="singer-item-name-span">{{ singer.name }}</span>
        <div class="singer-item-follow-button">
          <van-icon name="plus" color="#8f8f8f" size="0.6rem" class="singer-item-follow-icon"/>
          <span class="singer-item-follow-span">关注</span>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
import pageApi from "@/api/page/page";
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
export default {
  name: "singerlist",
  setup() {
    let optionNum = ref([[]])
    let router = useRouter()
    let singerList = ref([])
    let categoryList = ref([])
    let showOptions = ref(false)
    function back() {
      router.go(-1)
    }
    function jump(path) {
      router.push(path)
    }
    const toSearch = () => {
      router.push('search')
    }
    onMounted(() => {
      page({ current: 1, limit: 10 })
    })

    function initArray() {
      for (let i = 0; i < categoryList.value.length; i++) {
        optionNum.value[i] = [categoryList.value.length]
        for (let j = 0; j < categoryList.value[i].categoryChildrenList.length; j++) {
          optionNum.value[i][j] = 0
        }
      }
    }

    const page = async () => {
      await pageApi.singerList().then(
        response => {
          singerList.value = response.data.singerList
          categoryList.value = response.data.categoryList
          initArray()
          showOptions.value = true
        }
      )
    }
    const check = (index1, index2, id) => {
      if (index2) {
        optionNum.value[index1][0] = -1
        for (let i = 0; i < optionNum.value[index1].length; i++) {
          optionNum.value[index1][i] = -1
        }
        optionNum.value[index1][index2] = id
      } else {
        for (let i = 0; i < optionNum.value[index1].length; i++) {
          optionNum.value[index1][i] = 0
        }
        optionNum.value[index1][0] = 0
      }
    }
    return {
      optionNum,
      singerList,
      categoryList,
      showOptions,
      check,
      toSearch,
      back,
      jump
    }
  }
}
</script>

<style scoped>
  .top-text-button{
    width: 100%;
    position: fixed;
    margin: 0 auto;
    text-align: center;
    background-color: #FFF;
    padding: 20px 0;
    z-index: 9999;
  }
  .top-text-button-span{
    line-height: 24px;
  }
  .top-text-button-icon-left{
    float: left;
    margin-left: 15px;
  }
  .top-text-button-icon-right{
    float: right;
    font-weight: bolder;
    margin-right: 15px;
  }
  #clear-float-box{
    height: 64px;
  }
  #always-listen-singer-title-span-left, #always-listen-singer-title-span-right{
    font-size: 14px;
    letter-spacing: 0.1px;
    color: #8f8f8f;
    line-height: 14px;
  }
  #always-listen-singer-title-span-left{
    float: left;
    margin-left: 15px;
   }
  #always-listen-singer-title-span-right{
    float: right;
    margin-right: 15px;
  }
  .always-listen-singer-title{
    margin: 5px auto;
    height: 14px;
    margin-top: 15px;
  }
  .always-listen-singer-cart-item{
    height: 130px;
    width: 90px;
    background-color: #FFF;
    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    margin-left: 15px;
    margin-top: 10px;
  }
  .always-listen-singer-cart-list{
    width: 100%;
    margin: 10px auto;
    white-space: nowrap;
    overflow: auto;
    height: 150px;
  }
  .always-listen-singer-cart-list::-webkit-scrollbar{
    display: none;
  }
  .always-listen-singer-cart-item-profile-picture{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
  .always-listen-singer-cart-item-singer-name{
    font-size: 14px;
    letter-spacing: 0.5px;
    display: block;
    margin: 5px auto;
  }

  .option-box-checked{
    width: 50px;
    height: 25px;
    background-color: #8f8f8f;
    border-radius: 20px;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
    margin-top: 2.5px;
  }
  .option-box{
    width: 50px;
    height: 25px;
    background-color: #FFF;
    border-radius: 20px;
    text-align: center;
    display: inline-block;
    margin-left: 5px;
    margin-top: 2.5px;
  }
  .option-span-checked{
    line-height: 25px;
    font-size: 14px;
    color: #FFF;
  }
  .option-span{
    font-size: 14px;
    line-height: 25px;
    color: #8f8f8f;
  }
  .options-box{
    margin-left: 10px;
  }
  .option-line{
    margin: 5px auto;
    white-space: nowrap;
    overflow: auto;
    height: 30px;
  }
  .option-line::-webkit-scrollbar{
    display: none;
  }
  .singer-item-profile-picture-box{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  #singer-list-box{
    width: 92%;
    margin: 10px auto;
  }
  .singer-item-name-span{
    float: left;
    line-height: 60px;
    margin-left: 15px;
  }
  .singer-item{
    height: 60px;
    margin-bottom: 15px;
  }
  .singer-item-follow-button{
    height: 20px;
    width: 46px;
    float: right;
    border: 1.5px solid #8f8f8f;
    border-radius: 12px;
    text-align: center;
    margin-top: 20px;
  }
  .singer-item-follow-span{
    font-size: 12px;
    color: #8f8f8f;
    float: left;
    margin-left: 1px;
    line-height: 20px;
  }
  .singer-item-follow-icon{
    float: left;
    line-height: 20px;
    margin-left: 5px;
    font-weight: bolder;
  }
</style>
