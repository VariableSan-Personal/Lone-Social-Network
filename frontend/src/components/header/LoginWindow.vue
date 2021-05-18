<script setup lang='ts'>
import { computed, defineProps, getCurrentInstance } from '@vue/runtime-core'
import LoginComponentVue from './LoginComponent.vue'
import type { TTab } from '~/helpers/types/Tab.type'

const props = defineProps({
  showWindow: {
    type: Boolean,
    default: false,
  },
})

const instance = getCurrentInstance()

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
    title: 'Login',
    component: LoginComponentVue,
  },
]

</script>

<template>
  <ModalWindow v-model:showWindow="showWindowT" block-class="flex items-center justify-center">
    <template #content>
      <div class="w-1/2 h-36 bg-warm-gray-600">
        <DynamicTab :tabs="tabs"></DynamicTab>
      </div>
    </template>
  </ModalWindow>
</template>
