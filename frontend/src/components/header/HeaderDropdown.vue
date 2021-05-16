<script setup lang='ts'>
import { ref } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import { logout } from '~/logic'

const imageSrc = ref('')

const { t } = useI18n()

/* watch(home, () => {
  imageSrc.value = URL.assets(home.value?.avatar.id || '')
}) */
</script>

<template>
  <DropdownComponent trigger-class="block h-full">
    <template #trigger="{ activator }">
      <div class="flex items-center">
        <div class="bg--default relative w-10 h-10 rounded-full overflow-hidden">
          <img v-if="imageSrc" :src="imageSrc" />
          <ImageLoader v-else size="text-xs"></ImageLoader>
        </div>

        <div class="transition duration transform" :class="{ 'rotate-180': activator }">
          <mdi:menu-down></mdi:menu-down>
        </div>
      </div>
    </template>

    <template #headline>
      <div class="px-4 py-3">
        <p class="text-sm leading-5">
          {{ t('header.signed-in') }}
        </p>
        <p class="text-sm font-medium leading-5 truncate">
          {{ 'some name' }}
        </p>
      </div>
    </template>

    <template #list>
      <router-link to="/user/settings" class="header-dropdown__item">
        <span>{{ t('header.account-settings') }}</span>
        <mdi:account-settings-variant></mdi:account-settings-variant>
      </router-link>

      <a href="#" class="header-dropdown__item" @click.prevent="logout()">
        <span>{{ t('header.logout') }}</span>
        <mdi:logout></mdi:logout>
      </a>
    </template>
  </DropdownComponent>
</template>

<style lang="postcss">
.header-dropdown {
  &__item {
    @apply flex justify-between items-center w-full px-4 py-2 text-sm leading-5 text-left;
  }
}
</style>
