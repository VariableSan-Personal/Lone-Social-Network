<script setup lang='ts'>
import { ref } from 'vue'
import type { TLink } from '~/helpers/types/Link.type'

const links = ref<TLink[]>([
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
])
</script>

<template>
  <header class="container pt-5">
    <div class="flex flex-wrap -mx-2 overflow-hidden">
      <div
        class="my-2 w-full flex items-center overflow-hidden md:w-1/6 lg:w-1/3 xl:w-1/3 text-center md:text-left"
      >
        <router-link to="/" class="font-bold px-2 text-2xl font-serif">
          Lone social
        </router-link>
      </div>

      <nav
        class="my-2 w-full overflow-hidden md:w-3/6 lg:w-1/3 xl:w-1/3 text-center md:text-left flex items-center"
      >
        <ul class="flex">
          <li v-for="(link, index) in links" :key="index" class="not-last:mr-2">
            <router-link class="block font-semibold" :to="link.href">
              {{ link.title }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div
        class="my-2 w-full flex items-center justify-end overflow-hidden md:w-2/6 lg:w-1/3 xl:w-1/3 text-center"
      >
        <a
          href="https://vk.com/nnursultan"
          target="_blank"
          title="VK"
          class="inline-block w-6 mr-2 hover:text-blue-600"
        >
          <mdi:vk class="duration-150"></mdi:vk>
        </a>
      </div>
    </div>
  </header>
</template>
