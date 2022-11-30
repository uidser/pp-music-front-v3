<template>
  <div>
    <div style="position: fixed; background-color: #FFF; box-shadow: 0px 12px 33px 0px rgba(0,0,0,0.1); width: 100%; height: 80px; z-index: 9999; padding-top: 10px">
      <div>
        <a href="javascript:void(0)" :class="navNum === 0? 'nav-a-checked': 'nav-a'" @click="changeNavNum(0, '/index')">推荐</a>
        <a href="javascript:void(0)" :class="navNum === 1? 'nav-a-checked': 'nav-a'" @click="changeNavNum(1, '/musicBuild')">音乐馆</a>
        <a href="javascript:void(0)" :class="navNum === 2? 'nav-a-checked': 'nav-a'" @click="changeNavNum(2, '/categorySongList')">歌单</a>
      </div>
      <van-search placeholder="搜你想听" shape="round" @click="toSearch"/>
    </div>
    <div style="height: 95px"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  name: "index",
  setup() {
    let navNum = ref(0)
    let router = useRouter()
    function changeNavNum(num, path) {
      navNum.value = num
      router.push(path)
    }
    const toSearch = () => {
      router.push('/search')
    }
    return {
      navNum,
      toSearch,
      changeNavNum
    }
  }
}
</script>

<style scoped>
  .nav-a-checked{
    font-size: 24px;
    text-decoration: none;
    color: #000000;
    margin: 0px 15px;
  }
  .nav-a{
    font-size: 24px;
    text-decoration: none;
    color: #8c8c8c;
    margin: 0px 15px;
  }
</style>
