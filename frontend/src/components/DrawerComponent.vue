<script setup lang='ts'>
import { drawer, links, user } from '~/logic'
</script>

<template>
  <nav
    :class="drawer ? 'translate-x-0' : '-translate-x-full'"
    class="fixed z-20 left-0 top-0 w-7/12 sm:w-64 min-h-full bg-cool-gray-800 overflow-scroll transition-all duration-300 ease-in-out transform"
  >
    <div class="relative flex flex-wrap justify-between mt-8 pb-6 px-4 border-b-1">
      <div class="mr-4 mb-4">
        <img
          src="https://myanimelist.net/images/characters/3/290840.jpg"
          class="mx-auto w-20 h-20 rounded-full"
        />
      </div>

      <div class="flex justify-between flex-grow items-center w-1/2">
        <span class="font-semibold text-white">{{ user?.firstName }} {{ user?.lastName }}</span>

        <router-link class="focus:outline-none" :to="{ name: 'user-settings' }">
          <tabler:settings></tabler:settings>
        </router-link>
      </div>
    </div>

    <div class="my-4 px-4">
      <ul>
        <router-link
          v-for="(link, index) in links"
          :key="index"
          class="mb-2 px-4 py-4 transition-color duration text-gray-100 block border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded rounded-lg"
          tag="li"
          :to="link.href"
        >
          {{ link.title }}
        </router-link>
      </ul>
    </div>
  </nav>

  <transition
    enter-class="opacity-0"
    enter-active-class="ease-out transition-medium"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-active-class="ease-out transition-medium"
    leave-to-class="opacity-0"
  >
    <div
      v-show="drawer"
      class="fixed inset-0 z-10 transition-opacity cursor-pointer"
      @keydown.esc="drawer = false"
    >
      <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="drawer = false" />
    </div>
  </transition>
</template>
