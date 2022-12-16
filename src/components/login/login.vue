<template>
  <div id="login-box">
    <van-cell-group inset>
      <van-field v-model="user.username" type="text" label="账号" placeholder="请输入账号"/>
      <van-field v-model="user.password" type="password" label="密码" placeholder="请输入密码"/>
    </van-cell-group>
    <van-button type="primary" :loading="loading" size="large" class="login-btn" @click="login">登录</van-button>
    <van-button type="primary"  size="large" class="login-btn" @click="githubLogin">使用github登录</van-button>
    <van-button plain type="primary" @click="registry" class="login-btn">注册</van-button>
  </div>
</template>

<script>
import JsCookie from "js-cookie"
import userApi from "@/api/user/user"
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";
import pageApi from "@/api/page/page";
import {useStore} from "vuex";

export default {
  name: "login",
  setup() {
    let store = useStore()
    let router = useRouter()
    let loading = ref(false)
    let user = ref({
      username: '',
      password: ''
    })
    const login = async () => {
      loading.value = true
      await userApi.login(user.value).then(
        response => {
          if (response.code === 200) {
            JsCookie.set('token', response.data, { path: '/', expires: 30 })
            loading.value = false
            Toast('登陆成功')
          }
        }
      )
      await pageApi.play().then(
        response => {
          store.commit('changeSongList', response.data.firstBrowsePlayList)
        }
      )
      store.commit('CHANGE_CURRENT_SONG', store.getters.songList[0])
      store.commit('changeCurrentSingerName', store.getters.songList[0].name + ' - ' + store.getters.songList[0].author)
      store.getters.currentMainColor
      router.go(-1)
    }
    const githubLogin = () => {

    }
    const registry = () => {

    }
    return {
      user,
      loading,
      router,
      registry,
      login,
      githubLogin
    }
  }
}
</script>

<style scoped>
  .login-btn{
    width: 91vw;
    display: block;
    margin: 10px auto;
  }
  #login-box{
    height: 100%;
    margin-top: 5%;
  }
</style>
