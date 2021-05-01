<script setup lang='ts'>
import { ref } from 'vue'
import { imageLoader, user } from '~/logic'

const fileInput = ref<HTMLElement>()

const onFileChange = (progressEvent: ProgressEvent<FileReader>) => {
  // progressEvent.target?.result
}
</script>

<template>
  <div class="sticky top-44 left-0 bg-cool-gray-700 profile-aside__divider">
    <div>
      <div
        class="relative w-52 h-52 mx-auto -mb-28 rounded-full border-5 border-cool-gray-700 transform -translate-y-28 overflow-hidden group"
      >
        <div
          class="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black opacity-0 cursor-pointer transition duration group-hover:opacity-60"
          @click="fileInput?.click()"
        >
          <mdi:camera class="text-3xl"></mdi:camera>
        </div>

        <img :src="user?.avatar" />
      </div>

      <input ref="fileInput" class="hidden" type="file" @change="imageLoader($event, onFileChange)" />

      <div class="flex px-2 text-center py-8">
        <div class="w-1/2 text-xl">
          <h4>Followers</h4>
          <p>150</p>
        </div>
        <div class="w-1/2 text-xl">
          <h4>Following</h4>
          <p>150</p>
        </div>
      </div>
    </div>

    <SocialLinks></SocialLinks>
  </div>
</template>
