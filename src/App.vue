<template>
  <router-view></router-view>
</template>

<script>
import { ref} from "vue"
export default {
  name: 'App',
  setup() {
    let loading = ref(false)
    return {
      loading
    }
  }
}
</script>

<style>
</style>
