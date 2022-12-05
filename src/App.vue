<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <router-view></router-view>
  </van-pull-refresh>
</template>

<script>
import { ref} from "vue"
import {Toast} from "vant"
export default {
  name: 'App',
  setup() {
    let loading = ref(false)
    function onRefresh() {
      setTimeout(() => {
        loading.value = false
        Toast('刷新成功')
      }, 1000)
    }
    return {
      loading,
      onRefresh
    }
  }
}
</script>

<style>
</style>
