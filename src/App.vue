<script setup lang='ts'>
import { getCurrentInstance, onBeforeMount } from '@vue/runtime-core'
import { useHead } from '@vueuse/head'
import { DashAuthService } from './logic'

useHead({
  title: 'Lone Social Network',
  meta: [
    { name: 'description', content: 'Lone Social Network Template' },
  ],
})

const instance = getCurrentInstance()

const autoLogin = async() => {
  const dashAuthService = new DashAuthService(instance)
  dashAuthService.autoLogin()
}

onBeforeMount(() => {
  autoLogin()
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header,
.footer {
  /* flex-grow, flex-shrink, flex-basis */
  flex: 0 1 auto;
}

.main {
  flex: 1 0 auto;
}
</style>
