<script setup lang='ts'>
import { home } from '~/logic'
</script>

<template>
  <ul class="social-links__divider divide-gray-300 dark:divide-gray-100">
    <li>
      <a
        class="link--default flex items-center p-3"
        :href="`mailto:${home?.admin_info.email}`"
        target="_blank"
      >
        <span class="iconify" data-icon="mdi:email"></span>
        <span class="inline-block ml-3">E-mail</span>
      </a>
    </li>

    <li v-for="link in home?.social_links" :key="link.link_id">
      <a class="link--default flex items-center p-3" :href="link.href" target="_blank">
        <span class="iconify" :data-icon="link.icon"></span>
        <span class="inline-block ml-3">{{ link.title }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="postcss">
.social-links {
  &__divider {
    @apply divide-y;
  }
}
</style>
