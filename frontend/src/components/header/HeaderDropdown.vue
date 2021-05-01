<script setup lang='ts'>
import { user, logout } from '~/logic'
</script>

<template>
  <DropdownComponent trigger-class="block h-full">
    <template #trigger="{ activator }">
      <div class="flex items-center">
        <img
          :src="user?.avatar"
          class="inline-block w-8 h-8 mr-2 rounded-full"
        />
        <div class="transition duration transform" :class="{ 'rotate-180': activator }">
          <mdi:menu-down></mdi:menu-down>
        </div>
      </div>
    </template>

    <template #headline>
      <div class="px-4 py-3">
        <p class="text-sm leading-5">
          Signed in as
        </p>
        <p class="text-sm font-medium leading-5 truncate">
          {{ user?.email }}
        </p>
      </div>
    </template>

    <template #list>
      <router-link to="/user/settings" class="header-dropdown__item">
        <span>Account settings</span>
        <mdi:account-settings-variant></mdi:account-settings-variant>
      </router-link>

      <a href="#" class="header-dropdown__item" @click.prevent="logout()">
        <span>Logout</span>
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
