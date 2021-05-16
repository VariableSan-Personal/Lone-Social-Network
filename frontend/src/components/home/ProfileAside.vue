<script setup lang='ts'>
import { ref, watch } from 'vue'
import { user, imageLoader, URL, home } from '~/logic'

const imageSrc = ref('')

watch(home, () => {
  imageSrc.value = URL.assets(home.value?.admin_info.avatar.id || '')
})

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
          v-if="imageSrc && user?.role.admin_access"
          class="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black opacity-0 cursor-pointer transition duration group-hover:opacity-60 bg--default"
          @click="fileInput?.click()"
        >
          <mdi:camera class="text-3xl"></mdi:camera>
        </div>

        <ImageLoader v-if="!imageSrc" size="text-2xl"></ImageLoader>

        <img :src="imageSrc" />
      </div>

      <input ref="fileInput" class="hidden" type="file" @change="imageLoader($event, onFileChange)" />

      <div class="px-2 py-4 text-center text-lg">
        <p>{{ home?.admin_info.first_name }} {{ home?.admin_info.last_name }}</p>
      </div>
    </div>

    <SocialLinks></SocialLinks>
  </div>
</template>
