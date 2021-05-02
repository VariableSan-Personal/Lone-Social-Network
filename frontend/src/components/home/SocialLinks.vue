<script setup lang='ts'>
import { home } from '~/logic'
</script>

<template>
  <ul class="social-links__divider">
    <li v-for="link in home?.social_links" :key="link.link_id">
      <a class="flex items-center p-3 group" :href="link.href" target="_blank">
        <div class="group-hover:text-blue-400 transition duration">
          <span class="iconify" :data-icon="link.icon"></span>
          <span class="inline-block ml-3">{{ link.title }}</span>
        </div>
      </a>
    </li>
  </ul>
</template>

<style lang="postcss">
.social-links {
  &__divider {
    @apply divide-y divide-gray-100;
  }
}
</style>
