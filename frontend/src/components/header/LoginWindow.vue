<script setup lang='ts'>
import { computed, defineProps, getCurrentInstance, watch } from '@vue/runtime-core'
import LoginComponentVue from './LoginComponent.vue'
import RegisterComponentVue from './RegisterComponent.vue'
import type { TTab } from '~/helpers/types/Tab.type'

const props = defineProps({
  showWindow: {
    type: Boolean,
    default: false,
  },

  currentTab: {
    default: 0,
  },
})

const instance = getCurrentInstance()

const currentTabT = computed({
  get() {
    return props.currentTab
  },

  set(value) {
    instance?.emit('update:currentTab', value)
  },
})

const showWindowT = computed({
  get(): boolean {
    return props.showWindow
  },

  set(value: boolean) {
    instance?.emit('update:showWindow', value)
  },
})

const tabs: TTab[] = [
  {
    title: 'login.login',
    component: LoginComponentVue,
  },
  {
    title: 'login.register',
    component: RegisterComponentVue,
  },
]

watch(showWindowT, () => {
  if (showWindowT.value === true)
    document.body.classList.add('overflow-y-hidden')
  else
    document.body.classList.remove('overflow-y-hidden')
})
</script>

<template>
  <ModalWindow v-model:showWindow="showWindowT" block-class="flex items-center justify-center">
    <template #content>
      <div class="bg-white dark:bg-cool-gray-700 pb-8 px-2 rounded">
        <DynamicTab v-model:currentTab="currentTabT" :tabs="tabs" wrapper-class="px-2"></DynamicTab>
      </div>
    </template>
  </ModalWindow>
</template>
